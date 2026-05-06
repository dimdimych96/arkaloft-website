import React from 'react'

type ErrorBoundaryState = { hasError: boolean; error?: unknown }

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 text-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Произошла ошибка</h1>
            <p className="text-gray-600 mb-4">Попробуйте обновить страницу или вернуться позже.</p>
            <button className="btn-primary" onClick={() => window.location.reload()}>Обновить страницу</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}


