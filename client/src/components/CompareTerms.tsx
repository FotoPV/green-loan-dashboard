import { useMemo } from "react";
import { BarChart3, Check } from "lucide-react";
import { calculateMonthlyPayment, calculateTotalInterest, formatCurrency } from "@/lib/loanData";

interface CompareTermsProps {
  loanAmount: number;
  interestRate: number;
  selectedTerm: number;
  onSelectTerm: (term: number) => void;
}

const terms = [5, 10, 15];

export default function CompareTerms({ loanAmount, interestRate, selectedTerm, onSelectTerm }: CompareTermsProps) {
  const termData = useMemo(() => {
    return terms.map((t) => ({
      years: t,
      monthly: calculateMonthlyPayment(loanAmount, interestRate, t),
      totalInterest: calculateTotalInterest(loanAmount, interestRate, t),
    }));
  }, [loanAmount, interestRate]);

  return (
    <div className="panel-glow p-6">
      <div className="flex items-center gap-3 mb-2">
        <BarChart3 className="w-6 h-6" style={{ color: "#00EAD3" }} />
        <h2 className="section-header text-2xl">Compare Loan Terms</h2>
      </div>
      <p className="text-sm mb-6" style={{ color: "#808285" }}>
        See how different loan terms affect your monthly payment and total interest
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {termData.map((item) => {
          const isSelected = selectedTerm === item.years;
          return (
            <button
              key={item.years}
              onClick={() => onSelectTerm(item.years)}
              className="relative rounded-xl p-5 text-left transition-all duration-300"
              style={{
                border: isSelected ? "1px solid rgba(0,234,211,0.5)" : "1px solid rgba(255,255,255,0.08)",
                background: isSelected ? "rgba(0,234,211,0.06)" : "rgba(255,255,255,0.02)",
                boxShadow: isSelected ? "0 0 20px rgba(0,234,211,0.1)" : "none",
              }}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#00EAD3" }}>
                  <Check className="w-4 h-4 text-black" />
                </div>
              )}
              <p className="font-heading text-xl tracking-wider uppercase text-white mb-3">
                {item.years} Years
              </p>
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: "#808285" }}>Monthly Payment</p>
                  <p className="text-2xl font-mono-num font-bold text-white">{formatCurrency(item.monthly)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: "#808285" }}>Total Interest</p>
                  <p className="text-lg font-mono-num" style={{ color: "#F36710" }}>{formatCurrency(item.totalInterest)}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
