import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';


const PriceChart = ({ coin, chartData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('1D');
  const [chartType, setChartType] = useState('line');

  const timePeriods = [
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '1Y', value: '1Y' },
    { label: 'ALL', value: 'ALL' }
  ];

  const chartTypes = [
    { label: 'Line', value: 'line', icon: 'TrendingUp' },
    { label: 'Candle', value: 'candle', icon: 'BarChart3' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold text-foreground">
            ${payload?.[0]?.value?.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border rounded-lg p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <h2 className="text-lg font-semibold text-foreground">Price Chart</h2>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Time Period Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {timePeriods?.map((period) => (
              <button
                key={period?.value}
                onClick={() => setSelectedPeriod(period?.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-smooth ${
                  selectedPeriod === period?.value
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {period?.label}
              </button>
            ))}
          </div>

          {/* Chart Type Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {chartTypes?.map((type) => (
              <button
                key={type?.value}
                onClick={() => setChartType(type?.value)}
                className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-md transition-smooth ${
                  chartType === type?.value
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={type?.icon} size={14} />
                <span>{type?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-64 lg:h-80" aria-label={`${coin?.name} Price Chart`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `$${value?.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>{coin?.symbol} Price</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={14} />
          <span>Real-time data</span>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;