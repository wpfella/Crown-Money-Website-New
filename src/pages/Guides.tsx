import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Clock, ArrowRight, ShieldCheck, Calculator, CheckCircle2, UserCheck } from 'lucide-react';
import { SEO } from '../components/SEO';
import { guidesData } from '../data/guidesData';

export const Guides: React.FC = () => {
  const [selectedCluster, setSelectedCluster] = useState<string>('All');
  const clusters = ['All', ...Array.from(new Set(guidesData.map((g) => g.cluster)))];

  const filteredGuides = selectedCluster === 'All'
    ? guidesData
    : guidesData.filter((g) => g.cluster === selectedCluster);

  const guidesHubSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Australian Mortgage Reduction & Home Loan Guides | Crown Money',
        description: 'Expert Australian guides on paying off your mortgage faster, offset vs redraw accounts, family cash-flow automation, debt recycling, and transparent fee comparisons.',
        url: 'https://crownmoney.com.au/guides',
        publisher: {
          '@type': 'Organization',
          name: 'Crown Money Management',
          url: 'https://crownmoney.com.au'
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://crownmoney.com.au/' },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://crownmoney.com.au/guides' }
        ]
      }
    ]
  };

  return (
    <div className="pt-10 pb-24 bg-white">
      <SEO
        title="Mortgage Reduction & Home Loan Guides | Crown Money"
        description="Read expert Australian guides on paying off your mortgage faster, offset vs redraw accounts, cash-flow automation, debt recycling, and loan fees."
        canonicalUrl="https://crownmoney.com.au/guides"
      />

      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-gold uppercase tracking-wider mb-6">
            <BookOpen size={14} /> Australian Homeowner Resource Hub · ACL 388 279
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Australian Mortgage Reduction & Home Loan Guides
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Evidence-based guides written and reviewed by Crown Money’s licensed mortgage strategists. Learn how to pay off your home loan years faster, compare offset vs redraw structures, and automate your household cash flow.
          </p>
        </div>
      </section>

      {/* Editorial Standards Banner (YMYL / E-E-A-T) */}
      <section className="bg-crown-lavender border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4 text-sm text-primary">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck size={18} className="text-gold shrink-0" />
            <span>Australian Credit Licence (ACL) 388 279 · Crown Lending Pty Ltd (ABN 47 119 504 862)</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <UserCheck size={18} className="text-primary shrink-0" />
            <span>Authored & reviewed by Scott Parry (Founder) and Craig Parry (Senior Finance Broker)</span>
          </div>
        </div>
      </section>

      {/* Topic Cluster Filter & Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {clusters.map((cluster) => (
              <button
                key={cluster}
                onClick={() => setSelectedCluster(cluster)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  selectedCluster === cluster
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cluster}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredGuides.map((guide) => (
              <article
                key={guide.slug}
                className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {guide.cluster}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={14} /> {guide.readTime} · Updated {guide.updatedDate}
                    </span>
                  </div>

                  <h2 className="text-2xl font-display font-bold text-primary mb-3 hover:text-gold transition-colors">
                    <Link to={`/guides/${guide.slug}`}>{guide.title}</Link>
                  </h2>

                  <p className="text-gray-600 leading-relaxed mb-6">{guide.excerpt}</p>
                </div>

                <div className="pt-6 border-t border-gray-200 space-y-4">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div>
                      <span className="font-bold text-primary">By {guide.author.name}</span> ({guide.author.role})
                      <div className="text-gray-500">Reviewed by {guide.reviewedBy.name}</div>
                    </div>
                    <Link
                      to={guide.relatedCalculator.path}
                      className="inline-flex items-center gap-1 text-primary font-bold hover:text-gold"
                    >
                      <Calculator size={14} /> {guide.relatedCalculator.name}
                    </Link>
                  </div>

                  <Link
                    to={`/guides/${guide.slug}`}
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all"
                  >
                    Read Full Guide <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Links to Calculators & Case Studies */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-primary mb-4">
                Put These Mortgage Reduction Strategies Into Action
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Every guide on Crown Money is paired with our interactive Australian mortgage calculators and verified client case studies so you can test the numbers on your own home loan.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <Link to="/mortgage-reduction-calculator" className="flex items-center gap-2 text-primary font-bold hover:text-gold">
                  <CheckCircle2 size={18} className="text-gold" /> Mortgage Reduction Calculator
                </Link>
                <Link to="/tools/withdrawal-impact" className="flex items-center gap-2 text-primary font-bold hover:text-gold">
                  <CheckCircle2 size={18} className="text-gold" /> Redraw & Offset Withdrawal Cost
                </Link>
                <Link to="/tools/wishlist-impact" className="flex items-center gap-2 text-primary font-bold hover:text-gold">
                  <CheckCircle2 size={18} className="text-gold" /> Cost of Spending From Redraw
                </Link>
                <Link to="/tools/debt-recycling" className="flex items-center gap-2 text-primary font-bold hover:text-gold">
                  <CheckCircle2 size={18} className="text-gold" /> Debt Recycling Calculator
                </Link>
                <Link to="/success-stories" className="flex items-center gap-2 text-primary font-bold hover:text-gold">
                  <CheckCircle2 size={18} className="text-gold" /> Verified Client Case Studies
                </Link>
                <Link to="/reviews" className="flex items-center gap-2 text-primary font-bold hover:text-gold">
                  <CheckCircle2 size={18} className="text-gold" /> 380+ Client Reviews
                </Link>
              </div>
              <Link
                to="/contact"
                className="inline-block bg-gold text-primary px-8 py-4 rounded-full font-bold shadow-lg hover:bg-opacity-90 transition-all"
              >
                Book Your Free Strategy Session
              </Link>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-md">
              <h3 className="text-xl font-display font-bold text-primary mb-4">
                Canonical Crown Money Facts (Verified November 2026)
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li><strong>Founded:</strong> 2004 by Scott Parry (22+ years helping Australian homeowners)</li>
                <li><strong>Licensing:</strong> Crown Lending Pty Ltd · ABN 47 119 504 862 · ACN 119 504 862 · ACL 388 279</li>
                <li><strong>Families Coached:</strong> Over 7,000 Australian households</li>
                <li><strong>Average Annual Principal Reduction:</strong> $29,327/year (vs $12,000/year national average)</li>
                <li><strong>Average Household Savings Rate:</strong> 24% of net income (vs 3.7% ABS national average)</li>
                <li><strong>Mortgage-Free Milestone:</strong> A Crown Money client pays off their home loan in full every 23 days</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
