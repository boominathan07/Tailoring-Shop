import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDashboardStats } from '../../services/admin.service';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        if (data.success) {
          setStats(data.stats);
        } else {
          setError('Failed to load statistics');
        }
      } catch (err) {
        setError('Error connecting to server');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col gap-8 max-w-6xl">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col gap-2">
        <h1 className="font-display-sm text-3xl font-bold tracking-tight text-on-surface">Dashboard</h1>
        <p className="font-body-md text-on-surface-variant max-w-2xl leading-relaxed">
          Welcome back. Here's an overview of your tailoring studio.
        </p>
      </div>

      {/* 5. STUDIO OVERVIEW / WELCOME PANEL */}
      <section className="relative overflow-hidden bg-primary-container rounded-2xl shadow-sm border border-primary/20 p-8 flex flex-col justify-center">
        <div className="relative z-10 flex flex-col gap-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary w-fit font-label-sm uppercase tracking-widest text-[10px] font-bold">
            <span className="material-symbols-outlined text-[14px]">styler</span>
            Atelier Studio
          </div>
          <h2 className="font-display-sm text-2xl font-semibold text-on-primary-container">Guru Tailoring</h2>
          <p className="font-body-md text-on-primary-container/80 text-lg leading-relaxed">
            Crafted with precision. Designed around every client.
          </p>
        </div>
        <span className="material-symbols-outlined absolute -right-4 -bottom-10 text-[180px] text-primary/5 select-none pointer-events-none transform -rotate-12">
          cut
        </span>
      </section>

      {/* 2. OVERVIEW STAT CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/40 p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Total Customers</span>
            <span className="material-symbols-outlined text-primary text-[22px]">group</span>
          </div>
          <div className="flex flex-col gap-1">
            {loading ? (
              <span className="font-display-sm text-3xl font-bold text-on-surface text-opacity-50 animate-pulse">...</span>
            ) : error ? (
              <span className="font-display-sm text-3xl font-bold text-on-surface text-opacity-50">--</span>
            ) : (
              <span className="font-display-sm text-3xl font-bold text-on-surface">{stats?.totalCustomers || 0}</span>
            )}
            <span className="font-body-sm text-xs text-on-surface-variant/70 italic">
              {error ? 'Stats currently unavailable' : 'Registered customer accounts'}
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/40 p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Total Designs</span>
            <span className="material-symbols-outlined text-primary text-[22px]">styler</span>
          </div>
          <div className="flex flex-col gap-1">
            {loading ? (
              <span className="font-display-sm text-3xl font-bold text-on-surface text-opacity-50 animate-pulse">...</span>
            ) : error ? (
              <span className="font-display-sm text-3xl font-bold text-on-surface text-opacity-50">--</span>
            ) : (
              <span className="font-display-sm text-3xl font-bold text-on-surface">{stats?.totalDesigns || 0}</span>
            )}
            <span className="font-body-sm text-xs text-on-surface-variant/70 italic">
              {error ? 'Stats currently unavailable' : 'Published portfolio designs'}
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/40 p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Pending Requests</span>
            <span className="material-symbols-outlined text-primary text-[22px]">pending_actions</span>
          </div>
          <div className="flex flex-col gap-1">
            {loading ? (
              <span className="font-display-sm text-3xl font-bold text-on-surface text-opacity-50 animate-pulse">...</span>
            ) : error ? (
              <span className="font-display-sm text-3xl font-bold text-on-surface text-opacity-50">--</span>
            ) : (
              <span className="font-display-sm text-3xl font-bold text-on-surface">{stats?.pendingRequests || 0}</span>
            )}
            <span className="font-body-sm text-xs text-on-surface-variant/70 italic">
              {error ? 'Stats currently unavailable' : 'Unread custom requests'}
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/40 p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Enquiries</span>
            <span className="material-symbols-outlined text-primary text-[22px]">inbox</span>
          </div>
          <div className="flex flex-col gap-1">
            {loading ? (
              <span className="font-display-sm text-3xl font-bold text-on-surface text-opacity-50 animate-pulse">...</span>
            ) : error ? (
              <span className="font-display-sm text-3xl font-bold text-on-surface text-opacity-50">--</span>
            ) : (
              <span className="font-display-sm text-3xl font-bold text-on-surface">{stats?.enquiries || 0}</span>
            )}
            <span className="font-body-sm text-xs text-on-surface-variant/70 italic">
              {error ? 'Stats currently unavailable' : 'Total customer enquiries'}
            </span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 4. RECENT ACTIVITY / OVERVIEW */}
        <section className="lg:col-span-2 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/40 overflow-hidden flex flex-col h-full">
          <div className="px-8 py-6 border-b border-outline-variant/30 bg-surface-container-low/20">
            <h2 className="font-headline-sm text-lg font-semibold text-on-surface flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[22px] text-primary">history</span>
              Recent Activity
            </h2>
          </div>
          <div className="flex-1 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-surface-container/50 flex items-center justify-center mb-5 border border-outline-variant/30">
              <span className="material-symbols-outlined text-[32px] text-outline-variant">notifications_paused</span>
            </div>
            <h3 className="font-headline-sm text-base font-medium text-on-surface mb-2">No recent activity</h3>
            <p className="font-body-sm text-on-surface-variant max-w-sm leading-relaxed text-sm">
              Activity will appear here when new requests, orders, or enquiries are received.
            </p>
          </div>
        </section>

        {/* 3. QUICK ACTIONS */}
        <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/40 overflow-hidden flex flex-col h-full">
          <div className="px-8 py-6 border-b border-outline-variant/30 bg-surface-container-low/20">
            <h2 className="font-headline-sm text-lg font-semibold text-on-surface flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[22px] text-primary">bolt</span>
              Quick Actions
            </h2>
          </div>
          <div className="p-6 flex flex-col gap-3">
            <Link to="/admin/designs" className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low/50 hover:bg-surface-container transition-colors border border-outline-variant/20 group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">styler</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-on-surface">Manage Designs</span>
                <span className="font-body-sm text-xs text-on-surface-variant mt-0.5">Add or edit studio designs</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant ml-auto group-hover:text-primary transition-colors">chevron_right</span>
            </Link>

            <Link to="/admin/enquiries" className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low/50 hover:bg-surface-container transition-colors border border-outline-variant/20 group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">inbox</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-on-surface">View Enquiries</span>
                <span className="font-body-sm text-xs text-on-surface-variant mt-0.5">Check recent customer messages</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant ml-auto group-hover:text-primary transition-colors">chevron_right</span>
            </Link>

            <Link to="/admin/custom-requests" className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low/50 hover:bg-surface-container transition-colors border border-outline-variant/20 group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">stylus</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-on-surface">Custom Requests</span>
                <span className="font-body-sm text-xs text-on-surface-variant mt-0.5">Review bespoke tailoring requests</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant ml-auto group-hover:text-primary transition-colors">chevron_right</span>
            </Link>

            <Link to="/admin/settings" className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low/50 hover:bg-surface-container transition-colors border border-outline-variant/20 group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">settings</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-on-surface">Settings</span>
                <span className="font-body-sm text-xs text-on-surface-variant mt-0.5">Manage your admin profile</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant ml-auto group-hover:text-primary transition-colors">chevron_right</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
