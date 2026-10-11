import { Outlet, Link, useNavigate, useLocation, Navigate, ScrollRestoration } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { formatDistanceToNow } from 'date-fns';
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead } from '../../services/notifications.service';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user || user.role !== 'admin') return;

    let socket;

    const initNotifications = async () => {
      try {
        const [notifsData, countData] = await Promise.all([
          getNotifications(),
          getUnreadCount()
        ]);
        if (notifsData.success) {
          setNotifications(notifsData.data);
        }
        if (countData.success) {
          setUnreadCount(countData.count);
        }

        const socketUrl = import.meta.env.VITE_SOCKET_URL 
          || (import.meta.env.VITE_API_URL && !import.meta.env.VITE_API_URL.startsWith('/')
              ? import.meta.env.VITE_API_URL.replace('/api', '')
              : (import.meta.env.DEV ? 'http://localhost:5000' : null));

        if (socketUrl) {
          socket = io(socketUrl, {
            withCredentials: true
          });

          socket.on('new_notification', (notification) => {
            setNotifications(prev => [notification, ...prev]);
            setUnreadCount(prev => prev + 1);
          });
        }

      } catch (error) {
        console.error('Failed to initialize notifications:', error);
      }
    };

    initNotifications();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user]);

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      try {
        await markAsRead(notification._id);
        setNotifications(prev => prev.map(n => n._id === notification._id ? { ...n, read: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
      } catch (err) {
        console.error('Failed to mark as read', err);
      }
    }
    
    setIsNotificationsOpen(false);
    if (notification.type === 'new_enquiry') {
      navigate('/admin/enquiries');
    } else if (notification.type === 'new_custom_request') {
      navigate('/admin/custom-requests');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all as read', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="bg-background font-body-md text-body-md text-on-surface min-h-screen">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-on-surface/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={closeMobileMenu}
          aria-hidden="true"
        ></div>
      )}

      <aside className={`fixed left-0 top-0 h-full w-64 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="px-6 py-6 pb-4 flex items-center justify-between">
            <div>
              <div className="tracking-wide font-headline-sm text-headline-sm text-on-surface">GURU TAILORING</div>
              <div className="font-label-sm text-label-sm uppercase tracking-wider text-primary mt-1">Atelier Studio Desk</div>
            </div>
            <button 
              className="lg:hidden p-1 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
              onClick={closeMobileMenu}
              aria-label="Close navigation menu"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-3 mt-2">
            <Link 
              to="/admin/dashboard"
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-label-md text-label-md transition-colors ${isActive('/admin/dashboard') ? 'bg-primary-container text-on-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
              onClick={closeMobileMenu}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
                <span>Dashboard</span>
              </div>
            </Link>
            <Link 
              to="/admin/enquiries"
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-label-md text-label-md transition-colors ${isActive('/admin/enquiries') ? 'bg-primary-container text-on-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
              onClick={closeMobileMenu}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">inbox</span>
                <span>Enquiries</span>
              </div>
            </Link>
            <Link 
              to="/admin/custom-requests"
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-label-md text-label-md transition-colors ${isActive('/admin/custom-requests') ? 'bg-primary-container text-on-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
              onClick={closeMobileMenu}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">stylus</span>
                <span>Custom Requests</span>
              </div>
            </Link>
            <Link 
              to="/admin/designs"
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-label-md text-label-md transition-colors ${isActive('/admin/designs') ? 'bg-primary-container text-on-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
              onClick={closeMobileMenu}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">styler</span>
                <span>Designs</span>
              </div>
            </Link>
            <Link 
              to="/admin/services"
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-label-md text-label-md transition-colors ${isActive('/admin/services') ? 'bg-primary-container text-on-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
              onClick={closeMobileMenu}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">straighten</span>
                <span>Services</span>
              </div>
            </Link>
            <Link 
              to="/admin/work"
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-label-md text-label-md transition-colors ${isActive('/admin/work') ? 'bg-primary-container text-on-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
              onClick={closeMobileMenu}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">auto_awesome_motion</span>
                <span>Our Work</span>
              </div>
            </Link>
            <div className="h-[1px] bg-surface-container-highest my-3 mx-2"></div>
            <Link 
              to="/admin/settings"
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-label-md text-label-md transition-colors ${isActive('/admin/settings') ? 'bg-primary-container text-on-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
              onClick={closeMobileMenu}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">settings</span>
                <span>Settings</span>
              </div>
            </Link>
            <Link 
              to="/"
              className="flex items-center justify-between px-3 py-2.5 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
              onClick={closeMobileMenu}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                <span>View Website</span>
              </div>
            </Link>
          </nav>
        </div>
        <div className="p-3 border-t border-surface-container">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-label-md text-label-md text-error hover:bg-error-container hover:text-on-error-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      <div className="lg:pl-64">
        <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface/85 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-30 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-2 font-label-md text-label-md">
            <button 
              className="lg:hidden p-2 -ml-2 mr-1 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <span className="text-on-surface-variant hidden sm:inline">Admin</span>
            <span className="text-outline-variant font-body-sm text-body-sm hidden sm:inline">/</span>
            <span className="text-on-surface font-semibold capitalize truncate max-w-[120px] sm:max-w-none">
              {location.pathname.split('/').pop() || 'Dashboard'}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative">
              <button 
                className={`relative p-2 rounded-full transition-colors flex items-center justify-center ${isNotificationsOpen ? 'bg-surface-container text-on-surface' : 'text-on-surface-variant hover:bg-surface-container'}`} 
                type="button"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                aria-label="Toggle notifications"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-error border-[1.5px] border-surface"></span>
                )}
              </button>
              
              {isNotificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-xs sm:w-80 bg-surface-container-lowest border border-outline-variant/30 shadow-lg rounded-xl z-50 flex flex-col origin-top-right animate-in fade-in zoom-in-95 duration-200 max-h-[calc(100dvh-5rem)] sm:max-h-[85vh]">
                    <div className="px-4 py-3 border-b border-outline-variant/20 bg-surface-container-low/30 flex justify-between items-center shrink-0">
                      <h3 className="font-headline-sm text-sm font-semibold text-on-surface">Notifications</h3>
                      {unreadCount > 0 && (
                        <button onClick={handleMarkAllAsRead} className="text-[11px] font-medium text-primary hover:underline">Mark all read</button>
                      )}
                    </div>
                    
                    <div className="overflow-y-auto flex-1">
                      {notifications.length === 0 ? (
                        <div className="p-8 flex flex-col items-center justify-center text-center gap-3 bg-surface">
                          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                            <span className="material-symbols-outlined text-[24px]">notifications_paused</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-sm text-on-surface">All caught up!</span>
                            <span className="font-body-sm text-xs text-on-surface-variant">You have no new notifications.</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col divide-y divide-outline-variant/10">
                          {notifications.map(notification => (
                            <div 
                              key={notification._id} 
                              onClick={() => handleNotificationClick(notification)}
                              className={`p-4 flex gap-3 cursor-pointer hover:bg-surface-container-low/50 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
                            >
                              <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!notification.read ? 'bg-primary' : 'bg-transparent'}`}></div>
                              <div className="flex flex-col gap-1">
                                <span className={`text-sm ${!notification.read ? 'font-semibold text-on-surface' : 'font-medium text-on-surface-variant'}`}>
                                  {notification.title}
                                </span>
                                <span className="text-xs text-on-surface-variant line-clamp-2">
                                  {notification.message}
                                </span>
                                <span className="text-[10px] text-outline mt-1 font-medium">
                                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-3 pl-3 py-1 pr-1.5 rounded-full bg-surface-container border border-surface-container-high hidden sm:flex">
              <div className="flex flex-col text-right">
                <span className="font-label-sm text-label-sm text-on-surface leading-tight font-medium">Guru Tailoring</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant text-[10px] leading-tight">Master Tailor & Admin</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="w-full pt-16 bg-surface min-h-screen px-4 lg:px-8 py-6">
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default AdminLayout;
