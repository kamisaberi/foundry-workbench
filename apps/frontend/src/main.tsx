// This file is the root of our React application.
// Its primary job is to render the main `App` component into the HTML page.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // This is our root component.

// We often import a global CSS file here to set base styles for the entire app.
import './assets/global.css';

// In a real application, you would set up your "providers" here.
// These are components that provide application-wide context, such as:
// - State Management (Redux, Zustand)
// - Routing (React Router)
// - UI Component Library Theme (MUI, Ant Design)
// - Authentication Context

// Find the root HTML element in `index.html` where our app will be mounted.
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Fatal: The root element with ID 'root' was not found in the DOM.");
}

// ReactDOM.createRoot is the modern way to render a React application.
// It enables concurrent features for better performance.
const root = ReactDOM.createRoot(rootElement);

// The `render` method tells React to take our `App` component and turn it
// into actual DOM elements inside the `rootElement`.
root.render(
  // `React.StrictMode` is a helper that highlights potential problems in an app.
  // It doesn't render any visible UI.
  <React.StrictMode>
    {/*
      In a real app, this would be wrapped with providers, e.g.:
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    */}
    <App />
  </React.StrictMode>
);