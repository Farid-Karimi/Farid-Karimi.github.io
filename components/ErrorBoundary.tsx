import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-8 text-center font-mono">
          <div className="border border-red-500/50 bg-red-900/10 p-6 max-w-lg w-full">
             <h1 className="text-red-500 text-xl font-bold mb-4">SYSTEM_FAILURE</h1>
             <p className="text-white text-sm mb-4">
                A critical rendering error occurred. This is usually due to malformed content data.
             </p>
             <div className="bg-black border border-border-dim p-4 text-left overflow-auto max-h-48 mb-6">
                <code className="text-xs text-red-400">
                   {this.state.error?.toString()}
                </code>
             </div>
             <a href="/" className="px-4 py-2 border border-red-500 text-red-500 text-xs uppercase hover:bg-red-500 hover:text-white transition-colors">
                RETURN_TO_SAFE_MODE
             </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;