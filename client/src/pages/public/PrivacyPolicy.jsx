import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
                <span aria-current="page" className="text-on-surface font-semibold">Privacy Policy</span>
              </nav>

              <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-on-surface tracking-tight mb-8">
                Privacy Policy
              </h1>

              <div className="font-body-md text-on-surface-variant space-y-6 leading-relaxed">
                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">Introduction</h2>
                <p>
                  [Company Name] ("we," "our," or "us") respects your privacy and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website, and our practices for collecting, using, maintaining, protecting, and disclosing that information.
                </p>

                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">Information collected</h2>
                <p>
                  We may collect personal information that you provide directly to us, such as when you create an account, submit a custom request, or contact us. This may include your name, email address, phone number, and physical measurements for tailoring purposes.
                </p>

                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">How information is used</h2>
                <p>
                  We use the information we collect to provide, maintain, and improve our services, process your requests and orders, communicate with you, and personalize your experience with our tailoring studio.
                </p>

                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">Cookies / local storage</h2>
                <p>
                  Our website uses cookies, local storage, and similar technologies strictly for essential functionality, such as keeping you logged in and remembering your consent preferences. We do not use third-party tracking cookies without your consent.
                </p>

                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">Authentication/account information</h2>
                <p>
                  If you register an account, your authentication details (such as your hashed password) are securely stored. We use secure tokens to manage your active sessions and ensure your account remains protected.
                </p>

                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">Data sharing</h2>
                <p>
                  We do not sell or rent your personal information to third parties. We may share your information only with service providers who assist us in operating our website or conducting our business, provided those parties agree to keep this information confidential.
                </p>

                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">Data security</h2>
                <p>
                  We have implemented reasonable measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. However, the transmission of information via the internet is not completely secure.
                </p>

                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">User choices</h2>
                <p>
                  You may choose not to provide certain personal information, but this may limit your ability to use some features of our services. You can also manage your cookie preferences through the banner on our website or your browser settings.
                </p>

                <h2 className="text-xl font-semibold text-on-surface mt-8 mb-4">Contact information</h2>
                <p>
                  To ask questions or comment about this privacy policy and our privacy practices, contact us at: [Contact Email / Phone Number / Address].
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

export default PrivacyPolicy;
