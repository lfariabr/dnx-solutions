import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { typeDefs } from './schemas/typeDefs';
import { resolvers } from './resolvers';
import config from './config/config';
import { connectDB } from './db/connection';
import { getUser } from './middleware/auth';

console.log(`Starting server in ${config.nodeEnv} mode`);

// Define context type
interface MyContext {
  user?: {
    id: string;
    email: string;
    role: string;
  } | null;
}

async function startServer() {
  await connectDB();

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  
  await server.start();
  
  app.use(cors());
  app.use(express.json());
  app.get('/health', (_, res) => {
    res.status(200).send('OK');
  });
  
  app.use('/graphql', 
    express.json(),
    cors(),
    // @ts-ignore - Ignoring type issues with Express middleware
    expressMiddleware(server, {
      context: async ({ req }: any) => {
        // Get the user from the token
        const user = getUser(req);
        
        // Add the user to the context
        return { user };
      },
    })
  );
  
  await new Promise<void>(resolve => 
    httpServer.listen({ port: config.port }, resolve)
  );
  
  console.log(`🚀 Server ready at http://localhost:${config.port}/graphql`);
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});