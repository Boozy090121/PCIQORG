# Re-Org v2

A React application for managing organizational restructuring and implementation tracking.

## Features

- Organization chart visualization and management
- Phase-based implementation tracking
- Focus factory management
- Personnel and role management
- Transition plan creation and tracking
- Real-time data persistence with Firebase
- Authentication and user management

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase account and project

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Re-Orgv2
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## Development

Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Building for Production

Build the application for production:
```bash
npm run build
```

The production build will be available in the `dist` directory.

## Project Structure

```
Re-Orgv2/
├── public/
│   ├── index.html
│   └── styles.css
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Core/
│   │   └── Implementation/
│   ├── features/
│   │   ├── Auth/
│   │   ├── Organization/
│   │   └── Implementation/
│   ├── services/
│   │   └── firebaseService.js
│   ├── store.js
│   └── index.js
├── .babelrc
├── .gitignore
├── package.json
├── README.md
└── webpack.config.js
```

## Technologies Used

- React
- Redux Toolkit
- Material-UI
- Firebase
- React Router
- React Flow Renderer
- Webpack
- Babel

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 