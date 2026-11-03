import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Calendar,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Calculator,
  Video,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { blogsData } from '../data/blogsData';
import { NotFound } from './NotFound';

export const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogsData.find((p) => p.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  const relatedPosts = blogsData
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : b.category === post.category ? 1 : 0))
    .slice(0, 3);

  const canonicalUrl = `https://crownmoney.com.au/blog/${post.slug}`;

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FinancialService',
        '@id': 'https://crownmoney.com.au/#organization',
        name: 'Crown Money Management',
        legalName: 'Crown Lending Pty Ltd',
        url: 'https://crownmoney.com.au',
        telephone: '1300 882 981',
        email: 'admin@crown.money',
        taxID: 'ABN 47 119 504 862',
        identifier: 'Australian Credit Licence (ACL) 388 279 | ACN 119 504 862',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Level 19, 180 Lonsdale Street',
          addressLocality: 'Melbourne',
          addressRegion: 'VIC',
          postalCode: '3000',
          addressCountry: 'AU',
        },
      },
      {
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#blogposting`,
        headline: post.h1,
        name: post.title,
        description: post.metaDescription,
        image: post.thumbnailImage,
        datePublished: post.publishedDate,
        dateModified: post.updatedDate,
        author: {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.role,
          url: `https://crownmoney.com.au/author/${post.author.slug}`,
        },
        reviewedBy: {
          '@type': 'Person',
          name: post.reviewedBy.name,
          jobTitle: post.reviewedBy.role,
          url: `https://crownmoney.com.au/author/${post.reviewedBy.slug}`,
        },
        publisher: {
          '@id': 'https://crownmoney.com.au/#organization',
        },
        mainEntityOfPage: canonicalUrl,
        video: {
          '@id': `${canonicalUrl}#video`,
        },
      },
      {
        '@type': 'VideoObject',
        '@id': `${canonicalUrl}#video`,
        name: `${post.clientName} — Crown Money Mortgage Reduction Video Testimonial`,
        description: post.aeoDirectAnswer,
        contentUrl: post.videoUrl,
        thumbnailUrl: post.thumbnailImage,
        uploadDate: `${post.publishedDate}T09:00:00+10:00`,
        publisher: {
          '@id': 'https://crownmoney.com.au/#organization',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: post.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://crownmoney.com.au/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://crownmoney.com.au/blog' },
          { '@type': 'ListItem', position: 3, name: post.shortTitle, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <div className="pt-10 bg-gray-50 min-h-screen">
      <SEO
        title={post.seoTitle}
        description={post.metaDescription}
        canonicalUrl={canonicalUrl}
        ogType="article"
        ogImage={post.thumbnailImage}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaGraph)}</script>
      </Helmet>

      {/* Header / Breadcrumb Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/blog" className="hover:text-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-gold font-semibold" aria-current="page">
                {post.shortTitle}
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-gold text-primary text-xs font-bold px-3.5 py-1 rounded-full">
              {post.category}
            </span>
            <span className="bg-white/10 text-white text-xs font-semibold px-3.5 py-1 rounded-full flex items-center gap-1.5">
              <Video size={13} className="text-gold" /> Verified Video Case Study
            </span>
            <span className="text-xs text-gray-300 flex items-center gap-1">
              <Clock size={13} /> {post.readTime}
            </span>
            <span className="text-xs text-gray-300 flex items-center gap-1">
              <Calendar size={13} /> Updated {post.updatedDate}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6">{post.h1}</h1>

          {/* Author & Reviewer Credentials */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 text-xs text-gray-300">
            <div className="flex items-center gap-3">
              <img
                src={post.author.image}
                alt={post.author.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border border-gold"
              />
              <div>
                <span className="block text-gray-400">Written by</span>
                <Link to={`/author/${post.author.slug}`} className="font-bold text-white hover:text-gold">
                  {post.author.name}
                </Link>{' '}
                <span>({post.author.role})</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={post.reviewedBy.image}
                alt={post.reviewedBy.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border border-white/30"
              />
              <div>
                <span className="block text-gray-400">Fact-checked &amp; reviewed by</span>
                <Link to={`/author/${post.reviewedBy.slug}`} className="font-bold text-white hover:text-gold">
                  {post.reviewedBy.name}
                </Link>{' '}
                <span>({post.reviewedBy.role} · ACL 388 279)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Content */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-10">
          {/* Embedded Client Testimonial Video */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-black aspect-video flex items-center justify-center">
              <video
                src={post.videoUrl}
                className="w-full h-full object-contain"
                controls
                preload="metadata"
                playsInline
              />
            </div>
            <div className="p-5 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wider">
                  Verified Client Video Testimonial · {post.clientName}
                </p>
                <p className="text-xs text-gray-600">{post.summary}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-crown-lavender px-3.5 py-1.5 rounded-full">
                <ShieldCheck size={14} /> Crown Lending Pty Ltd · ACL 388 279
              </span>
            </div>
          </div>

          {/* AEO Direct Answer / Executive Summary Box */}
          <section
            aria-label="Quick Summary and Key Takeaways"
            className="bg-crown-lavender/50 border-2 border-primary/15 rounded-3xl p-6 md:p-8 space-y-6"
          >
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <Sparkles size={16} className="text-gold" />
              <span>Quick Summary (TL;DR)</span>
            </div>
            <p className="text-base md:text-lg text-primary font-medium leading-relaxed">
              {post.aeoDirectAnswer}
            </p>

            <div>
              <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">
                Key Strategy Takeaways From {post.clientName}’s Story
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {post.keyTakeaways.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-white/90 p-3.5 rounded-2xl border border-primary/10 flex items-start gap-2.5 text-sm text-gray-700"
                  >
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 4 Strategy Pillars Grid */}
          <section aria-label="Strategy Pillars" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {post.strategyPillars.map((pillar) => (
              <div
                key={pillar.label}
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center"
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  {pillar.label}
                </p>
                <p className="text-sm md:text-base font-display font-bold text-primary">{pillar.value}</p>
              </div>
            ))}
          </section>

          {/* Long-Form SEO/AEO Article Sections */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10">
            {post.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-primary">
                  {section.heading}
                </h2>
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-gray-700 leading-relaxed text-base md:text-lg">
                    {para}
                  </p>
                ))}
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-2.5 pt-2 pl-1">
                    {section.bulletPoints.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle2 size={18} className="text-gold shrink-0 mt-1" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Structured Comparison Table */}
            <section className="pt-4">
              <h2 className="text-2xl font-display font-bold text-primary mb-4">
                {post.comparisonTable.caption}
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-left border-collapse">
                  <caption className="sr-only">{post.comparisonTable.caption}</caption>
                  <thead>
                    <tr className="bg-primary text-white text-xs uppercase tracking-wider">
                      {post.comparisonTable.headers.map((header) => (
                        <th key={header} scope="col" className="p-4 font-bold">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-sm">
                    {post.comparisonTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-4 ${
                              cIdx === 0
                                ? 'font-bold text-primary'
                                : cIdx === 2
                                ? 'font-semibold text-emerald-800 bg-emerald-50/40'
                                : 'text-gray-600'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Contextual Internal Links */}
            <section className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-4">
              <h2 className="text-lg font-display font-bold text-primary flex items-center gap-2">
                <Calculator size={18} className="text-gold" />
                <span>Model This Strategy on Your Own Australian Home Loan</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <Link
                  to="/mortgage-reduction-calculator"
                  className="bg-white p-4 rounded-xl border border-gray-200 hover:border-primary transition-all flex items-center justify-between group"
                >
                  <div>
                    <strong className="block text-primary group-hover:text-gold transition-colors">
                      Mortgage Reduction Calculator
                    </strong>
                    <span className="text-xs text-gray-600">
                      Compare a 30-year bank schedule vs Crown Money HOP
                    </span>
                  </div>
                  <ArrowRight size={16} className="text-primary shrink-0" />
                </Link>
                <Link
                  to="/guides/how-to-pay-off-your-mortgage-faster-australia"
                  className="bg-white p-4 rounded-xl border border-gray-200 hover:border-primary transition-all flex items-center justify-between group"
                >
                  <div>
                    <strong className="block text-primary group-hover:text-gold transition-colors">
                      Pillar Guide: Pay Off Mortgage Faster
                    </strong>
                    <span className="text-xs text-gray-600">
                      Full breakdown of daily interest &amp; 3-bucket cash flow
                    </span>
                  </div>
                  <ArrowRight size={16} className="text-primary shrink-0" />
                </Link>
              </div>
            </section>
          </div>

          {/* FAQ Section (AEO & Schema.org FAQPage) */}
          <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-2">
              <HelpCircle size={16} className="text-gold" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-6">
              Common Questions About {post.shortTitle}’s Strategy
            </h2>
            <div className="space-y-4">
              {post.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                  <h3 className="text-lg font-display font-bold text-primary mb-2">{faq.question}</h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Author Bio Box */}
          <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src={post.author.image}
              alt={post.author.name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-2xl object-cover shrink-0"
            />
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gold">About the Author</span>
              <h2 className="text-xl font-display font-bold text-primary">
                <Link to={`/author/${post.author.slug}`} className="hover:text-gold transition-colors">
                  {post.author.name} — {post.author.role}
                </Link>
              </h2>
              <p className="text-xs font-semibold text-gray-500">{post.author.credentials}</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Crown Money Management (operated by Crown Lending Pty Ltd, ABN 47 119 504 862, ACN 119 504 862, Australian Credit Licence 388 279) is located at Level 19, 180 Lonsdale Street, Melbourne VIC 3000. and helps homeowners Australia-wide pay off their mortgages in half the time.
              </p>
            </div>
          </section>

          {/* Related Video Blogs */}
          <section className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-primary">More Video Testimonial Blogs</h2>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-gold"
              >
                <ArrowLeft size={16} /> All 19 Video Blogs
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-crown-lavender text-primary px-2.5 py-1 rounded-full mb-3">
                      {related.highlightStat}
                    </span>
                    <h3 className="text-base font-display font-bold text-primary group-hover:text-gold transition-colors mb-2">
                      {related.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-4">{related.summary}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                    Watch &amp; Read <ArrowRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="bg-primary text-white rounded-3xl p-8 md:p-12 text-center shadow-xl">
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-4">
              See How Many Years You Could Cut Off Your Home Loan
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Book your free, no-obligation 1-on-1 Discovery &amp; Cash-Flow Strategy Session with a Crown Money specialist today.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-gold text-primary px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg"
            >
              Book Free Strategy Session
            </Link>
          </section>
        </div>
      </article>
    </div>
  );
};
