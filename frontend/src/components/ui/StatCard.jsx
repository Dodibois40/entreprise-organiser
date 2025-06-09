import React from 'react';
import { clsx } from 'clsx';
import CountUp from 'react-countup';
import { IconTrendingUp, IconTrendingDown, IconMinus } from '@tabler/icons-react';

const StatCard = ({ 
  title,
  value,
  prefix = '',
  suffix = '',
  trend = null,
  trendValue = null,
  trendLabel = '',
  icon: Icon,
  iconColor = 'bg-blue-500',
  className = '',
  loading = false,
  gradient = false,
  size = 'default',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  const iconSizeClasses = {
    sm: 'w-8 h-8',
    default: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const valueSizeClasses = {
    sm: 'text-xl',
    default: 'text-3xl',
    lg: 'text-4xl',
  };

  const getTrendIcon = () => {
    if (trend === 'up') return IconTrendingUp;
    if (trend === 'down') return IconTrendingDown;
    return IconMinus;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-gray-500';
  };

  const TrendIcon = getTrendIcon();

  if (loading) {
    return (
      <div className={clsx('stats-card animate-pulse', sizeClasses[size], className)}>
        <div className="flex items-center justify-between mb-4">
          <div className={clsx('rounded-xl bg-gray-200', iconSizeClasses[size])}></div>
          <div className="text-right flex-1 ml-4">
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div 
      className={clsx(
        'stats-card group hover:scale-105 transition-transform duration-300 cursor-pointer',
        sizeClasses[size],
        className
      )} 
      {...props}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl pointer-events-none" />
      )}
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          {Icon && (
            <div className={clsx(
              'stats-icon rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform',
              iconColor,
              iconSizeClasses[size]
            )}>
              <Icon className={clsx(
                'text-white',
                size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'
              )} />
            </div>
          )}
          
          <div className="text-right flex-1 min-w-0 ml-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium mb-1">
              {title}
            </p>
            <p className={clsx(
              'stats-value font-bold',
              valueSizeClasses[size]
            )}>
              {prefix}
              {typeof value === 'number' ? (
                <CountUp 
                  end={value} 
                  duration={2} 
                  separator=" " 
                  preserveValue
                />
              ) : (
                value
              )}
              {suffix}
            </p>
          </div>
        </div>

        {(trend || trendValue || trendLabel) && (
          <div className="flex items-center text-sm">
            {trend && (
              <TrendIcon className={clsx(
                'w-4 h-4 mr-1',
                getTrendColor()
              )} />
            )}
            {trendValue && (
              <span className={clsx(
                'font-medium mr-2',
                getTrendColor()
              )}>
                {trend === 'up' && '+'}
                {trend === 'down' && '-'}
                {typeof trendValue === 'number' ? (
                  <CountUp 
                    end={Math.abs(trendValue)} 
                    duration={2} 
                    decimals={1}
                    preserveValue
                  />
                ) : (
                  trendValue
                )}
                %
              </span>
            )}
            {trendLabel && (
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                {trendLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard; 