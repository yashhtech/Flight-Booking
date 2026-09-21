import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-6">
          <div className="max-w-md w-full bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl text-center">
            <span className="text-5xl mb-4 block">✈️</span>
            <h2 className="text-2xl font-bold text-sky-400 mb-2">Something went wrong</h2>
            <p className="text-slate-300 text-sm mb-6">
              An unexpected error occurred. Please refresh or return to the home page.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReload}
                className="px-6 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 font-semibold text-white transition"
              >
                Reload Page
              </button>
              <a
                href="/"
                className="px-6 py-2.5 rounded-full bg-slate-700 hover:bg-slate-600 font-semibold text-slate-200 transition"
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
