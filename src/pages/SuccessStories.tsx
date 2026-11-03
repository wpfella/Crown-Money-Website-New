import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, Quote, TrendingDown, Calendar, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SEO } from '../components/SEO';
import { caseStudiesData } from '../data/caseStudiesData';
import { blogsData } from '../data/blogsData';

export const SuccessStories = () => {
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    // Dynamically inject the Elfsight script for Google Reviews
    const existingScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const stories = [
    {
      name: "Melanie and Jeffrey",
      image: "https://storage.googleapis.com/crown_money/Website/About/Testimonials/Melanie%20and%20Jeffrey%20.jpg",
      result: "17 Years Saved",
      summary: "We’ve been with Crown Money for just over 12 months and it’s been a real game-changer for us. Previously we were on track to pay our mortgage off in another 20 years but now it’s looking like we could get it done in 3!",
      outcome: "Investment Property Purchased"
    },
    {
      name: "Natalie",
      image: "https://storage.googleapis.com/crown_money/Website/About/Testimonials/Natalie.png",
      result: "3x Faster Payoff",
      summary: "When I joined Crown I paid off in my first year as much as I had in the previous 3 years!! I was amazed how the programme made me so disciplined and allowed me to actually enjoy life.",
      outcome: "Debt-free in next few years"
    },
    {
      name: "Jemima and Brad",
      image: "https://storage.googleapis.com/crown_money/Website/About/Testimonials/Jemima-and-Brad.png",
      result: "Debt Free at 36",
      summary: "Brad has been with Crown for 17 years. Scott's guidance and advice has helped us progress to an amazing financial position where we are getting close to paying off our house mortgage.",
      outcome: "Total Financial Freedom"
    },
    {
      name: "Daniel and Carla",
      image: "https://storage.googleapis.com/crown_money/Website/About/Testimonials/Daniel-and-Carla.png",
      result: "10 Years Saved",
      summary: "Daniel and Carla are on track to save themselves 10 years of loan repayments, with a whopping 28% savings rate. The programme has taught us to think about what is really important for the family.",
      outcome: "28% Savings Rate"
    },
    {
      name: "Michael",
      image: "https://storage.googleapis.com/crown_money/Website/About/Testimonials/Michael.png",
      result: "Debt-free in 8 Years",
      summary: "The process is so simple and has given me far more discipline and accountability for my expenses which on a single income is a necessity. Results have surpassed any of my wildest expectations.",
      outcome: "On track for 8-year payoff"
    },
    {
      name: "Giovanni and Sarah",
      image: "https://storage.googleapis.com/crown_money/Website/About/Testimonials/Giovanni-and-Sarah.png",
      result: "12 Years Saved",
      summary: "After making a massive dent in our home loan this past year, we are now planning our first family overseas holiday all thanks to Crown Money. We highly recommend Scott and the team.",
      outcome: "12 Years Cut Off Loan"
    }
  ];

  const videos = blogsData.map((blog) => ({
    title: blog.shortTitle,
    url: blog.videoUrl,
    description: blog.summary,
    blogSlug: blog.slug,
    highlightStat: blog.highlightStat,
  }));

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": stories.map((story, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": story.name
        },
        "reviewBody": story.summary,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "itemReviewed": {
          "@type": "Organization",
          "name": "Crown Money"
        }
      }
    }))
  };

  const visibleVideos = videos.slice(0, visibleCount);
  const hasMore = visibleCount < videos.length;

  return (
    <div className="pt-10">
      <SEO
        title="Mortgage Reduction Success Stories & Results | Crown Money"
        description="Explore real mortgage reduction success stories and case studies from Australian families who cut 10–17 years and $320k+ off their home loans."
        keywords="mortgage success stories, debt reduction results, client testimonials Crown Money, financial freedom Australia, mortgage reduction case studies"
        canonicalUrl="https://crownmoney.com.au/success-stories"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
      </Helmet>
      
      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Mortgage Reduction Success Stories</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how Australian homeowners are cutting 10 to 17 years off their home loans and saving hundreds of thousands in bank interest.
          </p>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs text-primary font-bold uppercase tracking-widest bg-crown-lavender px-3 py-1.5 rounded-full">
              Google Reviews
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mt-4 mb-4">
              What Our Clients Say On Google
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're incredibly proud of our 5-star reputation. Read direct client feedback on our services and strategies.
            </p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
            {/* Elfsight Google Reviews Widget */}
            <div className="elfsight-app-c912648e-ee80-4fa9-aad8-dd9c4c6145fa" data-elfsight-app-lazy></div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs text-primary font-bold uppercase tracking-widest bg-crown-lavender px-3 py-1.5 rounded-full">
              Case Studies
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mt-4 mb-4">
              Featured Client Case Studies
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {caseStudiesData.map((story, idx) => (
              <motion.div 
                key={story.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col h-full"
              >
                <div className="relative h-64">
                  <img 
                    src={story.image} 
                    alt={`${story.name} - Crown Money Mortgage Reduction Case Study`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${story.name}/600/600`;
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-gold text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    {story.result}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    {story.state} · {story.familyType}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-primary mb-3">
                    <Link to={`/success-stories/${story.slug}`} className="hover:text-gold transition-colors">
                      {story.name}
                    </Link>
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div><span className="text-gray-500">Loan:</span> <strong className="text-primary">{story.loanSize}</strong></div>
                    <div><span className="text-gray-500">Term:</span> <strong className="text-primary">{story.startingTerm}</strong></div>
                    <div className="col-span-2"><span className="text-gray-500">Est. Saved:</span> <strong className="text-primary">{story.interestSaved}</strong></div>
                  </div>
                  <p className="text-gray-600 mb-6 flex-grow">{story.summary}</p>
                  <div className="bg-accent/30 p-4 rounded-2xl border border-accent/50 mb-4">
                    <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Outcome</p>
                    <p className="text-lg font-display font-bold text-primary">{story.outcome}</p>
                  </div>
                  <Link
                    to={`/success-stories/${story.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-gold transition-colors"
                  >
                    Read Full Case Study <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section id="video-testimonials" className="py-24 bg-gray-50/50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs text-primary font-bold uppercase tracking-widest bg-crown-lavender px-3 py-1.5 rounded-full">
              Video Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mt-4 mb-4">
              Watch Success Testimonials
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Hear directly from real Australians who have accelerated their timeline and achieved complete financial freedom.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-gold transition-colors"
            >
              Prefer to read? Explore our Mortgage Strategy Blog <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleVideos.map((video, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 3) * 0.1 }}
                className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full group"
              >
                {/* Video Player */}
                <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
                  <video
                    src={video.url}
                    className="w-full h-full object-contain"
                    controls
                    preload="metadata"
                    playsInline
                  />
                </div>
                {/* Text Context */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-primary font-display mb-2 group-hover:text-gold transition-colors duration-200">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {video.description}
                    </p>
                  </div>
                  <div className="mt-2 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      to={`/blog/${video.blogSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-gold transition-colors"
                    >
                      Read Related Blog <ArrowRight size={13} />
                    </Link>
                    <span className="text-xs text-gold font-bold flex items-center gap-1">
                      <Star size={12} className="fill-current" /> Verified Result
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-16 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                Load More Video Testimonials
                <ChevronDown size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="bg-crown-lavender p-12 rounded-3xl max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-primary mb-6">Your story could be next.</h2>
              <p className="text-gray-600 mb-10">Join the hundreds of Australian families who have taken control of their mortgage.</p>
              <Link to="/contact" className="bg-primary text-white px-10 py-5 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-xl inline-block">
                Book Free Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
