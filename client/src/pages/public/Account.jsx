import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Account = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'customer')) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-[60vh] py-6 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="bg-surface-container-low rounded-2xl p-5 sm:p-8 border border-outline-variant/40 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 border-b border-outline-variant/30 pb-6 mb-6">
          <div>
            <h1 className="text-headline-lg font-headline-lg text-on-surface mb-2">My Account</h1>
            <p className="text-body-lg text-on-surface-variant">Welcome back, {user.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="min-h-[44px] px-5 py-2.5 sm:py-2 bg-surface-container-highest hover:bg-surface-container text-error rounded-md text-label-md font-medium transition-colors border border-error/20 inline-flex items-center justify-center shrink-0"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl border border-outline-variant/30">
            <h3 className="text-title-md font-title-md text-on-surface mb-4">Profile Details</h3>
            <div className="space-y-3 text-body-md text-on-surface-variant">
              <div>
                <span className="font-medium text-on-surface block mb-1">Name</span>
                {user.name}
              </div>
              <div>
                <span className="font-medium text-on-surface block mb-1">Email</span>
                {user.email}
              </div>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-xl border border-outline-variant/30">
            <h3 className="text-title-md font-title-md text-on-surface mb-4">Account Status</h3>
            <div className="space-y-3 text-body-md text-on-surface-variant">
              <div>
                <span className="font-medium text-on-surface block mb-1">Member Since</span>
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium text-on-surface block mb-1">Role</span>
                Customer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
