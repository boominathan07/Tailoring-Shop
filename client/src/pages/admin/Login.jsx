import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="min-h-screen flex items-center justify-center font-body-lg text-on-surface-variant">Loading...</div>;
  if (user) return <Navigate to={user.role === 'admin' ? '/admin' : '/account'} replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
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
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6">
      <div className="w-full max-w-[400px]">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-2">Guru Tailoring</h1>
          <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Atelier Management</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] p-8 sm:p-10">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-6 font-semibold">Sign In</h2>
          
          {error && (
            <div className="bg-error-container text-on-error-container p-4 rounded-lg text-body-sm font-medium mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@gurutailoring.com"
                className="h-12 bg-surface border border-outline-variant/60 rounded-lg px-4 font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 bg-surface border border-outline-variant/60 rounded-lg px-4 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="mt-2 h-12 w-full bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider rounded-lg hover:bg-primary transition-all shadow-sm active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="font-body-sm text-xs text-on-surface-variant">&copy; {new Date().getFullYear()} Guru Tailoring. Secure Admin Access.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
