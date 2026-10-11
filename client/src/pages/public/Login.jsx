import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  if (!authLoading && user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/account'} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(email, password);
      if (response.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/account');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-md w-full space-y-8 bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/50">
        <div className="text-center">
          <h2 className="text-headline-md font-headline-md text-on-surface">Sign In</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-error/10 text-error rounded-md text-body-sm font-medium">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-label-md font-medium text-on-surface-variant mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-outline-variant rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-surface"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-label-md font-medium text-on-surface-variant mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 border border-outline-variant rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-surface"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-label-lg font-medium text-on-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
          
          <div className="text-center mt-4">
            <span className="text-body-sm text-on-surface-variant">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Create one
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
