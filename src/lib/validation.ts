/**
 * Zod validation schemas and utilities
 *
 * This module provides reusable validation schema fragments for building
 * type-safe form validation with React Hook Form and Zod.
 *
 * @example Creating a login schema
 * ```tsx
 * import { z } from 'zod';
 * import { emailSchema, passwordSchema } from '@/lib/validation';
 *
 * const loginSchema = z.object({
 *   email: emailSchema,
 *   password: passwordSchema,
 * });
 *
 * type LoginFormValues = z.infer<typeof loginSchema>;
 * ```
 *
 * @example Using with useAppForm
 * ```tsx
 * import { useAppForm } from '@/lib/form';
 * import { loginSchema } from './schemas';
 *
 * function LoginForm() {
 *   const { control, handleSubmit } = useAppForm({
 *     schema: loginSchema,
 *     defaultValues: { email: '', password: '' },
 *   });
 *   // ...
 * }
 * ```
 */

import { z } from 'zod';

// ============================================================================
// Validation Messages
// ============================================================================

export const validationMessages = {
  required: 'This field is required',
  email: {
    invalid: 'Please enter a valid email address',
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
    minLength: 'Password must be at least 8 characters',
    maxLength: 'Password must be no more than 128 characters',
    uppercase: 'Password must contain at least one uppercase letter',
    lowercase: 'Password must contain at least one lowercase letter',
    number: 'Password must contain at least one number',
    special: 'Password must contain at least one special character',
  },
  phone: {
    invalid: 'Please enter a valid phone number',
    required: 'Phone number is required',
  },
  url: {
    invalid: 'Please enter a valid URL',
  },
  name: {
    required: 'Name is required',
    minLength: 'Name must be at least 2 characters',
    maxLength: 'Name must be no more than 100 characters',
  },
  confirmPassword: {
    mismatch: 'Passwords do not match',
  },
};

// ============================================================================
// Schema Fragments - Reusable field validators
// ============================================================================

/**
 * Email validation schema
 * Validates proper email format
 */
export const emailSchema = z
  .string()
  .min(1, validationMessages.email.required)
  .email(validationMessages.email.invalid)
  .toLowerCase()
  .trim();

/**
 * Basic password schema
 * Requires minimum 8 characters
 */
export const passwordSchema = z
  .string()
  .min(1, validationMessages.password.required)
  .min(8, validationMessages.password.minLength)
  .max(128, validationMessages.password.maxLength);

/**
 * Strong password schema with complexity requirements
 * Requires: 8+ chars, uppercase, lowercase, number, special character
 */
export const strongPasswordSchema = z
  .string()
  .min(1, validationMessages.password.required)
  .min(8, validationMessages.password.minLength)
  .max(128, validationMessages.password.maxLength)
  .regex(/[A-Z]/, validationMessages.password.uppercase)
  .regex(/[a-z]/, validationMessages.password.lowercase)
  .regex(/[0-9]/, validationMessages.password.number)
  .regex(/[^A-Za-z0-9]/, validationMessages.password.special);

/**
 * Phone number validation schema
 * Supports E.164 international format
 */
export const phoneSchema = z
  .string()
  .min(1, validationMessages.phone.required)
  .regex(/^\+?[1-9]\d{1,14}$/, validationMessages.phone.invalid);

/**
 * Optional phone schema for non-required phone fields
 */
export const optionalPhoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, validationMessages.phone.invalid)
  .optional()
  .or(z.literal(''));

/**
 * URL validation schema
 */
export const urlSchema = z.string().url(validationMessages.url.invalid);

/**
 * Optional URL schema
 */
export const optionalUrlSchema = z
  .string()
  .url(validationMessages.url.invalid)
  .optional()
  .or(z.literal(''));

/**
 * Name validation schema (for first name, last name, etc.)
 */
export const nameSchema = z
  .string()
  .min(1, validationMessages.name.required)
  .min(2, validationMessages.name.minLength)
  .max(100, validationMessages.name.maxLength)
  .trim();

/**
 * Optional name schema
 */
export const optionalNameSchema = z
  .string()
  .min(2, validationMessages.name.minLength)
  .max(100, validationMessages.name.maxLength)
  .trim()
  .optional()
  .or(z.literal(''));

/**
 * Required string schema with custom length constraints
 */
export const requiredString = (
  minLength = 1,
  maxLength = 500,
  fieldName = 'This field'
) =>
  z
    .string()
    .min(1, `${fieldName} is required`)
    .min(minLength, `${fieldName} must be at least ${minLength} characters`)
    .max(maxLength, `${fieldName} must be no more than ${maxLength} characters`)
    .trim();

/**
 * Optional string schema with length constraints
 */
export const optionalString = (minLength = 0, maxLength = 500) =>
  z
    .string()
    .min(minLength)
    .max(maxLength)
    .trim()
    .optional()
    .or(z.literal(''));

/**
 * Boolean schema (for checkboxes, toggles)
 */
export const booleanSchema = z.boolean();

/**
 * Required checkbox schema (must be checked)
 */
export const requiredCheckboxSchema = z
  .boolean()
  .refine((val) => val === true, 'This field must be checked');

/**
 * Positive number schema
 */
export const positiveNumberSchema = z
  .number()
  .positive('Must be a positive number');

/**
 * Non-negative number schema (0 or positive)
 */
export const nonNegativeNumberSchema = z
  .number()
  .nonnegative('Must be zero or a positive number');

/**
 * Integer schema
 */
export const integerSchema = z.number().int('Must be a whole number');

/**
 * Date schema (validates Date objects)
 */
export const dateSchema = z.date({ error: 'Invalid date' });

/**
 * Date string schema (validates ISO date strings)
 */
export const dateStringSchema = z
  .string()
  .datetime({ message: 'Invalid date format' });

// ============================================================================
// Schema Utilities
// ============================================================================

/**
 * Create a confirm password refinement for password matching
 *
 * @example
 * ```tsx
 * const signupSchema = z.object({
 *   password: passwordSchema,
 *   confirmPassword: z.string(),
 * }).refine(...confirmPasswordRefinement('password', 'confirmPassword'));
 * ```
 */
export const confirmPasswordRefinement = (
  passwordField = 'password',
  confirmField = 'confirmPassword'
) =>
  [
    (data: Record<string, unknown>) => data[passwordField] === data[confirmField],
    {
      message: validationMessages.confirmPassword.mismatch,
      path: [confirmField],
    },
  ] as const;

/**
 * Create a schema for a select/dropdown field with predefined options
 */
export const enumSchema = <T extends readonly [string, ...string[]]>(
  options: T,
  errorMessage = 'Please select a valid option'
) => z.enum(options, { error: errorMessage });

/**
 * Create an optional field from any schema
 */
export const makeOptional = <T extends z.ZodTypeAny>(schema: T) =>
  schema.optional();

/**
 * Create a nullable field from any schema
 */
export const makeNullable = <T extends z.ZodTypeAny>(schema: T) =>
  schema.nullable();

// ============================================================================
// Common Composite Schemas
// ============================================================================

/**
 * Login form schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * Registration/Signup form schema with password confirmation
 */
export const signupSchema = z
  .object({
    email: emailSchema,
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: validationMessages.confirmPassword.mismatch,
    path: ['confirmPassword'],
  });
export type SignupFormValues = z.infer<typeof signupSchema>;

/**
 * Basic profile form schema
 */
export const profileSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  phone: optionalPhoneSchema,
});
export type ProfileFormValues = z.infer<typeof profileSchema>;

/**
 * Password reset request schema
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

/**
 * Password reset schema (setting new password)
 */
export const resetPasswordSchema = z
  .object({
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: validationMessages.confirmPassword.mismatch,
    path: ['confirmPassword'],
  });
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

/**
 * Change password schema (requires current password)
 */
export const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: strongPasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: validationMessages.confirmPassword.mismatch,
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  });
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

// Re-export zod for convenience
export { z } from 'zod';
