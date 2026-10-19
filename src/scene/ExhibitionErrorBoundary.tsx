import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ExhibitionErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ExhibitionErrorBoundary]', error, info);
  }

  render() {
    const { error } = this.state;
    if (error !== null) {
      return (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0d0d0d',
            color: '#f0ece4',
            fontFamily: 'Georgia, "Times New Roman", serif',
            padding: '2rem',
            textAlign: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              maxWidth: '560px',
              border: '1px solid #3a3530',
              borderRadius: '6px',
              padding: '2.5rem 2rem',
              background: '#161410',
            }}
          >
            <p
              style={{
                margin: '0 0 0.5rem',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#c0392b',
              }}
            >
              Gallery configuration error
            </p>
            <p
              style={{
                margin: '0 0 1.5rem',
                fontSize: '1.05rem',
                lineHeight: 1.55,
                color: '#f0ece4',
              }}
            >
              {error.message}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: '#9e9890',
              }}
            >
              Fix the wall colour in{' '}
              <code
                style={{
                  background: '#252220',
                  padding: '0.1em 0.4em',
                  borderRadius: '3px',
                  fontSize: '0.9em',
                  color: '#d4c9b0',
                }}
              >
                src/config/exhibition.ts
              </code>
              , then commit and push to staging to restore the gallery.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
