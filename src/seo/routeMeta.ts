import { guidesData } from '../data/guidesData';
import { caseStudiesData } from '../data/caseStudiesData';

export interface RouteSeoData {
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
  h1: string;
  h2s: string[];
  paragraphs: string[];
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

const organizationSchema = {
  '@type': 'FinancialService',
  '@id': `${BASE_URL}/#organization`,
  name: 'Crown Money Management',
  legalName: 'Crown Lending Pty Ltd',
  url: BASE_URL,
  logo: 'https://storage.googleapis.com/crown_money/Logo%20%26%20Icon/Crown%20Money%20Cropped%20Logo.png',
  foundingDate: '2004',
  founder: {
    '@type': 'Person',
    name: 'Scott Parry',
    url: `${BASE_URL}/author/scott-parry`
  },
  telephone: '1300 882 981',
  email: 'admin@crown.money',
  taxID: 'ABN 47 119 504 862',
  identifier: 'Australian Credit Licence (ACL) 388 279 | ACN 119 504 862',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Level 1, 100 Havelock Street',
    addressLocality: 'West Perth',
    addressRegion: 'WA',
    postalCode: '6005',
    addressCountry: 'AU'
  },
  areaServed: 'Australia',
  sameAs: [
    'https://www.facebook.com/CrownMoneyManagement',
    'https://www.linkedin.com/company/crown-money',
    'https://www.instagram.com/crownmoneyofficial/',
    'https://www.youtube.com/@crownmoneyAU'
  ]
};

const staticRoutes: Record<string, RouteSeoData> = {
  '/': {
    path: '/',
    title: 'Pay Off Mortgage Faster | Mortgage Reduction | Crown Money',
    description: "Australian homeowners use Crown Money's money management system to pay off their home loan years sooner. Free mortgage savings check in 2 minutes.",
    canonical: `${BASE_URL}/`,
    h1: 'Helping Aussie Homeowners Pay Their Mortgage Off in Half the Time.',
    h2s: [
      'See Your Mortgage Savings Potential',
      'What is Crown Money?',
      'Why Standard Bank Offset Accounts Fall Short',
      'Verified Australian Client Results ($29,327/yr Average Principal Reduction)',
      'Frequently Asked Questions About Mortgage Reduction'
    ],
    paragraphs: [
      'Crown Money Management (Crown Lending Pty Ltd ABN 47 119 504 862, ACN 119 504 862, Australian Credit Licence 388 279) is Australia’s leading mortgage reduction and cash-flow coaching specialist. Founded in 2004 by Scott Parry, we have helped over 7,000 Australian families pay off their 30-year home loans in 10 to 15 years without lifestyle cutbacks.',
      'Crown Money clients pay an average of $29,327 off their home loan principal each year, compared to the Australian national average of just $12,000. The average Crown Money household saves 24% of net income (compared to the 3.7% ABS national average), and every 23 days a Crown Money client pays off their mortgage in full.',
      'Unlike a traditional bank offset account where everyday spending and lumpy bills erode your buffer, our proprietary Home Ownership Programme (HOP) combines daily interest reduction, automated 52-week bill provisioning, a separate weekly living allowance, and 90-day 1-on-1 Financial Coach accountability reviews.',
      'Your home loan and bank accounts remain 100% in your own name with regulated Australian banking institutions. There are no lock-in contracts and no exit fees. Book a free strategy session or use our free Australian Mortgage Reduction Calculator to check how many years and hundreds of thousands in bank interest you could save.'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        {
          '@type': 'WebSite',
          '@id': `${BASE_URL}/#website`,
          name: 'Crown Money',
          url: BASE_URL
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` }
          ]
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is Crown Money?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Crown Money Management (Crown Lending Pty Ltd ACL 388 279) is an Australian mortgage reduction and financial coaching specialist founded in 2004 that helps homeowners cut 40% to 50% off their home loan term and interest.'
              }
            },
            {
              '@type': 'Question',
              name: 'How is Crown Money different from a bank offset account?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'While a standard bank offset account saves the average Australian borrower 3 to 4 years, Crown Money combines daily principal reduction, automated cash-diet bill provisioning, and 90-day personal coaching so clients average a 24% savings rate and $29,327/year in principal paydown.'
              }
            },
            {
              '@type': 'Question',
              name: 'Is Crown Money licensed in Australia?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Crown Money holds Australian Credit Licence (ACL) Number 388 279, operated by Crown Lending Pty Ltd (ABN 47 119 504 862, ACN 119 504 862), and is a full member of the MFAA.'
              }
            }
          ]
        }
      ]
    }
  },
  '/about': {
    path: '/about',
    title: 'Mortgage Reduction Specialists Australia | Crown Money',
    description: "Meet Crown Money's licensed mortgage reduction specialists and financial coaches. Helping 7,000+ Australian families pay off home loans since 2004.",
    canonical: `${BASE_URL}/about`,
    ogImage: 'https://storage.googleapis.com/crown_money/Website/About/People/Scott_Parry_BW.jpg',
    h1: 'Australia’s Leading Specialists In Money Management',
    h2s: [
      'Our Story & Mission to Help 5,000 Australian Families Per Year',
      'Leadership, Financial Strategists, Finance Brokers & Financial Coaches',
      'Canonical Facts, Licensing (ACL 388 279) & Results Methodology'
    ],
    paragraphs: [
      'Founded in 2004 by CEO Scott Parry alongside Partner & Senior Finance Broker Craig Parry, Crown Money Management (Crown Lending Pty Ltd ABN 47 119 504 862, ACN 119 504 862, Australian Credit Licence 388 279) is on a mission to help Australian families escape the 30-year mortgage trap.',
      'Our multidisciplinary team includes Senior Financial Strategists, MFAA-accredited Senior Finance and Mortgage Brokers, dedicated Post-Settlement Financial Coaches, Credit Assessors, and Client Care Officers servicing homeowners across Australia from our West Perth head office (Level 1, 100 Havelock Street, West Perth WA 6005).',
      'Canonical Verified Results (Updated November 2026): Over 7,000 Australian households coached; $29,327 average annual principal reduction (vs $12,000 national average); 24% average client household savings rate (vs 3.7% ABS national average); 1 client mortgage paid off in full every 23 days.'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        {
          '@type': 'AboutPage',
          name: 'Mortgage Reduction Specialists Australia | Crown Money',
          url: `${BASE_URL}/about`
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'About Us', item: `${BASE_URL}/about` }
          ]
        }
      ]
    }
  },
  '/how-it-works': {
    path: '/how-it-works',
    title: 'How Mortgage Reduction Works | 4-Step System | Crown Money',
    description: "See how Crown Money's 4-step mortgage reduction and cash-flow coaching system helps Australian homeowners pay off their home loans in half the time.",
    canonical: `${BASE_URL}/how-it-works`,
    h1: 'How Our Mortgage Reduction System Works',
    h2s: [
      'The 4-Step Crown Money Process',
      'Why the Home Ownership Programme Outperforms a Standard Bank Offset Account',
      'Real-Time Wealth Tracking Dashboard & 90-Day Coaching Reviews',
      'Transparent Fees, Licensing & Suitability'
    ],
    paragraphs: [
      'Step 1: Free Discovery & Strategy Call — We audit your current mortgage structure, interest rate, and household cash flow to calculate your exact time and interest savings potential.',
      'Step 2: Custom Mortgage & Cash-Flow Architecture — Our licensed finance brokers (ACL 388 279) structure your loan so 100% of your income offsets daily mortgage interest immediately while automating 52-week bill provisioning and a separate weekly living allowance.',
      'Step 3: Seamless Onboarding & Automation — We configure your accounts and real-time Wealth Tracking Dashboard so you know the exact calendar date your home loan hits $0.',
      'Step 4: Ongoing 90-Day Personal Financial Coaching — Your dedicated Financial Coach reviews your savings rate, principal reduction velocity, and equity position every quarter until you are debt-free.'
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
        { '@type': 'HowToStep', position: 4, name: '90-Day Financial Coaching Reviews', text: 'Quarterly accountability sessions with your dedicated Financial Coach.' }
      ]
    }
  },
  '/reviews': {
    path: '/reviews',
    title: 'Crown Money Reviews & Client Ratings | Crown Money',
    description: 'Read 380+ verified 5-star Crown Money reviews and video testimonials from Australian homeowners paying off their mortgages years ahead of schedule.',
    canonical: `${BASE_URL}/reviews`,
    ogImage: 'https://storage.googleapis.com/crown_money/Website/About/Testimonials/Melanie%20and%20Jeffrey%20.jpg',
    h1: 'Crown Money Reviews & Client Feedback',
    h2s: [
      '4.9 / 5.0 Rating Across 380+ Verified Australian Client Reviews',
      'Video Testimonials From Mortgage-Free Australian Families',
      'Written Client Reviews by Category (Debt Reduction, Coaching, Refinancing)'
    ],
    paragraphs: [
      'Read verified 5-star Google reviews, Trustpilot feedback, and unedited video testimonials from Australian homeowners who partnered with Crown Money Management (ACL 388 279) to slash hundreds of thousands in bank interest and pay off their mortgages years ahead of schedule.',
      'Clients consistently highlight our supportive Financial Coaches, stress-free bill automation, and measurable principal reduction—averaging $29,327 paid off per year.'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Reviews', item: `${BASE_URL}/reviews` }
          ]
        }
      ]
    }
  },
  '/success-stories': {
    path: '/success-stories',
    title: 'Mortgage Reduction Success Stories & Results | Crown Money',
    description: 'Explore real mortgage reduction success stories and case studies from Australian families who cut 10–17 years and $320k+ off their home loans.',
    canonical: `${BASE_URL}/success-stories`,
    h1: 'Mortgage Reduction Success Stories',
    h2s: [
      'Featured Australian Homeowner Case Studies (With Loan Sizes & Years Saved)',
      'What Our Clients Say On Google',
      'Watch Verified Client Video Testimonials'
    ],
    paragraphs: [
      'Explore detailed Australian mortgage reduction case studies showing starting loan balances, remaining terms, household savings rates, years shaved off the mortgage, and estimated interest saved.',
      'Featured outcomes include Melanie & Jeffrey ($580,000 loan, 17 years saved, 31% savings rate), Natalie ($440,000 single-income loan, 3x faster principal reduction), Jemima & Brad (on track to be debt-free at age 36), Daniel & Carla (10 years saved with a 28% savings rate), Michael (8-year single-income payoff trajectory), and Giovanni & Sarah (12 years cut off their home loan).'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        organizationSchema,
        {
          '@type': 'CollectionPage',
          name: 'Mortgage Reduction Success Stories & Results | Crown Money',
          url: `${BASE_URL}/success-stories`
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Success Stories', item: `${BASE_URL}/success-stories` }
          ]
        }
      ]
    }
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Crown Money | Free Mortgage Strategy Session',
    description: 'Book a free mortgage reduction strategy session with Crown Money. Call 1300 882 981 or visit our Australian office to pay off your home loan faster.',
    canonical: `${BASE_URL}/contact`,
    h1: 'Contact Our Mortgage Reduction Specialists',
    h2s: [
      'Book Your Free 1-on-1 Mortgage Strategy Session',
      'Contact Information & Australian Office Address',
      'What Happens in Your Free Discovery Session?'
    ],
    paragraphs: [
      'Speak with a licensed Financial Strategist at Crown Money Management (Crown Lending Pty Ltd ABN 47 119 504 862, ACN 119 504 862, Australian Credit Licence 388 279).',
      'Phone: 1300 882 981 (Monday to Friday, 8:30am – 5:30pm). Email: admin@crown.money. Head Office: Level 1, 100 Havelock Street, West Perth WA 6005. Video and phone consultations available Australia-wide across Melbourne, Sydney, Brisbane, Adelaide, and Perth.'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Crown Money | Free Mortgage Strategy Session',
      url: `${BASE_URL}/contact`,
      mainEntity: organizationSchema
    }
  },
  '/mortgage-reduction-calculator': {
    path: '/mortgage-reduction-calculator',
    title: 'Mortgage Reduction Calculator Australia | Crown Money',
    description: 'Calculate how much interest and time you can save on your Australian home loan with our free Mortgage Reduction Calculator. Get results in 2 minutes.',
    canonical: `${BASE_URL}/mortgage-reduction-calculator`,
    h1: 'Mortgage Reduction Calculator: See How Much You Can Save',
    h2s: [
      'Calculate Your Potential Interest & Years Saved',
      'Worked Australian Home Loan Reduction Examples ($500k, $650k, $850k)',
      'Frequently Asked Questions About Mortgage Reduction'
    ],
    paragraphs: [
      'Enter your current Australian home loan balance, interest rate, and monthly repayment to compare a standard 30-year bank amortisation schedule against the Crown Money Home Ownership Programme (HOP).',
      'On a $650,000 mortgage at 6.19% p.a., a standard 30-year loan costs $781,720 in bank interest. With daily interest offsetting and coached surplus capture, Australian homeowners routinely cut 12 to 16+ years off their loan term and save over $400,000 in interest.'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Mortgage Reduction Calculator Australia',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      url: `${BASE_URL}/mortgage-reduction-calculator`,
      author: organizationSchema
    }
  },
  '/tools': {
    path: '/tools',
    title: 'Mortgage & Financial Calculators Australia | Crown Money',
    description: 'Free Australian mortgage and financial calculators: compare rent vs buy, debt recycling, redraw impact, net worth, and extra home loan repayments.',
    canonical: `${BASE_URL}/tools`,
    h1: 'Australian Mortgage & Financial Calculators',
    h2s: [
      'Interactive Home Loan Repayment, Extra Repayment & Stamp Duty Calculators',
      'Advanced Australian Strategy Tools (Rent vs Buy, Net Worth, Debt Recycling, Budget, Redraw Impact)',
      'How to Choose the Right Mortgage Calculator for Your Goal'
    ],
    paragraphs: [
      'Explore Crown Money’s complete suite of free Australian mortgage and wealth calculators: Mortgage Reduction Calculator, Rent vs Buy Calculator Australia, Net Worth Calculator Australia, Debt Recycling Calculator Australia, Household Budget & Cash Flow Calculator, Home Loan Redraw & Offset Withdrawal Calculator, and Cost of Spending From Your Redraw Calculator.'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Mortgage & Financial Calculators Australia | Crown Money',
      url: `${BASE_URL}/tools`
    }
  },
  '/tools/rent-vs-buy': {
    path: '/tools/rent-vs-buy',
    title: 'Rent vs Buy Calculator Australia | Crown Money',
    description: 'Compare the true long-term cost of renting vs buying a home in Australia. Factor in stamp duty, deposit, maintenance, and property growth today.',
    canonical: `${BASE_URL}/tools/rent-vs-buy`,
    h1: 'Rent vs Buy Calculator Australia',
    h2s: ['Compare Long-Term Wealth: Renting vs Buying Property in Australia'],
    paragraphs: [
      'Use our Australian Rent vs Buy Calculator to compare total housing costs, stamp duty, council rates, maintenance, capital growth, and net equity over 5 to 30 years.'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Rent vs Buy Calculator Australia',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      url: `${BASE_URL}/tools/rent-vs-buy`
    }
  },
  '/tools/net-worth': {
    path: '/tools/net-worth',
    title: 'Net Worth Calculator Australia | Crown Money',
    description: 'Calculate your household net worth in Australia. Track property equity, super, investments, and home loan debt to measure your wealth trajectory.',
    canonical: `${BASE_URL}/tools/net-worth`,
    h1: 'Net Worth Calculator Australia',
    h2s: ['Track Your Australian Household Assets, Property Equity & Liabilities'],
    paragraphs: [
      'Calculate your total net worth across Australian residential property, superannuation, shares, cash savings, and home loan liabilities.'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Net Worth Calculator Australia',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      url: `${BASE_URL}/tools/net-worth`
    }
  },
  '/tools/debt-recycling': {
    path: '/tools/debt-recycling',
    title: 'Debt Recycling Calculator Australia | Crown Money',
    description: 'Calculate how debt recycling turns non-deductible Australian home loan debt into tax-deductible investment wealth. See annual tax and interest savings.',
    canonical: `${BASE_URL}/tools/debt-recycling`,
    h1: 'Debt Recycling Calculator Australia',
    h2s: ['Transform Non-Deductible Home Loan Debt Into Tax-Deductible Wealth'],
    paragraphs: [
      'Model how converting non-deductible Australian home loan principal into tax-deductible investment debt impacts your annual tax savings, investment portfolio, and mortgage payoff speed.'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Debt Recycling Calculator Australia',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      url: `${BASE_URL}/tools/debt-recycling`
    }
  },
  '/tools/budget': {
    path: '/tools/budget',
    title: 'Household Budget & Savings Calculator | Crown Money',
    description: 'Use our Australian household budget planner to calculate your savings rate, uncover surplus cash flow, and pay off your home loan years sooner.',
    canonical: `${BASE_URL}/tools/budget`,
    h1: 'Household Budget & Cash Flow Calculator',
    h2s: ['Calculate Your Household Savings Rate & Monthly Surplus Cash Flow'],
    paragraphs: [
      'Track your Australian household income and fixed vs discretionary expenses to calculate your net savings rate and monthly surplus available for mortgage principal reduction.'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Household Budget & Cash Flow Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      url: `${BASE_URL}/tools/budget`
    }
  },
  '/tools/withdrawal-impact': {
    path: '/tools/withdrawal-impact',
    title: 'Redraw & Offset Withdrawal Calculator | Crown Money',
    description: 'Calculate the true cost of withdrawing from your home loan redraw or offset account. See how withdrawals impact your loan term and total interest.',
    canonical: `${BASE_URL}/tools/withdrawal-impact`,
    h1: 'Home Loan Redraw & Offset Withdrawal Calculator',
    h2s: ['See How Redraw & Offset Withdrawals Extend Your Loan Term and Interest'],
    paragraphs: [
      'Understand the compound interest impact of withdrawing money from your home loan redraw facility or 100% offset account over the remaining life of your Australian mortgage.'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Home Loan Redraw & Offset Withdrawal Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      url: `${BASE_URL}/tools/withdrawal-impact`
    }
  },
  '/tools/wishlist-impact': {
    path: '/tools/wishlist-impact',
    title: 'Cost of Spending From Redraw Calculator | Crown Money',
    description: 'Calculate the true cost of using home loan redraw or equity for cars, boats, or holidays. Compare wants vs needs and protect your mortgage freedom.',
    canonical: `${BASE_URL}/tools/wishlist-impact`,
    h1: 'Cost of Spending From Your Redraw Calculator',
    h2s: ['Compare Wants vs Needs When Using Home Loan Equity for Lifestyle Purchases'],
    paragraphs: [
      'Before putting a car, boat, holiday, or lifestyle purchase onto your home loan redraw or equity, calculate how many extra years of work and how much compounding interest that purchase truly costs.'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Cost of Spending From Your Redraw Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      url: `${BASE_URL}/tools/wishlist-impact`
    }
  },
  '/guides': {
    path: '/guides',
    title: 'Mortgage Reduction & Home Loan Guides | Crown Money',
    description: 'Read expert Australian guides on paying off your mortgage faster, offset vs redraw accounts, cash-flow automation, debt recycling, and loan fees.',
    canonical: `${BASE_URL}/guides`,
    h1: 'Australian Mortgage Reduction & Home Loan Guides',
    h2s: guidesData.map((g) => g.title),
    paragraphs: [
      'Evidence-based Australian home loan and cash-flow guides authored and reviewed by Scott Parry (Founder & CEO) and Craig Parry (Partner & Senior Finance Broker, ACL 388 279).',
      ...guidesData.map((g) => `${g.title}: ${g.excerpt}`)
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Australian Mortgage Reduction & Home Loan Guides',
      url: `${BASE_URL}/guides`
    }
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
      'Answer a few short questions to see if the Crown Money System could help you retire mortgage-free. Over 7,000 Australian families have used it to own their homes years earlier.'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Pay Off Your Mortgage in 7–15 Years | Crown Money',
      url: `${BASE_URL}/pay-off-mortgage`
    }
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy & Credit Guide | Crown Money',
    description: 'Read the Crown Money Management (Crown Lending Pty Ltd ACL 388 279) Privacy Policy and Credit Reporting Policy under Australian Privacy Principles.',
    canonical: `${BASE_URL}/privacy`,
    h1: 'Privacy Policy',
    h2s: ['Respecting Your Privacy & Australian Privacy Principles Compliance'],
    paragraphs: [
      'This Privacy Policy and Credit Reporting Policy explains how Crown Lending Pty Ltd (ABN 47 119 504 862, ACN 119 504 862, ACL 388 279) collects, uses, holds, and protects your personal and credit-related information.'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Privacy Policy & Credit Guide | Crown Money',
      url: `${BASE_URL}/privacy`
    }
  },
  '/target-market-determinations': {
    path: '/target-market-determinations',
    title: 'Target Market Determinations (TMD) | Crown Money',
    description: 'View Target Market Determinations (TMDs) for Crown Money Management and Crown Lending Pty Ltd (ACL 388 279) home loan and mortgage products.',
    canonical: `${BASE_URL}/target-market-determinations`,
    h1: 'Target Market Determinations',
    h2s: ['Product Suitability & Regulatory Compliance (ACL 388 279)'],
    paragraphs: [
      'Target Market Determinations (TMDs) help Australian consumers understand which residential, investment, construction, and SMSF loan products distributed by Crown Lending Pty Ltd (ACL 388 279) are appropriate for their objectives, financial situation, and needs.'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Target Market Determinations (TMD) | Crown Money',
      url: `${BASE_URL}/target-market-determinations`
    }
  },
  '/author/scott-parry': {
    path: '/author/scott-parry',
    title: 'Scott Parry | Founder & CEO | Crown Money',
    description: 'Meet Scott Parry, Founder & CEO of Crown Money Management. Over 25 years helping 7,000+ Australian families pay off their home loans faster.',
    canonical: `${BASE_URL}/author/scott-parry`,
    ogImage: 'https://storage.googleapis.com/crown_money/Website/About/People/Scott_Parry_BW.jpg',
    h1: 'Scott Parry',
    h2s: ['Founder & CEO — Crown Money Management (ACL 388 279)'],
    paragraphs: [
      'Scott Parry is the founder and CEO of Crown Money Management (Crown Lending Pty Ltd ACL 388 279). With over 25 years of experience in Australian mortgage strategy and cash-flow coaching, Scott pioneered the Home Ownership Programme (HOP).'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: 'Scott Parry',
        jobTitle: 'Founder & CEO',
        worksFor: organizationSchema
      }
    }
  },
  '/author/craig-parry': {
    path: '/author/craig-parry',
    title: 'Craig Parry | Senior Finance Broker | Crown Money',
    description: 'Meet Craig Parry, Partner & Senior Finance Broker at Crown Money (ACL 388 279). Multi-award-winning Australian mortgage strategist.',
    canonical: `${BASE_URL}/author/craig-parry`,
    ogImage: 'https://storage.googleapis.com/crown_money/Website/About/People/craig%20parry.png',
    h1: 'Craig Parry',
    h2s: ['Partner & Senior Finance Broker — Crown Money Management (ACL 388 279)'],
    paragraphs: [
      'Craig Parry is Partner and Senior Finance Broker at Crown Money Management (Crown Lending Pty Ltd ACL 388 279), overseeing mortgage brokerage operations and complex Australian loan structuring.'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: 'Craig Parry',
        jobTitle: 'Partner & Senior Finance Broker',
        worksFor: organizationSchema
      }
    }
  },
  '/completed': {
    path: '/completed',
    title: 'Statement Shared Successfully | Crown Money',
    description: 'Your bank statement connection has been securely shared with the Crown Money strategy team.',
    canonical: `${BASE_URL}/completed`,
    noindex: true,
    h1: 'Statement Shared!',
    h2s: ['Next Steps for Your Strategy Session'],
    paragraphs: ['Thank you for securely connecting your statements with Crown Money Management.'],
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Statement Shared Successfully' }
  },
  '/error': {
    path: '/error',
    title: 'Bank Statement Connection Issue | Crown Money',
    description: 'There was an issue connecting your bank statement. Please contact Crown Money support on 1300 882 981.',
    canonical: `${BASE_URL}/error`,
    noindex: true,
    h1: 'Oops, could not connect the bank statement!',
    h2s: ['Need Assistance? Call 1300 882 981'],
    paragraphs: ['Please retry connecting your statement or contact Crown Money support on 1300 882 981.'],
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Bank Statement Connection Issue' }
  }
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
    ogImage: guide.author.image,
    h1: guide.h1,
    h2s: guide.sections.map((s) => s.heading),
    paragraphs: [
      `By ${guide.author.name} (${guide.author.credentials}). Reviewed by ${guide.reviewedBy.name} (${guide.reviewedBy.credentials}). Last updated ${guide.updatedDate}.`,
      guide.excerpt,
      ...guide.sections.flatMap((s) => s.body)
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.metaDescription,
      datePublished: guide.publishedDate,
      dateModified: guide.updatedDate,
      author: { '@type': 'Person', name: guide.author.name },
      reviewedBy: { '@type': 'Person', name: guide.reviewedBy.name },
      publisher: organizationSchema
    }
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
    h2s: [
      `Key Results: ${study.loanSize} Loan · ${study.yearsSaved} · ${study.interestSaved}`,
      'The Starting Position & Challenge',
      'The Crown Money Strategy Implemented'
    ],
    paragraphs: [
      study.summary,
      study.challenge,
      ...study.strategyImplemented,
      `"${study.clientQuote}" — ${study.name}, ${study.state}`
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: study.headline,
      description: study.metaDescription,
      image: study.image,
      publisher: organizationSchema
    }
  };
}

const NOT_FOUND_SEO: RouteSeoData = {
  path: '/404',
  title: 'Page Not Found | Crown Money',
  description: 'The page you are looking for could not be found. Explore Crown Money calculators, mortgage reduction guides, or book a free strategy session.',
  canonical: `${BASE_URL}/`,
  noindex: true,
  h1: 'Page Not Found (404)',
  h2s: ['Explore Crown Money Mortgage Calculators & Guides'],
  paragraphs: [
    'Sorry, the page you requested does not exist or has moved. Use the links below to access our Australian mortgage reduction calculators, guides, client reviews, and contact page.'
  ],
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Page Not Found | Crown Money'
  }
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

  const guideLinks = guidesData.map(
    (g) => `<li><a href="/guides/${g.slug}">${escapeHtml(g.title)}</a></li>`
  ).join('\n            ');

  const caseStudyLinks = caseStudiesData.map(
    (c) => `<li><a href="/success-stories/${c.slug}">${escapeHtml(c.name)} (${escapeHtml(c.result)} — ${escapeHtml(c.loanSize)} Loan)</a></li>`
  ).join('\n            ');

  const h2Blocks = route.h2s
    .map((h2, idx) => {
      const p = route.paragraphs[idx] || '';
      return `<section>
          <h2>${escapeHtml(h2)}</h2>
          ${p ? `<p>${escapeHtml(p)}</p>` : ''}
        </section>`;
    })
    .join('\n        ');

  const extraParagraphs = route.paragraphs
    .slice(route.h2s.length)
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join('\n        ');

  return `<div class="prerendered-seo-shell">
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
          ${h2Blocks}
          ${extraParagraphs}
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
      html: ''
    };
  }
  if (lowerPath.startsWith('/blog/')) {
    return {
      status: 301,
      redirectTo: '/guides',
      html: ''
    };
  }

  const routeData = ALL_ROUTES[cleanPath];
  const isKnownRoute = Boolean(routeData);
  const seo = routeData || NOT_FOUND_SEO;
  const status = isKnownRoute ? 200 : 404;

  const ogImage = seo.ogImage || DEFAULT_OG_IMAGE;
  const ogType = seo.ogType || 'website';
  const robotsContent = seo.noindex ? 'noindex, nofollow' : 'index, follow';

  const headTags = `
    <title>${escapeHtml(seo.title)}</title>
    <meta name="title" content="${escapeHtml(seo.title)}" />
    <meta name="description" content="${escapeHtml(seo.description)}" />
    <meta name="robots" content="${robotsContent}" />
    <link rel="canonical" href="${escapeHtml(seo.canonical)}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${escapeHtml(seo.canonical)}" />
    <meta property="og:title" content="${escapeHtml(seo.title)}" />
    <meta property="og:description" content="${escapeHtml(seo.description)}" />
    <meta property="og:image" content="${escapeHtml(ogImage)}" />
    <meta property="og:site_name" content="Crown Money" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${escapeHtml(seo.canonical)}" />
    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
    <meta name="twitter:image" content="${escapeHtml(ogImage)}" />
    <script type="application/ld+json">${JSON.stringify(seo.schema)}</script>`;

  // Replace existing default SEO block or <title> in templateHtml
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
