"use client";

import React, { useState } from "react";
import { Mail, User, Send, CheckCircle2, MessageSquare, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Side: Contact Information Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Contact Us</h1>
            <p className="text-slate-400 text-sm mt-2">
              Have questions about university records, reviews, or database listings? Feel free to reach out to us directly.
            </p>
          </div>

          <div className="glass rounded-2xl border border-border p-6 space-y-6 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-indigo-400" />
              Administrative Support
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Administrator Name</div>
                  <div className="text-sm font-semibold text-white">Vijayapandian T</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Support Email</div>
                  <a
                    href="mailto:vijayapandian112007@gmail.com"
                    className="text-sm font-semibold text-indigo-450 hover:text-indigo-400 transition-colors"
                  >
                    vijayapandian112007@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl border border-border p-6 shadow-xl text-xs text-slate-500 space-y-2">
            <p>
              📧 Direct emails are typically monitored and answered within 24–48 business hours.
            </p>
            <p>
              🔒 Your contact query is transmitted securely and is governed by our Privacy Policy.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Query Form */}
        <div className="lg:col-span-3">
          <div className="glass rounded-2xl border border-border p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="inline-flex p-4 rounded-full bg-green-500/10 text-green-400">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto">
                  Thank you for contacting support, Vijayapandian T will review your inquiry and get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-indigo-650 hover:bg-indigo-600 text-white font-medium text-sm transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-indigo-400" />
                  Send a Message
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 font-medium">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter name"
                      className="w-full bg-slate-950/50 border border-border focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 font-medium">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-slate-950/50 border border-border focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-400 font-medium">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Feedback, Bug report, Listing inquiry"
                    className="w-full bg-slate-950/50 border border-border focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-400 font-medium">Message Details</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write details of your message..."
                    className="w-full bg-slate-950/50 border border-border focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-550 disabled:bg-indigo-850 disabled:text-slate-500 text-white font-medium text-sm transition-all shadow-lg hover:shadow-indigo-500/10 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
