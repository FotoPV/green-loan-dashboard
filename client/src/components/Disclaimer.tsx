import { AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="panel-glow p-6">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="w-6 h-6" style={{ color: "#F36710" }} />
        <h2 className="section-header text-2xl" style={{ color: "#F36710" }}>Important Disclaimer</h2>
      </div>

      <div className="space-y-4 text-sm text-white leading-relaxed">
        <p>
          The information provided in this Green Loan Dashboard is for general informational and comparison purposes only.
          It does not constitute financial advice, a recommendation, or an offer to arrange any financial product.
        </p>
        <p>
          All interest rates, comparison rates, fees, and loan terms displayed are indicative only and are subject to change
          without notice. Rates shown are based on publicly available information as of February 2026 and may not reflect
          the most current rates offered by each lender.
        </p>
        <p>
          Calculations including monthly repayments, total interest, cash flow projections, and ROI estimates are
          approximations based on the inputs provided and standard amortisation formulas. Actual loan terms, repayments,
          and outcomes may differ based on individual circumstances, lender assessment criteria, and market conditions.
        </p>
        <p>
          Lightning Energy is not a financial adviser or credit provider. We recommend seeking independent financial advice
          before making any borrowing decisions. Lightning Energy may receive referral fees or commissions from some lenders
          listed in this comparison tool.
        </p>
        <p style={{ color: "#808285" }}>
          Australian Credit Licence holders are responsible for their own lending criteria and assessment processes.
          All applications are subject to the lender's standard credit assessment and approval processes.
        </p>
      </div>
    </div>
  );
}
