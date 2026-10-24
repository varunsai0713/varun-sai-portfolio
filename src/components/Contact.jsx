import { useState } from "react";
import { SectionHeading } from "./SectionHeading.jsx";
import { validateContactForm } from "../utils/portfolio.js";
import {
  Mail,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Loader2
} from "lucide-react";
const Contact = ({ identity }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("idle");
  const [submissionError, setSubmissionError] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2e3);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2e3);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: void 0 }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    setStatus("idle");
    setSubmissionError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(result.error || "The message could not be delivered. Please try again.");
      }
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Submission error:", err);
      setSubmissionError(
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again."
      );
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section id="contact" aria-labelledby="contact-heading" className="py-16 md:py-24 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
    eyebrow="06. Get In Touch"
    title="Let's connect & build together"
    description="Interested in discussing a software engineering role, full-stack project, or API architecture? Send a message below."
  />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {
    /* Direct Contact Info */
  }
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Direct Communication
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                I am actively considering full-stack and backend software engineering positions. Feel free to reach out directly via email or LinkedIn.
              </p>

              <div className="space-y-4">
                {
    /* Email Item */
  }
                <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="block text-[11px] font-medium text-zinc-400">Email</span>
                      <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate block">
                        {identity.email}
                      </span>
                    </div>
                  </div>

                  <button
    type="button"
    onClick={handleCopyEmail}
    className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
    title="Copy email to clipboard"
    aria-label="Copy email address"
  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {
    /* LinkedIn Item */
  }
                <a
    href={identity.linkedinUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors group"
  >
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-zinc-400">LinkedIn</span>
                    <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Varun Sai on LinkedIn
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {
    /* Contact Form */
  }
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                Send a Message
              </h3>

              {status === "success" && <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                  <div>
                    <p className="font-semibold">Message emailed to Varun Sai!</p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                      Your message was accepted by the email server for delivery to{" "}
                      <span className="font-semibold">{identity.email}</span>.
                    </p>
                    <button
    type="button"
    onClick={() => setStatus("idle")}
    className="mt-2 text-xs font-semibold underline hover:text-emerald-900 dark:hover:text-emerald-100"
  >
                      Send another message
                    </button>
                  </div>
                </div>}

              {status === "error" && <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                  <div>
                    <p className="font-semibold">Unable to send message.</p>
                    <p className="text-xs text-rose-700 dark:text-rose-300 mt-0.5">
                      {submissionError ? submissionError : <>
                          Please try again or email me directly at{" "}
                          <span className="font-medium">
                            {identity.email}
                          </span>
                          .
                        </>}
                    </p>
                  </div>
                </div>}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {
    /* Name Input */
  }
                <div>
                  <label
    htmlFor="contact-name"
    className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
  >
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
    id="contact-name"
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="e.g. Alex Smith"
    aria-required="true"
    aria-invalid={!!errors.name}
    aria-describedby={errors.name ? "name-error" : void 0}
    className={`w-full px-4 py-2.5 rounded-xl text-sm border bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 ${errors.name ? "border-rose-400 focus:ring-rose-500" : "border-zinc-200 dark:border-zinc-800 focus:ring-zinc-900 dark:focus:ring-zinc-100"}`}
  />
                  {errors.name && <p id="name-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                      {errors.name}
                    </p>}
                </div>

                {
    /* Email Input */
  }
                <div>
                  <label
    htmlFor="contact-email"
    className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
  >
                    Your Email <span className="text-rose-500">*</span>
                  </label>
                  <input
    id="contact-email"
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="e.g. alex@company.com"
    aria-required="true"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? "email-error" : void 0}
    className={`w-full px-4 py-2.5 rounded-xl text-sm border bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 ${errors.email ? "border-rose-400 focus:ring-rose-500" : "border-zinc-200 dark:border-zinc-800 focus:ring-zinc-900 dark:focus:ring-zinc-100"}`}
  />
                  {errors.email && <p id="email-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                      {errors.email}
                    </p>}
                </div>

                {
    /* Message Input */
  }
                <div>
                  <label
    htmlFor="contact-message"
    className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
  >
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
    id="contact-message"
    name="message"
    rows={4}
    value={formData.message}
    onChange={handleChange}
    placeholder="Describe your role opportunity, project proposal, or inquiry..."
    aria-required="true"
    aria-invalid={!!errors.message}
    aria-describedby={errors.message ? "message-error" : void 0}
    className={`w-full px-4 py-2.5 rounded-xl text-sm border bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 resize-y ${errors.message ? "border-rose-400 focus:ring-rose-500" : "border-zinc-200 dark:border-zinc-800 focus:ring-zinc-900 dark:focus:ring-zinc-100"}`}
  />
                  {errors.message && <p id="message-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                      {errors.message}
                    </p>}
                </div>

                {
    /* Action Buttons */
  }
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
    type="submit"
    disabled={isSubmitting}
    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-xs disabled:opacity-50"
  >
                    {isSubmitting ? <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </> : <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>}
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export {
  Contact
};
