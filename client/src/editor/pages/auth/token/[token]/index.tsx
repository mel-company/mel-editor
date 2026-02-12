import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { validateStoreToken, saveAuthData } from '../../../../../shared/utils/auth'

export default function AuthTokenPage() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const [isValidating, setIsValidating] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setError('No token provided')
        setIsValidating(false)
        return
      }

      try {
        const authData = await validateStoreToken(token)

        // Save the new token to session storage
        saveAuthData(authData)

        console.log('Authentication successful!')
        alert('Authentication successful!')

        // Redirect to dashboard or editor
        navigate('/dashboard')

      } catch (err) {
        console.error('Token validation error:', err)
        setError(err instanceof Error ? err.message : 'Failed to validate token')
        alert('Authentication failed')
      } finally {
        setIsValidating(false)
      }
    }

    validateToken()
  }, [token, navigate])

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Validating authentication token...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Authentication Failed</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  return null // This will redirect automatically
}
