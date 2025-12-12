# This is the main entry point for our core backend service.
# It initializes the FastAPI application, includes the API routers,
# and sets up any middleware (like CORS).

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

# Import the API router from our endpoints file.
from .api.v1.endpoints import experiments

# Initialize the FastAPI app.
app = FastAPI(
    title="Foundry Research Workbench API",
    description="The core API for managing research projects, experiments, and models.",
    version="1.0.0",
)

# --- Middleware Setup ---
# Middleware are functions that process every request before it hits the endpoint
# and every response before it's sent back.

# Configure CORS (Cross-Origin Resource Sharing) to allow our frontend
# (running on a different port/domain) to make requests to this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://foundry.ai"], # Allow our dev and prod frontends
    allow_credentials=True,
    allow_methods=["*"], # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],
)

# --- API Routers ---
# We include the router from our 'experiments' endpoint file.
# Any request to "/experiments/..." will be handled by the code in that file.
app.include_router(
    experiments.router, 
    prefix="/experiments", 
    tags=["Experiments"]
)

# You would add more routers here for other parts of the API.
# from .api.v1.endpoints import users, models
# app.include_router(users.router, prefix="/users", tags=["Users"])
# app.include_router(models.router, prefix="/models", tags=["Models"])


# --- Health Check Endpoint ---
# This is a simple endpoint that monitoring services can hit to verify
# that the application is alive and running.
@app.get("/health", tags=["Health"])
def health_check():
    """
Returns a simple health check status.
    """
    return {"status": "ok"}

# In a real app, you would also have startup and shutdown events to, for example,
# initialize a database connection pool when the app starts.
# @app.on_event("startup")
# async def startup_event():
#     init_database_connections()