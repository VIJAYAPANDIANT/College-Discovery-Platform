import React from "react";

export const metadata = {
  title: "Privacy Policy | UniScope",
  description: "Learn about how UniScope collects, uses, and safeguards your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
      <div className="glass rounded-2xl border border-border p-8 md:p-12 shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-xs mb-8">
          Last Updated: May 23, 2026
        </p>

        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-border pb-2">
              1. Information We Collect
            </h2>
            <p>
              We collect information that you provide directly to us when you create an account, save colleges to your profile, or submit student reviews. This includes your name, email address, password, and any details shared within your reviews.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-border pb-2">
              2. How We Use Your Information
            </h2>
            <p>
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our college discovery services.</li>
              <li>Authenticate your account session and manage your saved bookmarks.</li>
              <li>Validate and display student reviews on college profiles.</li>
              <li>Communicate updates or respond to your inquiries.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-border pb-2">
              3. Data Protection and Security
            </h2>
            <p>
              We implement robust security measures to protect your user credentials and credentials data. Passwords are securely hashed using bcrypt encryption before storage in our PostgreSQL database. While we strive to protect your personal details, no transmission method over the internet is 100% secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-border pb-2">
              4. Cookies and Local Storage
            </h2>
            <p>
              We use local storage keys (such as auth tokens, bookmark data, and user preferences) to provide persistent features across your sessions. You can configure your browser to disable local storage, although some platform features may cease to function correctly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-border pb-2">
              5. Contact Information
            </h2>
            <p>
              If you have any questions or suggestions regarding our Privacy Policy, please reach out to us through our Contact page or directly email our administrator.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
