// This file sets up our API Gateway using Node.js and the Express framework.
// Its purpose is to be the single entry point for all frontend API calls.
// It handles authentication and proxies requests to the correct internal microservice.

import express, { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 3001; // The gateway runs on a different port from the frontend

// --- Authentication Middleware ---
// This is a simplified function that would check for a valid session cookie or JWT token.
const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  // In a real app, you would validate the token against a database or auth service.
  if (authorization && authorization.startsWith('Bearer valid_token')) {
    console.log('Gateway: User authenticated successfully.');
    // The user is authenticated, so we can proceed to the proxy.
    next();
  } else {
    console.log('Gateway: Authentication failed.');
    // If not authenticated, we block the request.
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// --- Route Definitions & Proxying ---

// We define the locations of our internal microservices.
// In a real Kubernetes environment, these would be internal DNS names like `http://backend-main.default.svc.cluster.local`.
const BACKEND_MAIN_URL = 'http://localhost:8000'; // The Python/FastAPI service
const JOB_RUNNER_URL = 'http://localhost:8001'; // The Job Runner service (hypothetical)

// Any request to `/api/v1/...` should be authenticated and then proxied to our main backend service.
app.use(
  '/api/v1',
  authenticateUser, // First, run our authentication middleware.
  createProxyMiddleware({
    target: BACKEND_MAIN_URL,
    changeOrigin: true, // Recommended for virtual hosting
    // We rewrite the path to remove the `/api/v1` prefix before forwarding it.
    pathRewrite: {
      '^/api/v1': '',
    },
  })
);

// We could add more routes here for other services.
// For example, a route to submit a job directly to the job runner.
// app.use('/api/jobs', authenticateUser, createProxyMiddleware({ target: JOB_RUNNER_URL, ... }));


// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`API Gateway is running on http://localhost:${PORT}`);
});