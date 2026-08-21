'use client';
import { Component, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-xl border border-border bg-surface p-8 text-center">
          <div className="mb-4 rounded-full bg-danger/10 p-3">
            <AlertTriangle className="h-8 w-8 text-danger" />
          </div>
          <h2 className="mb-2 font-display text-xl font-semibold text-ink">
            Something went wrong
          </h2>
          <p className="mb-6 max-w-md text-sm text-muted">
            {this.state.error?.message ||
              'An unexpected error occurred. Please try again.'}
          </p>
          <Button onClick={this.handleReset} variant="primary">
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
