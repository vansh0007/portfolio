import { motion, AnimatePresence } from "motion/react";
import React from "react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Send,
  CheckCircle2,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Contact({ data }: { data: any }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // If EmailJS is configured, send via EmailJS. Otherwise fall back to simulated success.
    if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
      try {
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          // Ensure a recipient email is provided for the EmailJS template/service
          to_email: "vansh.bhatia9@gmail.com",
          // Helpful additional fields for common EmailJS templates
          to_name: "Gunvansh Siingh",
          reply_to: "vansh.bhatia9@gmail.com",
        };

        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } catch (err: any) {
        console.error("Email send failed:", err);
        setSubmitError("Failed to send message. Please try again later.");
        setIsSubmitting(false);
      }
    } else {
      console.warn("EmailJS not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to enable real sending.");

      // Simulate submission for local dev when EmailJS keys are missing
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 800);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: data.email,
      href: `mailto:${data.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: data.phone,
      href: `tel:${data.phone}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: data.location,
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: `https://${data.links[0]}`,
      color: "text-blue-400",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/vansh0007",
      color: "text-white/50",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "#",
      color: "text-cyan-400",
    },
  ];

  return (
    <section className="relative min-h-screen py-24">
      {/* Background effects */}
      <motion.div
        className="absolute top-20 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl space-y-20">
        {/* Header */}
        <motion.div
          className="space-y-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-indigo-400 uppercase tracking-widest">
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40">
              Let's Create Together
            </span>
          </motion.h2>

          <motion.p
            className="max-w-2xl mx-auto text-lg text-white/50 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have a project in mind? I'd love to hear about it. Let's discuss your
            vision and explore how we can turn ideas into reality.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact Methods */}
          <motion.div className="lg:col-span-1 space-y-6" variants={itemVariants}>
            <h3 className="text-2xl font-bold text-white">Direct Contact</h3>

            <motion.div className="space-y-4">
              {contactMethods.map((method, idx) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={idx}
                    href={method.href}
                    variants={itemVariants}
                    className="group block p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                    whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="p-3 rounded-lg bg-indigo-500/20 border border-indigo-500/30 mt-1"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="w-5 h-5 text-indigo-400" />
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-sm text-white/50 mb-1">{method.label}</p>
                        <p className="text-white font-medium group-hover:text-indigo-300 transition-colors">
                          {method.value}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Social Links */}
            <motion.div className="pt-4 border-t border-white/10 space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-widest">
                Follow
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`p-3 rounded-lg bg-white/5 border border-white/10 ${social.color} hover:border-white/20 transition-colors`}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(255,255,255,0.1)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-6"
            variants={itemVariants}
          >
            {/* Success Message */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-green-300">
                    Message sent successfully! I'll get back to you soon.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 flex items-center gap-3"
              >
                <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 9v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-red-300">{submitError}</span>
              </motion.div>
            )}

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <motion.div
                className="space-y-2"
                onMouseEnter={() => setHoveredField("name")}
                onMouseLeave={() => setHoveredField(null)}
              >
                <label className="text-sm font-medium text-white/80">Name</label>
                <motion.div
                  className="relative"
                  animate={{
                    borderColor:
                      hoveredField === "name"
                        ? "rgba(129, 140, 248, 0.5)"
                        : "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="Your name"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: hoveredField === "name" || formData.name ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                className="space-y-2"
                onMouseEnter={() => setHoveredField("email")}
                onMouseLeave={() => setHoveredField(null)}
              >
                <label className="text-sm font-medium text-white/80">Email</label>
                <motion.div
                  className="relative"
                  animate={{
                    borderColor:
                      hoveredField === "email"
                        ? "rgba(129, 140, 248, 0.5)"
                        : "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="your@email.com"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: hoveredField === "email" || formData.email ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Subject Field */}
            <motion.div
              className="space-y-2"
              onMouseEnter={() => setHoveredField("subject")}
              onMouseLeave={() => setHoveredField(null)}
            >
              <label className="text-sm font-medium text-white/80">Subject</label>
              <motion.div
                className="relative"
                animate={{
                  borderColor:
                    hoveredField === "subject"
                      ? "rgba(129, 140, 248, 0.5)"
                      : "rgba(255, 255, 255, 0.1)",
                }}
              >
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  placeholder="Project inquiry"
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX:
                      hoveredField === "subject" || formData.subject ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>

            {/* Message Field */}
            <motion.div
              className="space-y-2"
              onMouseEnter={() => setHoveredField("message")}
              onMouseLeave={() => setHoveredField(null)}
            >
              <label className="text-sm font-medium text-white/80">Message</label>
              <motion.div
                className="relative"
                animate={{
                  borderColor:
                    hoveredField === "message"
                      ? "rgba(129, 140, 248, 0.5)"
                      : "rgba(255, 255, 255, 0.1)",
                }}
              >
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX:
                      hoveredField === "message" || formData.message ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              <motion.div
                className="flex items-center justify-center gap-2"
                animate={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.div>
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Quick Response Message */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-white/70">
            I typically respond within <span className="text-indigo-300 font-semibold">24-48 hours</span>
          </p>
          <p className="text-sm text-white/50">For urgent matters, feel free to call directly</p>
        </motion.div>
      </div>
    </section>
  );
}
