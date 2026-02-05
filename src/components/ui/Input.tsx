import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { Text } from './Text';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function Input({
  label,
  error,
  disabled = false,
  secureTextEntry,
  className = '',
  ...props
}: InputProps) {
  const baseStyles =
    'rounded-lg border px-4 py-3 text-base text-foreground bg-background';
  const borderStyle = error ? 'border-destructive' : 'border-border';
  const disabledStyle = disabled ? 'opacity-50' : '';

  return (
    <View className="w-full">
      {label && (
        <Text variant="label" className="mb-1.5 text-muted-foreground">
          {label}
        </Text>
      )}
      <TextInput
        editable={!disabled}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#64748b"
        className={`${baseStyles} ${borderStyle} ${disabledStyle} ${className}`}
        {...props}
      />
      {error && (
        <Text variant="caption" className="mt-1 text-destructive">
          {error}
        </Text>
      )}
    </View>
  );
}
