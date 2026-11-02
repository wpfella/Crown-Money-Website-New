import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Clock, ShieldCheck, Calculator, CheckCircle, UserCheck } from 'lucide-react';
import { SEO } from '../components/SEO';
import { guidesData } from '../data/guidesData';
import { NotFound } from './NotFound';

export const GuideDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const guide = guidesData.find((g) => g.slug === slug);

  if (!guide) {
    return <NotFound />;
  }

  const otherGuides = guidesData.filter((g) => g.slug !== guide.slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: guide.title,
        description: guide.metaDescription,
        datePublished: guide.publishedDate,
        dateModified: guide.updatedDate,
        author: {
          '@type': 'Person',
          name: guide.author.name,
          jobTitle: guide.author.role,
          url: `https://crownmoney.com.au/author/${guide.author.slug}`
        },
        reviewedBy: {
          '@type': 'Person',
          name: guide.reviewedBy.name,
          jobTitle: guide.reviewedBy.role,
          url: `https://crownmoney.com.au/author/${guide.reviewedBy.slug}`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Crown Money Management',
          url: 'https://crownmoney.com.au'
        },
        mainEntityOfPage: `https://crownmoney.com.au/guides/${guide.slug}`
      },
      {
        '@type': 'FAQPage',
        mainEntity: guide.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://crownmoney.com.au/' },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://crownmoney.com.au/guides' },
          { '@type': 'ListItem', position: 3, name: guide.title, item: `https://crownmoney.com.au/guides/${guide.slug}` }
        ]
      }
    ]
  };

  return (
    <div className="pt-10 pb-24 bg-white">
      <SEO
        title={guide.seoTitle}
        description={guide.metaDescription}
        ogType="article"
        canonicalUrl={`https://crownmoney.com.au/guides/${guide.slug}`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      {/* Hero Header */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/guides" className="inline-flex items-center gap-2 text-gold text-sm font-bold mb-6 hover:underline">
            <ArrowLeft size={16} /> Back to All Mortgage Guides
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-gray-300">
            <span className="bg-white/10 text-gold font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {guide.cluster}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {guide.readTime}
            </span>
            <span>Last Updated: {guide.updatedDate}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6">
            {guide.h1}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
            {guide.excerpt}
          </p>

          {/* Author & Reviewer Byline (YMYL E-E-A-T) */}
          <div className="bg-white/10 border border-white/15 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-4">
              <img
                src={guide.author.image}
                alt={guide.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gold"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="font-bold text-white">
                  Written by{' '}
                  <Link to={`/author/${guide.author.slug}`} className="text-gold hover:underline">
                    {guide.author.name}
                  </Link>
                </div>
                <div className="text-xs text-gray-300">{guide.author.credentials}</div>
              </div>
            </div>
            <div className="text-xs text-gray-300 border-t sm:border-t-0 sm:border-l border-white/15 pt-3 sm:pt-0 sm:pl-4">
              <div className="flex items-center gap-1.5 font-bold text-gold mb-0.5">
                <UserCheck size={14} /> Fact-Checked & Reviewed By
              </div>
              <Link to={`/author/${guide.reviewedBy.slug}`} className="font-semibold text-white hover:underline">
                {guide.reviewedBy.name}
              </Link>
              <div>{guide.reviewedBy.credentials}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-12">
          {guide.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-primary">
                {section.heading}
              </h2>
              {section.body.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-gray-700 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* Interactive Calculator Callout */}
        <div className="my-14 bg-crown-lavender border-2 border-primary/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
              <Calculator size={16} className="text-gold" /> Free Australian Calculator
            </div>
            <h3 className="text-2xl font-display font-bold text-primary mb-2">
              {guide.relatedCalculator.ctaText}
            </h3>
            <p className="text-gray-600 text-sm">
              Test your own home loan balance, interest rate, and monthly cash flow in under 2 minutes.
            </p>
          </div>
          <Link
            to={guide.relatedCalculator.path}
            className="bg-primary text-white px-7 py-4 rounded-full font-bold text-sm whitespace-nowrap hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-lg"
          >
            Open {guide.relatedCalculator.name} <ArrowRight size={16} />
          </Link>
        </div>

        {/* FAQ Section */}
        <section className="my-14">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {guide.faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-bold text-primary mb-2">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* YMYL General Advice Disclaimer */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-xs text-gray-600 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-bold text-primary uppercase tracking-wider">
            <ShieldCheck size={16} className="text-gold" /> General Advice Warning & Credit Licence Disclosure
          </div>
          <p>
            This guide has been prepared by Crown Money Management (Crown Lending Pty Ltd ABN 47 119 504 862, ACN 119 504 862, Australian Credit Licence Number 388 279) for general educational and informational purposes only. It does not take into account your personal objectives, financial situation, or needs. Before acting on any information on this page, you should consider its appropriateness to your circumstances and consult a licensed credit representative or registered tax adviser.
          </p>
        </div>

        {/* Related Guides */}
        <section className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-display font-bold text-primary mb-6">
            Related Australian Mortgage & Cash-Flow Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherGuides.slice(0, 4).map((related) => (
              <Link
                key={related.slug}
                to={`/guides/${related.slug}`}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-crown-lavender border border-gray-100 transition-all block"
              >
                <span className="text-xs font-bold text-gold uppercase tracking-wider">{related.cluster}</span>
                <h3 className="text-lg font-bold text-primary mt-1 mb-2">{related.title}</h3>
                <span className="text-xs font-bold text-primary inline-flex items-center gap-1">
                  Read Guide <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};
