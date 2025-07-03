import React from "react";

interface PeriodButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const PeriodButton: React.FC<PeriodButtonProps> = ({ label, active, onClick }) => (
  <button
    className={
      active
        ? "bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium border border-blue-400"
        : "text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
    }
    onClick={onClick}
    type="button"
  >
    {label}
  </button>
);

interface StatGridProps {
  stats: { label: string; value: string }[];
}

const StatGrid: React.FC<StatGridProps> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {stats.map((stat) => (
      <div key={stat.label}>
        <h3 className="text-blue-300 text-sm font-medium mb-2">{stat.label}</h3>
        <p className="text-white text-2xl font-bold">{stat.value}</p>
      </div>
    ))}
  </div>
);

export interface ChildStatsSectionProps {
  period?: string;
  onPeriodChange?: (period: string) => void;
  topStats?: { label: string; value: string }[];
  bottomStats?: { label: string; value: string }[];
}

const PERIODS = [
  { key: "7d", label: "7 DERNIERS JOURS" },
  { key: "30d", label: "30 DERNIERS JOURS" },
  { key: "6m", label: "6 DERNIERS MOIS" },
];

const ChildStatsSection: React.FC<ChildStatsSectionProps> = ({
  period = "7d",
  onPeriodChange,
  topStats = [
    { label: "Modules terminés", value: "2" },
    { label: "Leçons complétées", value: "8" },
    { label: "Réussite aux jeux", value: "80%" },
    { label: "Jeux joués", value: "36" },
  ],
  bottomStats = [
    { label: "Temps de jeu", value: "8h 21m" },
    { label: "Temps moyenne par jeu", value: "31m" },
    { label: "Nb. sessions", value: "3" },
    { label: "Durée moyenne session", value: "2h 05m" },
  ],
}) => {
  return (
    <div className="w-full">
      <div className="flex space-x-1 mb-6">
        {PERIODS.map((p) => (
          <PeriodButton
            key={p.key}
            label={p.label}
            active={period === p.key}
            onClick={() => onPeriodChange?.(p.key)}
          />
        ))}
      </div>
      <div className="p-5">
        <StatGrid stats={topStats} />
        <div className="my-8"></div>
        <StatGrid stats={bottomStats} />
      </div>
    </div>
  );
};

export default ChildStatsSection;
