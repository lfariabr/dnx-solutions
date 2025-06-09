import { ApolloClient, InMemoryCache, HttpLink, from, ApolloLink, NormalizedCacheObject } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';

// Create a function to build Apollo Client with proper error handling and retry logic
export function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  // Error handling link for better debugging
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.group('GraphQL Errors:');
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations
          )}, Path: ${path}, Extensions: ${JSON.stringify(extensions)}`
        );
      });
      console.groupEnd();
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  // Auth link for adding token to requests
  const authLink = new ApolloLink((operation, forward) => {
    let token = null;
    if (typeof window !== 'undefined') {
      try {
        // First try to get token from localStorage
        token = localStorage.getItem('token');
        
        // If not found in localStorage, try to get from cookies
        if (!token) {
          const cookies = document.cookie.split(';').reduce((cookies, cookie) => {
            const [name, value] = cookie.trim().split('=');
            cookies[name] = value;
            return cookies;
          }, {} as Record<string, string>);
          
          token = cookies.token || null;
        }
      } catch (e) {
        console.error('Error accessing token storage:', e);
      }
    }

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        // Ensure proper content type for all requests
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }));

    return forward(operation);
  });

  // Retry link for handling transient network issues
  const retryLink = new RetryLink({
    delay: {
      initial: 300, // First retry after 300ms
      max: 3000,    // Maximum delay between retries (3s)
      jitter: true, // Add randomness to delays to prevent thundering herd
    },
    attempts: {
      max: 3,       // Maximum number of retries
      retryIf: (error) => {
        // Only retry on network errors, not auth failures
        const shouldRetry = !!error && error.statusCode !== 401;
        console.log(`Retry decision for error: ${shouldRetry}`, error);
        return shouldRetry;
      },
    },
  });

  // HTTP link with proper CORS and credentials
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
    credentials: 'include',
    // Force use of fetch polyfill for consistent behavior
    fetch: (uri: RequestInfo, options?: RequestInit) => {
      return fetch(uri, {
        ...options,
        // Ensure CORS is enabled and credentials are sent
        mode: 'cors',
        credentials: 'include',
      });
    },
  });

  // Combine all links
  const link = from([errorLink, retryLink, authLink, httpLink]);

  // Create and return the Apollo Client
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
    connectToDevTools: process.env.NODE_ENV === 'development',
  });
}

// Create a singleton instance of Apollo Client
export const client = createApolloClient();

// Helper function to get a new client instance for SSR if needed
export function getClient() {
  return client;
}
