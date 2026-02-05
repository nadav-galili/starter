/**
 * React Hook Form utilities and typed wrappers with Zod integration
 *
 * This module provides a configured useForm wrapper and common form utilities
 * for building performant forms with minimal re-renders and type-safe validation.
 *
 * @example Basic usage with Zod schema validation
 * ```tsx
 * import { z } from 'zod';
 * import { useAppForm } from '@/lib/form';
 * import { emailSchema, passwordSchema } from '@/lib/validation';
 *
 * const loginSchema = z.object({
 *   email: emailSchema,
 *   password: passwordSchema,
 * });
 *
 * function LoginForm() {
 *   const { control, handleSubmit, formState: { errors } } = useAppForm({
 *     schema: loginSchema,
 *     defaultValues: {
 *       email: '',
 *       password: '',
 *     },
 *   });
 *
 *   const onSubmit = (data: z.infer<typeof loginSchema>) => {
 *     console.log(data);
 *   };
 *
 *   return (
 *     <View>
 *       <Controller
 *         control={control}
 *         name="email"
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
 * import { getFieldError } from '@/lib/form';
 *
 * // Get error message for a field
 * const emailError = getFieldError(errors, 'email');
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
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodType } from 'zod';

/**
 * Default form configuration optimized for React Native
 */
const DEFAULT_FORM_CONFIG = {
  mode: 'onBlur' as const,
  reValidateMode: 'onChange' as const,
  shouldFocusError: true,
};

/**
 * Extended form props that include Zod schema support
 */
export type UseAppFormProps<TFieldValues extends FieldValues = FieldValues> =
  Omit<UseFormProps<TFieldValues>, 'resolver'> & {
    /**
     * Zod schema for form validation
     * When provided, automatically configures zodResolver
     */
    schema?: ZodType<TFieldValues>;
  };

/**
 * Typed useForm wrapper with sensible defaults for React Native apps
 * and automatic Zod schema integration
 *
 * Defaults:
 * - mode: 'onBlur' - Validates on blur for better UX
 * - reValidateMode: 'onChange' - Re-validates on change after first validation
 * - shouldFocusError: true - Focuses first field with error on submit
 * - resolver: zodResolver when schema is provided
 */
export function useAppForm<TFieldValues extends FieldValues = FieldValues>(
  props?: UseAppFormProps<TFieldValues>
): UseFormReturn<TFieldValues> {
  const { schema, ...restProps } = props ?? {};

  // Type assertion needed due to Zod 4 + hookform resolver type incompatibilities
  // The runtime behavior is correct - the types just don't align perfectly
  const resolver = schema
    ?  
      (zodResolver(schema as any) as any)
    : undefined;

  return useForm<TFieldValues>({
    ...DEFAULT_FORM_CONFIG,
    ...(resolver ? { resolver } : {}),
    ...restProps,
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

// Re-export zodResolver for custom resolver configurations
export { zodResolver };
