import React from 'react';
import { motion } from 'motion/react';
import { Phone, FileText, Settings, TrendingUp, CheckCircle, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SEO } from '../components/SEO';

import { Newsletter } from '../components/Newsletter';

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Phone />,
      title: "1. Discovery Call",
      desc: "We start with a deep dive into your current financial situation. We look at your income, expenses, current mortgage structure, and your long-term goals.",
      details: ["Income analysis", "Expense audit", "Goal setting"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: <FileText />,
      title: "2. Financial Strategy",
      desc: "Our experts create a personalised debt reduction plan tailored to your life. We show you exactly how much time and interest you can save.",
      details: ["Custom roadmap", "Interest saving projection", "Timeline mapping"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: <Settings />,
      title: "3. Implementation",
      desc: "We help you optimise your mortgage structure. This isn't just about a lower rate; it's about setting up your accounts to work for you, not the bank.",
      details: ["Account restructuring", "Offset optimisation", "Lender negotiation"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"
    },
    {
      icon: <TrendingUp />,
      title: "4. Coaching & Tracking",
      desc: "Ongoing monthly financial coaching and access to our wealth tracking dashboard. We keep you accountable and adjust the plan as your life changes.",
      details: ["Monthly check-ins", "Wealth dashboard", "Ongoing support"],
      image: "https://storage.googleapis.com/crown_money/Website/Images/Coaching%20and%20Tracking_Crown%20Money.png"
    }
  ];

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Pay Off Your Mortgage Faster with Crown Money",
    "description": "A 4-step process to achieve financial freedom and become mortgage-free faster.",
    "step": steps.map((step, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": step.title,
      "text": step.desc,
      "image": step.image
    }))
  };

  return (
    <div className="pt-10">
      <SEO
        title="How Mortgage Reduction Works | 4-Step System | Crown Money"
        description="See how Crown Money's 4-step mortgage reduction and cash-flow coaching system helps Australian homeowners pay off their home loans in half the time."
        keywords="debt reduction process, mortgage reduction strategy, financial coaching Australia, how to pay off mortgage fast, Crown Money process, Home Ownership Programme"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      </Helmet>
      {/* Hero */}
      <section className="bg-crown-lavender py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6">
              How Our <span className="text-gold">Mortgage Reduction</span> System Works
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We don't just give you a loan. We give you a strategy and the coaching to ensure you actually pay it off.
            </p>
            <Link to="/contact" className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg inline-block">
              Start Your Journey Today
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/vAKiVus_r7k" 
                title="How Crown Money Works" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Detail */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">The Crown Money Process</h2>
            <p className="text-gray-600">Step-by-step guidance from debt to wealth.</p>
          </div>

          <div className="space-y-20">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <div className="bg-accent text-primary w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                    {React.cloneElement(step.icon as React.ReactElement<any>, { size: 40 })}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-primary mb-4">{step.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">{step.desc}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center space-x-2 text-gray-700 font-medium">
                        <CheckCircle size={18} className="text-gold" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="bg-crown-lavender rounded-3xl p-4 aspect-square flex items-center justify-center">
                    <img 
                      src={step.image} 
                      alt={`Crown Money Process Step: ${step.title} - ${step.desc.substring(0, 60)}...`} 
                      className="rounded-2xl shadow-xl w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <img 
              src="https://storage.googleapis.com/crown_money/Website/Images/Wealth%20Tracking%20Dashboard_Crown%20Money.png" 
              alt="Crown Money Wealth Tracking Dashboard - Real-time mortgage balance and net worth visualisation" 
              className="rounded-3xl shadow-2xl border-4 border-white/10"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Wealth Tracking Dashboard</h2>
            <p className="text-lg text-gray-300">
              Stop guessing and start knowing. Our proprietary software gives you real-time visibility into your debt reduction and net worth growth.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <CheckCircle className="text-gold" size={20} />
                <span>Real-time mortgage balance tracking</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="text-gold" size={20} />
                <span>Automated savings goal monitoring</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="text-gold" size={20} />
                <span>Net worth visualisation</span>
              </li>
            </ul>
            <div className="pt-6">
              <Link to="/contact" className="bg-gold text-white px-8 py-4 rounded-full font-bold hover:bg-gold-hover transition-all inline-block">
                Get Your Personal Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Deep-Dive: Why Our Home Ownership Programme Outperforms Standard Bank Offset Accounts */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Why the Crown Money System Outperforms a Standard Bank Offset Account
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Most Australian homeowners believe a low interest rate and a 100% offset account are enough to get out of debt early. After reviewing over 6,500 Australian household budgets, the numbers tell a very different story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-xl font-display font-bold text-primary">Standard Bank Mortgage + Offset</h3>
              <p className="text-gray-600 leading-relaxed">
                With a traditional bank setup, your salary, everyday Visa debit card, credit card sweeps, and lumpy quarterly bills all compete for the same pool of money. Without structural separation and 90-day accountability, the average Australian household saves just 3.7% of net income and reduces principal by ~$12,000 per year—saving only 3 to 4 years off a 30-year loan.
              </p>
              <Link to="/guides/offset-account-vs-redraw-facility-australia" className="text-primary font-bold underline hover:text-gold inline-block text-sm">
                Read: Offset Account vs Redraw Facility in Australia →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-xl font-display font-bold text-primary">Crown Money Home Ownership Programme (HOP)</h3>
              <p className="text-gray-600 leading-relaxed">
                Our system routes 100% of your household income directly against your home loan balance to cut daily interest immediately, automatically provisions for annual and quarterly bills across 52 weeks, and transfers a set weekly living allowance to a separate spending card. Paired with quarterly 1-on-1 Financial Coach reviews, our clients average a 24% savings rate and $29,327/year in principal reduction.
              </p>
              <Link to="/guides/how-to-pay-off-your-mortgage-faster-australia" className="text-primary font-bold underline hover:text-gold inline-block text-sm">
                Read: Complete Guide to Paying Off Your Mortgage Faster →
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-display font-bold text-primary mb-3">
              Transparent Fees, Licensing & Suitability
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Crown Money Management (Crown Lending Pty Ltd ABN 47 119 504 862, Australian Credit Licence 388 279) never holds your funds—your loan and accounts remain in your own name with regulated Australian banking institutions. There are zero lock-in contracts or exit penalties. Before you make any commitment, we model your exact projected interest savings in a free discovery session.
            </p>
            <div className="flex flex-wrap gap-6 text-sm font-bold">
              <Link to="/mortgage-reduction-calculator" className="text-primary underline hover:text-gold">
                Try the Mortgage Reduction Calculator →
              </Link>
              <Link to="/guides/crown-money-fees-suitability-and-results-explained" className="text-primary underline hover:text-gold">
                See Full Fees & Suitability Guide →
              </Link>
              <Link to="/success-stories" className="text-primary underline hover:text-gold">
                Explore Client Case Studies →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">Ready to see how fast you can be debt-free?</h2>
          <p className="text-gray-600 mb-10">Our discovery call is free, confidential, and could save you hundreds of thousands in interest.</p>
          <Link to="/contact" className="bg-primary text-white px-10 py-5 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-xl inline-block">
            Book Free Strategy Call
          </Link>
        </div>
      </section>
      <Newsletter />
    </div>
  );
};
