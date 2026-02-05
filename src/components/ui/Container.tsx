import React from 'react';
import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface ContainerProps extends ViewProps {
  centered?: boolean;
  className?: string;
  children: React.ReactNode;
}

export interface SafeAreaContainerProps extends ContainerProps {
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export function Container({
  centered = false,
  className = '',
  children,
  ...props
}: ContainerProps) {
  const baseStyles = 'flex-1 bg-background px-4';
  const centeredStyles = centered ? 'items-center justify-center' : '';

  return (
    <View
      className={`${baseStyles} ${centeredStyles} ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}

export function SafeAreaContainer({
  centered = false,
  className = '',
  edges,
  children,
  ...props
}: SafeAreaContainerProps) {
  const baseStyles = 'flex-1 bg-background px-4';
  const centeredStyles = centered ? 'items-center justify-center' : '';

  return (
    <SafeAreaView
      edges={edges}
      className={`${baseStyles} ${centeredStyles} ${className}`}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
}
