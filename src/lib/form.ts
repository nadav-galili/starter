/**
 * React Hook Form utilities and typed wrappers
 *
 * This module provides a configured useForm wrapper and common form utilities
 * for building performant forms with minimal re-renders.
 *
 * @example Basic usage with typed form values
 * ```tsx
 * import { useAppForm } from '@/lib/form';
 *
 * interface LoginFormValues {
 *   email: string;
 *   password: string;
 * }
 *
 * function LoginForm() {
 *   const { control, handleSubmit, formState: { errors } } = useAppForm<LoginFormValues>({
 *     defaultValues: {
 *       email: '',
 *       password: '',
 *     },
 *   });
 *
 *   const onSubmit = (data: LoginFormValues) => {
 *     console.log(data);
 *   };
 *
 *   return (
 *     <View>
 *       <Controller
 *         control={control}
 *         name="email"
 *         rules={{ required: 'Email is required' }}
 *         render={({ field: { onChange, onBlur, value } }) => (
 *           <Input
 *             placeholder="Email"
 *             onBlur={onBlur}
 *             onChangeText={onChange}
 *             value={value}
 *           />
 *         )}
 *       />
 *       {errors.email && <Text>{errors.email.message}</Text>}
 *
 *       <Button onPress={handleSubmit(onSubmit)} title="Login" />
 *     </View>
 *   );
 * }
 * ```
 *
 * @example Using form utilities
 * ```tsx
 * import { getFieldError, isFieldRequired } from '@/lib/form';
 *
 * // Get error message for a field
 * const emailError = getFieldError(errors, 'email');
 *
 * // Check if field has required rule
 * const isEmailRequired = isFieldRequired(rules, 'email');
 * ```
 */

import {
  useForm,
  Controller,
  useController,
  useWatch,
  useFormState,
  useFieldArray,
  type UseFormProps,
  type UseFormReturn,
  type FieldValues,
  type FieldErrors,
  type FieldPath,
  type RegisterOptions,
  type ControllerProps,
  type ControllerRenderProps,
  type ControllerFieldState,
  type UseFormStateReturn,
} from 'react-hook-form';

/**
 * Default form configuration optimized for React Native
 */
const DEFAULT_FORM_CONFIG = {
  mode: 'onBlur' as const,
  reValidateMode: 'onChange' as const,
  shouldFocusError: true,
};

/**
 * Typed useForm wrapper with sensible defaults for React Native apps
 *
 * Defaults:
 * - mode: 'onBlur' - Validates on blur for better UX
 * - reValidateMode: 'onChange' - Re-validates on change after first validation
 * - shouldFocusError: true - Focuses first field with error on submit
 */
export function useAppForm<TFieldValues extends FieldValues = FieldValues>(
  props?: UseFormProps<TFieldValues>
): UseFormReturn<TFieldValues> {
  return useForm<TFieldValues>({
    ...DEFAULT_FORM_CONFIG,
    ...props,
  });
}

/**
 * Extract error message from form errors object for a specific field
 */
export function getFieldError<T extends FieldValues>(
  errors: FieldErrors<T>,
  fieldName: FieldPath<T>
): string | undefined {
  const error = errors[fieldName];
  return error?.message as string | undefined;
}

/**
 * Check if a field has validation errors
 */
export function hasFieldError<T extends FieldValues>(
  errors: FieldErrors<T>,
  fieldName: FieldPath<T>
): boolean {
  return !!errors[fieldName];
}

/**
 * Common validation patterns
 */
export const validationPatterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^\+?[1-9]\d{1,14}$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  numeric: /^[0-9]+$/,
};

/**
 * Common validation rules factory
 */
export const validationRules = {
  required: (message = 'This field is required') => ({
    required: message,
  }),

  email: (message = 'Please enter a valid email address') => ({
    pattern: {
      value: validationPatterns.email,
      message,
    },
  }),

  minLength: (length: number, message?: string) => ({
    minLength: {
      value: length,
      message: message || `Must be at least ${length} characters`,
    },
  }),

  maxLength: (length: number, message?: string) => ({
    maxLength: {
      value: length,
      message: message || `Must be no more than ${length} characters`,
    },
  }),

  min: (value: number, message?: string) => ({
    min: {
      value,
      message: message || `Must be at least ${value}`,
    },
  }),

  max: (value: number, message?: string) => ({
    max: {
      value,
      message: message || `Must be no more than ${value}`,
    },
  }),

  pattern: (pattern: RegExp, message: string) => ({
    pattern: {
      value: pattern,
      message,
    },
  }),
};

// Re-export commonly used types and utilities from react-hook-form
export {
  Controller,
  useController,
  useWatch,
  useFormState,
  useFieldArray,
  type UseFormProps,
  type UseFormReturn,
  type FieldValues,
  type FieldErrors,
  type FieldPath,
  type RegisterOptions,
  type ControllerProps,
  type ControllerRenderProps,
  type ControllerFieldState,
  type UseFormStateReturn,
};
