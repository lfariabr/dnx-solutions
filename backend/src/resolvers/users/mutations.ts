import User from '../../models/User';
import { GraphQLError } from 'graphql';

export const userMutations = {
  // Register a new user
  register: async (_: any, { input }: any) => {
    const { name, email, password } = input;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new GraphQLError('Email already in use', {
        extensions: {
          code: 'BAD_USER_INPUT',
        },
      });
    }
    
    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: 'user', // Default role
    });
    
    // Save the user
    await user.save();
    
    // Generate token
    const token = user.generateAuthToken();
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    return {
      token,
      user,
    };
  },
  
  // Login a user
  login: async (_: any, { input }: any) => {
    const { email, password } = input;
    
    // Find the user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new GraphQLError('Invalid email or password', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new GraphQLError('Invalid email or password', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }
    
    // Generate token
    const token = user.generateAuthToken();
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    return {
      token,
      user,
    };
  },
  
  // Logout (client-side only, but we'll still implement it)
  logout: async () => {
    return true;
  },

    // // Logout an user
    // logout: async (_: any, __: any, context: any) => {
    //     // Check if user is authenticated
    //     if (!context.user) {
    //         throw new Error('Authentication required');
    //     }
    //     // Remove token from redis
    //     await redis.del(context.user.id);
    //     // Return success
    //     return true;
    // },

}