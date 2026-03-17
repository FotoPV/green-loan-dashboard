export interface LoanProduct {
  id: string;
  bank: string;
  bankShort: string;
  product: string;
  interestRate: number;
  rateType: 'Fixed' | 'Variable';
  comparisonRate: number;
  comparisonRateDisplay: string;
  minLoan: number;
  maxLoan: number;
  minTerm: number;
  maxTerm: number;
  fees: boolean;
  cefc: boolean;
  tier: 'tier1' | 'specialist' | 'other';
  website: string;
  highlight?: string;
  color: string;
}

export const loanProducts: LoanProduct[] = [
  {
    id: 'cba',
    bank: 'Commonwealth Bank',
    bankShort: 'CBA',
    product: 'Energy Efficient Discount',
    interestRate: 3.99,
    rateType: 'Fixed',
    comparisonRate: 3.99,
    comparisonRateDisplay: '3.99%',
    minLoan: 5000,
    maxLoan: 30000,
    minTerm: 1,
    maxTerm: 5,
    fees: false,
    cefc: false,
    tier: 'tier1',
    website: 'https://www.commbank.com.au/personal-loans/green-loan.html',
    highlight: 'Lowest Comparison Rate',
    color: '#FFD600',
  },
  {
    id: 'westpac',
    bank: 'Westpac',
    bankShort: 'WBC',
    product: 'Sustainable Upgrades',
    interestRate: 3.74,
    rateType: 'Variable',
    comparisonRate: 4.13,
    comparisonRateDisplay: '4.13%',
    minLoan: 4000,
    maxLoan: 50000,
    minTerm: 1,
    maxTerm: 10,
    fees: false,
    cefc: true,
    tier: 'tier1',
    website: 'https://www.westpac.com.au/personal-banking/personal-loans/sustainable-upgrades/',
    highlight: 'Lowest Headline Rate',
    color: '#FF5252',
  },
  {
    id: 'nab',
    bank: 'NAB',
    bankShort: 'NAB',
    product: 'NAB Personal Loan',
    interestRate: 4.99,
    rateType: 'Variable',
    comparisonRate: 5.39,
    comparisonRateDisplay: '5.39%',
    minLoan: 5000,
    maxLoan: 55000,
    minTerm: 1,
    maxTerm: 7,
    fees: true,
    cefc: false,
    tier: 'tier1',
    website: 'https://www.nab.com.au/personal/personal-loans',
    color: '#FF5252',
  },
  {
    id: 'macquarie',
    bank: 'Macquarie Bank',
    bankShort: 'MQG',
    product: 'Green Upgrade Loan',
    interestRate: 3.74,
    rateType: 'Fixed',
    comparisonRate: 4.82,
    comparisonRateDisplay: '4.82%',
    minLoan: 5000,
    maxLoan: 50000,
    minTerm: 5,
    maxTerm: 5,
    fees: false,
    cefc: true,
    tier: 'tier1',
    website: 'https://www.macquarie.com.au/personal/personal-loan.html',
    color: '#00E5FF',
  },
  {
    id: 'anz',
    bank: 'ANZ',
    bankShort: 'ANZ',
    product: 'Personal Loan for Energy Efficient Purposes',
    interestRate: 6.49,
    rateType: 'Variable',
    comparisonRate: 7.30,
    comparisonRateDisplay: 'Varies',
    minLoan: 5000,
    maxLoan: 50000,
    minTerm: 1,
    maxTerm: 7,
    fees: true,
    cefc: false,
    tier: 'tier1',
    website: 'https://www.anz.com.au/personal/personal-loans/',
    color: '#00C4B4',
  },
  {
    id: 'brighte',
    bank: 'Brighte',
    bankShort: 'BTE',
    product: 'Brighte Green Loan',
    interestRate: 6.99,
    rateType: 'Fixed',
    comparisonRate: 7.49,
    comparisonRateDisplay: '7.49%',
    minLoan: 2000,
    maxLoan: 50000,
    minTerm: 2,
    maxTerm: 10,
    fees: false,
    cefc: false,
    tier: 'specialist',
    website: 'https://brighte.com.au',
    color: '#00E676',
  },
  {
    id: 'plenti',
    bank: 'Plenti',
    bankShort: 'PLT',
    product: 'Plenti Green Loan',
    interestRate: 6.95,
    rateType: 'Fixed',
    comparisonRate: 7.45,
    comparisonRateDisplay: '7.45%',
    minLoan: 5000,
    maxLoan: 50000,
    minTerm: 1,
    maxTerm: 7,
    fees: false,
    cefc: false,
    tier: 'specialist',
    website: 'https://www.plenti.com.au/green-loans/',
    color: '#7C4DFF',
  },
  {
    id: 'bendigo',
    bank: 'Bendigo Bank',
    bankShort: 'BEN',
    product: 'Green Personal Loan',
    interestRate: 4.49,
    rateType: 'Variable',
    comparisonRate: 4.89,
    comparisonRateDisplay: '4.89%',
    minLoan: 5000,
    maxLoan: 40000,
    minTerm: 1,
    maxTerm: 7,
    fees: true,
    cefc: false,
    tier: 'other',
    website: 'https://www.bendigobank.com.au/personal/personal-loans/green-personal-loan/',
    color: '#FF9800',
  },
];

export function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;
  if (monthlyRate === 0) return principal / numPayments;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculateTotalRepayment(principal: number, annualRate: number, years: number): number {
  return calculateMonthlyPayment(principal, annualRate, years) * years * 12;
}

export function calculateTotalInterest(principal: number, annualRate: number, years: number): number {
  return calculateTotalRepayment(principal, annualRate, years) - principal;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatCurrencyShort(amount: number): string {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}k`;
  return formatCurrency(amount);
}

export const defaultSystemCost = 16600;
export const defaultRate = 3.74;
export const defaultTerm = 5;
export const annualSolarSavings = 2195.59;
export const feedInTariffIncome = 329.34;
export const annualMaintenance = 166;
export const annualInsurance = 150;
