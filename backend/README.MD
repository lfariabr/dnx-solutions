# Backend documentation

## Setup

1. First we'll create folders
mkdir -p backend shared docs

2. We'll set up the backend Node.js project 
cd backend
npm init -y

3. Then we'll install the required dependencies
npm install express@4.18.2
npm install @apollo/server graphql
npm install jsonwebtoken redis mongoose dotenv cors

4. Development dependencies:
npm install --save-dev typescript ts-node nodemon @types/express @types/node

## Typescript and initial server architecture

1. Initialize Typescript
npx tsc --init

2. Create the initial server architecture
mkdir -p src/models src/resolvers src/schemas src/controllers src/middleware src/utils src/config

3. Create env variables file
touch .env

4. Update the scripts in package.json for development
npm pkg set scripts.start="node dist/index.js" scripts.dev="nodemon --exec ts-node src/index.ts" scripts.build="tsc"

5. Create our main server file
touch src/index.ts

6. And finally, a basic config file
touch src/config/config.ts

## Executing the files

1. Created environment variables in `.env`
echo "PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret_key_change_in_production
REDIS_URL=redis://localhost:6379" > .env

2. Implemented configuration loading in `src/config/config.ts`
backend/src/config/config.ts

3. Created basic GraphQL schema in `src/schemas/typeDefs.ts`
mkdir -p src/schemas
cat > src/schemas/typeDefs.ts << 'EOF'
export const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;
EOF

4. Implemented resolvers in `src/resolvers/index.ts`
mkdir -p src/resolvers
cat > src/resolvers/resolvers.ts << 'EOF'
export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
EOF

5. Set up the main server in `src/index.ts` with:
- Express application
- Apollo Server integration
- CORS support
- Health check endpoint
- Graceful shutdown handling

6. Install missing dependencies
npm install @apollo/server@^4.0.0

7. To start the development server:
```bash
npm run dev
```

## Setting up MongoDB

1. Create a MongoDB database
mkdir -p src/db
touch src/db/connection.ts

2. Implement MongoDB connection in `src/db/connection.ts`
backend/src/db/connection.ts

3. Update `src/index.ts` to connect to MongoDB
backend/src/index.ts
import { connectDB } from './db/connection';

MongoDB Setup Options:
- Local: Use MongoDB Community Edition installed on your machine
- Cloud: Use MongoDB Atlas for a cloud-hosted database
  - Create an account at mongodb.com
  - Create a new cluster
  - Add your IP to the access list
  - Create a database user
  - Get your connection string and update .env

## Creating datamodels (projects, articles, etc)

1. First, let's create the Project model:
mkdir -p src/models
cat > src/models/Project.ts

2. Create the Article model:
mkdir -p src/models
cat > src/models/Article.ts

3. Create the User model:
mkdir -p src/models
cat > src/models/User.ts + Authentication

4. Install bycrypt, mongoose and bcryptjs
npm install bcryptjs mongoose
npm install --save-dev @types/bcryptjs

## Expand graphQL schema/resolvers

1. Reorganize schema structure
mkdir -p src/schemas/types

2. Create individual type definitions
mkdir -p src/schemas/types

3. Create type definitions for projects
mkdir -p src/schemas/types/projectTypes.ts

4. Create type definitions for articles
mkdir -p src/schemas/types/articleTypes.ts

5. Create type definitions for users
mkdir -p src/schemas/types/userTypes.ts

6. Update typeDefs.ts to import and use the new type definitions

7. Create resolver folders and files for each entity:
- Implement resolvers for projects, articles and users
mkdir -p src/resolvers/projects src/resolvers/articles src/resolvers/users
(or)
mkdir src/resolvers/projects
mkdir src/resolvers/articles
mkdir src/resolvers/users

## Implement authentication with JWT
1. Created user resolvers:
   - User queries (`src/resolvers/users/queries.ts`)
   - User mutations (`src/resolvers/users/mutations.ts`)

2. Implemented authentication middleware (`src/middleware/auth.ts`):
   - JWT token verification
   - User extraction from token
   - Role-based access control

3. Added authentication context to Apollo Server:
   - User information available in resolvers
   - Protected mutations requiring authentication

4. Created auth utilities (`src/utils/authUtils.ts`):
   - Helper functions to check authentication
   - Helper functions to check role permissions

5. Updated project and article mutations to require admin authentication

Authentication flow:
1. User registers with name, email, and password
2. Password is hashed before saving to the database
3. User logs in with email and password
4. Server verifies credentials and returns a JWT token
5. Client includes the token in the Authorization header for authenticated requests
6. Server verifies the token and adds the user to the context
7. Resolvers check the context for authentication and permissions

Testing authentication:
- Register a user: mutation { register(input: { name: "Admin User", email: "luis@luis.com", password: "xxxxxxx" }) { token user { id name email } } }
- Login: mutation { login(input: { email: "test@test.com", password: "test" }) { token user { id name email } } }
- Use the token in the HTTP headers: { "Authorization": "Bearer YOUR_TOKEN_HERE" }
EOF

## Testing endpoints and auth
1. Registering an admin User
```
mutation RegisterAdmin {
  register(input: {
    name: "Admin User"
    email: "admin@example.com"
    password: "securePassword123"
  }) {
    token
    user {
      id
      name
      email
      role
      createdAt
    }
  }
}
```

2. Registering a normal user
```
mutation RegisterUser {
  register(input: {
    name: "Regular User"
    email: "user@example.com"
    password: "userPassword123"
  }) {
    token
    user {
      id
      name
      email
      role
      createdAt
    }
  }
}
```

3. Create a script to convert a user to admin
backend/src/scripts/makeAdmin.ts
```
npx ts-node src/scripts/makeAdmin.ts admin@example.com
```

4. Login as admin 
```
query Me {
  me {
    id
    name
    email
    role
    lastLogin
  }
}
```

Then, in Apollo Explorer:
Click on "Headers" at the bottom of the screen
Add a header:
```
{ "Authorization": "Bearer YOUR_TOKEN_HERE" }
```
