import User from '../../models/User';

export const userQueries = {
    // Get the current auth user
    me: async (_: any, __: any, context: any) => {
        // Check if user is authenticated
        if (!context.user) {
            throw new Error('Authentication required');
        }
        // Return user from database
        return await User.findById(context.user.id);
    },
};