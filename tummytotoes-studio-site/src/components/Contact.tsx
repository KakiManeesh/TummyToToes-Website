"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    sessionType: "",
    date: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          sessionType: form.sessionType,
          date: form.date,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setStatusMessage("Thank you for your enquiry! We'll be in touch shortly.");
        setForm({ name: "", email: "", phone: "", sessionType: "", date: "", message: "" });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
          setStatusMessage("");
        }, 5000);
      } else {
        setSubmitStatus("error");
        setStatusMessage(data.error || "There was an error submitting your enquiry. Please try again or contact us directly.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setStatusMessage("Failed to send enquiry. Please try contacting us via WhatsApp or email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-border py-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors";

  return (
    <section id="contact" className="py-14 md:py-32">
      <div
        ref={ref}
        className={`container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10 md:gap-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        {/* Info */}
        <div className="flex flex-col gap-5 md:gap-6">
          <div className="inline-flex items-center gap-2 w-fit">
            <span
              className={`h-[2px] bg-accent transition-all duration-150 ${visible ? "w-4" : "w-0"
                }`}
            />
            <span className="font-body text-xs uppercase tracking-[0.35em] text-accent">
              Contact
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light text-foreground">
            Let&apos;s create something beautiful
          </h2>

          <p className="font-body text-base text-muted-foreground">
            Ready to book your session or have a question? Reach out and let&apos;s start planning
            your perfect shoot.
          </p>

          <div className="flex flex-col gap-4 mt-2 md:mt-4">
            <a href="tel:+919966531312" className="flex items-center gap-3 min-h-[44px]">
              <Phone className="h-4 w-4 text-accent flex-shrink-0" />
              <span className="font-body text-sm text-muted-foreground">+91 99665 31312</span>
            </a>

            <a href="mailto:tummytotoes@gmail.com" className="flex items-center gap-3 min-h-[44px]">
              <Mail className="h-4 w-4 text-accent flex-shrink-0" />
              <span className="font-body text-sm text-muted-foreground">tummytotoes@gmail.com</span>
            </a>

            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
              <span className="font-body text-sm text-muted-foreground">Kukatpally, Hyderabad, India</span>
            </div>

          </div>

          {/* Social buttons — full-width on mobile */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2 md:mt-4">
            <a
              href="https://wa.me/919966531312?text=Hello%20Surya%2C%20I%20would%20like%20to%20enquire%20about%20a%20photography%20session."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-foreground border border-foreground/20 font-body text-sm px-5 py-3 rounded-sm hover:opacity-90 transition-opacity w-full sm:w-auto min-h-[48px]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
            <a
              href="https://www.instagram.com/tummy.to.toes.photography/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-body text-sm px-5 py-3 rounded-sm hover:opacity-90 transition-opacity text-foreground w-full sm:w-auto min-h-[48px]"
              style={{
                background:
                  "linear-gradient(#fff, #fff) padding-box, linear-gradient(to right, #833ab4, #fd1d1d, #fcb045) border-box",
                border: "2px solid transparent",
              }}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current flex-shrink-0">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Follow on Instagram
            </a>
          </div>
        </div>


        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5">
          <input
            required
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
          <input
            required
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
          />
          <select
            required
            value={form.sessionType}
            onChange={(e) => setForm({ ...form, sessionType: e.target.value })}
            className={`${inputClass} appearance-none`}
          >
            <option value="" disabled>Session Type</option>
            <option value="maternity">Maternity</option>
            <option value="newborn">Newborn</option>
            <option value="event">Event</option>
          </select>

          <input
            type="date"
            placeholder="Preferred Date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={inputClass}
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${inputClass} resize-none`}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-foreground text-background font-body text-sm uppercase tracking-[0.15em] py-4 rounded-sm hover:bg-foreground/90 transition-colors mt-1 disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px]"
          >
            {isSubmitting ? "Sending..." : "Send Enquiry"}
          </button>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-sm text-green-700 text-sm text-center font-body">
              {statusMessage}
            </div>
          )}
          
          {submitStatus === "error" && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-red-700 text-sm text-center font-body">
              {statusMessage}
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground/60 font-body mt-1">
            Have a quick question? WhatsApp is the fastest way to reach us
          </p>

        </form>
      </div>

    </section>

  );
};

export default Contact;
