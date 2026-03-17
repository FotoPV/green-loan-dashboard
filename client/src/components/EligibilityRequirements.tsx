import { ShieldCheck, CheckCircle2, FileText, Home, User, Banknote } from "lucide-react";

const requirements = [
  {
    icon: User,
    title: "Personal Eligibility",
    items: [
      "Australian citizen or permanent resident",
      "Aged 18 years or over",
      "Regular income (employment, self-employment, or pension)",
      "Good credit history (no defaults in last 5 years preferred)",
    ],
  },
  {
    icon: Home,
    title: "Property Requirements",
    items: [
      "Residential property in Australia",
      "Owner-occupied or investment property (varies by lender)",
      "Sufficient roof space for solar installation",
      "No heritage or strata restrictions on solar panels",
    ],
  },
  {
    icon: FileText,
    title: "Documentation",
    items: [
      "Valid photo ID (driver's licence or passport)",
      "Recent payslips or tax returns (2 years for self-employed)",
      "Bank statements (last 3 months)",
      "Quote from accredited solar installer (e.g., Lightning Energy)",
    ],
  },
  {
    icon: Banknote,
    title: "Financial Requirements",
    items: [
      "Minimum income varies by lender ($30k–$50k p.a. typical)",
      "Debt-to-income ratio within acceptable limits",
      "No current bankruptcies or Part IX agreements",
      "Stable employment history (6+ months preferred)",
    ],
  },
];

const cefcInfo = [
  "CEFC-backed loans (Westpac, Macquarie) may offer lower rates",
  "Clean Energy Finance Corporation provides wholesale funding",
  "Additional eligibility: system must meet minimum energy efficiency standards",
  "CEC-accredited installer required (Lightning Energy is CEC-accredited)",
];

export default function EligibilityRequirements() {
  return (
    <div className="panel-glow p-6">
      <div className="flex items-center gap-3 mb-2">
        <ShieldCheck className="w-6 h-6" style={{ color: "#00EAD3" }} />
        <h2 className="section-header text-2xl">Eligibility & Requirements</h2>
      </div>
      <p className="text-sm mb-6" style={{ color: "#808285" }}>
        General eligibility criteria for Australian green personal loans
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {requirements.map((req) => {
          const Icon = req.icon;
          return (
            <div
              key={req.title}
              className="rounded-xl p-5"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-5 h-5" style={{ color: "#00EAD3" }} />
                <h3 className="font-sub text-sm text-white">{req.title}</h3>
              </div>
              <ul className="space-y-2">
                {req.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "#00EAD3" }} />
                    <span className="text-xs text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* CEFC Info */}
      <div className="rounded-xl p-5" style={{ border: "1px solid rgba(0,234,211,0.2)", background: "rgba(0,234,211,0.04)" }}>
        <h3 className="font-sub text-sm mb-3" style={{ color: "#00EAD3" }}>CEFC-Backed Loan Information</h3>
        <ul className="space-y-2">
          {cefcInfo.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "#00EAD3" }} />
              <span className="text-xs text-white">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
