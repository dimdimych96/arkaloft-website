import { Helmet } from 'react-helmet-async'

export function CriticalCSS() {
  return (
    <Helmet>
      <style>{`
        /* Critical CSS для быстрой загрузки */
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          line-height: 1.6;
          color: #333;
        }
        
        /* Critical layout styles */
        .min-h-screen {
          min-height: 100vh;
        }
        
        /* Critical button styles */
        .btn-primary {
          background-color: #10b981;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        
        .btn-primary:hover {
          background-color: #059669;
          transform: translateY(-1px);
        }
        
        /* Critical header styles */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        /* Critical hero styles */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          text-align: center;
          padding: 2rem;
        }
        
        /* Critical loading styles */
        .loading {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #10b981;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Critical responsive styles */
        @media (max-width: 768px) {
          .hero {
            padding: 1rem;
          }
          
          .btn-primary {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </Helmet>
  )
}
