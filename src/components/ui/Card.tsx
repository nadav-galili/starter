import React from 'react';
import { View, ViewProps } from 'react-native';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps extends ViewProps {
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  elevated: 'bg-card shadow-md shadow-black/10 dark:shadow-black/30',
  outlined: 'bg-card border border-border',
  filled: 'bg-card',
};

export function Card({
  variant = 'filled',
  className = '',
  children,
  ...props
}: CardProps) {
  const baseStyles = 'rounded-xl p-4';
  const variantStyle = variantStyles[variant];

  return (
    <View
      className={`${baseStyles} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
