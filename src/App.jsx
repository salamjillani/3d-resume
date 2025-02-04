//src/App.jsx
import { ErrorBoundary } from 'react-error-boundary';
import PropTypes from 'prop-types';
import Hero from './sections/Hero';
import Navbar from './sections/Navbar';

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
      <Navbar />
 <Hero />
    </ErrorBoundary>
  );
}

export default App;
