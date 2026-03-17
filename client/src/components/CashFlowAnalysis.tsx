import { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { calculateMonthlyPayment, formatCurrency, annualSolarSavings, feedInTariffIncome, annualMaintenance, annualInsurance } from "@/lib/loanData";

interface CashFlowAnalysisProps {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

export default function CashFlowAnalysis({ loanAmount, interestRate, loanTerm }: CashFlowAnalysisProps) {
  const data = useMemo(() => {
    const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
    const annualLoanPayment = monthlyPayment * 12;
    const totalAnnualSavings = annualSolarSavings + feedInTariffIncome;
    const totalAnnualCosts = annualMaintenance + annualInsurance;
    const netAnnualBenefitDuringLoan = totalAnnualSavings - annualLoanPayment - totalAnnualCosts;
    const netAnnualBenefitAfterLoan = totalAnnualSavings - totalAnnualCosts;

    return {
      monthlyPayment,
      annualLoanPayment,
      totalAnnualSavings,
      totalAnnualCosts,
      netAnnualBenefitDuringLoan,
      netAnnualBenefitAfterLoan,
      monthlySavings: totalAnnualSavings / 12,
      monthlyCosts: totalAnnualCosts / 12,
      monthlyNetDuringLoan: netAnnualBenefitDuringLoan / 12,
      monthlyNetAfterLoan: netAnnualBenefitAfterLoan / 12,
    };
  }, [loanAmount, interestRate, loanTerm]);

  const rows = [
    { label: "Solar Electricity Savings", monthly: annualSolarSavings / 12, annual: annualSolarSavings, positive: true },
    { label: "Feed-in Tariff Income", monthly: feedInTariffIncome / 12, annual: feedInTariffIncome, positive: true },
    { label: "Total Solar Benefits", monthly: data.monthlySavings, annual: data.totalAnnualSavings, positive: true, bold: true },
    { label: "Loan Repayment", monthly: data.monthlyPayment, annual: data.annualLoanPayment, positive: false },
    { label: "Maintenance", monthly: annualMaintenance / 12, annual: annualMaintenance, positive: false },
    { label: "Insurance", monthly: annualInsurance / 12, annual: annualInsurance, positive: false },
    { label: "Net Cash Flow (During Loan)", monthly: data.monthlyNetDuringLoan, annual: data.netAnnualBenefitDuringLoan, positive: data.netAnnualBenefitDuringLoan >= 0, bold: true, highlight: true },
    { label: "Net Cash Flow (After Loan)", monthly: data.monthlyNetAfterLoan, annual: data.netAnnualBenefitAfterLoan, positive: true, bold: true, highlight: true },
  ];

  return (
    <div className="panel-glow p-6">
      <div className="flex items-center gap-3 mb-2">
        <TrendingUp className="w-6 h-6" style={{ color: "#00EAD3" }} />
        <h2 className="section-header text-2xl">Cash Flow Analysis</h2>
      </div>
      <p className="text-sm mb-6" style={{ color: "#808285" }}>
        Detailed breakdown of your solar investment cash flow during and after the loan period
      </p>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,234,211,0.2)" }}>
              <th className="text-left py-3 px-3 font-sub text-xs uppercase tracking-wider" style={{ color: "#808285" }}>Item</th>
              <th className="text-right py-3 px-3 font-sub text-xs uppercase tracking-wider" style={{ color: "#808285" }}>Monthly</th>
              <th className="text-right py-3 px-3 font-sub text-xs uppercase tracking-wider" style={{ color: "#808285" }}>Annual</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: row.highlight ? "none" : "1px solid rgba(255,255,255,0.05)",
                  background: row.highlight ? "rgba(0,234,211,0.04)" : "transparent",
                }}
              >
                <td className={`py-3 px-3 ${row.bold ? "font-sub" : ""} text-white`}>
                  {row.label}
                </td>
                <td className="py-3 px-3 text-right font-mono-num" style={{ color: row.positive ? "#00C853" : "#F36710" }}>
                  {row.positive ? "+" : "-"}{formatCurrency(Math.abs(row.monthly))}
                </td>
                <td className={`py-3 px-3 text-right font-mono-num ${row.bold ? "font-bold text-lg" : ""}`} style={{ color: row.positive ? "#00C853" : "#F36710" }}>
                  {row.positive ? "+" : "-"}{formatCurrency(Math.abs(row.annual))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
