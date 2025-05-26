'use client';

import { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  ReactNode 
} from 'react';
import { useRouter } from 'next/navigation';
import { gql, useMutation, ApolloError } from '@apollo/client';

// GraphQL Mutations
const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`;

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Helper to extract the most useful error message from GraphQL errors
const getErrorMessage = (error: ApolloError | Error | unknown): string => {
  if (error instanceof ApolloError) {
    // Try to find the most specific error message
    const graphQLErrors = error.graphQLErrors;
    if (graphQLErrors && graphQLErrors.length > 0) {
      // Get the innermost error message if available
      const firstError = graphQLErrors[0];
      if (firstError.extensions?.exception?.message) {
        return firstError.extensions.exception.message;
      }
      return firstError.message || 'GraphQL error occurred';
    }
    
    if (error.networkError) {
      return `Network error: ${error.networkError.message}`;
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unknown error occurred';
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [registerMutation] = useMutation(REGISTER_MUTATION);

  // Check for existing token on startup
  useEffect(() => {
    const loadUserFromLocalStorage = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Failed to load user data from localStorage', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserFromLocalStorage();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Login attempt with:', { email });
      const { data } = await loginMutation({
        variables: { 
          input: { email, password }
        },
      });
      
      if (data?.login) {
        setUser(data.login.user);
        setToken(data.login.token);
        
        // Store in localStorage
        localStorage.setItem('token', data.login.token);
        localStorage.setItem('user', JSON.stringify(data.login.user));
        
        router.push('/');
      }
    } catch (err: any) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (registerData: RegisterInput) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Register attempt with:', { email: registerData.email, name: registerData.name });
      
      const { data } = await registerMutation({
        variables: { input: registerData },
      });
      
      if (data?.register) {
        setUser(data.register.user);
        setToken(data.register.token);
        
        // Store in localStorage
        localStorage.setItem('token', data.register.token);
        localStorage.setItem('user', JSON.stringify(data.register.user));
        
        router.push('/');
      }
    } catch (err: any) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
