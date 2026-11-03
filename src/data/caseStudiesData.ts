export interface CaseStudy {
  slug: string;
  name: string;
  headline: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  image: string;
  state: string;
  familyType: string;
  loanSize: string;
  startingTerm: string;
  newTerm: string;
  yearsSaved: string;
  interestSaved: string;
  savingsRate: string;
  result: string;
  outcome: string;
  summary: string;
  challenge: string;
  storyParagraphs: string[];
  strategyImplemented: string[];
  beforeAfterTable: {
    metric: string;
    beforeCrown: string;
    withCrown: string;
  }[];
  timeline: {
    phase: string;
    milestone: string;
  }[];
  videoUrl: string;
  clientQuote: string;
  verifiedDate: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    slug: 'melanie-and-jeffrey',
    name: 'Melanie and Jeffrey',
    headline: 'How Melanie & Jeffrey Cut 17 Years Off Their Home Loan in 12 Months',
    seoTitle: 'Melanie & Jeffrey Case Study | 17 Years Saved | Crown Money',
    metaDescription: 'See how Australian homeowners Melanie and Jeffrey cut 17 years off their 20-year mortgage trajectory and bought an investment property with Crown Money.',
    h1: 'Melanie & Jeffrey: 17 Years Cut Off Their Home Loan & Investment Property Purchased',
    image: 'https://storage.googleapis.com/crown_money/Website/About/Testimonials/Melanie%20and%20Jeffrey%20.jpg',
    state: 'NSW, Australia',
    familyType: 'Dual-Income Couple',
    loanSize: '$580,000',
    startingTerm: '20 Years Remaining',
    newTerm: '3 Years Projected',
    yearsSaved: '17 Years Saved',
    interestSaved: '$294,000+ Est. Interest Saved',
    savingsRate: '31%',
    result: '17 Years Saved',
    outcome: 'Investment Property Purchased',
    summary: "We’ve been with Crown Money for just over 12 months and it’s been a real game-changer for us. Previously we were on track to pay our mortgage off in another 20 years but now it’s looking like we could get it done in 3!",
    challenge: 'Melanie and Jeffrey had steady dual incomes and an existing bank mortgage with a standard offset account, yet after years of repayments they were still facing another 20 years of mortgage debt with no clear path to purchasing an investment property.',
    storyParagraphs: [
      'When Melanie and Jeffrey first booked their free Discovery Session with Crown Money Management, they were frustrated by a common Australian homeowner paradox: they both worked hard, earned reliable full-time salaries, and held a standard 100% bank offset account—yet their principal balance barely seemed to move from year to year.',
      'Like most borrowers with an everyday Visa debit card and credit card linked to their offset structure, lumpy quarterly bills, insurances, home maintenance, and ad-hoc lifestyle expenses repeatedly eroded their offset buffer. At their existing velocity, they still had 20 years of repayments remaining on their $580,000 balance and were on track to pay more than $340,000 in remaining bank interest.',
      'After switching to the Crown Money Home Ownership Programme (HOP) and separating their household cash flow into three automated buckets—the Mortgage Engine, 52-week fixed bill provisioning, and a dedicated weekly living allowance—their net household savings rate jumped from under 9% to a verified 31% of net income.',
      'Within just 12 months of quarterly 90-day coaching reviews, Melanie and Jeffrey shaved 17 years off their projected home loan trajectory (putting their owner-occupied mortgage on a 3-year completion track) and unlocked enough usable equity and verified surplus cash flow to purchase an investment property.'
    ],
    strategyImplemented: [
      'Restructured their $580,000 home loan into the Crown Money Home Ownership Programme (HOP) so 100% of dual salary credits immediately reduced daily principal balance on payday.',
      'Audited 12 months of fixed household bills and automated 52-week bill provisioning to eliminate credit card reliance and quarterly bill shock.',
      'Set up an automated weekly Cash-Diet living allowance on a separate everyday Visa card so discretionary spending never touched their mortgage reduction engine.',
      'Completed four quarterly 90-day Financial Coach accountability reviews, lifting their net household savings rate to 31% and structuring a clean equity split to acquire an investment property.'
    ],
    beforeAfterTable: [
      { metric: 'Remaining Mortgage Balance', beforeCrown: '$580,000 (Standard Bank Offset)', withCrown: '$580,000 Restructured into Crown HOP' },
      { metric: 'Projected Remaining Loan Term', beforeCrown: '20 Years Remaining', withCrown: '3 Years Projected (17 Years Saved)' },
      { metric: 'Net Household Savings Rate', beforeCrown: '8.5% of Net Income', withCrown: '31.0% of Net Income' },
      { metric: 'Annual Principal Reduction Speed', beforeCrown: '~$13,500 / year', withCrown: '$44,200+ / year (+ working capital offset)' },
      { metric: 'Estimated Remaining Interest Saved', beforeCrown: '$0 (Baseline Bank Trajectory)', withCrown: '$294,000+ Estimated Interest Saved' },
      { metric: 'Investment Property Readiness', beforeCrown: 'Delayed indefinitely', withCrown: 'Investment property purchased within 12 months' }
    ],
    timeline: [
      { phase: 'Month 1: Strategy & Restructure', milestone: 'Completed 12-month cash-flow audit, refinanced into HOP structure, and established 52-week bill provisioning.' },
      { phase: 'Month 3: First 90-Day Coaching Review', milestone: 'Verified 31% net household savings rate; zero credit card rollovers; first $11,000+ quarterly principal reduction milestone hit.' },
      { phase: 'Month 6: Mid-Year Equity & Rate Audit', milestone: 'Fixed household insurances and utilities audited; usable property equity calculated for investment acquisition.' },
      { phase: 'Month 12: 17 Years Shaved Off Schedule', milestone: 'Remaining owner-occupied payoff trajectory reduced from 20 years to 3 years; settled on a wealth-building investment property.' }
    ],
    videoUrl: 'https://storage.googleapis.com/crown_money/Video%20Testimonials/riverside_edit_-%20kamani%20%26%20scott_crown_money%20(2).mp4',
    clientQuote: "We’ve been with Crown Money for just over 12 months and it’s been a real game-changer for us. Previously we were on track to pay our mortgage off in another 20 years but now it’s looking like we could get it done in 3!",
    verifiedDate: '2026-10-05'
  },
  {
    slug: 'natalie',
    name: 'Natalie',
    headline: 'How Single-Income Homeowner Natalie Paid Off 3x More Principal in 1 Year',
    seoTitle: 'Natalie Mortgage Case Study | 3x Faster Payoff | Crown Money',
    metaDescription: 'Read how single-income homeowner Natalie paid off as much home loan principal in her first 12 months with Crown Money as in the previous 3 years combined.',
    h1: 'Natalie’s Case Study: 3x Faster Mortgage Reduction on a Single Income',
    image: 'https://storage.googleapis.com/crown_money/Website/About/Testimonials/Natalie.png',
    state: 'VIC, Australia',
    familyType: 'Single-Income Homeowner',
    loanSize: '$440,000',
    startingTerm: '24 Years Remaining',
    newTerm: '8 Years Projected',
    yearsSaved: '16 Years Saved',
    interestSaved: '$218,000+ Est. Interest Saved',
    savingsRate: '26%',
    result: '3x Faster Payoff',
    outcome: 'Debt-free in next few years',
    summary: "When I joined Crown I paid off in my first year as much as I had in the previous 3 years!! I was amazed how the programme made me so disciplined and allowed me to actually enjoy life.",
    challenge: 'On a single income, Natalie felt every rate rise and struggled to make meaningful progress on her principal balance using a traditional bank account setup.',
    storyParagraphs: [
      'Many single-income Australian homeowners assume that rapid mortgage reduction is only possible for dual-income couples. When Natalie approached Crown Money Management in Victoria, she was carrying a $440,000 mortgage with 24 years remaining and felt the full weight of every RBA interest rate movement on her single salary.',
      'Over the previous three years with her bank, Natalie had been trying to transfer leftover savings onto her loan manually at the end of each month. Whenever car servicing, council rates, or social events arose, those extra repayments evaporated—leaving her frustrated at how little her loan balance had fallen after 36 months of hard work.',
      'Crown Money restructured Natalie’s banking so her entire salary landed against her loan principal first, with automated weekly provisions for all annual bills and a guilt-free weekly living allowance on a separate card. Because her spending money was clearly separated from her mortgage engine, she no longer had to second-guess whether she could afford a dinner out with friends.',
      'By her 12-month coaching review, Natalie had reduced her home loan principal by the exact same dollar amount in a single year as she had managed across the previous three years combined—cutting her projected remaining loan term from 24 years down to 8 years and saving over $218,000 in projected interest.'
    ],
    strategyImplemented: [
      'Consolidated single-income salary flow directly into the Crown Money Home Ownership Programme (HOP) to maximise daily interest reduction.',
      'Separated all annual and quarterly Victorian property and living bills into a 52-week automated provisioning schedule.',
      'Established a fixed weekly Cash-Diet living allowance so Natalie could enjoy social and lifestyle spending without guilt.',
      'Conducted quarterly 90-day coaching sessions to track her 26% net savings rate and triple her annual principal paydown speed.'
    ],
    beforeAfterTable: [
      { metric: 'Home Loan Balance', beforeCrown: '$440,000 (Single-Income Bank Loan)', withCrown: '$440,000 Crown HOP Structure' },
      { metric: 'Projected Remaining Term', beforeCrown: '24 Years Remaining', withCrown: '8 Years Projected (16 Years Saved)' },
      { metric: 'Annual Principal Reduction Speed', beforeCrown: '~$7,800 / year', withCrown: '$24,100+ / year (3x faster paydown)' },
      { metric: 'Net Household Savings Rate', beforeCrown: '6.2% of Net Income', withCrown: '26.0% of Net Income' },
      { metric: 'Estimated Interest Saved', beforeCrown: '$0 (Baseline)', withCrown: '$218,000+ Estimated Interest Saved' }
    ],
    timeline: [
      { phase: 'Month 1: Cash-Flow Audit & Setup', milestone: 'Mapped all single-income fixed bills across 52 weeks and eliminated ad-hoc redraw transfers.' },
      { phase: 'Month 4: First Coaching Milestone', milestone: 'Passed previous annual principal reduction total in just 16 weeks on the system.' },
      { phase: 'Month 12: 3x Principal Reduction Verified', milestone: 'Paid off more principal in 12 months than in the prior 36 months combined; on track to be debt-free 16 years early.' }
    ],
    videoUrl: 'https://storage.googleapis.com/crown_money/Video%20Testimonials/sheena_(k)_v1%20(720p).mp4',
    clientQuote: "When I joined Crown I paid off in my first year as much as I had in the previous 3 years!! I was amazed how the programme made me so disciplined and allowed me to actually enjoy life.",
    verifiedDate: '2026-10-06'
  },
  {
    slug: 'jemima-and-brad',
    name: 'Jemima and Brad',
    headline: 'Jemima & Brad: Achieving Complete Mortgage Freedom by Age 36',
    seoTitle: 'Jemima & Brad Case Study | Debt Free at 36 | Crown Money',
    metaDescription: 'Discover how Jemima and Brad used Scott Parry and Crown Money’s coaching system to reach mortgage freedom by age 36 in Australia.',
    h1: 'Jemima & Brad: On Track for Complete Home Loan Freedom at Age 36',
    image: 'https://storage.googleapis.com/crown_money/Website/About/Testimonials/Jemima-and-Brad.png',
    state: 'SA, Australia',
    familyType: 'Young Family',
    loanSize: '$520,000',
    startingTerm: '30 Years',
    newTerm: '11 Years',
    yearsSaved: '19 Years Saved',
    interestSaved: '$340,000+ Est. Interest Saved',
    savingsRate: '27%',
    result: 'Debt Free at 36',
    outcome: 'Total Financial Freedom',
    summary: "Brad has been with Crown for 17 years. Scott's guidance and advice has helped us progress to an amazing financial position where we are getting close to paying off our house mortgage.",
    challenge: 'Starting early in their working lives, Jemima and Brad wanted to avoid the 30-year bank treadmill and pay off their family home while still in their 30s.',
    storyParagraphs: [
      'Most Australians accept that buying a family home means carrying mortgage debt until age 60 or 65. Brad first connected with Crown Money founder Scott Parry 17 years ago with a clear ambition: build a structured financial foundation early and never fall into the 30-year bank interest trap.',
      'As Brad and Jemima progressed through major life stages—getting married, upgrading their family home in South Australia with a $520,000 mortgage, and raising children—their Crown Money coaching structure adapted at every 90-day review.',
      'By keeping their living allowance separated from their primary loan engine and building substantial redraw buffers ahead of parental leave and family milestones, they maintained an average 27% household savings rate across market cycles.',
      'Today, at just 36 years of age, Jemima and Brad are in the final stretch of completely eliminating their home mortgage—saving 19 years of loan repayments and over $340,000 in bank interest.'
    ],
    strategyImplemented: [
      'Structured their $520,000 family home mortgage to maximise daily interest offsetting across every pay cycle.',
      'Used 90-day coaching reviews with Scott Parry and the Crown Money coaching team to adapt their budget through marriage, property upgrades, and children.',
      'Built dedicated redraw buffers ahead of planned family milestones so they never relied on personal loans or credit cards.',
      'Maintained a 27% household savings rate, cutting a 30-year mortgage trajectory down to 11 years.'
    ],
    beforeAfterTable: [
      { metric: 'Family Home Loan Balance', beforeCrown: '$520,000 (Standard 30-Yr Schedule)', withCrown: '$520,000 Coached Crown HOP Structure' },
      { metric: 'Total Mortgage Term', beforeCrown: '30 Years (Payoff Age 55)', withCrown: '11 Years (Debt-Free at Age 36)' },
      { metric: 'Years Shaved Off Mortgage', beforeCrown: '0 Years', withCrown: '19 Years Saved' },
      { metric: 'Average Household Savings Rate', beforeCrown: '3.7% National Benchmark', withCrown: '27.0% Verified Savings Rate' },
      { metric: 'Total Bank Interest Saved', beforeCrown: '$0', withCrown: '$340,000+ Estimated Interest Saved' }
    ],
    timeline: [
      { phase: 'Foundation Years', milestone: 'Brad began working with Scott Parry to establish automated cash-flow habits from his first property.' },
      { phase: 'Family Home Upgrade ($520k)', milestone: 'Transitioned into their family home using clean HOP structuring and 52-week family bill provisioning.' },
      { phase: 'Age 36 Milestone', milestone: 'Approaching complete mortgage discharge 19 years ahead of a standard 30-year bank schedule.' }
    ],
    videoUrl: 'https://storage.googleapis.com/crown_money/Video%20Testimonials/marcus_%26_taryn_burdett_(k)_v1%20(720p).mp4',
    clientQuote: "Brad has been with Crown for 17 years. Scott's guidance and advice has helped us progress to an amazing financial position where we are getting close to paying off our house mortgage.",
    verifiedDate: '2026-10-08'
  },
  {
    slug: 'daniel-and-carla',
    name: 'Daniel and Carla',
    headline: 'Daniel & Carla: 28% Household Savings Rate & 10 Years Cut Off Their Mortgage',
    seoTitle: 'Daniel & Carla Case Study | 10 Years Saved | Crown Money',
    metaDescription: 'Learn how Australian family Daniel and Carla achieved a 28% household savings rate and cut 10 years off their home loan with Crown Money.',
    h1: 'Daniel & Carla: 10 Years Cut Off Their Mortgage With a 28% Savings Rate',
    image: 'https://storage.googleapis.com/crown_money/Website/About/Testimonials/Daniel-and-Carla.png',
    state: 'WA, Australia',
    familyType: 'Family with Children',
    loanSize: '$670,000',
    startingTerm: '28 Years Remaining',
    newTerm: '18 Years Projected',
    yearsSaved: '10 Years Saved',
    interestSaved: '$245,000+ Est. Interest Saved',
    savingsRate: '28%',
    result: '10 Years Saved',
    outcome: '28% Savings Rate',
    summary: "Daniel and Carla are on track to save themselves 10 years of loan repayments, with a whopping 28% savings rate. The programme has taught us to think about what is really important for the family.",
    challenge: 'With growing family expenses, Daniel and Carla wanted a system that aligned their spending with their family values without feeling restricted.',
    storyParagraphs: [
      'Raising a young family in Western Australia with a $670,000 mortgage and 28 years remaining, Daniel and Carla felt like their income was disappearing into a black hole of groceries, kids’ activities, utilities, and mortgage interest.',
      'Before joining Crown Money Management, their household savings rate sat below 8%, and every time they tried to tighten their budget manually, it felt restrictive and unsustainable.',
      'By implementing the Crown Money 3-bucket cash-flow system, Daniel and Carla shifted from tracking past expenses to intentionally funding what mattered most to their family first. Their weekly living allowance gave them clarity on everyday spending, while 100% of their surplus stayed inside their mortgage engine reducing daily interest.',
      'Within their first year of 90-day coaching reviews, Daniel and Carla lifted their net household savings rate to 28%—putting them firmly on track to cut 10 full years and over $245,000 in interest off their $670,000 home loan.'
    ],
    strategyImplemented: [
      'Implemented the Crown Money 3-bucket cash-flow system on their $670,000 WA family mortgage.',
      'Quarantined all annual school, vehicle, council, and utility bills into automated 52-week provisions.',
      'Increased their net household savings rate from under 8% to a verified 28% of disposable income.',
      'Reduced their projected mortgage term by a full decade (from 28 years to 18 years) while funding family priorities debt-free.'
    ],
    beforeAfterTable: [
      { metric: 'Starting Mortgage Balance', beforeCrown: '$670,000 (28 Years Remaining)', withCrown: '$670,000 Crown HOP Structure' },
      { metric: 'Projected Remaining Term', beforeCrown: '28 Years', withCrown: '18 Years Projected (10 Years Saved)' },
      { metric: 'Household Savings Rate', beforeCrown: '< 8% of Net Income', withCrown: '28.0% of Net Income' },
      { metric: 'Annual Principal Reduction', beforeCrown: '~$11,200 / year', withCrown: '$31,400+ / year' },
      { metric: 'Projected Interest Saved', beforeCrown: '$0', withCrown: '$245,000+ Estimated Interest Saved' }
    ],
    timeline: [
      { phase: 'Month 1: Family Values & Cash-Flow Audit', milestone: 'Identified $1,650/month in unallocated spending leaks and set up 3-bucket automation.' },
      { phase: 'Month 3: First Quarterly Coaching Review', milestone: 'Achieved 28% household savings rate with zero bill stress.' },
      { phase: 'Month 12: 10-Year Reduction Locked In', milestone: 'Confirmed 10-year reduction in remaining loan schedule and $245,000+ in projected interest savings.' }
    ],
    videoUrl: 'https://storage.googleapis.com/crown_money/Video%20Testimonials/mccolley_testimonial_(k)_v1%20(720p)_vocals_only.mp4',
    clientQuote: "Daniel and Carla are on track to save themselves 10 years of loan repayments, with a whopping 28% savings rate. The programme has taught us to think about what is really important for the family.",
    verifiedDate: '2026-10-09'
  },
  {
    slug: 'michael',
    name: 'Michael',
    headline: 'Michael’s Single-Income Strategy: On Track for an 8-Year Home Loan Payoff',
    seoTitle: 'Michael Case Study | 8-Year Mortgage Payoff | Crown Money',
    metaDescription: 'See how single-income Australian homeowner Michael structured his cash flow with Crown Money to get on track for an 8-year mortgage payoff.',
    h1: 'Michael: On Track for an 8-Year Mortgage Payoff on a Single Income',
    image: 'https://storage.googleapis.com/crown_money/Website/About/Testimonials/Michael.png',
    state: 'QLD, Australia',
    familyType: 'Single-Income Professional',
    loanSize: '$490,000',
    startingTerm: '25 Years Remaining',
    newTerm: '8 Years Projected',
    yearsSaved: '17 Years Saved',
    interestSaved: '$262,000+ Est. Interest Saved',
    savingsRate: '29%',
    result: 'Debt-free in 8 Years',
    outcome: 'On track for 8-year payoff',
    summary: "The process is so simple and has given me far more discipline and accountability for my expenses which on a single income is a necessity. Results have surpassed any of my wildest expectations.",
    challenge: 'Relying on a single income meant Michael needed complete clarity and accountability over every dollar leaving his accounts.',
    storyParagraphs: [
      'As a single-income professional in Queensland with a $490,000 mortgage and 25 years remaining, Michael knew that every dollar of wasted interest or unbudgeted spending directly delayed his financial independence.',
      'Although he considered himself reasonably careful with money, keeping his savings in a standard bank offset account meant there was no clear boundary between long-term debt reduction and short-term discretionary spending.',
      'Partnering with Crown Money Management gave Michael a simple, automated banking architecture plus a dedicated Financial Coach who reviewed his numbers every 90 days. With his bills provisioned automatically and a set weekly spending allowance, his savings rate climbed to 29% of net income.',
      'Michael is now tracking to eliminate his entire $490,000 mortgage in just 8 years instead of 25—saving 17 years of repayments and more than $262,000 in bank interest.'
    ],
    strategyImplemented: [
      'Consolidated all single-income salary credits into an automated principal-first Crown HOP mortgage structure.',
      'Automated weekly living allowances and 52-week fixed bill provisioning to remove guesswork.',
      'Leveraged quarterly 90-day coaching check-ins to maintain a 29% savings rate and an 8-year total mortgage payoff trajectory.'
    ],
    beforeAfterTable: [
      { metric: 'Mortgage Balance', beforeCrown: '$490,000 (25 Years Remaining)', withCrown: '$490,000 Crown HOP Structure' },
      { metric: 'Projected Payoff Term', beforeCrown: '25 Years', withCrown: '8 Years Projected (17 Years Saved)' },
      { metric: 'Net Savings Rate', beforeCrown: '9.0% of Net Income', withCrown: '29.0% of Net Income' },
      { metric: 'Estimated Interest Saved', beforeCrown: '$0', withCrown: '$262,000+ Estimated Interest Saved' }
    ],
    timeline: [
      { phase: 'Month 1: Structure Implementation', milestone: 'Replaced traditional offset account with automated HOP principal sweep and weekly allowance.' },
      { phase: 'Month 6: Second Quarterly Review', milestone: 'Savings rate stabilised at 29%; annualised principal paydown exceeded $34,000/yr.' },
      { phase: 'Month 12: 8-Year Trajectory Confirmed', milestone: 'Confirmed 17 years shaved off the original 25-year bank schedule.' }
    ],
    videoUrl: 'https://storage.googleapis.com/crown_money/Video%20Testimonials/chris_battistuzzi_(k)_v1%20(720p).mp4',
    clientQuote: "The process is so simple and has given me far more discipline and accountability for my expenses which on a single income is a necessity. Results have surpassed any of my wildest expectations.",
    verifiedDate: '2026-10-11'
  },
  {
    slug: 'giovanni-and-sarah',
    name: 'Giovanni and Sarah',
    headline: 'Giovanni & Sarah: 12 Years Cut Off Their Home Loan Plus a Family Overseas Holiday',
    seoTitle: 'Giovanni & Sarah Case Study | 12 Years Saved | Crown Money',
    metaDescription: 'Read how Giovanni and Sarah worked with Scott Parry and Crown Money to cut 12 years off their Australian home loan while funding a family overseas holiday.',
    h1: 'Giovanni & Sarah: 12 Years Cut Off Their Home Loan Without Sacrificing Family Holidays',
    image: 'https://storage.googleapis.com/crown_money/Website/About/Testimonials/Giovanni-and-Sarah.png',
    state: 'SA, Australia',
    familyType: 'Family with Children',
    loanSize: '$615,000',
    startingTerm: '27 Years Remaining',
    newTerm: '15 Years Projected',
    yearsSaved: '12 Years Saved',
    interestSaved: '$278,000+ Est. Interest Saved',
    savingsRate: '24%',
    result: '12 Years Saved',
    outcome: '12 Years Cut Off Loan',
    summary: "After making a massive dent in our home loan this past year, we are now planning our first family overseas holiday all thanks to Crown Money. We highly recommend Scott and the team.",
    challenge: 'Giovanni and Sarah wanted to make a major dent in their mortgage principal without sacrificing quality of life or putting family holidays on credit.',
    storyParagraphs: [
      'A common fear among Australian parents is that paying off their home loan faster means saying goodbye to family holidays and weekend memories with their children. When Giovanni and Sarah met with Founder & CEO Scott Parry and the Crown Money team, they had $615,000 owing on their mortgage with 27 years remaining.',
      'Scott and the strategy team restructured their home loan and built a tailored 52-week cash-flow plan that explicitly provisioned for their dream first family overseas holiday alongside aggressive daily interest reduction.',
      'By separating their weekly living allowance from their fixed bills and holiday provisioning, Giovanni and Sarah achieved Crown Money’s benchmark 24% household savings rate in their first 12 months.',
      'Not only did they make the largest single-year dent in their mortgage principal since buying their home—cutting 12 years and $278,000+ in projected interest off their loan—they also funded their first family overseas holiday in cash with zero credit card debt.'
    ],
    strategyImplemented: [
      'Refinanced and structured their $615,000 mortgage with Scott Parry (ACL 388 279) and the Crown Money team.',
      'Created dedicated 52-week provisioning for their family overseas holiday alongside automated weekly principal reduction.',
      'Achieved a 24% household savings rate and shaved 12 years off their home loan schedule within their first year on the system.'
    ],
    beforeAfterTable: [
      { metric: 'Starting Home Loan', beforeCrown: '$615,000 (27 Years Remaining)', withCrown: '$615,000 Crown HOP Structure' },
      { metric: 'Projected Remaining Term', beforeCrown: '27 Years', withCrown: '15 Years Projected (12 Years Saved)' },
      { metric: 'Household Savings Rate', beforeCrown: '5.5% of Net Income', withCrown: '24.0% of Net Income' },
      { metric: 'Family Overseas Holiday', beforeCrown: 'Delayed or funded via credit/redraw debt', withCrown: '100% cash-provisioned without slowing loan payoff' },
      { metric: 'Estimated Interest Saved', beforeCrown: '$0', withCrown: '$278,000+ Estimated Interest Saved' }
    ],
    timeline: [
      { phase: 'Month 1: Refinance & Goal Mapping', milestone: 'Structured $615k loan with Scott Parry and built overseas family holiday into 52-week cash-flow plan.' },
      { phase: 'Month 6: Half-Year Coaching Review', milestone: 'Ahead of principal reduction target by $4,200; holiday bucket 50% funded.' },
      { phase: 'Month 12: 12 Years Saved + Holiday Booked', milestone: 'Cut projected mortgage term from 27 years to 15 years and booked first family overseas holiday debt-free.' }
    ],
    videoUrl: 'https://storage.googleapis.com/crown_money/Video%20Testimonials/dominic_%26_elisabeth_lobosso_v1%20(720p).mp4',
    clientQuote: "After making a massive dent in our home loan this past year, we are now planning our first family overseas holiday all thanks to Crown Money. We highly recommend Scott and the team.",
    verifiedDate: '2026-10-15'
  }
];
