import * as dbHandler from '../helpers/dbHandler';
import { executeOperation } from '../helpers/testServer';
import User, { UserRole } from '../../models/User';
import ChatMessage from '../../models/ChatMessage';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import bcrypt from 'bcryptjs';
import { connectRedis, disconnectRedis, getRedisClient } from '../../services/redis';

// Mock OpenAI service
jest.mock('../../services/openai', () => ({
  chatWithAI: jest.fn().mockResolvedValue('This is a mock AI response'),
}));

// Define test queries and mutations
const ASK_QUESTION_MUTATION = `
  mutation AskQuestion($question: String!) {
    askQuestion(question: $question) {
      message {
        id
        question
        answer
        modelUsed
      }
      rateLimitInfo {
        limit
        remaining
        resetTime
      }
    }
  }
`;

describe('Chatbot Resolvers', () => {
  let testUser: any;
  let authToken: string;
  
  // Connect to database and Redis before tests
  beforeAll(async () => {
    await dbHandler.connect();
    await connectRedis();
    
    // Create a test user
    const passwordHash = await bcrypt.hash('Test1234!', 10);
    testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: passwordHash,
      role: UserRole.USER
    });
    
    // Generate auth token for the user
    authToken = jwt.sign(
      { id: testUser._id, email: testUser.email, role: testUser.role },
      config.jwtSecret,
      { expiresIn: '1h' }
    );
  });

  // Clear database between tests
  afterEach(async () => {
    await dbHandler.clearDatabase();
    
    // Clear Redis rate limiting keys
    const redisClient = getRedisClient();
    if (testUser && testUser._id) {
      await redisClient.del(`chatbot:${testUser._id}`);
    }
  });

  // Disconnect after all tests
  afterAll(async () => {
    await disconnectRedis();
    await dbHandler.closeDatabase();
  });

  it('should successfully ask a question and get a response', async () => {
    const variables = {
      question: 'What is the capital of France?'
    };

    const context = {
      user: {
        id: testUser._id.toString(),
        email: testUser.email,
        role: testUser.role
      }
    };

    const response = await executeOperation(ASK_QUESTION_MUTATION, variables, context);
    
    // Check response structure
    expect(response.body.kind).toBe('single');
    if (response.body.kind === 'single') {
      const data = response.body.singleResult.data;
      expect(data).toHaveProperty('askQuestion');
      
      // Use type assertion for TypeScript
      const askQuestion = data?.askQuestion as any;
      expect(askQuestion).toHaveProperty('message');
      expect(askQuestion).toHaveProperty('rateLimitInfo');
      
      // Check message properties
      expect(askQuestion.message.question).toBe(variables.question);
      expect(askQuestion.message.answer).toBe('This is a mock AI response');
      expect(askQuestion.message.modelUsed).toBe('gpt-3.5-turbo');
      
      // Check rate limit info
      expect(askQuestion.rateLimitInfo.limit).toBe(10); // From test env
      expect(askQuestion.rateLimitInfo.remaining).toBe(9);
      expect(askQuestion.rateLimitInfo.resetTime).toBeTruthy();
      
      // Check message was saved to database
      const messageInDb = await ChatMessage.findOne({ question: variables.question });
      expect(messageInDb).toBeTruthy();
      expect(messageInDb?.answer).toBe('This is a mock AI response');
    }
  });
  
  it('should enforce rate limiting after reaching the limit', async () => {
    const variables = {
      question: 'Test question for rate limiting'
    };

    const context = {
      user: {
        id: testUser._id.toString(),
        email: testUser.email,
        role: testUser.role
      }
    };

    // Make 10 requests (the limit defined in test environment)
    for (let i = 0; i < 10; i++) {
      await executeOperation(ASK_QUESTION_MUTATION, variables, context);
    }
    
    // The 11th request should fail due to rate limiting
    const response = await executeOperation(ASK_QUESTION_MUTATION, variables, context);
    
    // Check error response
    expect(response.body.kind).toBe('single');
    if (response.body.kind === 'single') {
      expect(response.body.singleResult.errors).toBeTruthy();
      const errorMessage = response.body.singleResult.errors?.[0].message;
      expect(errorMessage).toContain('Rate limit exceeded');
    }
  });
  
  it('should reject unauthorized users', async () => {
    const variables = {
      question: 'What is the capital of France?'
    };

    // No user in context
    const response = await executeOperation(ASK_QUESTION_MUTATION, variables, {});
    
    // Check error response
    expect(response.body.kind).toBe('single');
    if (response.body.kind === 'single') {
      expect(response.body.singleResult.errors).toBeTruthy();
      const errorMessage = response.body.singleResult.errors?.[0].message;
      expect(errorMessage).toContain('Permission denied');
    }
  });
});
