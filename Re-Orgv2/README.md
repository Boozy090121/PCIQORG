# Re-Org Project

A React application for managing organizational transitions and training needs.

## Project Structure

```
src/
├── app/                    # Application core setup
│   ├── store.js           # Redux store configuration
│   ├── middleware.js      # Redux middleware
│   └── routes.js          # Route definitions
├── components/            # Reusable UI components
│   ├── Core/             # Core components (ErrorBoundary, LoadingSpinner)
│   ├── Layout/           # Layout components
│   └── UI/               # UI components (buttons, inputs, etc.)
├── features/             # Feature-specific code
│   ├── Organization/     # Organization management features
│   ├── Training/         # Training management features
│   └── PhaseManagement/  # Phase management features
├── models/               # Data models and types
├── services/             # API and external service integrations
├── styles/               # Global styles and theme
└── __tests__/            # Test files
```

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Styling Approach

This project uses a combination of:
- Material-UI for component library
- Emotion for custom styling
- CSS modules for component-specific styles

## Testing

- Jest for unit testing
- React Testing Library for component testing
- Test files should be placed in `__tests__` directories
- Test files should match the name of the file being tested (e.g., `Component.test.js`)

## State Management

- Redux Toolkit for global state management
- React Query for server state management
- Local state with React hooks when appropriate

## Code Style

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Follow React best practices and hooks guidelines

## Deployment

The application is deployed on Netlify. The build process:
1. Runs `npm run build`
2. Publishes the `build` directory
3. Handles client-side routing with redirects

## Environment Variables

Required environment variables:
- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_FIREBASE_STORAGE_BUCKET`
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
- `REACT_APP_FIREBASE_APP_ID`
- `REACT_APP_FIREBASE_MEASUREMENT_ID`

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

[Add your license information here] 