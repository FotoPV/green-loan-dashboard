import { useState, useMemo, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import LoanCalculator from "@/components/LoanCalculator";
import CompareTerms from "@/components/CompareTerms";
import BankComparisonTable from "@/components/BankComparisonTable";
import CashFlowAnalysis from "@/components/CashFlowAnalysis";
import CashFlowChart from "@/components/CashFlowChart";
import LoanVsCash from "@/components/LoanVsCash";
import KeyInsights from "@/components/KeyInsights";
import EligibilityRequirements from "@/components/EligibilityRequirements";
import FAQSection from "@/components/FAQSection";
import Disclaimer from "@/components/Disclaimer";
import { defaultSystemCost, defaultRate, defaultTerm } from "@/lib/loanData";

export default function Home() {
  const [loanAmount, setLoanAmount] = useState(defaultSystemCost);
  const [interestRate, setInterestRate] = useState(defaultRate);
  const [loanTerm, setLoanTerm] = useState(defaultTerm);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLoanChange = useCallback((amount: number, rate: number, term: number) => {
    setLoanAmount(amount);
    setInterestRate(rate);
    setLoanTerm(term);
  }, []);

  return (
    <div className="min-h-screen flex bg-[#030303]">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-[240px]' : 'ml-[60px]'} overflow-y-auto`}>
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <header className="relative text-center mb-12 rounded-2xl overflow-hidden p-8 sm:p-12">
            <div className="absolute inset-0 z-0">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/esiXx7dwAtTgeCbyTBLgot/sandbox/CACfhsb9s92XWmZjQvNhcZ-img-1_1770846741000_na1fn_aGVyby1ncmVlbi1lbmVyZ3k.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZXNpWHg3ZHdBdFRnZUNieVRCTGdvdC9zYW5kYm94L0NBQ2Zoc2I5czkyWFdtWmpRdk5oY1otaW1nLTFfMTc3MDg0Njc0MTAwMF9uYTFmbl9hR1Z5YnkxbmNtVmxiaTFsYm1WeVozay5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Ec1FP5--Q6Z0uDVN8oCsSh8INEjlpBy6YPnehsfKzMJS-L2AYEKIpjAkgr2QjUB~G9d7~MLV13yNWsYnw2qeC0jv2qJQQp9~phDntQHVEwP517YaYlA8V~PJnVAj~dZ5d4VglB2OyaLjSq2K~voPG1~2~uSuVuW1rnwYnHNfrwrbnnjgxN-JmtVBZJ8DovGFTCbz9RxNNHE21V5PNabpFQks9GwqjghKKry1BEhlXoCZLWA3WJCQsr11qDCzIigIqNxFKljfyUbtSjEM0hpRfeL9pLZjmlHSXRTj7haZE5rz1ekLXOuenAXl~H8KVQHkGw1BGgmCtkRFthTXi9Aebw__"
                alt="Solar home"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9))" }} />
            </div>
            <div className="relative z-10">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-wider uppercase text-glow mb-3" style={{ color: "#00EAD3" }}>
                Australian Green Loan Comparison
              </h1>
              <p className="text-lg" style={{ color: "#FFFFFF" }}>
                Compare rates, terms, and features from major Australian lenders
              </p>
            </div>
          </header>

          {/* Live Loan Calculator */}
          <section id="calculator" className="mb-10">
            <LoanCalculator
              loanAmount={loanAmount}
              interestRate={interestRate}
              loanTerm={loanTerm}
              onChange={handleLoanChange}
            />
          </section>

          {/* Compare Loan Terms */}
          <section id="compare-terms" className="mb-10">
            <CompareTerms
              loanAmount={loanAmount}
              interestRate={interestRate}
              selectedTerm={loanTerm}
              onSelectTerm={(term) => setLoanTerm(term)}
            />
          </section>

          {/* Bank Comparison Table */}
          <section id="comparison-table" className="mb-10">
            <BankComparisonTable
              loanAmount={loanAmount}
              loanTerm={loanTerm}
            />
          </section>

          {/* Cash Flow Analysis */}
          <section id="cash-flow" className="mb-10">
            <CashFlowAnalysis
              loanAmount={loanAmount}
              interestRate={interestRate}
              loanTerm={loanTerm}
            />
          </section>

          {/* 25-Year Cash Flow Chart */}
          <section id="projection" className="mb-10">
            <CashFlowChart
              loanAmount={loanAmount}
              interestRate={interestRate}
              loanTerm={loanTerm}
            />
          </section>

          {/* Loan vs Cash Purchase */}
          <section id="loan-vs-cash" className="mb-10">
            <LoanVsCash
              loanAmount={loanAmount}
              interestRate={interestRate}
              loanTerm={loanTerm}
            />
          </section>

          {/* Key Insights */}
          <section id="insights" className="mb-10">
            <KeyInsights
              loanAmount={loanAmount}
              interestRate={interestRate}
              loanTerm={loanTerm}
            />
          </section>

          {/* Eligibility & Requirements */}
          <section id="eligibility" className="mb-10">
            <EligibilityRequirements />
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-10">
            <FAQSection />
          </section>

          {/* Disclaimer */}
          <section id="disclaimer" className="mb-10">
            <Disclaimer />
          </section>

          {/* Footer */}
          <footer className="text-center py-8 border-t border-border">
            <p className="text-sm" style={{ color: "#808285" }}>
              COPYRIGHT © 2026 LIGHTNING ENERGY — GEORGE FOTOPOULOS
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
