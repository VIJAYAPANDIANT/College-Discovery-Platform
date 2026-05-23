import React from "react";

export const metadata = {
  title: "Terms of Service | UniScope",
  description: "Read the rules and conditions for accessing and using the UniScope platform.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
      <div className="glass rounded-2xl border border-border p-8 md:p-12 shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
          Terms of Service
        </h1>
        <p className="text-muted-foreground text-xs mb-8">
          Last Updated: May 23, 2026
        </p>

        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-border pb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using the UniScope platform, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue your use of our services immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-border pb-2">
              2. User Accounts
            </h2>
            <p>
              To use certain features, such as bookmarking colleges or writing reviews, you must register for an account. You are responsible for keeping your login credentials secure and confidential. Any activity occurring under your account is your sole responsibility.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-border pb-2">
              3. User-Generated Content
            </h2>
            <p>
              You retain ownership of any student reviews and feedback you post on the site. However, by publishing content on UniScope, you grant us a non-exclusive, royalty-free, worldwide license to display, modify, and distribute your content. You represent that any content you post is authentic and does not violate any third-party rights.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-border pb-2">
              4. Prohibited Activities
            </h2>
            <p>
              You agree not to use the platform for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Posting false, defamatory, or misleading reviews.</li>
              <li>Spamming or sending unsolicited promotional content.</li>
              <li>Attempting to interfere with the network security or server operations of the site.</li>
              <li>Scraping university profiles or student data without written permission.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white border-b border-border pb-2">
              5. Disclaimer of Warranties
            </h2>
            <p>
              Our services are provided on an "as-is" and "as-available" basis. UniScope makes no guarantees regarding the accuracy, completeness, or timeliness of college profiles, tuition rates, average packages, or other statistics displayed on the platform. Use of this information is at your own risk.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
