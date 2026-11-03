import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import { Link } from 'react-router-dom';
import { Sliders, TrendingDown, BarChart3, CheckCircle2, RotateCcw, ArrowRight, Calculator } from 'lucide-react';

export interface CaseFinancialProfile {
  defaultLoanBalance: number;
  defaultInterestRate: number;
  defaultTermYears: number;
  defaultNetMonthlyIncome: number;
  beforeSavingsRatePct: number;
  coachedSavingsRatePct: number;
  rollingBillBuffer: number;
  caseLabel: string;
  insightNote: string;
}

const SLUG_PROFILES: Record<string, CaseFinancialProfile> = {
  'kamani-and-scott-fast-track-mortgage-freedom': {
    defaultLoanBalance: 640000,
    defaultInterestRate: 6.19,
    defaultTermYears: 30,
    defaultNetMonthlyIncome: 11200,
    beforeSavingsRatePct: 6.5,
    coachedSavingsRatePct: 24,
    rollingBillBuffer: 18000,
    caseLabel: 'Kamani & Scott’s Dual-Income Model',
    insightNote:
      'Routing both salaries into a single daily-interest-offsetting hub plus an $18,000 rolling 52-week bill buffer collapses a 30-year schedule to under 13 years.',
  },
  '320000-saved-in-4-years-accelerated-debt-reduction': {
    defaultLoanBalance: 780000,
    defaultInterestRate: 6.19,
    defaultTermYears: 30,
    defaultNetMonthlyIncome: 13500,
    beforeSavingsRatePct: 7.0,
    coachedSavingsRatePct: 27,
    rollingBillBuffer: 24000,
    caseLabel: '$320k Saved in 4 Years Blueprint',
    insightNote:
      'Aggressive early principal reduction in the first 48 months eliminates both current debt and over $200,000 in future compounding bank interest.',
  },
  'chris-battistuzzi-home-loan-momentum-strategy': {
    defaultLoanBalance: 540000,
    defaultInterestRate: 6.19,
    defaultTermYears: 28,
    defaultNetMonthlyIncome: 9600,
    beforeSavingsRatePct: 5.5,
    coachedSavingsRatePct: 24,
    rollingBillBuffer: 15000,
    caseLabel: 'Chris Battistuzzi’s Momentum Model',
    insightNote:
      'Replacing passive monthly direct debits with payday surplus capture breaks the front-loaded bank interest curve in the first 12 months.',
  },
  'dominic-and-elisabeth-lobosso-pay-down-mortgage-years-sooner': {
    defaultLoanBalance: 620000,
    defaultInterestRate: 6.19,
    defaultTermYears: 28,
    defaultNetMonthlyIncome: 10800,
    beforeSavingsRatePct: 6.0,
    coachedSavingsRatePct: 25,
    rollingBillBuffer: 17500,
    caseLabel: 'Dominic & Elisabeth’s Optimised Loan Plan',
    insightNote:
      'Optimising loan structure with Scott Parry and locking in a 25% household savings rate saves over $410,000 in lifetime interest.',
  },
  'graham-customer-first-mortgage-structure': {
    defaultLoanBalance: 510000,
    defaultInterestRate: 6.19,
    defaultTermYears: 25,
    defaultNetMonthlyIncome: 9200,
    beforeSavingsRatePct: 6.0,
    coachedSavingsRatePct: 23,
    rollingBillBuffer: 16000,
    caseLabel: 'Graham’s Customer-First Architecture',
    insightNote:
      'Eliminating bundled bank credit card traps and keeping $16,000 of working capital offsetting daily interest cuts more than 12 years off the term.',
  },
  'linda-taylor-debt-free-mortgage-reduction-testimonial': {
    defaultLoanBalance: 460000,
    defaultInterestRate: 6.15,
    defaultTermYears: 24,
    defaultNetMonthlyIncome: 8900,
    beforeSavingsRatePct: 6.5,
    coachedSavingsRatePct: 26,
    rollingBillBuffer: 16000,
    caseLabel: 'Linda Taylor’s 100% Debt-Free Path',
    insightNote:
      'Consistent 90-day coaching cycles compound over time—once principal drops past the 50% mark, monthly interest charges collapse rapidly to $0.',
  },
  'marcus-and-taryn-burdett-family-wealth-building': {
    defaultLoanBalance: 690000,
    defaultInterestRate: 6.19,
    defaultTermYears: 30,
    defaultNetMonthlyIncome: 12000,
    beforeSavingsRatePct: 6.5,
    coachedSavingsRatePct: 25,
    rollingBillBuffer: 20000,
    caseLabel: 'Marcus & Taryn’s Family Equity Engine',
    insightNote:
      'Pre-provisioning school and family bills across 52 weeks prevents redraw raids while rapidly unlocking usable home equity at an 80% LVR.',
  },
  'mccolley-family-accelerated-savings-home-loan-optimisation': {
    defaultLoanBalance: 650000,
    defaultInterestRate: 6.19,
    defaultTermYears: 30,
    defaultNetMonthlyIncome: 11000,
    beforeSavingsRatePct: 3.7,
    coachedSavingsRatePct: 24,
    rollingBillBuffer: 18000,
    caseLabel: 'The McColley Family’s 24% Savings Velocity',
    insightNote:
      'Moving from the 3.7% ABS national average to Crown Money’s 24% coached savings benchmark unlocks $29,327/year in principal reduction.',
  },
  'monaghan-family-mortgage-free-generational-wealth': {
    defaultLoanBalance: 590000,
    defaultInterestRate: 6.19,
    defaultTermYears: 27,
    defaultNetMonthlyIncome: 11400,
    beforeSavingsRatePct: 7.0,
    coachedSavingsRatePct: 26,
    rollingBillBuffer: 19000,
    caseLabel: 'The Monaghan Family’s Generational Wealth Model',
    insightNote:
      'Clearing non-deductible home debt 15 years early frees up over $45,000/year in former bank repayments to compound inside income-producing assets.',
  },
  'peter-kerak-and-karina-kerakova-lifestyle-mortgage-strategy': {
    defaultLoanBalance: 630000,
    defaultInterestRate: 6.19,
    defaultTermYears: 29,
    defaultNetMonthlyIncome: 11500,
    beforeSavingsRatePct: 6.8,
    coachedSavingsRatePct: 24,
    rollingBillBuffer: 19500,
    caseLabel: 'Peter & Karina’s Lifestyle-Protected Plan',
    insightNote:
      'Pre-funding travel and lifestyle buffers in cash inside the 52-week plan keeps everyday living guilt-free while shaving 15+ years off the mortgage.',
  },
  'ryan-hillman-unlocking-extraordinary-mortgage-savings': {
    defaultLoanBalance: 575000,
    defaultInterestRate: 6.19,
    defaultTermYears: 28,
    defaultNetMonthlyIncome: 10200,
    beforeSavingsRatePct: 5.5,
    coachedSavingsRatePct: 24,
    rollingBillBuffer: 16500,
    caseLabel: 'Ryan Hillman’s Payday Surplus Capture',
    insightNote:
      'Capturing surplus automatically on payday rather than waiting for month-end leftovers turns invisible cash-flow leaks into permanent equity.',
  },
  'sheena-budget-structure-and-financial-confidence': {
    defaultLoanBalance: 440000,
    defaultInterestRate: 6.19,
    defaultTermYears: 26,
    defaultNetMonthlyIncome: 8200,
    beforeSavingsRatePct: 5.0,
    coachedSavingsRatePct: 23,
    rollingBillBuffer: 14000,
    caseLabel: 'Sheena’s 3-Bucket Cash-Diet Structure',
    insightNote:
      'Replacing a 40-category spreadsheet with one automated weekly Cash-Diet allowance and 52-week bill buffer triples annual principal paydown.',
  },
  'stephen-and-lynda-milde-custom-debt-reduction-plan': {
    defaultLoanBalance: 560000,
    defaultInterestRate: 6.19,
    defaultTermYears: 25,
    defaultNetMonthlyIncome: 10400,
    beforeSavingsRatePct: 6.5,
    coachedSavingsRatePct: 25,
    rollingBillBuffer: 18500,
    caseLabel: 'Stephen & Lynda’s Custom Debt Reduction Plan',
    insightNote:
      'Custom-calibrating salary offsetting and quarterly 90-day coaching targets saves over $340,000 in bank interest prior to retirement.',
  },
  'steve-refining-financial-strategy-total-debt-reduction': {
    defaultLoanBalance: 610000,
    defaultInterestRate: 6.19,
    defaultTermYears: 27,
    defaultNetMonthlyIncome: 11200,
    beforeSavingsRatePct: 9.0,
    coachedSavingsRatePct: 26,
    rollingBillBuffer: 21000,
    caseLabel: 'Steve’s Strategic Refinement Model',
    insightNote:
      'Even disciplined DIY savers (9% savings rate) unlock an extra 9+ years of mortgage reduction when upgrading to 100% working-capital offsetting.',
  },
  'accelerated-freedom-story-3-rapid-home-loan-savings': {
    defaultLoanBalance: 600000,
    defaultInterestRate: 6.19,
    defaultTermYears: 30,
    defaultNetMonthlyIncome: 10600,
    beforeSavingsRatePct: 6.0,
    coachedSavingsRatePct: 24,
    rollingBillBuffer: 17000,
    caseLabel: 'First-Year Rapid Acceleration Model',
    insightNote:
      'In the first 12 months alone, coached households average $29,327 in principal reduction compared to ~$10,000–$12,000 on a standard bank schedule.',
  },
  'accelerated-freedom-story-5-how-our-system-defeats-bank-interest': {
    defaultLoanBalance: 650000,
    defaultInterestRate: 6.19,
    defaultTermYears: 30,
    defaultNetMonthlyIncome: 11000,
    beforeSavingsRatePct: 6.5,
    coachedSavingsRatePct: 24,
    rollingBillBuffer: 20000,
    caseLabel: 'Daily Interest Suppression ((Balance × Rate) ÷ 365)',
    insightNote:
      'Keeping $20,000 of rolling salary and 52-week bill provisions against the loan 365 days/year plus a 24% savings rate eliminates $468,000+ in bank interest.',
  },
  'accelerated-freedom-story-7-beating-the-traditional-banking-model': {
    defaultLoanBalance: 650000,
    defaultInterestRate: 6.19,
    defaultTermYears: 30,
    defaultNetMonthlyIncome: 10800,
    beforeSavingsRatePct: 6.0,
    coachedSavingsRatePct: 24,
    rollingBillBuffer: 18000,
    caseLabel: '$650k Loan: 30-Year Bank Model vs Crown HOP',
    insightNote:
      'A standard $650,000 loan at 6.19% p.a. costs $781,720 in bank interest over 30 years. Changing the structure cuts the term to ~13.3 years.',
  },
  'our-financial-system-in-action-client-achievements': {
    defaultLoanBalance: 650000,
    defaultInterestRate: 6.19,
    defaultTermYears: 30,
    defaultNetMonthlyIncome: 11000,
    beforeSavingsRatePct: 6.8,
    coachedSavingsRatePct: 24,
    rollingBillBuffer: 18500,
    caseLabel: 'Crown Money Portfolio Benchmark (7,000+ Households)',
    insightNote:
      'Audited portfolio benchmark across 7,000+ Australian families: 24% average net savings rate and $29,327/year in principal reduction.',
  },
  // Case Study slugs (/success-stories/:slug)
  'melanie-and-jeffrey': {
    defaultLoanBalance: 580000,
    defaultInterestRate: 6.15,
    defaultTermYears: 20,
    defaultNetMonthlyIncome: 12400,
    beforeSavingsRatePct: 6.5,
    coachedSavingsRatePct: 31,
    rollingBillBuffer: 22000,
    caseLabel: 'Melanie & Jeffrey’s 31% Savings Velocity ($580k Loan)',
    insightNote:
      'Lifting their household savings rate from 6.5% to 31% accelerated their remaining 20-year mortgage trajectory down to a 3–4 year sprint.',
  },
  natalie: {
    defaultLoanBalance: 440000,
    defaultInterestRate: 6.19,
    defaultTermYears: 25,
    defaultNetMonthlyIncome: 7800,
    beforeSavingsRatePct: 6.0,
    coachedSavingsRatePct: 24,
    rollingBillBuffer: 14000,
    caseLabel: 'Natalie’s Single-Income 3x Payoff Model ($440k Loan)',
    insightNote:
      'On a single income, Natalie paid off more principal in her first 12 months with Crown Money than in her previous 36 months combined.',
  },
  'jemima-and-brad': {
    defaultLoanBalance: 520000,
    defaultInterestRate: 6.15,
    defaultTermYears: 26,
    defaultNetMonthlyIncome: 10500,
    beforeSavingsRatePct: 7.0,
    coachedSavingsRatePct: 26,
    rollingBillBuffer: 18000,
    caseLabel: 'Jemima & Brad’s Debt-Free by Age 36 Trajectory',
    insightNote:
      'With Scott Parry’s long-term coaching, Jemima and Brad compressed a 26-year mortgage into an 11-year payoff to reach total debt freedom at 36.',
  },
  'daniel-and-carla': {
    defaultLoanBalance: 670000,
    defaultInterestRate: 6.19,
    defaultTermYears: 24,
    defaultNetMonthlyIncome: 11600,
    beforeSavingsRatePct: 7.0,
    coachedSavingsRatePct: 28,
    rollingBillBuffer: 19500,
    caseLabel: 'Daniel & Carla’s 28% Savings Rate ($670k Loan)',
    insightNote:
      'By provisioning family bills over 52 weeks and maintaining a 28% savings rate, Daniel and Carla cut 10+ years and $312,000+ off their loan.',
  },
  michael: {
    defaultLoanBalance: 490000,
    defaultInterestRate: 6.19,
    defaultTermYears: 25,
    defaultNetMonthlyIncome: 8900,
    beforeSavingsRatePct: 6.0,
    coachedSavingsRatePct: 29,
    rollingBillBuffer: 16000,
    caseLabel: 'Michael’s 8-Year Single-Income Payoff ($490k Loan)',
    insightNote:
      'Disciplined weekly Cash-Diet allowances on a single income put Michael on an 8-year total payoff trajectory—saving 17 years of repayments.',
  },
  'giovanni-and-sarah': {
    defaultLoanBalance: 615000,
    defaultInterestRate: 6.19,
    defaultTermYears: 27,
    defaultNetMonthlyIncome: 11000,
    beforeSavingsRatePct: 5.5,
    coachedSavingsRatePct: 24,
    rollingBillBuffer: 18500,
    caseLabel: 'Giovanni & Sarah’s 12 Years Saved + Cash Holiday Model',
    insightNote:
      'Working with Scott Parry and the team, Giovanni and Sarah shaved 12 years off their $615,000 loan while pre-funding their family overseas holiday in cash.',
  },
};

export function getProfileForSlug(slug: string): CaseFinancialProfile {
  return (
    SLUG_PROFILES[slug] || {
      defaultLoanBalance: 650000,
      defaultInterestRate: 6.19,
      defaultTermYears: 30,
      defaultNetMonthlyIncome: 11000,
      beforeSavingsRatePct: 6.5,
      coachedSavingsRatePct: 24,
      rollingBillBuffer: 18000,
      caseLabel: 'Crown Money Coached Household Model',
      insightNote:
        'Combining 100% daily salary interest offsetting with 90-day personal coaching lifts household savings to 24% and cuts 10–17 years off the mortgage.',
    }
  );
}

interface SimulationPoint {
  year: number;
  yearLabel: string;
  bankBalance: number;
  crownBalance: number;
  bankCumulativeInterest: number;
  crownCumulativeInterest: number;
  annualInterestSaved: number;
}

function runMortgageComparison(
  loanBalance: number,
  annualRatePct: number,
  termYears: number,
  netMonthlyIncome: number,
  coachedSavingsRatePct: number,
  rollingBillBuffer: number
) {
  const monthlyRate = annualRatePct / 100 / 12;
  const totalMonths = termYears * 12;
  const standardMonthlyPayment =
    monthlyRate > 0
      ? (loanBalance * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanBalance / totalMonths;

  // Coached monthly surplus added above standard repayment
  // At 24% benchmark savings rate, extra monthly principal acceleration is modeled from household surplus
  const extraMonthlySurplus = Math.max(
    250,
    Math.round(netMonthlyIncome * (Math.max(0, coachedSavingsRatePct - 6) / 100))
  );

  let bankBal = loanBalance;
  let crownBal = loanBalance;
  let bankCumInterest = 0;
  let crownCumInterest = 0;
  let crownPayoffMonths = totalMonths;
  let crownPaidOff = false;

  const yearlyData: SimulationPoint[] = [
    {
      year: 0,
      yearLabel: 'Yr 0',
      bankBalance: Math.round(loanBalance),
      crownBalance: Math.round(loanBalance),
      bankCumulativeInterest: 0,
      crownCumulativeInterest: 0,
      annualInterestSaved: 0,
    },
  ];

  for (let m = 1; m <= totalMonths; m++) {
    // Standard Bank month
    if (bankBal > 0) {
      const bankInterest = bankBal * monthlyRate;
      bankCumInterest += bankInterest;
      const bankPrincipal = Math.min(bankBal, standardMonthlyPayment - bankInterest);
      bankBal = Math.max(0, bankBal - bankPrincipal);
    }

    // Crown Money Coached month (daily working capital + rolling 52-week bill buffer offsets balance)
    if (crownBal > 0) {
      const effectiveOffset = rollingBillBuffer + netMonthlyIncome * 0.45;
      const interestBearingBalance = Math.max(0, crownBal - effectiveOffset);
      const crownInterest = interestBearingBalance * monthlyRate;
      crownCumInterest += crownInterest;
      const totalCrownAllocation = standardMonthlyPayment + extraMonthlySurplus;
      const crownPrincipal = Math.min(crownBal, Math.max(0, totalCrownAllocation - crownInterest));
      crownBal = Math.max(0, crownBal - crownPrincipal);
      if (crownBal === 0 && !crownPaidOff) {
        crownPayoffMonths = m;
        crownPaidOff = true;
      }
    }

    if (m % 12 === 0) {
      const yr = m / 12;
      yearlyData.push({
        year: yr,
        yearLabel: `Yr ${yr}`,
        bankBalance: Math.round(bankBal),
        crownBalance: Math.round(crownBal),
        bankCumulativeInterest: Math.round(bankCumInterest),
        crownCumulativeInterest: Math.round(crownCumInterest),
        annualInterestSaved: Math.round(bankCumInterest - crownCumInterest),
      });
    }
  }

  const crownYears = Math.floor(crownPayoffMonths / 12);
  const crownRemMonths = crownPayoffMonths % 12;
  const totalMonthsSaved = Math.max(0, totalMonths - crownPayoffMonths);
  const yearsSavedFloor = Math.floor(totalMonthsSaved / 12);
  const monthsSavedRem = totalMonthsSaved % 12;
  const totalInterestSaved = Math.max(0, Math.round(bankCumInterest - crownCumInterest));
  const firstYearPrincipalPaid =
    yearlyData.length > 1 ? Math.max(0, loanBalance - yearlyData[1].crownBalance) : 29327;

  return {
    yearlyData,
    standardMonthlyPayment: Math.round(standardMonthlyPayment),
    extraMonthlySurplus,
    bankTotalInterest: Math.round(bankCumInterest),
    crownTotalInterest: Math.round(crownCumInterest),
    totalInterestSaved,
    crownPayoffMonths,
    crownYears,
    crownRemMonths,
    yearsSavedFloor,
    monthsSavedRem,
    firstYearPrincipalPaid,
  };
}

function formatAud(val: number): string {
  return `$${Math.round(val).toLocaleString('en-AU')}`;
}

export const BlogInteractiveVisualizer: React.FC<{
  slug: string;
  clientName: string;
}> = ({ slug, clientName }) => {
  const profile = useMemo(() => getProfileForSlug(slug), [slug]);

  const [loanBalance, setLoanBalance] = useState<number>(profile.defaultLoanBalance);
  const [interestRate, setInterestRate] = useState<number>(profile.defaultInterestRate);
  const [netMonthlyIncome, setNetMonthlyIncome] = useState<number>(profile.defaultNetMonthlyIncome);
  const [savingsRatePct, setSavingsRatePct] = useState<number>(profile.coachedSavingsRatePct);
  const [billBuffer, setBillBuffer] = useState<number>(profile.rollingBillBuffer);
  const [activeTab, setActiveTab] = useState<'payoff' | 'interest' | 'cashflow'>('payoff');

  // Reset state if user navigates to another blog post
  React.useEffect(() => {
    setLoanBalance(profile.defaultLoanBalance);
    setInterestRate(profile.defaultInterestRate);
    setNetMonthlyIncome(profile.defaultNetMonthlyIncome);
    setSavingsRatePct(profile.coachedSavingsRatePct);
    setBillBuffer(profile.rollingBillBuffer);
  }, [profile]);

  const sim = useMemo(
    () =>
      runMortgageComparison(
        loanBalance,
        interestRate,
        profile.defaultTermYears,
        netMonthlyIncome,
        savingsRatePct,
        billBuffer
      ),
    [loanBalance, interestRate, profile.defaultTermYears, netMonthlyIncome, savingsRatePct, billBuffer]
  );

  // 3-Bucket Cash-Flow Breakdown Data for BarChart
  const cashflowBucketsData = useMemo(() => {
    const fixedBillsMonthly = Math.round(netMonthlyIncome * 0.28);
    const weeklyCashDietMonthly = Math.round(netMonthlyIncome * (1 - 0.28 - savingsRatePct / 100));
    const coachedPrincipalMonthly = Math.round(netMonthlyIncome * (savingsRatePct / 100));

    const uncoachedPrincipalMonthly = Math.round(netMonthlyIncome * (profile.beforeSavingsRatePct / 100));
    const uncoachedLeakageMonthly = Math.max(0, coachedPrincipalMonthly - uncoachedPrincipalMonthly);

    return [
      {
        model: 'Before Crown (Un-coached)',
        '52-Week Bill Provision': fixedBillsMonthly,
        'Weekly Living Allowance': weeklyCashDietMonthly,
        'Unplanned Spending Leakage': uncoachedLeakageMonthly,
        'Net Debt Reduction Surplus': uncoachedPrincipalMonthly,
      },
      {
        model: 'With Crown Money HOP',
        '52-Week Bill Provision': fixedBillsMonthly,
        'Weekly Living Allowance': weeklyCashDietMonthly,
        'Unplanned Spending Leakage': 0,
        'Net Debt Reduction Surplus': coachedPrincipalMonthly,
      },
    ];
  }, [netMonthlyIncome, savingsRatePct, profile.beforeSavingsRatePct]);

  const handleResetToCaseStudy = () => {
    setLoanBalance(profile.defaultLoanBalance);
    setInterestRate(profile.defaultInterestRate);
    setNetMonthlyIncome(profile.defaultNetMonthlyIncome);
    setSavingsRatePct(profile.coachedSavingsRatePct);
    setBillBuffer(profile.rollingBillBuffer);
  };

  const isModified =
    loanBalance !== profile.defaultLoanBalance ||
    interestRate !== profile.defaultInterestRate ||
    netMonthlyIncome !== profile.defaultNetMonthlyIncome ||
    savingsRatePct !== profile.coachedSavingsRatePct ||
    billBuffer !== profile.rollingBillBuffer;

  const debtFreeCalendarYear = 2026 + sim.crownYears + (sim.crownRemMonths >= 6 ? 1 : 0);

  return (
    <section
      aria-label="Interactive Mortgage Payoff Chart and Cash-Flow Simulator"
      className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden"
    >
      {/* Top Header Bar */}
      <div className="bg-primary text-white p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-gold tracking-wide mb-1">
              Interactive Visual Case Study &amp; Personal Simulator · {profile.caseLabel}
            </p>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Visualise {clientName}’s Payoff Curve &amp; Test Your Own Numbers
            </h2>
          </div>
          {isModified && (
            <button
              type="button"
              onClick={handleResetToCaseStudy}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl border border-white/20 transition-colors cursor-pointer self-start md:self-auto"
            >
              <RotateCcw size={14} />
              <span>Reset to {clientName}’s Numbers</span>
            </button>
          )}
        </div>
        <p className="text-sm text-gray-300 mt-2 max-w-3xl leading-relaxed">{profile.insightNote}</p>

        {/* 4 Live Output KPI Metrics (Tabular Numerals) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-6 pt-6 border-t border-white/15">
          <div className="bg-white/10 rounded-2xl p-4">
            <span className="block text-xs text-gray-300 mb-1">Total Bank Interest Saved</span>
            <span className="text-2xl md:text-3xl font-display font-bold text-gold font-mono tabular-nums">
              {formatAud(sim.totalInterestSaved)}
            </span>
            <span className="block text-[11px] text-gray-300 mt-1">
              vs {formatAud(sim.bankTotalInterest)} standard bank interest
            </span>
          </div>

          <div className="bg-white/10 rounded-2xl p-4">
            <span className="block text-xs text-gray-300 mb-1">Time Shaved Off Loan</span>
            <span className="text-2xl md:text-3xl font-display font-bold text-white font-mono tabular-nums">
              {sim.yearsSavedFloor} yrs {sim.monthsSavedRem} mos
            </span>
            <span className="block text-[11px] text-gray-300 mt-1">
              Paid off in {sim.crownYears}y {sim.crownRemMonths}m (vs {profile.defaultTermYears} yrs)
            </span>
          </div>

          <div className="bg-white/10 rounded-2xl p-4">
            <span className="block text-xs text-gray-300 mb-1">Year-1 Principal Paydown</span>
            <span className="text-2xl md:text-3xl font-display font-bold text-emerald-300 font-mono tabular-nums">
              {formatAud(sim.firstYearPrincipalPaid)}
            </span>
            <span className="block text-[11px] text-gray-300 mt-1">
              vs ~$12,000 AU national average
            </span>
          </div>

          <div className="bg-white/10 rounded-2xl p-4">
            <span className="block text-xs text-gray-300 mb-1">Projected Debt-Free Year</span>
            <span className="text-2xl md:text-3xl font-display font-bold text-white font-mono tabular-nums">
              {debtFreeCalendarYear}
            </span>
            <span className="block text-[11px] text-gray-300 mt-1">
              Instead of {2026 + profile.defaultTermYears} on bank schedule
            </span>
          </div>
        </div>
      </div>

      {/* Main Body: Chart View Switcher + Interactive Sliders */}
      <div className="p-6 md:p-8 space-y-8">
        {/* Segmented Chart Mode Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="inline-flex p-1 bg-gray-100 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('payoff')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'payoff'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <TrendingDown size={14} />
              <span>Loan Balance Payoff Curve</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('interest')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'interest'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <BarChart3 size={14} />
              <span>Cumulative Bank Interest</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cashflow')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'cashflow'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <Sliders size={14} />
              <span>3-Bucket Cash-Flow Split</span>
            </button>
          </div>

          {/* Preset Scenario Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-gray-500 font-medium mr-1">Savings Preset:</span>
            <button
              type="button"
              onClick={() => setSavingsRatePct(7)}
              className={`px-2.5 py-1.5 rounded-lg font-semibold border transition-colors cursor-pointer ${
                savingsRatePct === 7
                  ? 'bg-primary text-white border-primary'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-primary'
              }`}
            >
              Un-coached Offset (7%)
            </button>
            <button
              type="button"
              onClick={() => setSavingsRatePct(profile.coachedSavingsRatePct)}
              className={`px-2.5 py-1.5 rounded-lg font-semibold border transition-colors cursor-pointer ${
                savingsRatePct === profile.coachedSavingsRatePct
                  ? 'bg-primary text-white border-primary'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-primary'
              }`}
            >
              Case Benchmark ({profile.coachedSavingsRatePct}%)
            </button>
            <button
              type="button"
              onClick={() => setSavingsRatePct(30)}
              className={`px-2.5 py-1.5 rounded-lg font-semibold border transition-colors cursor-pointer ${
                savingsRatePct === 30
                  ? 'bg-primary text-white border-primary'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-primary'
              }`}
            >
              Accelerator (30%)
            </button>
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="h-80 md:h-96 w-full">
          {activeTab === 'payoff' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sim.yearlyData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="bankBalanceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="crownBalanceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#261742" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="yearLabel" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis
                  tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  width={65}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [formatAud(value), name]}
                  contentStyle={{
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
                  }}
                />
                <Legend />
                <ReferenceLine
                  x={`Yr ${sim.crownYears}`}
                  stroke="#d4af37"
                  strokeDasharray="4 4"
                  label={{
                    value: `Debt-Free Yr ${sim.crownYears}`,
                    position: 'top',
                    fill: '#261742',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="bankBalance"
                  name={`Standard ${profile.defaultTermYears}-Yr Bank Loan`}
                  stroke="#94a3b8"
                  strokeWidth={2.5}
                  fill="url(#bankBalanceGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="crownBalance"
                  name="Crown Money Coached Trajectory"
                  stroke="#261742"
                  strokeWidth={3}
                  fill="url(#crownBalanceGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {activeTab === 'interest' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sim.yearlyData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="bankIntGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.04} />
                  </linearGradient>
                  <linearGradient id="crownIntGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="yearLabel" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis
                  tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  width={65}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [formatAud(value), name]}
                  contentStyle={{
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="bankCumulativeInterest"
                  name="Cumulative Bank Interest (Standard Schedule)"
                  stroke="#dc2626"
                  strokeWidth={2.5}
                  fill="url(#bankIntGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="crownCumulativeInterest"
                  name="Cumulative Interest Paid (Crown Money HOP)"
                  stroke="#059669"
                  strokeWidth={3}
                  fill="url(#crownIntGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {activeTab === 'cashflow' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cashflowBucketsData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  type="number"
                  tickFormatter={(v) => `$${v.toLocaleString()}`}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis
                  type="category"
                  dataKey="model"
                  width={150}
                  tick={{ fontSize: 12, fill: '#261742', fontWeight: 700 }}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [`${formatAud(value)} / mo`, name]}
                  contentStyle={{
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0',
                  }}
                />
                <Legend />
                <Bar dataKey="52-Week Bill Provision" stackId="a" fill="#6366f1" radius={[4, 0, 0, 4]} />
                <Bar dataKey="Weekly Living Allowance" stackId="a" fill="#94a3b8" />
                <Bar dataKey="Unplanned Spending Leakage" stackId="a" fill="#f87171" />
                <Bar dataKey="Net Debt Reduction Surplus" stackId="a" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Interactive Parameter Sliders */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-primary flex items-center gap-2">
              <Sliders size={16} className="text-gold" />
              <span>Adjust Sliders to Customise This Strategy for Your Household</span>
            </h3>
            <span className="text-xs text-gray-500">Updates chart &amp; savings in real time</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slider 1: Loan Balance */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <label htmlFor={`loan-slider-${slug}`} className="text-gray-700">
                  Home Loan Balance
                </label>
                <span className="text-primary font-mono tabular-nums">{formatAud(loanBalance)}</span>
              </div>
              <input
                id={`loan-slider-${slug}`}
                type="range"
                min={200000}
                max={1500000}
                step={10000}
                value={loanBalance}
                onChange={(e) => setLoanBalance(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>$200k</span>
                <span>Case Default: {formatAud(profile.defaultLoanBalance)}</span>
                <span>$1.5M</span>
              </div>
            </div>

            {/* Slider 2: Interest Rate */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <label htmlFor={`rate-slider-${slug}`} className="text-gray-700">
                  Mortgage Interest Rate (% p.a.)
                </label>
                <span className="text-primary font-mono tabular-nums">{interestRate.toFixed(2)}% p.a.</span>
              </div>
              <input
                id={`rate-slider-${slug}`}
                type="range"
                min={4.5}
                max={8.5}
                step={0.05}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>4.50%</span>
                <span>AU Standard: 6.19%</span>
                <span>8.50%</span>
              </div>
            </div>

            {/* Slider 3: Net Monthly Household Income */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <label htmlFor={`income-slider-${slug}`} className="text-gray-700">
                  Net Monthly Household Income (After Tax)
                </label>
                <span className="text-primary font-mono tabular-nums">{formatAud(netMonthlyIncome)} / mo</span>
              </div>
              <input
                id={`income-slider-${slug}`}
                type="range"
                min={5500}
                max={25000}
                step={250}
                value={netMonthlyIncome}
                onChange={(e) => setNetMonthlyIncome(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>$5,500/mo</span>
                <span>Case Default: {formatAud(profile.defaultNetMonthlyIncome)}/mo</span>
                <span>$25,000/mo</span>
              </div>
            </div>

            {/* Slider 4: Coached Household Savings Rate */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <label htmlFor={`savings-slider-${slug}`} className="text-gray-700">
                  Target Household Savings Rate (% of Net Income)
                </label>
                <span className="text-emerald-700 font-mono tabular-nums">
                  {savingsRatePct}% (+{formatAud(sim.extraMonthlySurplus)}/mo surplus)
                </span>
              </div>
              <input
                id={`savings-slider-${slug}`}
                type="range"
                min={7}
                max={38}
                step={1}
                value={savingsRatePct}
                onChange={(e) => setSavingsRatePct(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>7% (Bank Offset Avg)</span>
                <span>24% (Crown Portfolio Avg)</span>
                <span>38%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-gray-100">
          <div className="flex items-start gap-2.5 text-xs text-gray-600">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <span>
              At a <strong>{savingsRatePct}%</strong> coached savings rate on a{' '}
              <strong>{formatAud(loanBalance)}</strong> loan, you could eliminate{' '}
              <strong className="text-primary">{formatAud(sim.totalInterestSaved)}</strong> in bank interest and own
              your home by <strong className="text-primary">{debtFreeCalendarYear}</strong>.
            </span>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/mortgage-reduction-calculator"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl transition-colors"
            >
              <Calculator size={14} />
              <span>Full Calculator</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-gold text-primary hover:bg-opacity-90 px-4 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <span>Lock In This Plan (Free Call)</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
