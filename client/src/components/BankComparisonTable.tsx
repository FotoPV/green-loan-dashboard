import { useMemo } from "react";
import { Building2, ExternalLink, Award, Shield } from "lucide-react";
import { loanProducts, calculateMonthlyPayment, calculateTotalInterest, formatCurrency, type LoanProduct } from "@/lib/loanData";

interface BankComparisonTableProps {
  loanAmount: number;
  loanTerm: number;
}

export default function BankComparisonTable({ loanAmount, loanTerm }: BankComparisonTableProps) {
  const sortedProducts = useMemo(() => {
    return [...loanProducts].sort((a, b) => a.comparisonRate - b.comparisonRate);
  }, []);

  return (
    <div className="panel-glow p-6">
      <div className="flex items-center gap-3 mb-2">
        <Building2 className="w-6 h-6" style={{ color: "#00EAD3" }} />
        <h2 className="section-header text-2xl">Bank Comparison Table</h2>
      </div>
      <p className="text-sm mb-6" style={{ color: "#808285" }}>
        All rates are indicative and subject to change. Based on {formatCurrency(loanAmount)} over {loanTerm} year{loanTerm !== 1 ? "s" : ""}.
      </p>

      {/* Tier Labels */}
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sub" style={{ border: "1px solid rgba(0,234,211,0.3)", color: "#00EAD3" }}>
          <Award className="w-3 h-3" /> Tier 1 Banks
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sub" style={{ border: "1px solid rgba(0,200,83,0.3)", color: "#00C853" }}>
          <Shield className="w-3 h-3" /> Specialist Lenders
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sub" style={{ border: "1px solid rgba(243,103,16,0.3)", color: "#F36710" }}>
          Other Lenders
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(0,234,211,0.2)" }}>
              <th className="text-left py-3 px-3 font-sub text-xs uppercase tracking-wider" style={{ color: "#808285" }}>Lender</th>
              <th className="text-left py-3 px-3 font-sub text-xs uppercase tracking-wider" style={{ color: "#808285" }}>Product</th>
              <th className="text-right py-3 px-3 font-sub text-xs uppercase tracking-wider" style={{ color: "#808285" }}>Rate</th>
              <th className="text-right py-3 px-3 font-sub text-xs uppercase tracking-wider" style={{ color: "#808285" }}>Comp. Rate</th>
              <th className="text-right py-3 px-3 font-sub text-xs uppercase tracking-wider" style={{ color: "#808285" }}>Monthly</th>
              <th className="text-right py-3 px-3 font-sub text-xs uppercase tracking-wider" style={{ color: "#808285" }}>Total Interest</th>
              <th className="text-center py-3 px-3 font-sub text-xs uppercase tracking-wider" style={{ color: "#808285" }}>Fees</th>
              <th className="text-center py-3 px-3 font-sub text-xs uppercase tracking-wider" style={{ color: "#808285" }}>CEFC</th>
              <th className="text-center py-3 px-3 font-sub text-xs uppercase tracking-wider" style={{ color: "#808285" }}>Term</th>
              <th className="py-3 px-3"></th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, idx) => {
              const clampedTerm = Math.min(Math.max(loanTerm, product.minTerm), product.maxTerm);
              const monthly = calculateMonthlyPayment(loanAmount, product.interestRate, clampedTerm);
              const interest = calculateTotalInterest(loanAmount, product.interestRate, clampedTerm);
              const tierColor = product.tier === "tier1" ? "#00EAD3" : product.tier === "specialist" ? "#00C853" : "#F36710";

              return (
                <tr
                  key={product.id}
                  className="transition-colors"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    background: idx === 0 ? "rgba(0,234,211,0.04)" : "transparent",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,234,211,0.06)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = idx === 0 ? "rgba(0,234,211,0.04)" : "transparent"; }}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: tierColor }} />
                      <div>
                        <p className="text-white font-sub text-sm">{product.bankShort}</p>
                        <p className="text-[10px]" style={{ color: "#808285" }}>{product.bank}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div>
                      <p className="text-white text-sm">{product.product}</p>
                      {product.highlight && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-sub" style={{ background: "rgba(0,234,211,0.15)", color: "#00EAD3" }}>
                          {product.highlight}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <p className="text-white font-mono-num font-bold">{product.interestRate.toFixed(2)}%</p>
                    <p className="text-[10px]" style={{ color: "#808285" }}>{product.rateType}</p>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <p className="font-mono-num" style={{ color: "#00EAD3" }}>{product.comparisonRateDisplay}</p>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <p className="text-white font-mono-num">{formatCurrency(monthly)}</p>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <p className="font-mono-num" style={{ color: "#F36710" }}>{formatCurrency(interest)}</p>
                  </td>
                  <td className="py-3 px-3 text-center">
                    {product.fees ? (
                      <span className="text-xs" style={{ color: "#F36710" }}>Yes</span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-sub" style={{ background: "rgba(0,200,83,0.15)", color: "#00C853" }}>
                        NO FEES
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {product.cefc ? (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-sub" style={{ background: "rgba(0,234,211,0.15)", color: "#00EAD3" }}>
                        CEFC
                      </span>
                    ) : (
                      <span style={{ color: "#808285" }}>—</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <p className="text-white text-xs">{product.minTerm}–{product.maxTerm}yr</p>
                  </td>
                  <td className="py-3 px-3">
                    <a
                      href={product.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors"
                      style={{ color: "#00EAD3", border: "1px solid rgba(0,234,211,0.3)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,234,211,0.1)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    >
                      <ExternalLink className="w-3 h-3" />
                      Visit
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
