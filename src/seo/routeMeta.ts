import { guidesData } from '../data/guidesData';
import { caseStudiesData } from '../data/caseStudiesData';

export interface RouteSeoData {
  path: string;
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
  h1: string;
  h2s: string[];
  paragraphs: string[];
  images?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  tables?: {
    caption: string;
    headers: string[];
    rows: string[][];
  }[];
  subSections?: {
    parentH2Index: number;
    items: { title: string; content: string }[];
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  citations?: {
    label: string;
    url: string;
    summary: string;
  }[];
  contextualLinks?: {
    label: string;
    path: string;
    description: string;
  }[];
  schema: Record<string, unknown>;
}

const BASE_URL = 'https://crownmoney.com.au';
const DEFAULT_OG_IMAGE = 'https://storage.googleapis.com/crown_money/Website/Images/happy%20couple.png';

export const LEGACY_REDIRECTS: Record<string, string> = {
  '/blog': '/guides',
  '/articles': '/guides',
  '/resources': '/guides',
  '/news': '/guides',
  '/learn': '/guides',
  '/how-to-pay-off-your-mortgage-faster': '/guides/how-to-pay-off-your-mortgage-faster-australia',
  '/offset-vs-redraw': '/guides/offset-account-vs-redraw-facility-australia',
  '/fees': '/guides/crown-money-fees-suitability-and-results-explained',
  '/is-crown-money-legit': '/guides/crown-money-fees-suitability-and-results-explained',
  '/calculator': '/mortgage-reduction-calculator',
  '/calculators': '/tools',
  '/mortgage-calculator': '/mortgage-reduction-calculator',
  '/about-us': '/about',
  '/our-team': '/about',
  '/team': '/about',
  '/contact-us': '/contact',
  '/book': '/contact',
  '/book-a-call': '/contact',
  '/testimonials': '/reviews',
  '/client-reviews': '/reviews',
  '/case-studies': '/success-stories',
  '/results': '/success-stories',
  '/home-ownership-programme': '/how-it-works',
  '/home-ownership-program': '/how-it-works',
  '/hop': '/how-it-works',
  '/privacy-policy': '/privacy',
  '/tmd': '/target-market-determinations',
};

export const organizationSchema = {
  '@type': 'FinancialService',
  '@id': `${BASE_URL}/#organization`,
  name: 'Crown Money Management',
  legalName: 'Crown Lending Pty Ltd',
  url: BASE_URL,
  logo: 'https://storage.googleapis.com/crown_money/Logo%20%26%20Icon/Crown%20Money%20Cropped%20Logo.png',
  image: DEFAULT_OG_IMAGE,
  foundingDate: '2004',
  founder: {
    '@type': 'Person',
    name: 'Scott Parry',
    jobTitle: 'Founder & CEO',
    url: `${BASE_URL}/author/scott-parry`,
  },
  telephone: '1300 882 981',
  email: 'admin@crown.money',
  taxID: 'ABN 47 119 504 862',
  identifier: 'Australian Credit Licence (ACL) 388 279 | ACN 119 504 862',
  priceRange: '$0 - $4,950',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Level 1, 100 Havelock Street',
    addressLocality: 'West Perth',
    addressRegion: 'WA',
    postalCode: '6005',
    addressCountry: 'AU',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Australia',
  },
  sameAs: [
    'https://www.facebook.com/CrownMoneyManagement',
    'https://www.linkedin.com/company/crown-money',
    'https://www.instagram.com/crownmoneyofficial/',
    'https://www.youtube.com/@crownmoneyAU',
    'https://au.trustpilot.com/review/crownmoney.com.au',
    'https://au.trustpilot.com/review/crownmoneymanagement.com.au',
    'https://connectonline.asic.gov.au/',
    'https://www.mfaa.com.au/',
  ],
};

const homepageFaqs = [
  {
    question: 'What is Crown Money Management?',
    answer: 'Crown Money Management (operated by Crown Lending Pty Ltd, ABN 47 119 504 862, ACN 119 504 862, Australian Credit Licence 388 279) is Australia’s leading mortgage reduction and personal cash-flow coaching specialist. Founded in 2004 by Scott Parry, we have helped over 7,000 Australian families pay off 30-year home loans in 10 to 15 years without lifestyle sacrifices.',
  },
  {
    question: 'How is Crown Money different from a standard bank offset account?',
    answer: 'Think of a bank offset account as a gym membership, whereas Crown Money is a gym membership with a dedicated personal trainer built in. After auditing over 6,500 Australian households with existing bank offset accounts, we found the average offset borrower saves under 7% of their net income and only shaves 3.5 to 4.5 years off a 30-year loan. Crown Money combines daily principal reduction, automated 52-week bill provisioning, a ring-fenced weekly Cash-Diet living allowance, and 90-day personal coaching so clients average a 24% savings rate and $29,327/year in net principal reduction.',
  },
  {
    question: 'How much does Crown Money cost and how do you get paid?',
    answer: 'Your initial Discovery & Cash-Flow Strategy Session is 100% free ($0) with zero obligation. When we refinance your mortgage, the lender pays standard broker commission (disclosed in full in your Credit Proposal Disclosure document). Standard loan facility setup fees on our Rate Card include Application ($660), Legal ($500), Valuation ($302.50), Settlement ($150), and Annual Package ($395/yr) where applicable. Custom Money Management & Coaching establishment ranges from $0 to $4,950 depending on household complexity, is only recommended when projected interest savings vastly exceed the fee, and is backed by our 12-Month Debt Reduction Guarantee.',
  },
  {
    question: 'Is Crown Money licensed and regulated in Australia?',
    answer: 'Yes. Crown Money holds Australian Credit Licence (ACL) Number 388 279 regulated by ASIC under the National Consumer Credit Protection Act, operated by Crown Lending Pty Ltd (ABN 47 119 504 862, ACN 119 504 862). We are full members of the Mortgage & Finance Association of Australia (MFAA) and the Australian Financial Complaints Authority (AFCA).',
  },
  {
    question: 'Does Crown Money hold my money or pay my bills for me?',
    answer: 'No. We never hold client funds at any time. Your home loan and bank accounts remain 100% in your own name with regulated Australian banking institutions, and you retain full 24/7 internet and mobile banking access.',
  },
  {
    question: 'Are there any lock-in contracts or exit penalties?',
    answer: 'No. There are zero lock-in contracts and zero Crown Money exit fees. You can stop coaching or refinance at any time without penalty.',
  },
  {
    question: 'How does the 12-Month Debt Reduction Guarantee work?',
    answer: 'We guarantee that if you follow your agreed Home Ownership Programme plan, you will beat your previous 12-month debt reduction results within your first 12 months with Crown Money—or we refund your coaching establishment fee.',
  },
  {
    question: 'Do I need to earn a higher salary to pay off my mortgage in 10 to 15 years?',
    answer: 'No. Most clients achieve a 10–15 year mortgage payoff on their current household income by lifting their net savings rate from the 3.7% ABS national average to 24% through automated payday surplus capture and daily interest offsetting.',
  },
  {
    question: 'How do we access money if an unexpected emergency happens?',
    answer: 'Clients maintain a $1,000–$2,000+ float in their everyday Visa debit account for immediate weekend expenses, plus growing redraw/offset buffers inside their home loan that can be accessed within hours whenever an emergency arises.',
  },
  {
    question: 'Can Crown Money help if we want to buy an investment property or debt recycle?',
    answer: 'Yes. Once your cash-flow engine is established and you have built strong usable equity, our licensed finance brokers (ACL 388 279) can structure clean loan splits for property investment or debt recycling in coordination with your tax adviser.',
  },
];

const staticRoutes: Record<string, RouteSeoData> = {
  '/': {
    path: '/',
    title: 'Pay Off Mortgage Faster | Mortgage Reduction | Crown Money',
    description: "Australian homeowners use Crown Money's money management system to pay off their home loan years sooner. Free mortgage savings check in 2 minutes.",
    canonical: `${BASE_URL}/`,
    h1: 'Helping Aussie Homeowners Pay Their Mortgage Off in Half the Time.',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Website/Images/happy%20couple.png',
        alt: 'Australian homeowners celebrating paying off their mortgage in half the time with Crown Money',
        caption: 'Over 7,000 Australian families have used the Crown Money Home Ownership Programme to slash years off their home loan.',
      },
      {
        src: 'https://storage.googleapis.com/crown_money/Website/About/The-Better-Business-Awards.png',
        alt: 'Crown Money Management team receiving the Better Business Awards for mortgage strategy excellence',
        caption: 'Award-winning Australian mortgage strategists and financial coaches (ACL 388 279).',
      },
    ],
    h2s: [
      'See Your Mortgage Savings Potential',
      'What is Crown Money?',
      'How Our 4-Step Mortgage Reduction System Works',
      'Transparent Fee Structure, Adviser Credentials (ACL 388 279) & 12-Month Guarantee',
      'Verified Australian Client Results ($29,327/yr Average Principal Reduction)',
      'Frequently Asked Questions About Mortgage Reduction',
    ],
    paragraphs: [
      'On a typical $650,000 Australian mortgage at 6.19% p.a. over 30 years, a homeowner pays $781,720 in bank interest alone—bringing total repayments to $1,431,720. Use our interactive Australian Mortgage Reduction Calculator below to compare a standard 30-year bank schedule against the Crown Money Home Ownership Programme (HOP).',
      'Crown Money Management (Crown Lending Pty Ltd ABN 47 119 504 862, ACN 119 504 862, Australian Credit Licence 388 279) is Australia’s leading mortgage reduction and cash-flow coaching specialist. Founded in 2004 by Scott Parry alongside Partner & Senior Finance Broker Craig Parry, we have helped over 7,000 Australian families cut 40% to 50% off their home loan term and interest without sacrificing their lifestyle.',
      'Our 4-step process combines (1) a free 1-on-1 Discovery & Cash-Flow Audit, (2) a custom 3-Bucket Mortgage & Cash-Diet Structure where 100% of income reduces daily loan interest while annual bills and weekly living allowances are automated, (3) a live Wealth Tracking Dashboard showing your exact debt-free calendar date, and (4) quarterly 90-day personal coaching accountability reviews.',
      'Your initial Strategy Session is $0 (free, no obligation). Standard brokerage is paid by the lender (disclosed in your Credit Proposal Disclosure), and custom Money Management & Coaching establishment ($0–$4,950 depending on household complexity) is backed by our 12-Month Debt Reduction Guarantee with zero lock-in contracts and zero exit fees. Your bank accounts and loan remain 100% in your own name with regulated Australian banking institutions.',
      'Audited client results across our active Home Ownership Programme portfolio show an average annual principal reduction of $29,327 per year (compared to the $12,000 Australian national average), an average household savings rate of 24% of net income (compared to the 3.7% ABS national household saving ratio), and 1 Crown Money client paying off their mortgage in full every 23 days.',
      'Below are direct answers to the 10 most common questions Australian homeowners ask about Crown Money, offset accounts, fees, licensing, and how to pay off a home loan in 10 to 15 years.',
    ],
    tables: [
      {
        caption: 'Australian Home Loan Comparison at 6.19% p.a. (Standard 30-Year Bank Schedule vs Crown Money Coached HOP)',
        headers: ['Loan Amount', '30-Yr Bank Interest', 'Crown Coached Term', 'Estimated Interest Saved'],
        rows: [
          ['$500,000', '$601,320', '12 yrs 9 mos', '$368,400 saved'],
          ['$650,000', '$781,720', '13 yrs 4 mos', '$468,900 saved'],
          ['$850,000', '$1,022,250', '14 yrs 2 mos', '$589,100 saved'],
        ],
      },
    ],
    faqs: homepageFaqs,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        {
          '@type': 'WebSite',
          '@id': `${BASE_URL}/#website`,
          name: 'Crown Money',
          url: BASE_URL,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` }],
        },
        {
          '@type': 'FAQPage',
          mainEntity: homepageFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      ],
    },
  },
  '/about': {
    path: '/about',
    title: 'Mortgage Reduction Specialists Australia | Crown Money',
    description: "Meet Crown Money's licensed mortgage reduction specialists and financial coaches. Helping 7,000+ Australian families pay off home loans since 2004.",
    canonical: `${BASE_URL}/about`,
    ogImage: 'https://storage.googleapis.com/crown_money/Website/About/People/Scott_Parry_BW.jpg',
    h1: 'Australia’s Leading Specialists In Money Management',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Website/About/People/Scott_Parry_BW.jpg',
        alt: 'Scott Parry, Founder and CEO of Crown Money Management',
        caption: 'Scott Parry — Founder & CEO of Crown Money Management (Est. 2004).',
      },
      {
        src: 'https://storage.googleapis.com/crown_money/Website/About/People/craig%20parry.png',
        alt: 'Craig Parry, Partner and Senior Finance Broker at Crown Money Management',
        caption: 'Craig Parry — Partner & Senior Finance Broker (ACL 388 279, MFAA Full Member).',
      },
    ],
    h2s: [
      'Our Story & Mission to Help 5,000 Australian Families Per Year',
      'Leadership, Financial Strategists, Finance Brokers & Financial Coaches',
      'Canonical Facts, Licensing (ACL 388 279) & Results Methodology',
    ],
    paragraphs: [
      'Founded in 2004 by CEO Scott Parry alongside Partner & Senior Finance Broker Craig Parry, Crown Money Management (Crown Lending Pty Ltd ABN 47 119 504 862, ACN 119 504 862, Australian Credit Licence 388 279) is on a mission to help Australian families escape the 30-year mortgage trap.',
      'Our multidisciplinary team includes Senior Financial Strategists, MFAA-accredited Senior Finance and Mortgage Brokers, dedicated Post-Settlement Financial Coaches, Financial Associates, Credit Assessors, and Client Care Officers servicing homeowners across Australia from our West Perth head office (Level 1, 100 Havelock Street, West Perth WA 6005).',
      'Canonical Verified Results: Over 7,000 Australian households coached since 2004; $29,327 average annual principal reduction (vs $12,000 national average); 24% average client household savings rate (vs 3.7% ABS national average); 1 client mortgage paid off in full every 23 days.',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        {
          '@type': 'AboutPage',
          name: 'Mortgage Reduction Specialists Australia | Crown Money',
          url: `${BASE_URL}/about`,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'About Us', item: `${BASE_URL}/about` },
          ],
        },
      ],
    },
  },
  '/how-it-works': {
    path: '/how-it-works',
    title: 'How Mortgage Reduction Works | 4-Step System | Crown Money',
    description: "See how Crown Money's 4-step mortgage reduction and cash-flow coaching system helps Australian homeowners pay off their home loans in half the time.",
    canonical: `${BASE_URL}/how-it-works`,
    h1: 'How Our Mortgage Reduction System Works',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Website/Images/happy%20couple.png',
        alt: 'How the Crown Money 4-step Home Ownership Programme works for Australian homeowners',
      },
    ],
    h2s: [
      'The 4-Step Crown Money Process',
      'Why the Home Ownership Programme Outperforms a Standard Bank Offset Account',
      'Real-Time Wealth Tracking Dashboard & 90-Day Coaching Reviews',
      'Transparent Fees, Licensing & Suitability',
    ],
    paragraphs: [
      'Step 1: Free Discovery & Strategy Call — We audit your current mortgage structure, interest rate, and household cash flow to calculate your exact time and interest savings potential.',
      'Step 2: Custom Mortgage & Cash-Flow Architecture — Our licensed finance brokers (ACL 388 279) structure your loan so 100% of your income offsets daily mortgage interest immediately while automating 52-week bill provisioning and a separate weekly living allowance.',
      'Step 3: Seamless Onboarding & Automation — We configure your accounts and real-time Wealth Tracking Dashboard so you know the exact calendar date your home loan hits $0.',
      'Step 4: Ongoing 90-Day Personal Financial Coaching — Your dedicated Financial Coach reviews your savings rate, principal reduction velocity, and equity position every quarter until you are debt-free.',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How Our Mortgage Reduction System Works',
      description: '4-step mortgage reduction and cash-flow coaching process for Australian homeowners.',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Discovery & Strategy Session', text: 'Free 1-on-1 audit of your current home loan and household cash flow.' },
        { '@type': 'HowToStep', position: 2, name: 'Custom Loan & Cash-Diet Setup', text: 'Restructure your mortgage to reduce daily interest and separate bills from weekly spending.' },
        { '@type': 'HowToStep', position: 3, name: 'Dashboard & Automation Onboarding', text: 'Connect your real-time Wealth Tracking Dashboard to monitor your exact debt-free date.' },
        { '@type': 'HowToStep', position: 4, name: '90-Day Financial Coaching Reviews', text: 'Quarterly accountability sessions with your dedicated Financial Coach.' },
      ],
    },
  },
  '/reviews': {
    path: '/reviews',
    title: 'Crown Money Reviews & Client Ratings | Crown Money',
    description: 'Read 380+ verified 5-star Crown Money reviews and video testimonials from Australian homeowners paying off their mortgages years ahead of schedule.',
    canonical: `${BASE_URL}/reviews`,
    ogImage: 'https://storage.googleapis.com/crown_money/Website/About/Testimonials/Melanie%20and%20Jeffrey%20.jpg',
    h1: 'Crown Money Reviews & Client Feedback',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Website/About/Testimonials/Melanie%20and%20Jeffrey%20.jpg',
        alt: 'Melanie and Jeffrey — Verified 5-Star Crown Money Review (17 Years Saved)',
      },
      {
        src: 'https://storage.googleapis.com/crown_money/Website/About/Testimonials/Natalie.png',
        alt: 'Natalie — Verified 5-Star Crown Money Review (3x Faster Principal Reduction)',
      },
    ],
    h2s: [
      '4.9 / 5.0 Rating Across 380+ Verified Australian Client Reviews',
      'Verified Customer Reviews from Google & Trustpilot',
      'Video Testimonials From Mortgage-Free Australian Families',
      'Frequently Asked Questions About Crown Money Reviews & Legitimacy',
    ],
    paragraphs: [
      'Crown Money Management (Crown Lending Pty Ltd, ABN 47 119 504 862, Australian Credit Licence 388 279) holds a 4.9 out of 5.0 star rating across 384+ verified Google and Trustpilot reviews from Australian homeowners. 95% of verified reviewers rate Crown Money 5 stars, 4% rate 4 stars, and 1% rate 3 stars.',
      'Melanie & Jeffrey (NSW, 5 Stars): "We’ve been with Crown Money for just over 12 months and it’s been a real game-changer for us. Previously we were on track to pay our mortgage off in another 20 years, but now it’s looking like we could get it done in 3! Scott and the team made the entire process clear, supportive, and completely stress-free." | Natalie (VIC, 5 Stars): "When I joined Crown I paid off in my first year as much as I had in the previous 3 years!! I was amazed how the programme made me so disciplined and allowed me to actually enjoy life while staying on track." | Jemima & Brad (SA, 5 Stars): "Brad has been with Crown for 17 years. Scott’s guidance and advice has helped us progress to an amazing financial position where we are getting close to paying off our house mortgage completely at age 36." | Daniel & Carla (WA, 5 Stars): "On track to save 10 years of loan repayments with a whopping 28% savings rate." | Michael (QLD, 5 Stars): "Results have surpassed any of my wildest expectations and I am tracking for an 8-year total payoff on a single income." | Giovanni & Sarah (SA, 5 Stars): "After making a massive dent in our home loan this past year, we are now planning our first family overseas holiday all thanks to Crown Money. We highly recommend Craig and the team."',
      'Watch 10+ unedited client video testimonials including Kamani & Scott, Chris Battistuzzi, Dominic & Elisabeth Lobosso, Ella, Graham, Linda Taylor (Debt Free), Marcus & Taryn Burdett, the McColley Family, and the Monaghan Family.',
      'All reviews are from verified Australian clients coached under ACL 388 279. Read our full fee and results methodology guide at /guides/crown-money-fees-suitability-and-results-explained.',
    ],
    tables: [
      {
        caption: 'Crown Money Verified Client Rating Distribution (384+ Reviews)',
        headers: ['Star Rating', 'Share of Reviews', 'Key Client Feedback Themes'],
        rows: [
          ['5 Stars (★★★★★)', '95%', '10–17 years saved, stress-free bill automation, supportive 90-day coaches'],
          ['4 Stars (★★★★☆)', '4%', 'Strong interest savings; initial paperwork during bank refinance'],
          ['3 Stars (★★★☆☆)', '1%', 'Weekly cash-diet allowance requires adjustment in the first 30 days'],
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Crown Money legitimate or a scam?',
        answer: 'Crown Money Management is 100% legitimate and regulated by ASIC under Australian Credit Licence (ACL) Number 388 279, operated by Crown Lending Pty Ltd (ABN 47 119 504 862, ACN 119 504 862). Founded in 2004 by Scott Parry, we have helped over 7,000 Australian families pay off their mortgages faster.',
      },
      {
        question: 'What is Crown Money’s average rating on Google and Trustpilot?',
        answer: 'Crown Money holds an average rating of 4.9 out of 5.0 stars across more than 380 verified client reviews on Google and Trustpilot.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        {
          '@type': 'WebPage',
          '@id': `${BASE_URL}/reviews#webpage`,
          name: 'Crown Money Reviews & Client Ratings | Crown Money',
          url: `${BASE_URL}/reviews`,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Reviews', item: `${BASE_URL}/reviews` },
          ],
        },
      ],
    },
  },
  '/success-stories': {
    path: '/success-stories',
    title: 'Mortgage Reduction Success Stories & Results | Crown Money',
    description: 'Explore real mortgage reduction success stories and case studies from Australian families who cut 10–17 years and $320k+ off their home loans.',
    canonical: `${BASE_URL}/success-stories`,
    h1: 'Mortgage Reduction Success Stories',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Website/About/Testimonials/Melanie%20and%20Jeffrey%20.jpg',
        alt: 'Melanie and Jeffrey — 17 Years Saved on a $580,000 Mortgage',
      },
    ],
    h2s: [
      'Featured Australian Homeowner Case Studies (With Loan Sizes & Years Saved)',
      'What Our Clients Say On Google',
      'Watch Verified Client Video Testimonials',
    ],
    paragraphs: [
      'Explore detailed Australian mortgage reduction case studies showing starting loan balances, remaining terms, household savings rates, years shaved off the mortgage, and estimated interest saved.',
      'Featured outcomes include Melanie & Jeffrey ($580,000 loan, 17 years saved, 31% savings rate), Natalie ($440,000 single-income loan, 3x faster principal reduction), Jemima & Brad ($520,000 loan, on track to be debt-free at age 36), Daniel & Carla ($670,000 loan, 10 years saved with a 28% savings rate), Michael ($490,000 single-income loan, 8-year payoff trajectory), and Giovanni & Sarah ($615,000 loan, 12 years cut off their home loan).',
      'Every case study includes a Before vs After financial table, a month-by-month implementation timeline, and verified client commentary.',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        {
          '@type': 'CollectionPage',
          name: 'Mortgage Reduction Success Stories & Results | Crown Money',
          url: `${BASE_URL}/success-stories`,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Success Stories', item: `${BASE_URL}/success-stories` },
          ],
        },
      ],
    },
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Crown Money | Free Mortgage Strategy Session',
    description: 'Book a free mortgage reduction strategy session with Crown Money. Call 1300 882 981 or visit our Australian office to pay off your home loan faster.',
    canonical: `${BASE_URL}/contact`,
    h1: 'Contact Our Mortgage Reduction Specialists',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Logo%20%26%20Icon/Crown%20Money%20Cropped%20Logo.png',
        alt: 'Crown Money Management Head Office — West Perth WA',
      },
    ],
    h2s: [
      'Book Your Free 1-on-1 Mortgage Strategy Session',
      'Contact Information & Australian Office Address',
      'What Happens in Your Free Discovery Session?',
    ],
    paragraphs: [
      'Speak with a licensed Financial Strategist at Crown Money Management (Crown Lending Pty Ltd ABN 47 119 504 862, ACN 119 504 862, Australian Credit Licence 388 279).',
      'Phone: 1300 882 981 (Monday to Friday, 8:30am – 5:30pm AWST). Email: admin@crown.money. Head Office: Level 1, 100 Havelock Street, West Perth WA 6005. Video and phone consultations available Australia-wide across Sydney, Melbourne, Brisbane, Adelaide, and Perth.',
      'During your free 45-minute strategy call, we model your current mortgage payoff trajectory against our Home Ownership Programme so you can see exactly how many years and how much interest you can save before making any decision.',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Crown Money | Free Mortgage Strategy Session',
      url: `${BASE_URL}/contact`,
      mainEntity: organizationSchema,
    },
  },
  '/mortgage-reduction-calculator': {
    path: '/mortgage-reduction-calculator',
    title: 'Mortgage Reduction Calculator Australia | Crown Money',
    description: 'Calculate how much interest and time you can save on your Australian home loan with our free Mortgage Reduction Calculator. Get results in 2 minutes.',
    canonical: `${BASE_URL}/mortgage-reduction-calculator`,
    h1: 'Mortgage Reduction Calculator: See How Much You Can Save',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Website/Images/happy%20couple.png',
        alt: 'Australian Mortgage Reduction Calculator by Crown Money Management',
      },
    ],
    h2s: [
      'How to Use This Australian Mortgage Reduction Calculator',
      'Calculator Assumptions & Daily Interest Formula',
      'Worked Australian Home Loan Reduction Examples ($500k, $650k, $850k at 6.19% p.a.)',
      'Frequently Asked Questions About Mortgage Reduction Calculations',
    ],
    paragraphs: [
      'Step 1: Enter your current Australian home loan balance ($100,000 to $2,500,000+), current interest rate (% p.a.), and remaining loan term. Step 2: Input your net monthly household income and living expenses to compare a standard 30-year bank principal-and-interest schedule against the Crown Money Home Ownership Programme (HOP).',
      'Assumptions: Standard bank amortisation assumes monthly principal-and-interest repayments over the remaining term with interest calculated daily ((Balance × Rate) ÷ 365) and charged monthly. The Crown Money HOP projection models daily working-capital salary offsetting combined with coached monthly surplus capture.',
      'Worked Example ($650,000 Mortgage at 6.19% p.a.): A standard 30-year bank schedule requires $3,977/month and costs $781,720 in total interest. By capturing $1,450/month in household surplus and offsetting daily working capital, the payoff term drops to 13 years and 4 months—saving 16 years and 8 months and $468,900 in bank interest.',
      'Want a tailored calculation based on your actual bank statements? Book a free 1-on-1 strategy session with our licensed team (ACL 388 279).',
    ],
    tables: [
      {
        caption: 'Worked Australian Home Loan Reduction Examples at 6.19% p.a.',
        headers: ['Loan Balance', '30-Yr Bank Interest', 'Coached Payoff Term', 'Est. Interest Saved'],
        rows: [
          ['$500,000', '$601,320', '12 yrs 9 mos', '$368,400 saved'],
          ['$650,000', '$781,720', '13 yrs 4 mos', '$468,900 saved'],
          ['$850,000', '$1,022,250', '14 yrs 2 mos', '$589,100 saved'],
        ],
      },
    ],
    faqs: [
      {
        question: 'How does the Mortgage Reduction Calculator estimate years saved?',
        answer: 'It compares a standard monthly principal-and-interest amortisation curve against daily salary interest offsetting plus automated monthly surplus principal reduction under the Crown Money Home Ownership Programme.',
      },
      {
        question: 'Do I need to earn more money to achieve the calculator’s projected savings?',
        answer: 'No. Across 7,000+ Australian households coached since 2004, clients achieve an average 24% savings rate and $29,327/year in principal paydown on their existing income by eliminating cash-flow leaks and automating bill provisioning.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Mortgage Reduction Calculator Australia',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      url: `${BASE_URL}/mortgage-reduction-calculator`,
      author: organizationSchema,
    },
  },
  '/tools': {
    path: '/tools',
    title: 'Mortgage & Financial Calculators Australia | Crown Money',
    description: 'Free Australian mortgage and financial calculators: compare rent vs buy, debt recycling, redraw impact, net worth, and extra home loan repayments.',
    canonical: `${BASE_URL}/tools`,
    h1: 'Australian Mortgage & Financial Calculators',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Website/Images/happy%20couple.png',
        alt: 'Free Australian Mortgage and Wealth Calculators by Crown Money',
      },
    ],
    h2s: [
      'Interactive Home Loan Repayment, Extra Repayment & Stamp Duty Calculators',
      'Advanced Australian Strategy Tools (Rent vs Buy, Net Worth, Debt Recycling, Budget, Redraw Impact)',
      'How to Choose the Right Mortgage Calculator for Your Goal',
    ],
    paragraphs: [
      'Explore Crown Money’s complete suite of free Australian mortgage and wealth calculators: Mortgage Reduction Calculator, Rent vs Buy Calculator Australia, Net Worth Calculator Australia, Debt Recycling Calculator Australia, Household Budget & Cash Flow Calculator, Home Loan Redraw & Offset Withdrawal Calculator, and Cost of Spending From Your Redraw Calculator.',
      'Every calculator is built specifically for Australian lending rules, marginal tax brackets, state stamp duty schedules, and daily mortgage interest calculations.',
      'Pair these calculators with our 5 comprehensive Australian mortgage reduction guides at /guides and verified client case studies at /success-stories.',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Mortgage & Financial Calculators Australia | Crown Money',
      url: `${BASE_URL}/tools`,
    },
  },
  '/tools/rent-vs-buy': {
    path: '/tools/rent-vs-buy',
    title: 'Rent vs Buy Calculator Australia | Crown Money',
    description: 'Compare the true long-term cost of renting vs buying a home in Australia. Factor in stamp duty, deposit, maintenance, and property growth today.',
    canonical: `${BASE_URL}/tools/rent-vs-buy`,
    h1: 'Rent vs Buy Calculator Australia',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Website/Images/happy%20couple.png',
        alt: 'Rent vs Buy Calculator Australia — Compare Long-Term Equity vs Renting',
      },
    ],
    h2s: [
      'How to Use the Australian Rent vs Buy Calculator',
      'Key Australian Property & Opportunity Cost Assumptions',
      'Worked Australian Example: Renting at $650/wk vs Buying an $850,000 Home',
      'Frequently Asked Questions About Renting vs Buying in Australia',
    ],
    paragraphs: [
      'Enter your current weekly rent ($/week), expected annual rent inflation (%), target Australian property purchase price ($), saved deposit ($), state stamp duty & settlement costs ($), mortgage interest rate (% p.a.), and capital growth rate (% p.a.) over a 5 to 30 year comparison period.',
      'Our model accounts for ongoing homeownership costs—including council rates ($2,500/yr default), building insurance ($1,500/yr default), and annual property maintenance (1.0% of property value)—and compares your projected net property equity against the opportunity cost of investing your deposit and stamp duty in a diversified portfolio.',
      'Worked Example ($850,000 Purchase vs $650/wk Rent over 10 Years): With a $170,000 (20%) deposit, $35,000 stamp duty, 6.19% p.a. mortgage rate, and 4.5% p.a. annual capital growth, the property grows to $1,320,024 in 10 years with ~$765,000 in net home equity—accelerating further to over $910,000 in equity when paired with Crown Money’s 13-year principal reduction strategy.',
      'Ready to transition from renting to owning—or want to pay off the home you already own in half the time? Read our Pillar Guide at /guides/how-to-pay-off-your-mortgage-faster-australia or book a free strategy session.',
    ],
    faqs: [
      {
        question: 'Does the Rent vs Buy Calculator include Australian stamp duty and council rates?',
        answer: 'Yes. You can customise state stamp duty, legal/conveyancing costs, annual council and water rates, home building insurance, and ongoing maintenance percentages.',
      },
      {
        question: 'How does paying off the mortgage faster change the Rent vs Buy outcome?',
        answer: 'Cutting your home loan term from 30 years to 12–15 years saves hundreds of thousands in non-deductible bank interest, dramatically shifting the net wealth comparison in favour of homeownership.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Rent vs Buy Calculator Australia',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      url: `${BASE_URL}/tools/rent-vs-buy`,
      author: organizationSchema,
    },
  },
  '/tools/net-worth': {
    path: '/tools/net-worth',
    title: 'Net Worth Calculator Australia | Crown Money',
    description: 'Calculate your household net worth in Australia. Track property equity, super, investments, and home loan debt to measure your wealth trajectory.',
    canonical: `${BASE_URL}/tools/net-worth`,
    h1: 'Net Worth Calculator Australia',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Website/Images/happy%20couple.png',
        alt: 'Net Worth Calculator Australia — Track Property Equity, Super & Liabilities',
      },
    ],
    h2s: [
      'How to Use the Australian Household Net Worth Calculator',
      'Understanding Usable Property Equity vs Total Net Worth',
      'Worked Australian Example: Dual-Income Family Net Worth Audit',
      'Frequently Asked Questions About Australian Net Worth Benchmarks',
    ],
    paragraphs: [
      'List your household assets (family home market value, investment properties, Australian superannuation balances, ASX/global share portfolios, offset/cash savings, and vehicles) alongside your liabilities (home loan balance, investment loans, HECS/HELP debt, car loans, and credit cards) to calculate your true net worth and Loan-to-Value Ratio (LVR).',
      'While Total Net Worth equals Total Assets minus Total Liabilities, Australian lenders calculate "Usable Equity" as (80% of Property Value) minus Current Mortgage Debt. Accelerating your mortgage principal reduction by $29,327/year directly increases both your net worth and your usable equity for future wealth building.',
      'Worked Example: An Australian family with a $950,000 home, $560,000 mortgage, $240,000 in combined superannuation, $35,000 in cash/offset, and $15,000 in vehicle finance holds $1,225,000 in total assets, $575,000 in total liabilities, a Net Worth of $650,000, and $200,000 in usable property equity at an 80% LVR.',
      'Compare your position and learn how to grow your net worth faster in our Debt Recycling Guide (/guides/debt-recycling-australia-guide).',
    ],
    faqs: [
      {
        question: 'Should I include superannuation in my Australian net worth calculation?',
        answer: 'Yes. Superannuation is typically the second-largest asset for Australian households after the family home, though it is preserved until you reach preservation age (generally age 60).',
      },
      {
        question: 'How do credit card limits affect my borrowing power even if the balance is $0?',
        answer: 'Australian lenders assess credit card limits (not just current balances) at roughly 3% of the total credit limit per month in ongoing debt commitments. Closing unused credit cards often boosts borrowing capacity by $40,000 to $100,000+.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Net Worth Calculator Australia',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      url: `${BASE_URL}/tools/net-worth`,
      author: organizationSchema,
    },
  },
  '/tools/debt-recycling': {
    path: '/tools/debt-recycling',
    title: 'Debt Recycling Calculator Australia | Crown Money',
    description: 'Calculate how debt recycling turns non-deductible Australian home loan debt into tax-deductible investment wealth. See annual tax and interest savings.',
    canonical: `${BASE_URL}/tools/debt-recycling`,
    h1: 'Debt Recycling Calculator Australia',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Website/About/People/craig%20parry.png',
        alt: 'Debt Recycling Calculator Australia — Model Tax-Deductible Loan Splits',
      },
    ],
    h2s: [
      'How to Use the Australian Debt Recycling Calculator',
      'Australian Tax & Loan-Splitting Assumptions (ITAA 1997 s 8-1)',
      'Worked Example: Recycling $100,000 of Home Loan Debt at the 39% Tax Bracket',
      'Frequently Asked Questions About Debt Recycling in Australia',
    ],
    paragraphs: [
      'Input your current non-deductible home loan balance, usable equity amount to recycle, mortgage and investment split interest rates, your Australian marginal tax rate (including the 2% Medicare Levy), expected dividend yield, and capital growth rate.',
      'Assumptions: Models a clean split-loan facility where paid-down home loan equity is re-borrowed in a separate investment split to purchase income-producing assets, and all investment income plus tax deductions are swept back onto the non-deductible home loan.',
      'Worked Example: Recycling $100,000 at 6.19% p.a. for an investor in the 39% tax bracket (37% + 2% Medicare Levy) converts $6,190 of non-deductible interest into a tax-deductible expense—generating a $2,414 annual tax benefit plus $4,200 in dividends (at a 4.2% yield) to pay down the remaining home loan faster.',
      'Read our complete 13-minute guide on clean loan splitting and ATO TR 2000/2 rules at /guides/debt-recycling-australia-guide.',
    ],
    faqs: [
      {
        question: 'Does debt recycling increase my total debt?',
        answer: 'When you recycle paid-down equity ($1 of non-deductible debt paid off for every $1 re-borrowed in an investment split), your total debt remains unchanged while a growing share becomes tax-deductible.',
      },
      {
        question: 'Why must I split my loan before debt recycling?',
        answer: 'Drawing investment funds directly from an unsplit home loan redraw creates a mixed-purpose loan under ATO Tax Ruling TR 2000/2, contaminating tax deductibility.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Debt Recycling Calculator Australia',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      url: `${BASE_URL}/tools/debt-recycling`,
      author: organizationSchema,
    },
  },
  '/tools/budget': {
    path: '/tools/budget',
    title: 'Household Budget & Savings Calculator | Crown Money',
    description: 'Use our Australian household budget planner to calculate your savings rate, uncover surplus cash flow, and pay off your home loan years sooner.',
    canonical: `${BASE_URL}/tools/budget`,
    h1: 'Household Budget & Cash Flow Calculator',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Website/About/Testimonials/Daniel-and-Carla.png',
        alt: 'Australian Household Budget and Savings Rate Calculator by Crown Money',
      },
    ],
    h2s: [
      'How to Calculate Your Australian Household Savings Rate',
      'Why the 3-Bucket Cash-Diet System Outperforms Category Spreadsheets',
      'Worked Example: Moving From the 3.7% ABS Average to a 24% Savings Rate',
      'Frequently Asked Questions About Household Budgeting With a Mortgage',
    ],
    paragraphs: [
      'Enter your net take-home household income alongside your fixed housing commitments, 52-week annual/quarterly bills (council rates, utilities, insurances, school fees, registration), and weekly discretionary living expenses to calculate your exact Net Household Savings Rate (%) and monthly mortgage reduction surplus.',
      'According to the Australian Bureau of Statistics (ABS), the average Australian household saves just 3.7% of net income. By ring-fencing 52-week bill provisions and automating a fixed weekly living allowance, coached Crown Money families average a 24% household savings rate and $29,327/year in principal reduction.',
      'Worked Example: On a net household income of $10,500/month ($126,000/yr after tax), lifting your savings rate from 3.7% ($388/mo) to 24% ($2,520/mo) unlocks an extra $25,584 per year in direct mortgage principal reduction—cutting 14+ years off a typical home loan.',
      'Learn how to automate this structure in our step-by-step guide at /guides/automate-family-cash-flow-mortgage-reduction.',
    ],
    faqs: [
      {
        question: 'What is a good household savings rate for paying off an Australian mortgage early?',
        answer: 'Aiming to retain 20% to 25%+ of net household income toward principal reduction typically enables a 30-year Australian mortgage to be paid off in 10 to 15 years.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Household Budget & Cash Flow Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      url: `${BASE_URL}/tools/budget`,
      author: organizationSchema,
    },
  },
  '/tools/withdrawal-impact': {
    path: '/tools/withdrawal-impact',
    title: 'Redraw & Offset Withdrawal Calculator | Crown Money',
    description: 'Calculate the true cost of withdrawing from your home loan redraw or offset account. See how withdrawals impact your loan term and total interest.',
    canonical: `${BASE_URL}/tools/withdrawal-impact`,
    h1: 'Home Loan Redraw & Offset Withdrawal Calculator',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Website/Images/happy%20couple.png',
        alt: 'Home Loan Redraw and Offset Withdrawal Impact Calculator Australia',
      },
    ],
    h2s: [
      'How to Use the Redraw & Offset Withdrawal Calculator',
      'Why a $45,000 Redraw Withdrawal Actually Costs Over $98,000',
      'Worked Australian Example: $45,000 Car Withdrawal on a $450,000 Loan at 6.19% p.a.',
      'Frequently Asked Questions About Offset & Redraw Withdrawals',
    ],
    paragraphs: [
      'Enter your current home loan balance, interest rate (% p.a.), remaining loan term (years), your current age, and the proposed withdrawal amount ($) from your offset account or redraw facility.',
      'When you withdraw $45,000 from your offset or redraw facility without increasing your monthly repayments, you lose 6.19% p.a. compounding daily interest savings for the entire remaining life of your mortgage.',
      'Worked Example: On a $450,000 mortgage at 6.19% p.a. with 22 years remaining, withdrawing $45,000 for a vehicle upgrade adds $53,420 in extra compounding bank interest (bringing the true cost of the $45,000 withdrawal to $98,420) and extends your mortgage payoff age by nearly 4 years.',
      'Read our full guide comparing offset accounts and redraw facilities at /guides/offset-account-vs-redraw-facility-australia.',
    ],
    faqs: [
      {
        question: 'Does withdrawing cash from my offset account increase my interest the same as redrawing?',
        answer: 'Yes. Removing $45,000 from a 100% offset account increases the net balance on which daily interest is calculated by $45,000—the exact same interest impact as redrawing $45,000 from your loan.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Home Loan Redraw & Offset Withdrawal Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      url: `${BASE_URL}/tools/withdrawal-impact`,
      author: organizationSchema,
    },
  },
  '/tools/wishlist-impact': {
    path: '/tools/wishlist-impact',
    title: 'Cost of Spending From Redraw Calculator | Crown Money',
    description: 'Calculate the true cost of using home loan redraw or equity for cars, boats, or holidays. Compare wants vs needs and protect your mortgage freedom.',
    canonical: `${BASE_URL}/tools/wishlist-impact`,
    h1: 'Cost of Spending From Your Redraw Calculator',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Website/Images/happy%20couple.png',
        alt: 'Cost of Spending From Your Home Loan Redraw Calculator',
      },
    ],
    h2s: [
      'How to Use the Wishlist & Redraw Spending Calculator',
      'Compare Wants vs Needs Before Tapping Home Equity',
      'Worked Example: Provisioning in Cash vs Putting Lifestyle Purchases on the Mortgage',
      'Frequently Asked Questions About Using Home Equity for Renovations or Cars',
    ],
    paragraphs: [
      'Add each item on your household wishlist—such as a car upgrade, caravan, boat, kitchen renovation, or overseas holiday—and mark each item as a "Need" or a "Want" to compare its upfront price tag against its 20-year compounding mortgage interest cost.',
      'Putting a depreciating lifestyle item onto a 20–25 year home loan means you are still paying interest on a holiday or car long after the holiday is over or the car has been sold.',
      'Worked Example: A $65,000 wishlist (a $45,000 SUV upgrade + $20,000 European holiday) funded from home loan redraw at 6.19% p.a. over 22 years costs over $142,000 in total principal and interest. Under the Crown Money 3-Bucket System, planned holidays and upgrades are provisioned in cash inside your 52-week plan without extending your debt-free date.',
      'See how Giovanni & Sarah funded their family overseas holiday while cutting 12 years off their mortgage at /success-stories/giovanni-and-sarah.',
    ],
    faqs: [
      {
        question: 'Should I use home loan redraw to buy a car in Australia?',
        answer: 'While a home loan interest rate (e.g. 6.19% p.a.) is lower than a personal car loan rate (9%–12% p.a.), stretching a car purchase over a 25-year mortgage term without increasing your monthly repayments by the equivalent 5-year amortised amount will cost you more than double the car’s price in long-term interest.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Cost of Spending From Your Redraw Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      url: `${BASE_URL}/tools/wishlist-impact`,
      author: organizationSchema,
    },
  },
  '/guides': {
    path: '/guides',
    title: 'Mortgage Reduction & Home Loan Guides | Crown Money',
    description: 'Read expert Australian guides on paying off your mortgage faster, offset vs redraw accounts, cash-flow automation, debt recycling, and loan fees.',
    canonical: `${BASE_URL}/guides`,
    h1: 'Australian Mortgage Reduction & Home Loan Guides',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Website/About/People/Scott_Parry_BW.jpg',
        alt: 'Scott Parry and Craig Parry — Authors of Crown Money Australian Mortgage Reduction Guides',
      },
    ],
    h2s: guidesData.map((g) => g.title),
    paragraphs: [
      ...guidesData.map((g) => `${g.title} (Updated ${g.updatedDate}, ${g.readTime}): ${g.excerpt}`),
      'All guides are authored and peer-reviewed by Scott Parry (Founder & CEO) and Craig Parry (Partner & Senior Finance Broker, MFAA Member) under Crown Lending Pty Ltd (ABN 47 119 504 862, Australian Credit Licence 388 279).',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Australian Mortgage Reduction & Home Loan Guides',
      url: `${BASE_URL}/guides`,
    },
  },
  '/pay-off-mortgage': {
    path: '/pay-off-mortgage',
    title: 'Pay Off Your Mortgage in 7–15 Years | Crown Money',
    description: 'Find out if you qualify to pay off your Australian home loan in 7–15 years with the Crown Money System. Take the free 60-second assessment today.',
    canonical: `${BASE_URL}/pay-off-mortgage`,
    noindex: true,
    h1: 'Find Out If It’s Possible for You to Pay Your Mortgage Off in 7-15 Years & Retire Debt-Free!',
    h2s: ['Take the Free 60-Second Homeowner Assessment'],
    paragraphs: [
      'Answer a few short questions to see if the Crown Money System could help you retire mortgage-free. Over 7,000 Australian families have used it to own their homes years earlier.',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Pay Off Your Mortgage in 7–15 Years | Crown Money',
      url: `${BASE_URL}/pay-off-mortgage`,
    },
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy & Credit Guide | Crown Money',
    description: 'Read the Crown Money Management (Crown Lending Pty Ltd ACL 388 279) Privacy Policy and Credit Reporting Policy under Australian Privacy Principles.',
    canonical: `${BASE_URL}/privacy`,
    h1: 'Privacy Policy',
    h2s: ['Respecting Your Privacy & Australian Privacy Principles Compliance'],
    paragraphs: [
      'This Privacy Policy and Credit Reporting Policy explains how Crown Lending Pty Ltd (ABN 47 119 504 862, ACN 119 504 862, ACL 388 279) collects, uses, holds, and protects your personal and credit-related information under the Privacy Act 1988 (Cth).',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Privacy Policy & Credit Guide | Crown Money',
      url: `${BASE_URL}/privacy`,
    },
  },
  '/target-market-determinations': {
    path: '/target-market-determinations',
    title: 'Target Market Determinations (TMD) | Crown Money',
    description: 'View Target Market Determinations (TMDs) for Crown Money Management and Crown Lending Pty Ltd (ACL 388 279) home loan and mortgage products.',
    canonical: `${BASE_URL}/target-market-determinations`,
    h1: 'Target Market Determinations',
    h2s: ['Product Suitability & Regulatory Compliance (ACL 388 279)'],
    paragraphs: [
      'Target Market Determinations (TMDs) help Australian consumers understand which residential, investment, construction, and SMSF loan products distributed by Crown Lending Pty Ltd (ACL 388 279) are appropriate for their objectives, financial situation, and needs.',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Target Market Determinations (TMD) | Crown Money',
      url: `${BASE_URL}/target-market-determinations`,
    },
  },
  '/author/scott-parry': {
    path: '/author/scott-parry',
    title: 'Scott Parry | Founder & CEO | Crown Money',
    description: 'Meet Scott Parry, Founder & CEO of Crown Money Management. Over 25 years helping 7,000+ Australian families pay off their home loans faster.',
    canonical: `${BASE_URL}/author/scott-parry`,
    ogImage: 'https://storage.googleapis.com/crown_money/Website/About/People/Scott_Parry_BW.jpg',
    h1: 'Scott Parry',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Website/About/People/Scott_Parry_BW.jpg',
        alt: 'Scott Parry — Founder & CEO of Crown Money Management',
      },
    ],
    h2s: [
      'Founder & CEO — Crown Money Management (ACL 388 279)',
      'Australian Mortgage Reduction Guides Authored by Scott Parry',
    ],
    paragraphs: [
      'Scott Parry is the Founder and Chief Executive Officer of Crown Money Management (Crown Lending Pty Ltd, ABN 47 119 504 862, ACN 119 504 862, Australian Credit Licence 388 279). With over 25 years of experience in Australian mortgage strategy and household cash-flow coaching, Scott pioneered the Home Ownership Programme (HOP) in 2004.',
      'Under Scott’s leadership, Crown Money has helped over 7,000 Australian households achieve an average 24% net household savings rate and $29,327 per year in home loan principal reduction.',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: 'Scott Parry',
        jobTitle: 'Founder & CEO',
        url: `${BASE_URL}/author/scott-parry`,
        image: 'https://storage.googleapis.com/crown_money/Website/About/People/Scott_Parry_BW.jpg',
        worksFor: organizationSchema,
      },
    },
  },
  '/author/craig-parry': {
    path: '/author/craig-parry',
    title: 'Craig Parry | Senior Finance Broker | Crown Money',
    description: 'Meet Craig Parry, Partner & Senior Finance Broker at Crown Money (ACL 388 279). Multi-award-winning Australian mortgage strategist.',
    canonical: `${BASE_URL}/author/craig-parry`,
    ogImage: 'https://storage.googleapis.com/crown_money/Website/About/People/craig%20parry.png',
    h1: 'Craig Parry',
    images: [
      {
        src: 'https://storage.googleapis.com/crown_money/Website/About/People/craig%20parry.png',
        alt: 'Craig Parry — Partner & Senior Finance Broker at Crown Money Management',
      },
    ],
    h2s: [
      'Partner & Senior Finance Broker — Crown Money Management (ACL 388 279)',
      'Australian Mortgage Structuring & Debt Recycling Expertise',
    ],
    paragraphs: [
      'Craig Parry is Partner and Senior Finance Broker at Crown Money Management (Crown Lending Pty Ltd, ABN 47 119 504 862, ACN 119 504 862, Australian Credit Licence 388 279) and an accredited Full Member of the Mortgage & Finance Association of Australia (MFAA).',
      'Craig oversees mortgage brokerage operations, complex loan splitting, offset vs redraw optimisation, and Best Interests Duty compliance across Australia.',
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: 'Craig Parry',
        jobTitle: 'Partner & Senior Finance Broker',
        url: `${BASE_URL}/author/craig-parry`,
        image: 'https://storage.googleapis.com/crown_money/Website/About/People/craig%20parry.png',
        worksFor: organizationSchema,
      },
    },
  },
  '/completed': {
    path: '/completed',
    title: 'Statement Shared Successfully | Crown Money',
    description: 'Your bank statement connection has been securely shared with the Crown Money strategy team.',
    noindex: true,
    h1: 'Statement Shared!',
    h2s: ['Next Steps for Your Strategy Session'],
    paragraphs: ['Thank you for securely connecting your statements with Crown Money Management.'],
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Statement Shared Successfully' },
  },
  '/error': {
    path: '/error',
    title: 'Bank Statement Connection Issue | Crown Money',
    description: 'There was an issue connecting your bank statement. Please contact Crown Money support on 1300 882 981.',
    noindex: true,
    h1: 'Oops, could not connect the bank statement!',
    h2s: ['Need Assistance? Call 1300 882 981'],
    paragraphs: ['Please retry connecting your statement or contact Crown Money support on 1300 882 981.'],
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Bank Statement Connection Issue' },
  },
};

// Populate dynamic Guide routes and Case Study routes into the route table
export const ALL_ROUTES: Record<string, RouteSeoData> = { ...staticRoutes };

for (const guide of guidesData) {
  const path = `/guides/${guide.slug}`;
  ALL_ROUTES[path] = {
    path,
    title: guide.seoTitle,
    description: guide.metaDescription,
    canonical: `${BASE_URL}${path}`,
    ogType: 'article',
    ogImage: guide.heroImage.src,
    h1: guide.h1,
    images: [
      guide.heroImage,
      {
        src: guide.author.image,
        alt: `${guide.author.name} — ${guide.author.role} at Crown Money`,
      },
    ],
    h2s: guide.sections.map((s) => s.heading),
    paragraphs: guide.sections.map((s) => s.body.join(' ')),
    subSections: guide.sections
      .map((s, idx) => (s.subSections ? { parentH2Index: idx, items: s.subSections } : null))
      .filter((x): x is NonNullable<typeof x> => x !== null),
    tables: [guide.comparisonTable],
    citations: guide.citations,
    contextualLinks: guide.contextualLinks,
    faqs: guide.faqs,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        {
          '@type': 'Article',
          headline: guide.title,
          description: guide.metaDescription,
          image: guide.heroImage.src,
          datePublished: guide.publishedDate,
          dateModified: guide.updatedDate,
          author: {
            '@type': 'Person',
            name: guide.author.name,
            jobTitle: guide.author.role,
            url: `${BASE_URL}/author/${guide.author.slug}`,
          },
          reviewedBy: {
            '@type': 'Person',
            name: guide.reviewedBy.name,
            jobTitle: guide.reviewedBy.role,
            url: `${BASE_URL}/author/${guide.reviewedBy.slug}`,
          },
          publisher: organizationSchema,
          mainEntityOfPage: `${BASE_URL}${path}`,
        },
        {
          '@type': 'FAQPage',
          mainEntity: guide.faqs.map((faq) => ({
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
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
            { '@type': 'ListItem', position: 3, name: guide.title, item: `${BASE_URL}${path}` },
          ],
        },
      ],
    },
  };
}

for (const study of caseStudiesData) {
  const path = `/success-stories/${study.slug}`;
  ALL_ROUTES[path] = {
    path,
    title: study.seoTitle,
    description: study.metaDescription,
    canonical: `${BASE_URL}${path}`,
    ogImage: study.image,
    h1: study.h1,
    images: [
      {
        src: study.image,
        alt: `${study.name} (${study.state}) — Crown Money Mortgage Reduction Case Study (${study.yearsSaved})`,
        caption: `${study.name} (${study.state}): ${study.loanSize} starting loan · ${study.yearsSaved} · ${study.savingsRate} household savings rate.`,
      },
    ],
    h2s: [
      `Key Results: ${study.loanSize} Loan · ${study.yearsSaved} · ${study.interestSaved}`,
      'The Starting Position & Full Case Study Story',
      'The Crown Money Strategy Implemented',
      'Month-by-Month Implementation Timeline & Verified Client Quote',
    ],
    paragraphs: [
      `${study.summary} Starting Loan: ${study.loanSize} (${study.startingTerm}). New Coached Trajectory: ${study.newTerm} (${study.yearsSaved}, ${study.interestSaved}) with a ${study.savingsRate} net household savings rate.`,
      `${study.challenge} ${study.storyParagraphs.join(' ')}`,
      study.strategyImplemented.join(' '),
      `"${study.clientQuote}" — ${study.name}, ${study.state} (Verified ${study.verifiedDate}). Watch video testimonial: ${study.videoUrl}`,
    ],
    subSections: [
      {
        parentH2Index: 3,
        items: study.timeline.map((t) => ({ title: t.phase, content: t.milestone })),
      },
    ],
    tables: [
      {
        caption: `Before vs After Crown Money Comparison — ${study.name} (${study.state})`,
        headers: ['Financial Metric', 'Before Crown Money', 'With Crown Money HOP'],
        rows: study.beforeAfterTable.map((r) => [r.metric, r.beforeCrown, r.withCrown]),
      },
    ],
    contextualLinks: [
      {
        label: 'Calculate Your Own Mortgage Savings',
        path: '/mortgage-reduction-calculator',
        description: 'Run your loan balance and interest rate to see how many years you could cut off your mortgage.',
      },
      {
        label: 'How to Pay Off Your Mortgage Faster in Australia (Pillar Guide)',
        path: '/guides/how-to-pay-off-your-mortgage-faster-australia',
        description: 'Read our complete breakdown of daily interest reduction and automated cash-flow coaching.',
      },
    ],
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        {
          '@type': 'Article',
          headline: study.headline,
          description: study.metaDescription,
          image: study.image,
          datePublished: study.verifiedDate,
          dateModified: study.verifiedDate,
          author: organizationSchema,
          publisher: organizationSchema,
          mainEntityOfPage: `${BASE_URL}${path}`,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Success Stories', item: `${BASE_URL}/success-stories` },
            { '@type': 'ListItem', position: 3, name: study.name, item: `${BASE_URL}${path}` },
          ],
        },
      ],
    },
  };
}

const NOT_FOUND_SEO: RouteSeoData = {
  path: '/404',
  title: 'Page Not Found | Crown Money',
  description: 'The page you are looking for could not be found. Explore Crown Money calculators, mortgage reduction guides, or book a free strategy session.',
  noindex: true,
  h1: 'Page Not Found (404)',
  h2s: ['Explore Crown Money Mortgage Calculators & Guides'],
  paragraphs: [
    'Sorry, the page you requested does not exist or has moved. Use the links below to access our Australian mortgage reduction calculators, guides, client reviews, and contact page.',
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Page Not Found | Crown Money',
  },
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildPrerenderedBodyHtml(route: RouteSeoData): string {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/guides', label: 'Mortgage Reduction Guides' },
    { href: '/tools', label: 'Financial Calculators' },
    { href: '/mortgage-reduction-calculator', label: 'Mortgage Reduction Calculator' },
    { href: '/tools/rent-vs-buy', label: 'Rent vs Buy Calculator' },
    { href: '/tools/net-worth', label: 'Net Worth Calculator' },
    { href: '/tools/debt-recycling', label: 'Debt Recycling Calculator' },
    { href: '/tools/budget', label: 'Household Budget Calculator' },
    { href: '/tools/withdrawal-impact', label: 'Redraw & Offset Withdrawal Calculator' },
    { href: '/tools/wishlist-impact', label: 'Cost of Spending From Redraw' },
    { href: '/success-stories', label: 'Mortgage Reduction Success Stories' },
    { href: '/reviews', label: 'Crown Money Reviews' },
    { href: '/contact', label: 'Contact & Book Free Session' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/target-market-determinations', label: 'Target Market Determinations' },
  ];

  const guideLinks = guidesData
    .map((g) => `<li><a href="/guides/${g.slug}">${escapeHtml(g.title)}</a></li>`)
    .join('\n            ');

  const caseStudyLinks = caseStudiesData
    .map((c) => `<li><a href="/success-stories/${c.slug}">${escapeHtml(c.name)} (${escapeHtml(c.result)} — ${escapeHtml(c.loanSize)} Loan)</a></li>`)
    .join('\n            ');

  const imagesHtml = (route.images || [])
    .map(
      (img) => `<figure>
            <img src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt)}" width="1200" height="630" loading="lazy" />
            ${img.caption ? `<figcaption>${escapeHtml(img.caption)}</figcaption>` : ''}
          </figure>`
    )
    .join('\n          ');

  const subSectionMap = new Map<number, { title: string; content: string }[]>();
  if (route.subSections) {
    for (const sub of route.subSections) {
      subSectionMap.set(sub.parentH2Index, sub.items);
    }
  }

  const h2Blocks = route.h2s
    .map((h2, idx) => {
      const p = route.paragraphs[idx] || '';
      const subs = subSectionMap.get(idx) || [];
      const subsHtml = subs
        .map(
          (s) => `<div>
              <h3>${escapeHtml(s.title)}</h3>
              <p>${escapeHtml(s.content)}</p>
            </div>`
        )
        .join('\n            ');

      // If this is the FAQ H2 on homepage, render the visible FAQ items directly beneath it
      const isFaqHeading = h2.toLowerCase().includes('frequently asked questions');
      const inlineFaqsHtml =
        isFaqHeading && route.faqs
          ? route.faqs
              .map(
                (f) => `<div class="faq-item">
              <h3>${escapeHtml(f.question)}</h3>
              <p>${escapeHtml(f.answer)}</p>
            </div>`
              )
              .join('\n            ')
          : '';

      return `<section>
          <h2>${escapeHtml(h2)}</h2>
          ${p ? `<p>${escapeHtml(p)}</p>` : ''}
          ${subsHtml}
          ${inlineFaqsHtml}
        </section>`;
    })
    .join('\n        ');

  const extraParagraphs = route.paragraphs
    .slice(route.h2s.length)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join('\n        ');

  const tablesHtml = (route.tables || [])
    .map(
      (tbl) => `<section>
          <h2>${escapeHtml(tbl.caption)}</h2>
          <table>
            <caption>${escapeHtml(tbl.caption)}</caption>
            <thead>
              <tr>${tbl.headers.map((h) => `<th scope="col">${escapeHtml(h)}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${tbl.rows
                .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`)
                .join('\n              ')}
            </tbody>
          </table>
        </section>`
    )
    .join('\n        ');

  // If route has FAQs and none of its H2s was already the FAQ heading, append a dedicated FAQ section
  const hasFaqH2 = route.h2s.some((h) => h.toLowerCase().includes('frequently asked questions'));
  const standaloneFaqsHtml =
    !hasFaqH2 && route.faqs && route.faqs.length > 0
      ? `<section>
          <h2>Frequently Asked Questions</h2>
          ${route.faqs
            .map(
              (f) => `<div class="faq-item">
            <h3>${escapeHtml(f.question)}</h3>
            <p>${escapeHtml(f.answer)}</p>
          </div>`
            )
            .join('\n          ')}
        </section>`
      : '';

  const contextualLinksHtml =
    route.contextualLinks && route.contextualLinks.length > 0
      ? `<section>
          <h2>Related Calculators &amp; Verified Case Studies</h2>
          <ul>
            ${route.contextualLinks
              .map(
                (link) =>
                  `<li><a href="${link.path}">${escapeHtml(link.label)}</a> — ${escapeHtml(link.description)}</li>`
              )
              .join('\n            ')}
          </ul>
        </section>`
      : '';

  const citationsHtml =
    route.citations && route.citations.length > 0
      ? `<section>
          <h2>Official Australian Data Sources &amp; Regulatory References</h2>
          <ul>
            ${route.citations
              .map(
                (cit) =>
                  `<li><a href="${escapeHtml(cit.url)}" rel="noopener noreferrer">${escapeHtml(cit.label)}</a>: ${escapeHtml(cit.summary)}</li>`
              )
              .join('\n            ')}
          </ul>
        </section>`
      : '';

  return `<div class="prerendered-seo-shell" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">
      <header>
        <nav aria-label="Primary Navigation">
          <a href="/">Crown Money Management</a>
          <ul>
            ${navLinks.map((l) => `<li><a href="${l.href}">${escapeHtml(l.label)}</a></li>`).join('\n            ')}
          </ul>
        </nav>
      </header>
      <main>
        <article>
          <h1>${escapeHtml(route.h1)}</h1>
          ${imagesHtml}
          ${h2Blocks}
          ${extraParagraphs}
          ${tablesHtml}
          ${contextualLinksHtml}
          ${citationsHtml}
          ${standaloneFaqsHtml}
        </article>
        <aside aria-label="Australian Mortgage Guides & Case Studies">
          <h2>Australian Mortgage Reduction Guides</h2>
          <ul>
            ${guideLinks}
          </ul>
          <h2>Verified Client Case Studies</h2>
          <ul>
            ${caseStudyLinks}
          </ul>
        </aside>
      </main>
      <footer>
        <p>Crown Money Management — Operated by Crown Lending Pty Ltd · ABN 47 119 504 862 · ACN 119 504 862 · Australian Credit Licence (ACL) Number 388 279 · MFAA Full Member.</p>
        <p>Head Office: Level 1, 100 Havelock Street, West Perth WA 6005 · Phone: <a href="tel:1300882981">1300 882 981</a> · Email: <a href="mailto:admin@crown.money">admin@crown.money</a></p>
      </footer>
    </div>`;
}

export function renderRouteHtml(templateHtml: string, rawPath: string): {
  status: number;
  redirectTo?: string;
  html: string;
} {
  const cleanPath = rawPath === '/' ? '/' : rawPath.replace(/\/+$/, '');
  const lowerPath = cleanPath.toLowerCase();

  if (LEGACY_REDIRECTS[lowerPath]) {
    return {
      status: 301,
      redirectTo: LEGACY_REDIRECTS[lowerPath],
      html: '',
    };
  }
  if (lowerPath.startsWith('/blog/')) {
    return {
      status: 301,
      redirectTo: '/guides',
      html: '',
    };
  }

  const routeData = ALL_ROUTES[cleanPath];
  const isKnownRoute = Boolean(routeData);
  const seo = routeData || NOT_FOUND_SEO;
  const status = isKnownRoute ? 200 : 404;

  const ogImage = seo.ogImage || DEFAULT_OG_IMAGE;
  const ogType = seo.ogType || 'website';
  const robotsContent = seo.noindex ? 'noindex, nofollow' : 'index, follow';

  // Only emit canonical and og:url when canonical is defined (omitted on 404 pages per audit recommendation)
  const canonicalTags =
    status === 200 && seo.canonical
      ? `\n    <link rel="canonical" href="${escapeHtml(seo.canonical)}" />\n    <meta property="og:url" content="${escapeHtml(seo.canonical)}" />\n    <meta name="twitter:url" content="${escapeHtml(seo.canonical)}" />`
      : '';

  const headTags = `
    <title>${escapeHtml(seo.title)}</title>
    <meta name="title" content="${escapeHtml(seo.title)}" />
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="robots" content="${robotsContent}" />${canonicalTags}
    <meta property="og:type" content="${ogType}" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:image" content="${escapeHtml(ogImage)}" />
    <meta property="og:site_name" content="Crown Money" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${escapeHtml(ogImage)}" />
    <script id="crown-schema-jsonld" type="application/ld+json">${JSON.stringify(seo.schema)}</script>`;

  let html = templateHtml.replace(
    /<!-- SEO_HEAD_START -->[\s\S]*?<!-- SEO_HEAD_END -->/,
    `<!-- SEO_HEAD_START -->${headTags}\n    <!-- SEO_HEAD_END -->`
  );

  if (html === templateHtml) {
    html = templateHtml.replace(
      /<title>[\s\S]*?<\/title>/,
      `<!-- SEO_HEAD_START -->${headTags}\n    <!-- SEO_HEAD_END -->`
    );
  }

  const prerenderedBody = buildPrerenderedBodyHtml(seo);
  if (html.includes('<!-- SEO_ROOT_START -->')) {
    html = html.replace(
      /<!-- SEO_ROOT_START -->[\s\S]*?<!-- SEO_ROOT_END -->/,
      `<!-- SEO_ROOT_START --><div id="root">${prerenderedBody}</div><!-- SEO_ROOT_END -->`
    );
  } else {
    html = html.replace(
      /<div id="root"><\/div>/,
      `<!-- SEO_ROOT_START --><div id="root">${prerenderedBody}</div><!-- SEO_ROOT_END -->`
    );
  }

  return { status, html };
}
