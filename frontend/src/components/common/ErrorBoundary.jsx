import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught React Error in Boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-cream p-6 text-center">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-4">
            <h2 className="text-xl font-bold text-red-700">Something went wrong</h2>
            <p className="text-xs text-gray-600">
              An unexpected error occurred while rendering this page:
            </p>
            <div className="p-3 bg-gray-100 rounded-lg text-left text-xs font-mono text-red-600 overflow-x-auto max-h-32">
              {this.state.error?.toString()}
            </div>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null, errorInfo: null });
                window.location.href = '/';
              }}
              className="px-6 py-2.5 bg-brand-700 text-white font-bold text-xs uppercase rounded-xl hover:bg-brand-800"
            >
              RELOAD WEBSITE
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
