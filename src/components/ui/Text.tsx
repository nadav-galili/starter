import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, string> = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-semibold',
  body: 'text-base',
  caption: 'text-sm',
  label: 'text-xs font-medium uppercase tracking-wide',
};

export function Text({
  variant = 'body',
  className = '',
  children,
  ...props
}: TextProps) {
  const baseStyles = 'text-foreground';
  const variantStyle = variantStyles[variant];

  return (
    <RNText
      className={`${baseStyles} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}
