// This file is the "single source of truth" for the structure of our data.
// It's a TypeScript interface that defines the shape of an 'Experiment' object.
// Both the frontend (TypeScript) and backend (via Pydantic models that mirror this) will use this definition.
// This prevents common bugs where the frontend expects a field that the backend no longer sends.

export interface IExperimentMetrics {
  accuracy?: number;
  loss?: number;
  precision?: number;
  recall?: number;
}

export interface IExperiment {
  // A unique identifier for the experiment, usually a UUID.
  id: string;

  // A human-readable name for the experiment.
  name: string;

  // The current status of the experiment.
  // Using a specific set of strings (a "union type") is better than a generic `string`.
  status: 'Queued' | 'Running' | 'Completed' | 'Failed';

  // The timestamp when the experiment was created, in ISO 8601 format.
  createdAt: string;

  // The metrics recorded for this experiment. It's optional because a running
  // experiment won't have final metrics yet.
  metrics: IExperimentMetrics | null;

  // We can add more fields here as the application grows, for example:
  // ownerId: string;
  // gitCommitHash: string;
  // modelArtifactUrl: string;
}