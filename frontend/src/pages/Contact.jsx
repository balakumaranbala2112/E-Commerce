import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you! Your message has been sent successfully.");
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <>
      <PageTitle title="Contact Us | ShoppingHUB" />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 md:py-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-blue-600 font-extrabold mb-2">Get in Touch</p>
            <h1 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
              We'd Love to Hear From You
            </h1>
            <p className="text-stone-500 mt-4 leading-relaxed">
              Have questions about our collections, shipping, or order statuses? Feel free to contact our customer support team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Channels */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Call Us</h3>
                  <p className="text-xs text-stone-400 mt-1">Mon-Fri from 9am to 6pm IST</p>
                  <a href="tel:+911234567890" className="text-sm font-semibold text-stone-700 block mt-2 hover:text-blue-600">
                    +91 1234567890
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Email Us</h3>
                  <p className="text-xs text-stone-400 mt-1">Our support team replies within 24 hours</p>
                  <a href="mailto:abcdsw123@gmail.com" className="text-sm font-semibold text-stone-700 block mt-2 hover:text-blue-600">
                    abcdsw123@gmail.com
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Visit Us</h3>
                  <p className="text-xs text-stone-400 mt-1">Come and check out our corporate office</p>
                  <span className="text-sm font-semibold text-stone-700 block mt-2">
                    Chennai, Tamil Nadu, India
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-[0_4px_40px_rgba(0,0,0,0.03)]">
              <h2 className="text-2xl font-bold text-stone-900 mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 hover:bg-gray-100/70 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus:border-transparent outline-none text-sm text-gray-800 placeholder-gray-300 font-medium transition-all duration-200"
                    required
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 hover:bg-gray-100/70 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus:border-transparent outline-none text-sm text-gray-800 placeholder-gray-300 font-medium transition-all duration-200"
                    required
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your Message</label>
                  <textarea
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full resize-none bg-gray-50 hover:bg-gray-100/70 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-2xl px-4 py-3.5 border border-gray-100 focus:border-transparent outline-none text-sm text-gray-800 placeholder-gray-300 font-medium transition-all duration-200"
                    required
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 self-start flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-8 py-3.5 rounded-2xl transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;