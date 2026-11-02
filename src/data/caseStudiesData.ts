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
  strategyImplemented: string[];
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
    strategyImplemented: [
      'Restructured their home loan into the Crown Money Home Ownership Programme (HOP) so 100% of salary credits immediately offset daily principal.',
      'Automated annual and quarterly bill provisioning to eliminate credit card reliance and lumpy bill stress.',
      'Established 90-day Financial Coach accountability reviews, lifting their net household savings rate to 31% and unlocking usable equity to purchase an investment property.'
    ],
    clientQuote: "We’ve been with Crown Money for just over 12 months and it’s been a real game-changer for us. Previously we were on track to pay our mortgage off in another 20 years but now it’s looking like we could get it done in 3!",
    verifiedDate: 'October 2026'
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
    strategyImplemented: [
      'Separated fixed bills from weekly discretionary spending using Crown Money’s automated cash-diet structure.',
      'Directed all surplus income straight to principal reduction on payday.',
      'Worked with her dedicated Crown Financial Coach every quarter to audit fixed household bills and triple her annual principal reduction speed.'
    ],
    clientQuote: "When I joined Crown I paid off in my first year as much as I had in the previous 3 years!! I was amazed how the programme made me so disciplined and allowed me to actually enjoy life.",
    verifiedDate: 'October 2026'
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
    strategyImplemented: [
      'Structured their home loan and everyday banking to maximise daily interest reduction across multiple life stages.',
      'Maintained consistent 90-day coaching reviews to adjust their cash-flow structure as their family grew.',
      'Built substantial redraw buffers while accelerating principal paydown toward complete debt freedom at age 36.'
    ],
    clientQuote: "Brad has been with Crown for 17 years. Scott's guidance and advice has helped us progress to an amazing financial position where we are getting close to paying off our house mortgage.",
    verifiedDate: 'October 2026'
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
    strategyImplemented: [
      'Implemented the Crown Money 3-bucket cash-flow system to separate family lifestyle goals from non-essential spending leaks.',
      'Increased their household savings rate from under 8% to a verified 28% of net income.',
      'Reduced their projected mortgage term by a full decade while funding family milestones debt-free.'
    ],
    clientQuote: "Daniel and Carla are on track to save themselves 10 years of loan repayments, with a whopping 28% savings rate. The programme has taught us to think about what is really important for the family.",
    verifiedDate: 'October 2026'
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
    strategyImplemented: [
      'Consolidated banking into an automated principal-first mortgage structure.',
      'Set up automated weekly living allowances and bill provisioning.',
      'Used quarterly coaching check-ins to stay on track for an 8-year total mortgage payoff.'
    ],
    clientQuote: "The process is so simple and has given me far more discipline and accountability for my expenses which on a single income is a necessity. Results have surpassed any of my wildest expectations.",
    verifiedDate: 'October 2026'
  },
  {
    slug: 'giovanni-and-sarah',
    name: 'Giovanni and Sarah',
    headline: 'Giovanni & Sarah: 12 Years Cut Off Their Home Loan Plus a Family Overseas Holiday',
    seoTitle: 'Giovanni & Sarah Case Study | 12 Years Saved | Crown Money',
    metaDescription: 'Read how Giovanni and Sarah worked with Craig Parry and Crown Money to cut 12 years off their Australian home loan while funding a family overseas holiday.',
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
    summary: "After making a massive dent in our home loan this past year, we are now planning our first family overseas holiday all thanks to Crown Money. We highly recommend Craig and the team.",
    challenge: 'Giovanni and Sarah wanted to make a major dent in their mortgage principal without sacrificing quality of life or putting family holidays on credit.',
    strategyImplemented: [
      'Refinanced and structured their loan with Craig Parry and the Crown Money team.',
      'Created dedicated provisioning for their family overseas holiday alongside automated weekly principal reduction.',
      'Shaved 12 years off their home loan schedule within their first year on the system.'
    ],
    clientQuote: "After making a massive dent in our home loan this past year, we are now planning our first family overseas holiday all thanks to Crown Money. We highly recommend Craig and the team.",
    verifiedDate: 'October 2026'
  }
];
