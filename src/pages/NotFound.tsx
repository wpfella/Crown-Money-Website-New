import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, AlertTriangle, ArrowRight, Calculator, BookOpen, PhoneCall } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const NotFound = () => {
  return (
    <div className="pt-28 pb-24 bg-gray-50 min-h-screen flex items-center justify-center">
      <Helmet>
        <title>Page Not Found | Crown Money</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-lg w-full mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gold" />

          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-100">
            <AlertTriangle className="text-gold" size={36} />
          </div>

          <h1 className="text-3xl font-display font-bold text-primary mb-3">
            Page Not Found (404)
          </h1>

          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            Sorry, the page you requested does not exist or has moved. Explore our Australian mortgage reduction calculators, guides, or book a free strategy session below.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="w-full bg-primary hover:bg-opacity-95 text-white py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <Home size={18} />
              Return to Home Page
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/mortgage-reduction-calculator"
              className="w-full bg-crown-lavender hover:bg-opacity-80 text-primary py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Calculator size={18} className="text-gold" />
              Mortgage Reduction Calculator
            </Link>
            <Link
              to="/guides"
              className="w-full bg-gray-50 hover:bg-gray-100 text-primary border border-gray-200 py-3 px-6 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <BookOpen size={16} className="text-gold" />
              Browse Mortgage Reduction Guides
            </Link>
            <Link
              to="/contact"
              className="w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 py-3 rounded-xl font-medium text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <PhoneCall size={14} /> Need help? Contact Us (1300 882 981)
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
