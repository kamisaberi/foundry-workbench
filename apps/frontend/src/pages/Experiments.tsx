// This file builds the main UI for viewing and comparing experiments.
// It uses React for the UI, TypeScript for type safety, and makes API calls to the backend.

import React, { useState, useEffect } from 'react';
// This type would come from our shared package, ensuring frontend and backend agree on the data shape.
import { IExperiment } from '../../../../packages/shared-types/src/IExperiment';
import { ExperimentTable } from '../components/ExperimentTable';
import { Header } from '../components/Header';

const ExperimentsPage: React.FC = () => {
  // 'useState' is a React hook to manage the component's state.
  const [experiments, setExperiments] = useState<IExperiment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 'useEffect' is a hook that runs code after the component renders.
  // Here, we use it to fetch data from our API when the page loads.
  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        // In a real app, the '/api/v1/experiments' URL would be handled by the API Gateway.
        const response = await fetch('/api/v1/experiments');
        if (!response.ok) {
          throw new Error('Failed to fetch experiments from the server.');
        }
        const data: IExperiment[] = await response.json();
        setExperiments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiments();
  }, []); // The empty array `[]` means this effect runs only once.

  const handleRunNewExperiment = () => {
    // In a real app, this would open a modal or navigate to a new page
    // to configure and launch a new training job.
    alert('Starting a new experiment...');
  };

  return (
    <div className="experiments-page">
      <Header title="Research Experiments" />
      <div className="page-content">
        <div className="toolbar">
          <button onClick={handleRunNewExperiment}>Run New Experiment</button>
        </div>

        {/* We conditionally render the UI based on the loading and error state */}
        {isLoading && <p>Loading experiments...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!isLoading && !error && (
          <ExperimentTable experiments={experiments} />
        )}
      </div>
    </div>
  );
};

export default ExperimentsPage;