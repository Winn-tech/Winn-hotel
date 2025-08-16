import React from 'react';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  bgColor: string;
  textColor: string;
}

const StatCard = ({ title, value, icon: Icon, color, bgColor, textColor }: StatCardProps) => {
  return (
    <div className={`${bgColor} rounded-xl shadow-sm p-5 transition-all hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${textColor} opacity-80`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${textColor} mt-1`}>
            {value}
          </p>
        </div>
        <div className={`${color} rounded-lg p-3`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );
};

interface StatsGridProps {
  stats: StatCardProps[];
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          bgColor={stat.bgColor}
          textColor={stat.textColor}
        />
      ))}
    </div>
  );
};

export { StatCard, StatsGrid };
