# This file defines the "schema" for our database tables using SQLAlchemy's ORM (Object-Relational Mapper).
# It translates Python classes into SQL database tables.

from sqlalchemy import Column, String, Integer, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel, Field
import datetime
import uuid

# The Base class that our ORM models will inherit from.
Base = declarative_base()

# --- SQLAlchemy ORM Model (for the database) ---
class Experiment(Base):
    __tablename__ = "experiments"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    status = Column(String, default="Queued")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # We store complex, unstructured data like metrics or hyperparameters as JSON.
    metrics = Column(JSON)
    hyperparameters = Column(JSON)

    # In a real app, you would have a foreign key to the user who owns this experiment.
    # owner_id = Column(String, ForeignKey("users.id"))


# --- Pydantic Schema (for the API) ---
# This defines the data shape for API requests and responses.
# It provides automatic data validation and serialization (e.g., Python object -> JSON).
# We keep these separate from the DB models to have more control over the API's public "shape".

class ExperimentMetricsSchema(BaseModel):
    accuracy: float | None = None
    loss: float | None = None

class ExperimentSchema(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    status: str
    createdAt: datetime.datetime = Field(alias="created_at") # Pydantic can map field names
    metrics: ExperimentMetricsSchema | None

    # This 'Config' class tells Pydantic it's okay to create this schema
    # from an ORM object (like our `Experiment` class above).
    class Config:
        orm_mode = True
        allow_population_by_field_name = True