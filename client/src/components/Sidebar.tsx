import { useState } from "react";
import { Calculator, BarChart3, Building2, TrendingUp, LineChart, Scale, Lightbulb, ShieldCheck, HelpCircle, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";

/*
 * Design: Lightning Energy Brand
 * Sidebar: Darkest black, aqua (#00EAD3) rounded tabs, white text
 * Logo: Official Lightning Energy icon
 */

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031440910/KzXbcfNSeWfjBvcS.png";

const navItems = [
  { id: "calculator", label: "Loan Calculator", icon: Calculator },
  { id: "compare-terms", label: "Compare Terms", icon: BarChart3 },
  { id: "comparison-table", label: "Bank Comparison", icon: Building2 },
  { id: "cash-flow", label: "Cash Flow", icon: TrendingUp },
  { id: "projection", label: "25-Year Projection", icon: LineChart },
  { id: "loan-vs-cash", label: "Loan vs Cash", icon: Scale },
  { id: "insights", label: "Key Insights", icon: Lightbulb },
  { id: "eligibility", label: "Eligibility", icon: ShieldCheck },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "disclaimer", label: "Disclaimer", icon: AlertTriangle },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [activeSection, setActiveSection] = useState("calculator");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 flex flex-col ${
        isOpen ? "w-[240px]" : "w-[60px]"
      }`}
      style={{ background: "#050505", borderRight: "1px solid rgba(0, 234, 211, 0.15)" }}
    >
      {/* Logo Area */}
      <div className="p-4 flex items-center gap-3 border-b" style={{ borderColor: "rgba(0, 234, 211, 0.15)" }}>
        <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
          <img src={LOGO_URL} alt="Lightning Energy" className="w-9 h-9 object-contain" />
        </div>
        {isOpen && (
          <div className="overflow-hidden">
            <h2 className="font-heading text-lg tracking-wider text-white leading-tight">LIGHTNING</h2>
            <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "#00EAD3" }}>ENERGY</p>
          </div>
        )}
      </div>

      {/* Session Badge */}
      {isOpen && (
        <div className="px-4 py-3">
          <div className="rounded-full px-3 py-1.5 flex items-center gap-2" style={{ border: "1px solid rgba(0, 200, 83, 0.4)", background: "rgba(0, 200, 83, 0.08)" }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00C853" }} />
            <span className="text-xs font-sub tracking-wide" style={{ color: "#00C853" }}>GREEN LOAN TOOL</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {isOpen && (
          <p className="text-[10px] font-sub tracking-[0.2em] uppercase px-2 mb-2" style={{ color: "#00b8a6" }}>Navigation</p>
        )}
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-200`}
                  style={{
                    borderRadius: "0.75rem",
                    border: isActive ? "1px solid rgba(0, 234, 211, 0.5)" : "1px solid transparent",
                    background: isActive ? "rgba(0, 234, 211, 0.1)" : "transparent",
                    color: isActive ? "#00EAD3" : "#808285",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#FFFFFF";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#808285";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                  title={item.label}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {isOpen && (
                    <span className={`truncate font-body ${isActive ? "font-sub" : ""}`}>{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3" style={{ borderTop: "1px solid rgba(0, 234, 211, 0.15)" }}>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-lg transition-colors"
          style={{ color: "#808285" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#00EAD3"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#808285"; }}
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        {isOpen && (
          <p className="text-[9px] text-center mt-2" style={{ color: "#808285" }}>
            © 2026 Lightning Energy
          </p>
        )}
      </div>
    </aside>
  );
}
