import React from 'react';
import { Pressable, PressableProps, ActivityIndicator, View } from 'react-native';
import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary active:opacity-80',
  secondary: 'bg-secondary active:opacity-80',
  outline: 'bg-transparent border border-border active:bg-muted',
  ghost: 'bg-transparent active:bg-muted',
};

const variantTextStyles: Record<ButtonVariant, string> = {
  primary: 'text-primary-foreground',
  secondary: 'text-secondary-foreground',
  outline: 'text-foreground',
  ghost: 'text-foreground',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5',
  md: 'px-4 py-2',
  lg: 'px-6 py-3',
};

const sizeTextStyles: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const indicatorSizes: Record<ButtonSize, 'small' | 'large'> = {
  sm: 'small',
  md: 'small',
  lg: 'large',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseStyles = 'flex-row items-center justify-center rounded-lg';
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const disabledStyle = isDisabled ? 'opacity-50' : '';

  return (
    <Pressable
      disabled={isDisabled}
      className={`${baseStyles} ${variantStyle} ${sizeStyle} ${disabledStyle} ${className}`}
      {...props}
    >
      {loading ? (
        <View className="flex-row items-center justify-center">
          <ActivityIndicator
            size={indicatorSizes[size]}
            color={variant === 'primary' ? '#ffffff' : undefined}
          />
        </View>
      ) : (
        <Text
          className={`${variantTextStyles[variant]} ${sizeTextStyles[size]} font-semibold`}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}
