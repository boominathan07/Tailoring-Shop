import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full">
      <div className="flex flex-col w-full">
        <section className="w-full px-6 lg:px-12 pt-10 pb-12 lg:pt-14 lg:pb-16 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md uppercase tracking-wider mb-6">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <span className="text-outline-variant">/</span>
                <span aria-current="page" className="text-on-surface font-semibold">Terms &amp; Conditions</span>
              </nav>

              <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight mb-8">
                Terms &amp; Conditions
              </h1>

              <div className="font-body-md text-on-surface-variant space-y-6 leading-relaxed">
                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">Introduction</h2>
                <p>
                  Welcome to [Company Name]. These Terms &amp; Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our services.
                </p>

                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">Use of the website</h2>
                <p>
                  You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
                </p>

                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">Services and tailoring requests</h2>
                <p>
                  All tailoring, stitching, and alteration services requested through this website are subject to consultation and acceptance. We reserve the right to refuse service, terminate accounts, or cancel requests at our sole discretion.
                </p>

                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">User responsibilities</h2>
                <p>
                  You are responsible for ensuring that all information you provide to us, including measurements and contact details, is accurate and complete. We are not liable for any issues arising from incorrect information supplied by you.
                </p>

                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">Accounts</h2>
                <p>
                  If you create an account on our website, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account.
                </p>

                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">Intellectual property</h2>
                <p>
                  This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice.
                </p>

                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">Limitation of liability</h2>
                <p>
                  To the fullest extent permitted by law, [Company Name] shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>

                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">Changes to terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms &amp; Conditions at any time. It is your responsibility to check this page periodically for changes.
                </p>

                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">Contact information</h2>
                <p>
                  Questions about the Terms &amp; Conditions should be sent to us at: [Contact Email / Phone Number / Address].
                </p>

                <div className="pt-8 border-t border-outline-variant/30 mt-12">
                  <p className="text-sm">Last updated: [Date to be inserted by owner]</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Terms;
