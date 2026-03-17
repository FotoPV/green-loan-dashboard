import { useMemo } from "react";
import { Calculator } from "lucide-react";
import { calculateMonthlyPayment, calculateTotalRepayment, calculateTotalInterest, formatCurrency } from "@/lib/loanData";

interface LoanCalculatorProps {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  onChange: (amount: number, rate: number, term: number) => void;
}

export default function LoanCalculator({ loanAmount, interestRate, loanTerm, onChange }: LoanCalculatorProps) {
  const monthly = useMemo(() => calculateMonthlyPayment(loanAmount, interestRate, loanTerm), [loanAmount, interestRate, loanTerm]);
  const totalRepayment = useMemo(() => calculateTotalRepayment(loanAmount, interestRate, loanTerm), [loanAmount, interestRate, loanTerm]);
  const totalInterest = useMemo(() => calculateTotalInterest(loanAmount, interestRate, loanTerm), [loanAmount, interestRate, loanTerm]);

  return (
    <div className="panel-glow p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6" style={{ color: "#00EAD3" }} />
        <h2 className="section-header text-2xl">Live Loan Calculator</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs font-sub uppercase tracking-wider mb-1.5 block" style={{ color: "#808285" }}>
            Amount Borrowing
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => onChange(Number(e.target.value), interestRate, loanTerm)}
            className="w-full rounded-xl px-4 py-3 text-xl font-mono-num text-white focus:outline-none transition-colors"
            style={{ background: "#050505", border: "1px solid rgba(0,234,211,0.2)" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#00EAD3"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,234,211,0.2)"; }}
          />
          <p className="text-[10px] mt-1" style={{ color: "#808285" }}>System cost: {formatCurrency(loanAmount)}</p>
        </div>
        <div>
          <label className="text-xs font-sub uppercase tracking-wider mb-1.5 block" style={{ color: "#808285" }}>
            Interest Rate (% p.a.)
          </label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => onChange(loanAmount, Number(e.target.value), loanTerm)}
            className="w-full rounded-xl px-4 py-3 text-xl font-mono-num text-white focus:outline-none transition-colors"
            style={{ background: "#050505", border: "1px solid rgba(0,234,211,0.2)" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#00EAD3"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,234,211,0.2)"; }}
          />
          <p className="text-[10px] mt-1" style={{ color: "#808285" }}>Best rate: 3.74%</p>
        </div>
        <div>
          <label className="text-xs font-sub uppercase tracking-wider mb-1.5 block" style={{ color: "#808285" }}>
            Loan Term (years)
          </label>
          <select
            value={loanTerm}
            onChange={(e) => onChange(loanAmount, interestRate, Number(e.target.value))}
            className="w-full rounded-xl px-4 py-3 text-xl font-mono-num text-white focus:outline-none transition-colors appearance-none"
            style={{ background: "#050505", border: "1px solid rgba(0,234,211,0.2)" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#00EAD3"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,234,211,0.2)"; }}
          >
            <option value={1}>1 year</option>
            <option value={3}>3 years</option>
            <option value={5}>5 years</option>
            <option value={7}>7 years</option>
            <option value={10}>10 years</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl p-4" style={{ border: "1px solid rgba(0,200,83,0.3)", background: "rgba(0,200,83,0.05)" }}>
          <p className="text-xs font-sub uppercase tracking-wider mb-1" style={{ color: "#00C853" }}>Monthly Payment</p>
          <p className="text-3xl font-mono-num font-bold" style={{ color: "#00C853" }}>{formatCurrency(monthly)}</p>
        </div>
        <div className="rounded-xl p-4" style={{ border: "1px solid rgba(0,234,211,0.3)", background: "rgba(0,234,211,0.05)" }}>
          <p className="text-xs font-sub uppercase tracking-wider mb-1" style={{ color: "#00EAD3" }}>Total Repayment</p>
          <p className="text-3xl font-mono-num font-bold" style={{ color: "#00EAD3" }}>{formatCurrency(totalRepayment)}</p>
        </div>
        <div className="rounded-xl p-4" style={{ border: "1px solid rgba(243,103,16,0.3)", background: "rgba(243,103,16,0.05)" }}>
          <p className="text-xs font-sub uppercase tracking-wider mb-1" style={{ color: "#F36710" }}>Total Interest</p>
          <p className="text-3xl font-mono-num font-bold" style={{ color: "#F36710" }}>{formatCurrency(totalInterest)}</p>
        </div>
      </div>
    </div>
  );
}
