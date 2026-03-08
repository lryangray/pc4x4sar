'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="section-padding text-center">
            <div className="container-custom">
              <p className="text-navy-600">
                Something went wrong loading this section.{' '}
                <button
                  onClick={() => window.location.reload()}
                  className="text-rescue-orange hover:underline font-medium"
                >
                  Reload page
                </button>
              </p>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
