import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { ShieldCheck, Award, HeartHandshake, Users } from "lucide-react";

const About = () => {
  return (
    <>
      <PageTitle title="About Us | ShoppingHUB" />
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 md:py-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-blue-600 font-extrabold mb-2">Our Story</p>
            <h1 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
              Redefining the Online Shopping Experience
            </h1>
            <p className="text-stone-500 mt-4 leading-relaxed">
              At ShoppingHUB, we combine modern engineering, curated design, and customer-first service to deliver a premium storefront that is responsive and beautiful.
            </p>
          </div>

          {/* Core Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Award size={22} />
              </div>
              <h3 className="text-lg font-bold text-stone-900">Uncompromising Quality</h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                We source only from top-tier brands and verified manufacturers, ensuring that every product meets strict standards.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <HeartHandshake size={22} />
              </div>
              <h3 className="text-lg font-bold text-stone-900">Customer Satisfaction</h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                Our support desk is always responsive, offering a seamless checkout flow, easy returns, and fast support responses.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-lg font-bold text-stone-900">Secure Transactions</h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                We utilize encrypted transaction channels and modern payment routing so you can buy with total peace of mind.
              </p>
            </div>
          </div>

          {/* Big Story Banner */}
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_40px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center gap-6">
              <h2 className="text-3xl font-extrabold text-stone-900">Built for the Modern Shopper</h2>
              <p className="text-sm text-stone-500 leading-relaxed">
                Our team started this project in 2024 to tackle common frustrations in the online retail industry. We noticed e-commerce portals were often clunky, slow, and overly commercialized.
              </p>
              <p className="text-sm text-stone-500 leading-relaxed">
                We set out to build a streamlined platform designed around simplicity and visual harmony. The result is ShoppingHUB: a minimal, ultra-clean shopping experience featuring lightning-fast catalog navigation, user profiles, and order tracking.
              </p>
              <div className="flex gap-8 border-t border-stone-100 pt-6 mt-2">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-stone-900">99.8%</span>
                  <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider mt-1">Uptime Rate</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-stone-900">10k+</span>
                  <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider mt-1">Happy Users</span>
                </div>
              </div>
            </div>
            <div className="bg-stone-100 relative min-h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&fit=crop"
                alt="E-commerce store warehouse"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
