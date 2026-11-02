import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Quote, ShieldCheck, Calculator, MapPin, Users, Calendar, Video, Clock } from 'lucide-react';
import { SEO } from '../components/SEO';
import { caseStudiesData } from '../data/caseStudiesData';
import { NotFound } from './NotFound';

export const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudiesData.find((c) => c.slug === slug);

  if (!study) {
    return <NotFound />;
  }

  const otherStudies = caseStudiesData.filter((c) => c.slug !== study.slug);

  return (
    <div className="pt-10 pb-24 bg-white">
      <SEO
        title={study.seoTitle}
        description={study.metaDescription}
        ogImage={study.image}
        canonicalUrl={`https://crownmoney.com.au/success-stories/${study.slug}`}
      />

      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <Link to="/success-stories" className="inline-flex items-center gap-2 text-gold text-sm font-bold mb-6 hover:underline">
            <ArrowLeft size={16} /> Back to All Success Stories
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 mb-4">
            <span className="bg-gold text-primary font-bold px-3 py-1 rounded-full uppercase">
              {study.result}
            </span>
            <span className="flex items-center gap-1"><MapPin size={14} className="text-gold" /> {study.state}</span>
            <span className="flex items-center gap-1"><Users size={14} className="text-gold" /> {study.familyType}</span>
            <span className="flex items-center gap-1"><Calendar size={14} className="text-gold" /> Verified {study.verifiedDate}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6">
            {study.h1}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed">
            {study.summary}
          </p>
        </div>
      </section>

      {/* Key Numbers Bar */}
      <section className="bg-crown-lavender py-10 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Starting Loan</div>
            <div className="text-xl font-display font-bold text-primary">{study.loanSize}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Original Term</div>
            <div className="text-xl font-display font-bold text-primary">{study.startingTerm}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="text-xs text-gray-500 uppercase font-bold mb-1">New Trajectory</div>
            <div className="text-xl font-display font-bold text-gold">{study.newTerm}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Time Saved</div>
            <div className="text-xl font-display font-bold text-primary">{study.yearsSaved}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm col-span-2 md:col-span-1">
            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Savings Rate</div>
            <div className="text-xl font-display font-bold text-primary">{study.savingsRate}</div>
          </div>
        </div>
      </section>

      {/* Case Study Breakdown */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <img
              src={study.image}
              alt={`${study.name} (${study.state}) - Crown Money Mortgage Reduction Case Study`}
              width={600}
              height={600}
              loading="lazy"
              className="w-full rounded-3xl shadow-xl object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <Quote className="text-gold mb-3" size={28} />
              <p className="text-gray-700 italic leading-relaxed mb-4">"{study.clientQuote}"</p>
              <div className="font-bold text-primary">— {study.name}, {study.state}</div>
            </div>

            {/* Video Testimonial Embed */}
            {study.videoUrl && (
              <div className="bg-primary text-white p-6 rounded-3xl shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
                  <Video size={16} /> Verified Video Testimonial
                </div>
                <h3 className="text-lg font-display font-bold">
                  Watch Australian Client Video Feedback
                </h3>
                <div className="aspect-video rounded-2xl overflow-hidden bg-black">
                  <video
                    src={study.videoUrl}
                    controls
                    preload="none"
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 space-y-10">
            <div>
              <h2 className="text-2xl font-display font-bold text-primary mb-4">
                The Starting Position & Full Case Study Story
              </h2>
              <p className="text-gray-800 font-semibold text-lg leading-relaxed mb-4">
                {study.challenge}
              </p>
              <div className="space-y-4">
                {study.storyParagraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-gray-700 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Before vs After Financial Comparison Table */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-primary text-white px-6 py-4">
                <h2 className="text-lg md:text-xl font-display font-bold">
                  Before vs After Crown Money Comparison ({study.name})
                </h2>
              </div>
              <div className="overflow-x-auto p-4">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200 text-primary font-bold">
                      <th scope="col" className="py-3 px-3">Metric</th>
                      <th scope="col" className="py-3 px-3">Before Crown Money</th>
                      <th scope="col" className="py-3 px-3">With Crown Money HOP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {study.beforeAfterTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="py-3 px-3 font-bold text-primary">{row.metric}</td>
                        <td className="py-3 px-3 text-gray-600">{row.beforeCrown}</td>
                        <td className="py-3 px-3 font-semibold text-emerald-700">{row.withCrown}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-primary mb-4">
                The Crown Money Strategy Implemented
              </h2>
              <ul className="space-y-4">
                {study.strategyImplemented.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="text-gold shrink-0 mt-1" size={20} />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Timeline */}
            <div>
              <h2 className="text-2xl font-display font-bold text-primary mb-4 flex items-center gap-2">
                <Clock size={22} className="text-gold" /> Implementation Timeline & Milestones
              </h2>
              <div className="space-y-4">
                {study.timeline.map((step, tIdx) => (
                  <div key={tIdx} className="bg-gray-50 border-l-4 border-gold rounded-r-2xl p-5">
                    <h3 className="text-base font-display font-bold text-primary mb-1">
                      {step.phase}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{step.milestone}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary text-white p-8 rounded-3xl space-y-4">
              <h3 className="text-2xl font-display font-bold">
                Verified Outcome: {study.yearsSaved} ({study.interestSaved})
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                Want to see how many years and how much interest you could save on your own mortgage? Run your numbers in our free calculator or book a 1-on-1 strategy session.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/mortgage-reduction-calculator"
                  className="bg-gold text-primary px-6 py-3 rounded-full text-sm font-bold inline-flex items-center gap-2"
                >
                  <Calculator size={16} /> Try Mortgage Reduction Calculator
                </Link>
                <Link
                  to="/contact"
                  className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-full text-sm font-bold inline-flex items-center gap-2 hover:bg-white/20"
                >
                  Book Free Strategy Session <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="text-xs text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <ShieldCheck size={14} className="inline text-gold mr-1" />
              <strong>Results Disclaimer:</strong> Individual client outcomes vary depending on loan size, household income, living expenses, interest rates, and adherence to cash-flow coaching. Crown Lending Pty Ltd ABN 47 119 504 862 · ACL 388 279.
            </div>
          </div>
        </div>
      </section>

      {/* More Case Studies */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-primary mb-8">
            More Australian Homeowner Case Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherStudies.slice(0, 3).map((other) => (
              <Link
                key={other.slug}
                to={`/success-stories/${other.slug}`}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all block"
              >
                <span className="text-xs font-bold text-gold uppercase">{other.result}</span>
                <h3 className="text-lg font-bold text-primary mt-1 mb-2">{other.name} ({other.state})</h3>
                <p className="text-xs text-gray-600 mb-3">Loan: {other.loanSize} · {other.interestSaved}</p>
                <span className="text-xs font-bold text-primary inline-flex items-center gap-1">
                  View Case Study <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
