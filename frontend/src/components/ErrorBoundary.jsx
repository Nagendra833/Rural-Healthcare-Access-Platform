import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application Error Caught by Boundary:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch {}
    window.location.href = '/login';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-accent flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-elevated border border-gray-100 p-6 max-w-md w-full text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle size={28} />
            </div>

            <h2 className="text-xl font-bold text-gray-900">Something went wrong</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              We encountered an unexpected issue while loading this page. Clearing your cached session usually resolves it.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary flex items-center justify-center gap-2 text-sm py-2.5"
              >
                <RefreshCw size={15} /> Reload Page
              </button>

              <button
                onClick={this.handleReset}
                className="btn-secondary flex items-center justify-center gap-2 text-sm py-2.5"
              >
                <Home size={15} /> Return to Login
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
