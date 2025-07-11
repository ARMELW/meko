import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import React from "react";

export interface StatusPieData {
  name: string;
  value: number;
  color: string;
  label: string;
}

interface StatusPieChartProps {
  data: StatusPieData[];
  total?: number;
  showPercentLabels?: boolean;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  if (
    cx === undefined ||
    cy === undefined ||
    midAngle === undefined ||
    innerRadius === undefined ||
    outerRadius === undefined ||
    percent === undefined
  ) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return percent > 0 ? (
    <text
      x={x}
      y={y}
      fill="white"
      fontWeight="bold"
      fontSize={14}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

export default function StatusPieChart({
  data,
  total,
  showPercentLabels = false
}: StatusPieChartProps) {
  const totalValue = total ?? data.reduce((sum, d) => sum + d.value, 0);
  // Mapping des couleurs et labels traduits pour la légende
  const legendConfig: Record<string, { color: string; label: string }> = {
    available: { color: 'rgba(0, 15, 71, 0.6)', label: 'À découvrir' },
    abandoned: { color: 'rgba(255, 127, 50, 1)', label: 'En cours' },
    completed: { color: 'rgba(0, 175, 66, 1)', label: 'Terminés' },
    blocked: { color: 'rgba(211, 40, 40, 1)', label: 'Bloqués' },
  };
  return (
    <div className="flex flex-col items-center w-full">
       <div className="w-full h-full">
        <ResponsiveContainer  width="100%" height={250}>
          <RechartsPieChart >
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              innerRadius="60%"
              outerRadius="92%"
              stroke="none"
              isAnimationActive={true}
              labelLine={true}
              label={showPercentLabels ? renderCustomizedLabel : undefined}
            >
              {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={legendConfig[entry.name]?.color || entry.color} />
              ))}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center mt-4 w-full justify-center">
        <span className="font-bold text-white text-lg mr-4" style={{ minWidth: 70 }}>{totalValue} jeux</span>
        <div className="flex flex-wrap gap-4">
          {Object.entries(legendConfig).map(([key, { color, label }]) => (
            <span key={key} className="flex items-center gap-1 text-white text-sm">
              <svg width="32" height="20" viewBox="0 0 32 24" style={{ display: 'inline-block' }}>
                <rect x="2" y="3" width="28" height="16" rx="3" fill={color} />
              </svg>
              <span>{label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
