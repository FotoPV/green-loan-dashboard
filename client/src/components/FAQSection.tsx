import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    q: "What is a Green Personal Loan?",
    a: "A green personal loan is a specialised unsecured loan designed to finance environmentally friendly home improvements such as solar panels, battery storage, electric vehicle chargers, and energy-efficient appliances. These loans typically offer lower interest rates than standard personal loans as an incentive for sustainable investment.",
  },
  {
    q: "How do green loan rates compare to standard personal loans?",
    a: "Green loans typically offer rates 1-3% lower than standard unsecured personal loans. For example, the best green loan rates start from 3.74% p.a. compared to standard personal loan rates of 6-12% p.a. This discount reflects the lower risk profile and government-backed incentives for clean energy investment.",
  },
  {
    q: "What is the CEFC and how does it affect my loan?",
    a: "The Clean Energy Finance Corporation (CEFC) is an Australian Government-owned green bank that provides wholesale funding to commercial lenders. When a loan is CEFC-backed (like Westpac and Macquarie green loans), the lender receives lower-cost funding which can be passed on as lower interest rates to borrowers.",
  },
  {
    q: "Can I use a green loan for battery storage?",
    a: "Yes, most green loans cover battery storage systems (like Tesla Powerwall), solar panels, EV chargers, heat pump hot water systems, energy-efficient windows, insulation, and other approved sustainable home improvements. Check with your specific lender for their approved product list.",
  },
  {
    q: "Do I need to be an existing customer of the bank?",
    a: "Not necessarily. Most banks accept new customers for green loans. However, some may offer preferential rates to existing home loan or transaction account customers. Brighte and Plenti are specialist lenders that work directly with accredited installers like Lightning Energy, making the application process seamless.",
  },
  {
    q: "How long does the approval process take?",
    a: "Approval times vary by lender. Brighte offers same-day approval in many cases. Major banks typically take 1-3 business days for conditional approval. Full approval including document verification usually takes 3-7 business days. Lightning Energy can help facilitate the application process with our partner lenders.",
  },
  {
    q: "Is there a comparison rate I should look at?",
    a: "Yes, the comparison rate is the most important rate to compare. It includes the headline interest rate plus any fees and charges, giving you the true cost of the loan. For example, a loan with a low headline rate but high fees may have a higher comparison rate than one with a slightly higher headline rate but no fees.",
  },
  {
    q: "Can I pay off my green loan early?",
    a: "Most green loans allow early repayment. Variable rate loans typically have no early repayment fees. Fixed rate loans may charge a break cost if you pay off early. Check the specific terms of your chosen loan product. CBA, Westpac, and Brighte all allow early repayment without penalty on their green loan products.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="panel-glow p-6">
      <div className="flex items-center gap-3 mb-2">
        <HelpCircle className="w-6 h-6" style={{ color: "#00EAD3" }} />
        <h2 className="section-header text-2xl">Frequently Asked Questions</h2>
      </div>
      <p className="text-sm mb-6" style={{ color: "#808285" }}>
        Common questions about green loans for solar and energy upgrades
      </p>

      <div className="space-y-2">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-xl overflow-hidden transition-all"
              style={{
                border: isOpen ? "1px solid rgba(0,234,211,0.3)" : "1px solid rgba(255,255,255,0.08)",
                background: isOpen ? "rgba(0,234,211,0.04)" : "rgba(255,255,255,0.02)",
              }}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-sm font-sub text-white pr-4">{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: "#00EAD3" }} />
                ) : (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: "#808285" }} />
                )}
              </button>
              {isOpen && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-white leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
