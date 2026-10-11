import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  if (!authLoading && user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/account'} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/account');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-md w-full space-y-8 bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/50">
        <div className="text-center">
          <h2 className="text-headline-md font-headline-md text-on-surface">Create Account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-error/10 text-error rounded-md text-body-sm font-medium">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-label-md font-medium text-on-surface-variant mb-1">Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-outline-variant rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-surface"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div>
              <label className="block text-label-md font-medium text-on-surface-variant mb-1">Confirm Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 border border-outline-variant rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-surface"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-label-lg font-medium text-on-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
          
          <div className="text-center mt-4">
            <span className="text-body-sm text-on-surface-variant">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign In
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
