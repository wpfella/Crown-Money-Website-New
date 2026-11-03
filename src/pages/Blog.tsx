import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Clock, ArrowRight, Search, CheckCircle2, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';
import { blogsData, BlogPost } from '../data/blogsData';

const CATEGORIES: Array<'All' | BlogPost['category']> = [
  'All',
  'Debt-Free Milestone',
  'Couples & Families',
  'Cash-Flow Coaching',
  'Loan Structuring',
];

export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogPost['category']>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return blogsData.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.clientName.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.aeoDirectAnswer.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': 'https://crownmoney.com.au/blog#blog',
        name: 'Crown Money Blog — Mortgage Reduction & Cash-Flow Strategy',
        description:
          'Read expert Australian mortgage reduction blog articles, real household strategy breakdowns, and cash-flow coaching insights from Crown Money Management (ACL 388 279).',
        url: 'https://crownmoney.com.au/blog',
        publisher: {
          '@type': 'FinancialService',
          '@id': 'https://crownmoney.com.au/#organization',
          name: 'Crown Money Management',
          legalName: 'Crown Lending Pty Ltd',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Level 19, 180 Lonsdale Street',
            addressLocality: 'Melbourne',
            addressRegion: 'VIC',
            postalCode: '3000',
            addressCountry: 'AU',
          },
        },
        blogPost: blogsData.map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.metaDescription,
          image: post.thumbnailImage,
          datePublished: post.publishedDate,
          dateModified: post.updatedDate,
          url: `https://crownmoney.com.au/blog/${post.slug}`,
          author: {
            '@type': 'Person',
            name: post.author.name,
            url: `https://crownmoney.com.au/author/${post.author.slug}`,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://crownmoney.com.au/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://crownmoney.com.au/blog' },
        ],
      },
    ],
  };

  return (
    <div className="pt-10 bg-gray-50 min-h-screen">
      <SEO
        title="Mortgage Reduction & Cash-Flow Strategy Blog | Crown Money"
        description="Read in-depth Australian mortgage reduction blog posts, real household strategy breakdowns, and cash-flow coaching insights from Crown Money."
        keywords="mortgage reduction blog Australia, pay off mortgage faster blog, home loan strategy articles, cash flow coaching blog, Crown Money blog"
        canonicalUrl="https://crownmoney.com.au/blog"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white/10 text-gold px-4 py-1.5 rounded-full mb-6">
              <BookOpen size={14} /> Australian Mortgage Strategy &amp; Cash-Flow Insights
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              The Crown Money Blog
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              Practical articles, real Australian household strategy breakdowns, and daily interest reduction insights to help you pay off your home loan years sooner.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-300">
              <span className="flex items-center gap-1.5 bg-white/5 px-3.5 py-2 rounded-full border border-white/10">
                <ShieldCheck size={15} className="text-gold" /> Authored under ACL 388 279
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3.5 py-2 rounded-full border border-white/10">
                <CheckCircle2 size={15} className="text-gold" /> $29,327/yr Avg Principal Paydown
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 px-3.5 py-2 rounded-full border border-white/10">
                <Sparkles size={15} className="text-gold" /> 1 Mortgage Paid Off Every 23 Days
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* AEO Direct Overview & Cross-Links Banner */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-crown-lavender/40 border border-primary/10 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                Core Strategy Overview · How Australian Families Cut 10–17 Years Off Their Loans
              </p>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Our blog articles break down the exact financial mechanics used by over 7,000 coached Australian households: routing 100% of household income to offset daily mortgage interest <code className="bg-white px-1.5 py-0.5 rounded text-primary font-mono text-xs">(Balance × Rate) ÷ 365</code>, automating 52-week bill provisions, living on a guilt-free weekly Cash-Diet allowance, and reviewing progress every 90 days with a dedicated Financial Coach.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/success-stories#video-testimonials"
                className="bg-primary text-white px-5 py-3 rounded-full text-xs font-bold hover:bg-opacity-90 transition-all"
              >
                Watch Client Video Testimonials
              </Link>
              <Link
                to="/guides"
                className="bg-white text-primary border border-primary/20 px-5 py-3 rounded-full text-xs font-bold hover:border-primary transition-all"
              >
                Pillar Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-8 bg-gray-50 sticky top-16 z-30 border-b border-gray-200/70 backdrop-blur-md bg-gray-50/95">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              const count =
                category === 'All'
                  ? blogsData.length
                  : blogsData.filter((p) => p.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              aria-label="Search blog articles"
              placeholder="Search articles or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-800 focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </section>

      {/* Blog Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
              <h2 className="text-2xl font-display font-bold text-primary mb-2">No matching blog articles found</h2>
              <p className="text-gray-600 mb-6">Try clearing your search filter or selecting all categories.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="bg-primary text-white px-6 py-3 rounded-full text-sm font-bold"
              >
                Show All Articles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 3) * 0.06 }}
                  className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden flex flex-col h-full group"
                >
                  {/* Editorial Article Cover Image */}
                  <Link to={`/blog/${post.slug}`} className="relative h-52 overflow-hidden block bg-primary/5">
                    <img
                      src={post.thumbnailImage}
                      alt={post.title}
                      width={600}
                      height={360}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/15">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-gold text-primary text-[11px] font-bold px-3 py-1 rounded-full shadow">
                        {post.highlightStat}
                      </span>
                    </div>
                  </Link>

                  {/* Card Body */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span className="font-semibold text-primary">{post.clientName}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>

                      <h2 className="text-xl font-display font-bold text-primary mb-3 leading-snug group-hover:text-gold transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>

                      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {post.aeoDirectAnswer}
                      </p>

                      {/* Key Strategy Pillars */}
                      <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-100 mb-5 text-xs">
                        {post.strategyPillars.slice(0, 2).map((pillar) => (
                          <div key={pillar.label}>
                            <span className="block text-[10px] uppercase tracking-wider text-gray-500">
                              {pillar.label}
                            </span>
                            <strong className="text-primary font-semibold">{pillar.value}</strong>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.image}
                          alt={post.author.name}
                          width={28}
                          height={28}
                          loading="lazy"
                          decoding="async"
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-xs text-gray-600 font-medium">{post.author.name}</span>
                      </div>

                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-gold transition-colors"
                      >
                        <BookOpen size={14} />
                        <span>Read Article</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA with Backlink to Success Stories & Video Testimonials */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="bg-primary text-white rounded-3xl p-10 md:p-14 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Write Your Own Debt-Free Story?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Book a free 45-minute Discovery &amp; Cash-Flow Strategy Session with our licensed mortgage reduction specialists (ACL 388 279), or watch our client video testimonials on the Success Stories page.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="bg-gold text-primary px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg"
              >
                Book Your Free Strategy Session
              </Link>
              <Link
                to="/success-stories#video-testimonials"
                className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                Watch Client Video Testimonials
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
