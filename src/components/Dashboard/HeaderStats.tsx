import React from 'react';

type Stat = {
  label: string;
  value: string;
  percentage: string;
};

const stats: Stat[] = [
  { label: 'Total views', value: '$3.456K', percentage: '0.43%' },
  { label: 'Total Profit', value: '$45.2K', percentage: '4.35%' },
  { label: 'Total Product', value: '2.450', percentage: '2.95%' },
  { label: 'Total Users', value: '3.456', percentage: '0.95%' },
];

const HeaderStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 mt-5 md:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-gray-700 p-4 rounded shadow">
          <div className="text-gray-200">{stat.label}</div>
          <div className="text-2xl text-blue-500 font-bold">{stat.value}</div>
          <div className="text-green-400">{stat.percentage}</div>
        </div>
      ))}
    </div>
  );
};

export default HeaderStats;
