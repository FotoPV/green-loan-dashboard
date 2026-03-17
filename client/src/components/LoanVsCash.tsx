import { useMemo } from "react";
import { Scale } from "lucide-react";
import { calculateTotalRepayment, formatCurrency, annualSolarSavings, feedInTariffIncome, annualMaintenance, annualInsurance } from "@/lib/loanData";

interface LoanVsCashProps {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

export default function LoanVsCash({ loanAmount, interestRate, loanTerm }: LoanVsCashProps) {
  const comparison = useMemo(() => {
    const totalRepayment = calculateTotalRepayment(loanAmount, interestRate, loanTerm);
    const interestCost = totalRepayment - loanAmount;
    const annualBenefit = annualSolarSavings + feedInTariffIncome - annualMaintenance - annualInsurance;
    const benefit25yr = annualBenefit * 25;

    // Loan scenario
    const loanTotalCost = totalRepayment + (annualMaintenance + annualInsurance) * 25;
    const loanTotalBenefit = (annualSolarSavings + feedInTariffIncome) * 25;
    const loanNetBenefit = loanTotalBenefit - loanTotalCost;

    // Cash scenario
    const cashTotalCost = loanAmount + (annualMaintenance + annualInsurance) * 25;
    const cashTotalBenefit = (annualSolarSavings + feedInTariffIncome) * 25;
    const cashNetBenefit = cashTotalBenefit - cashTotalCost;

    // Opportunity cost of cash (invested at 5% p.a.)
    const opportunityCost = loanAmount * Math.pow(1.05, 25) - loanAmount;

    return {
      interestCost,
      loanNetBenefit,
      cashNetBenefit,
      opportunityCost,
      loanTotalCost,
      cashTotalCost,
      loanTotalBenefit,
      cashTotalBenefit,
      benefit25yr,
    };
  }, [loanAmount, interestRate, loanTerm]);

  const items = [
    {
      title: "Green Loan",
      subtitle: `${interestRate}% over ${loanTerm} years`,
      totalCost: comparison.loanTotalCost,
      totalBenefit: comparison.loanTotalBenefit,
      netBenefit: comparison.loanNetBenefit,
      pros: ["Keep cash for other investments", "Immediate solar benefits", "Tax-deductible interest (business)"],
      cons: [`Interest cost: ${formatCurrency(comparison.interestCost)}`],
      color: "#00EAD3",
    },
    {
      title: "Cash Purchase",
      subtitle: "Pay upfront",
      totalCost: comparison.cashTotalCost,
      totalBenefit: comparison.cashTotalBenefit,
      netBenefit: comparison.cashNetBenefit,
      pros: ["No interest costs", "Immediate full ownership"],
      cons: [`Opportunity cost: ~${formatCurrency(comparison.opportunityCost)}`, "Large upfront capital required"],
      color: "#F36710",
    },
  ];

  return (
    <div className="panel-glow p-6">
      <div className="flex items-center gap-3 mb-2">
        <Scale className="w-6 h-6" style={{ color: "#00EAD3" }} />
        <h2 className="section-header text-2xl">Loan vs Cash Purchase</h2>
      </div>
      <p className="text-sm mb-6" style={{ color: "#808285" }}>
        25-year comparison of financing vs paying cash for your solar system
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-xl p-5"
            style={{ border: `1px solid ${item.color}33`, background: `${item.color}08` }}
          >
            <h3 className="font-heading text-xl tracking-wider text-white mb-1">{item.title}</h3>
            <p className="text-xs mb-4" style={{ color: "#808285" }}>{item.subtitle}</p>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: "#808285" }}>Total Cost (25yr)</span>
                <span className="font-mono-num" style={{ color: "#F36710" }}>{formatCurrency(item.totalCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: "#808285" }}>Total Benefit (25yr)</span>
                <span className="font-mono-num" style={{ color: "#00C853" }}>{formatCurrency(item.totalBenefit)}</span>
              </div>
              <div className="flex justify-between pt-2" style={{ borderTop: `1px solid ${item.color}33` }}>
                <span className="text-sm font-sub text-white">Net Benefit</span>
                <span className="font-mono-num font-bold text-lg" style={{ color: "#00C853" }}>{formatCurrency(item.netBenefit)}</span>
              </div>
            </div>

            <div className="space-y-2">
              {item.pros.map((pro, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-xs mt-0.5" style={{ color: "#00C853" }}>✓</span>
                  <span className="text-xs text-white">{pro}</span>
                </div>
              ))}
              {item.cons.map((con, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-xs mt-0.5" style={{ color: "#F36710" }}>✗</span>
                  <span className="text-xs text-white">{con}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
