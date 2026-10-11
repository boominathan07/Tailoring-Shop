import { useAuth } from '../../contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      {/* HEADER */}
      <div className="flex flex-col gap-2">
        <h1 className="font-display-sm text-3xl font-bold tracking-tight text-on-surface">Settings</h1>
        <p className="font-body-md text-on-surface-variant max-w-2xl leading-relaxed">
          Manage your administrative preferences, view profile information, and configure system settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN - NAV/TABS IF NEEDED (For now just stacking, or we can use the wide format) */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          
          {/* ACCOUNT & PROFILE */}
          <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/40 overflow-hidden flex flex-col">
            <div className="px-8 py-6 border-b border-outline-variant/30 bg-surface-container-low/20">
              <h2 className="font-headline-sm text-xl font-semibold text-on-surface flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[24px] text-primary">person</span>
                Account & Profile
              </h2>
              <p className="font-body-sm text-on-surface-variant mt-1.5">
                Your personal administrative details and role information.
              </p>
            </div>
            <div className="p-8 flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex flex-col gap-2.5">
                  <label className="font-label-sm text-xs uppercase tracking-wider font-semibold text-on-surface-variant">Name</label>
                  <div className="px-4 py-3 rounded-xl bg-surface-container/30 border border-outline-variant/40 font-body-md text-on-surface flex items-center shadow-xs">
                    {user?.name || 'Administrator'}
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className="font-label-sm text-xs uppercase tracking-wider font-semibold text-on-surface-variant">Email Address</label>
                  <div className="px-4 py-3 rounded-xl bg-surface-container/30 border border-outline-variant/40 font-body-md text-on-surface flex items-center shadow-xs">
                    {user?.email || 'admin@gurutailoring.com'}
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className="font-label-sm text-xs uppercase tracking-wider font-semibold text-on-surface-variant">Role</label>
                  <div className="px-4 py-3 rounded-xl bg-surface-container/30 border border-outline-variant/40 font-body-md text-on-surface flex items-center capitalize shadow-xs">
                    {user?.role || 'admin'}
                    <span className="ml-auto inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
                      Active
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-6 border-t border-outline-variant/20">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant/70">info</span>
                <p className="font-body-sm text-sm text-on-surface-variant/80">
                  Profile updates are currently managed via direct database access.
                </p>
              </div>
            </div>
          </section>

          {/* SECURITY */}
          <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/40 overflow-hidden flex flex-col">
            <div className="px-8 py-6 border-b border-outline-variant/30 bg-surface-container-low/20">
              <h2 className="font-headline-sm text-xl font-semibold text-on-surface flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[24px] text-primary">lock</span>
                Security
              </h2>
              <p className="font-body-sm text-on-surface-variant mt-1.5">
                Manage your password and authentication settings.
              </p>
            </div>
            <div className="p-8 flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl bg-surface-container/20 border border-outline-variant/40 shadow-xs gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-on-surface">Password</span>
                  <span className="font-body-sm text-on-surface-variant text-sm">Change your account password securely.</span>
                </div>
                <button disabled className="shrink-0 px-5 py-2.5 rounded-lg bg-surface-container-high text-on-surface-variant font-medium text-sm cursor-not-allowed opacity-60 border border-outline-variant/30 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">key_off</span>
                  Change Password
                </button>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary-container/30 text-on-secondary-container border border-secondary-container/50">
                <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5 text-secondary">admin_panel_settings</span>
                <p className="font-body-sm text-sm leading-relaxed">
                  <strong>Restricted Action:</strong> Password changes are currently restricted to terminal and system administrators to enforce strict security policies.
                </p>
              </div>
            </div>
          </section>

          {/* SYSTEM PREFERENCES */}
          <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/40 overflow-hidden flex flex-col">
            <div className="px-8 py-6 border-b border-outline-variant/30 bg-surface-container-low/20">
              <h2 className="font-headline-sm text-xl font-semibold text-on-surface flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[24px] text-primary">tune</span>
                System Preferences
              </h2>
              <p className="font-body-sm text-on-surface-variant mt-1.5">
                Application-wide configurations and toggles.
              </p>
            </div>
            <div className="p-12 flex flex-col items-center justify-center text-center bg-surface-container-lowest">
              <div className="w-16 h-16 rounded-full bg-surface-container-high/50 flex items-center justify-center mb-5 border border-outline-variant/30">
                <span className="material-symbols-outlined text-[32px] text-outline">manufacturing</span>
              </div>
              <h3 className="font-headline-sm text-lg font-semibold text-on-surface mb-2">No Global Preferences Available</h3>
              <p className="font-body-sm text-on-surface-variant max-w-md leading-relaxed text-sm">
                The application currently runs with static environment configurations. Dynamic UI-based global system preferences are not yet supported by the backend API.
              </p>
            </div>
          </section>


          
        </div>
      </div>
    </div>
  );
};

export default Settings;
