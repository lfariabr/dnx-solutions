# Frontend documentation

Menu:
1. Set up Next.js project
2. Implement Apollo Client
3. Create core components and layouts using shadcn/ui
Pages:
- Login/Register/Logout
- Projects
- Articles
- Chatbot
4. GraphQL Integration: actual API queries on the pages
5. Admin Dashboard
- Admin area (to add, edit, delete projects, articles, users)
- My profile / to change password, update profile, see chatbot history
6. Login, Logout and Register test with credentials
7. Admin manage content: projects, articles and users
8. Frontend Adjustments:
- Layout with some left padding on home
- Button not appearing on "Actions"
- Error message on forms not appearing
- Navbar appear on login/register pages?

9. Relay Compiler for efficient data fetching
10. AWS setup for file storage and data storage

Done:
1. Create Section Pages: Build out the placeholder pages for Projects, Articles, and Chatbot
2. Set Up Authentication: Connect to your backend authentication endpoints

Pending:
4. Admin Dashboard: Set up the admin interface for content management

Style:
- Use shadcn/ui for components
- Use TailwindCSS for styling

References:
- Matrix Theme
- Strong heavily animated website: https://strong.dev/


## 1. Setup Next.js project
1. First we'll create folders
cd ../frontend
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir

2. Implement Apollo Client
npm install @apollo/client graphql

3. Create core components and layouts using shadcn/ui
npm install -D @shadcn/ui
npx shadcn-ui@latest init

4. Structure

frontend/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/               # Authentication routes
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (main)/               # Main public routes
│   │   │   ├── projects/
│   │   │   ├── articles/
│   │   │   └── chatbot/
│   │   └── (admin)/              # Admin dashboard routes
│   ├── components/               # React components
│   │   ├── ui/                   # UI components from shadcn
│   │   ├── layouts/              # Layout components
│   │   └── shared/               # Shared components
│   ├── lib/                      # Utility functions
│   │   ├── apollo/               # Apollo Client setup
│   │   └── auth/                 # Authentication utilities
│   └── styles/                   # Global styles
└── public/                       # Static assets

5. Create essential directories
mkdir -p src/components/ui src/lib/apollo src/app/\(auth\) src/app/\(main\) src/app/\(admin\)

6. Create new page
touch src/app/page.tsx

## 2. Implement Apollo Client

7. Implement Apollo Client
touch src/lib/apollo/client.ts

8. Implement Apollo Provider
touch src/lib/apollo/ApolloProvider.tsx

9. Implement layout and wrap it with Apollo Provider
touch src/app/layout.tsx

10. Set up shadcn/ui components 
npm install -D @shadcn/ui
npx shadcn-ui@latest init

11. Install essential components
npx shadcn@latest add button card form input sonner dialog avatar dropdown-menu

12. Create layouts
mkdir -p src/components/layouts
touch src/components/layouts/Header.tsx
touch src/components/layouts/Footer.tsx
touch src/components/layouts/MainLayout.tsx

13. Install GraphQL Type Generator
npm install -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo

14. Creating Main Layout Components
Create Header.tsx, Footer.tsx, and MainLayout.tsx in src/components/layouts

15. Implement Theme options
Create theme-provider.tsx in src/components
Create ThemeSwitcher.tsx in src/components
Create ThemeToggle.tsx in src/components

16. Update home page to use main layout
Update src/app/page.tsx

17. Run first version
- Install next-themes for theme support:
npm install next-themes

- Install lucide-react for icons:
npm install lucide-react

- Start the development server:
npm run dev

18. Create placeholder pages for Projects, Articles, and Chatbot
Create src/app/projects/page.tsx
Create src/app/articles/page.tsx
Create src/app/chatbot/page.tsx

19. Install dependencies for packages to work
npm install date-fns
npm install lucide-react

## 3. Set Up Authentication
1. First, Let's Create the Authentication Context
Create src/lib/auth/context.tsx

2. Now, with Auth contexts, create login and register pages
Create src/app/(auth)/login/page.tsx
Create src/app/(auth)/register/page.tsx

3. Implemented Apollo Client with token handling and error management

4. Adjusted schema between frontend and backend

5. Enabled proper validation rules on backend

6. Added comprehensive error handling for better dev experience

7. Added AuthProvider to wrap the app

## 4. GraphQL Integration: Create specific queries and mutations to fetch data from backend
Replace placeholder data with actual API queries

1. We created queries for projects/articles, featured projects/articles, and a single project/article in src/lib/hooks/useProjects.ts and src/lib/hooks/useArticles.ts
2. We created graphql queries/fragments in src/graphql/queries/projects and src/graphql/queries/articles
3. We created Typescript interface for project data in src/lib/graphql/types/project.types.ts and src/lib/graphql/types/article.types.ts
4. We created page listing with all projects/articles in src/app/projects/page.tsx and src/app/articles/page.tsx

## 5. Admin Dashboard
1. We created admin layout in src/app/admin/layout.tsx
2. We created admin page in src/app/admin/page.tsx
3. We created admin middleware in src/middleware.ts

## 6. Login with admin credentials
We tested login with admin credentials
- Navigate to /admin to access the dashboard
- Check that statistics are loading correctly
a. Dual Storage Strategy: Tokens are now stored in both localStorage (for client components) and cookies (for middleware/server components): 
npm install js-cookie @types/js-cookie
npm install jwt-decode
b. Proper Role Validation: The middleware now properly verifies admin roles by decoding the JWT token
c. Improved Error Handling: Better error messages and fallback mechanisms make debugging easier

## 7. Admin functionalities

a. Project Management:
- Implement forms for creating/editing projects
- Add project deletion functionality

b. Article Management:
- Create article editor with rich text support
- Implement publishing/unpublishing functionality

c. User Management: 
- Create user list view
- Add role management capabilities
- Added backend routes to exhibit users' data

