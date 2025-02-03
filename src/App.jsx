//src/App.jsx
import { ErrorBoundary } from 'react-error-boundary';
import InteractiveResume from './components/InteractiveResume';
import PropTypes from 'prop-types';

function ErrorFallback({ error }) {
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-700">
      <p>Something went wrong:</p>
      <pre className="mt-2">{error.message}</pre>
    </div>
  );
}

ErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <InteractiveResume />
    </ErrorBoundary>
  );
}

export default App;
