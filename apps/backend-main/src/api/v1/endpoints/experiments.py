# This file defines the API endpoints for managing experiments.
# It uses FastAPI, a modern, high-performance Python web framework.

from fastapi import APIRouter, HTTPException
from typing import List
import uuid
import datetime

# This would be a Pydantic model, likely mirroring the TypeScript interface
# to ensure data consistency.
from ....db.models import ExperimentSchema

router = APIRouter()

# --- MOCK DATABASE ---
# In a real application, this data would come from a PostgreSQL database
# managed by SQLAlchemy (defined in `db/session.py` and `db/models.py`).
MOCK_EXPERIMENTS = [
    {
        "id": str(uuid.uuid4()),
        "name": "ResNet50_Baseline_Run",
        "status": "Completed",
        "createdAt": datetime.datetime.utcnow().isoformat(),
        "metrics": {"accuracy": 0.92, "loss": 0.15},
    },
    {
        "id": str(uuid.uuid4()),
        "name": "MoCA-NAS_Discovery_Job_1",
        "status": "Completed",
        "createdAt": datetime.datetime.utcnow().isoformat(),
        "metrics": {"accuracy": 0.95, "loss": 0.09},
    },
    {
        "id": str(uuid.uuid4()),
        "name": "CAFT_Fine_Tune_ViT",
        "status": "Running",
        "createdAt": datetime.datetime.utcnow().isoformat(),
        "metrics": {"accuracy": None, "loss": None},
    },
]

@router.get("/", response_model=List[ExperimentSchema])
async def get_all_experiments():
    """
This endpoint is called by the frontend's `useEffect` hook.
It retrieves a list of all experiments for the current user.
    """
    # In a real app, this would be a database query:
    # db_experiments = db.query(Experiment).filter(Experiment.owner_id == current_user.id).all()
    return MOCK_EXPERIMENTS


@router.post("/", status_code=202)
async def create_new_experiment(config: dict):
    """
This endpoint is called when a user clicks "Run New Experiment".
It doesn't run the job directly. Instead, it publishes a message
to a message queue (like RabbitMQ or Redis Pub/Sub) for the
job-runner service to pick up. This is crucial for scalability.
    """
    job_id = str(uuid.uuid4())
    print(f"Received new experiment config. Publishing job {job_id} to the queue.")

    # In a real app:
    # message_queue.publish('experiment_jobs', {'job_id': job_id, 'config': config})
    # db.add(Experiment(id=job_id, status='Queued', ...))
    # db.commit()

    return {"message": "Experiment has been queued successfully.", "job_id": job_id}