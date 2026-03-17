import { useMemo } from "react";
import { Lightbulb, TrendingUp, DollarSign, Clock, Leaf } from "lucide-react";
import { calculateMonthlyPayment, calculateTotalInterest, formatCurrency, annualSolarSavings, feedInTariffIncome, annualMaintenance, annualInsurance } from "@/lib/loanData";

interface KeyInsightsProps {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

export default function KeyInsights({ loanAmount, interestRate, loanTerm }: KeyInsightsProps) {
  const insights = useMemo(() => {
    const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
    const totalInterest = calculateTotalInterest(loanAmount, interestRate, loanTerm);
    const annualBenefit = annualSolarSavings + feedInTariffIncome - annualMaintenance - annualInsurance;
    const monthlyBenefit = annualBenefit / 12;
    const netMonthlyCost = monthlyPayment - monthlyBenefit;
    const totalBenefit25yr = annualBenefit * 25;
    const roi25yr = ((totalBenefit25yr - loanAmount) / loanAmount) * 100;

    // Break-even calculation
    let cumulative = -loanAmount;
    let breakEven = 0;
    for (let y = 1; y <= 25; y++) {
      const isLoanYear = y <= loanTerm;
      const annualNet = isLoanYear
        ? annualSolarSavings + feedInTariffIncome - monthlyPayment * 12 - annualMaintenance - annualInsurance
        : annualBenefit;
      cumulative += annualNet;
      if (cumulative >= 0 && breakEven === 0) {
        breakEven = y;
      }
    }

    return [
      {
        icon: DollarSign,
        title: "Effective Monthly Cost",
        value: netMonthlyCost > 0 ? formatCurrency(netMonthlyCost) : formatCurrency(Math.abs(netMonthlyCost)),
        subtitle: netMonthlyCost > 0 ? "Net cost after solar savings" : "You SAVE money from day one!",
        positive: netMonthlyCost <= 0,
        color: netMonthlyCost <= 0 ? "#00C853" : "#F36710",
      },
      {
        icon: Clock,
        title: "Break-Even Point",
        value: breakEven > 0 ? `Year ${breakEven}` : "25+ years",
        subtitle: "When cumulative savings exceed total cost",
        positive: breakEven > 0 && breakEven <= 10,
        color: "#00EAD3",
      },
      {
        icon: TrendingUp,
        title: "25-Year ROI",
        value: `${roi25yr.toFixed(0)}%`,
        subtitle: `Total net benefit: ${formatCurrency(totalBenefit25yr - loanAmount)}`,
        positive: roi25yr > 0,
        color: "#00C853",
      },
      {
        icon: Leaf,
        title: "Interest Cost vs Savings",
        value: formatCurrency(totalInterest),
        subtitle: `Solar saves ${formatCurrency(totalBenefit25yr)} over 25 years`,
        positive: totalBenefit25yr > totalInterest,
        color: "#F36710",
      },
    ];
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className="panel-glow p-6">
      <div className="flex items-center gap-3 mb-2">
        <Lightbulb className="w-6 h-6" style={{ color: "#00EAD3" }} />
        <h2 className="section-header text-2xl">Key Insights</h2>
      </div>
      <p className="text-sm mb-6" style={{ color: "#808285" }}>
        Important metrics to help you make an informed decision
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insights.map((insight, idx) => {
          const Icon = insight.icon;
          return (
            <div
              key={idx}
              className="rounded-xl p-5"
              style={{ border: `1px solid ${insight.color}33`, background: `${insight.color}08` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-5 h-5" style={{ color: insight.color }} />
                <p className="text-xs font-sub uppercase tracking-wider" style={{ color: "#808285" }}>{insight.title}</p>
              </div>
              <p className="text-3xl font-mono-num font-bold mb-1" style={{ color: insight.color }}>{insight.value}</p>
              <p className="text-xs" style={{ color: "#808285" }}>{insight.subtitle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
