import { useMemo } from "react";
import { LineChart as LineChartIcon } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { calculateMonthlyPayment, formatCurrency, annualSolarSavings, feedInTariffIncome, annualMaintenance, annualInsurance } from "@/lib/loanData";

interface CashFlowChartProps {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}

export default function CashFlowChart({ loanAmount, interestRate, loanTerm }: CashFlowChartProps) {
  const chartData = useMemo(() => {
    const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
    const annualLoanPayment = monthlyPayment * 12;
    const totalAnnualSavings = annualSolarSavings + feedInTariffIncome;
    const totalAnnualCosts = annualMaintenance + annualInsurance;

    let cumulative = -loanAmount;
    const data = [];

    for (let year = 0; year <= 25; year++) {
      if (year === 0) {
        data.push({ year, cumulative: Math.round(cumulative), annual: 0 });
        continue;
      }

      const isLoanYear = year <= loanTerm;
      const annualNet = isLoanYear
        ? totalAnnualSavings - annualLoanPayment - totalAnnualCosts
        : totalAnnualSavings - totalAnnualCosts;

      cumulative += annualNet;
      data.push({
        year,
        cumulative: Math.round(cumulative),
        annual: Math.round(annualNet),
      });
    }

    return data;
  }, [loanAmount, interestRate, loanTerm]);

  const breakEvenYear = useMemo(() => {
    const found = chartData.find((d) => d.cumulative >= 0);
    return found ? found.year : null;
  }, [chartData]);

  return (
    <div className="panel-glow p-6">
      <div className="flex items-center gap-3 mb-2">
        <LineChartIcon className="w-6 h-6" style={{ color: "#00EAD3" }} />
        <h2 className="section-header text-2xl">25-Year Cash Flow Projection</h2>
      </div>
      <p className="text-sm mb-2" style={{ color: "#808285" }}>
        Cumulative net benefit of your solar investment over 25 years
      </p>
      {breakEvenYear && (
        <p className="text-sm mb-6 font-sub" style={{ color: "#00C853" }}>
          Break-even point: Year {breakEvenYear}
        </p>
      )}

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="cumulativeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00EAD3" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00EAD3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="year"
              stroke="#808285"
              tick={{ fill: "#808285", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              label={{ value: "Year", position: "insideBottom", offset: -5, fill: "#808285", fontSize: 11 }}
            />
            <YAxis
              stroke="#808285"
              tick={{ fill: "#808285", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                background: "#0a0a0a",
                border: "1px solid rgba(0,234,211,0.3)",
                borderRadius: "0.75rem",
                color: "#FFFFFF",
                fontSize: 12,
              }}
              formatter={(value: number, name: string) => [formatCurrency(value), name === "cumulative" ? "Cumulative" : "Annual"]}
              labelFormatter={(label: number) => `Year ${label}`}
            />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
            {breakEvenYear && (
              <ReferenceLine x={breakEvenYear} stroke="#00C853" strokeDasharray="5 5" label={{ value: "Break-even", fill: "#00C853", fontSize: 11 }} />
            )}
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="#00EAD3"
              strokeWidth={2}
              fill="url(#cumulativeGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "#00EAD3", stroke: "#000" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
