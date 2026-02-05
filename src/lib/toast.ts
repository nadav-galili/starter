/**
 * Typed toast notification utilities using Burnt
 *
 * Provides a consistent interface for showing toast notifications
 * across the app with support for different types (success, error, info).
 *
 * @example Show success toast
 * ```tsx
 * import { toast } from '@/lib/toast';
 *
 * toast.success('Profile updated successfully');
 * ```
 *
 * @example Show error toast
 * ```tsx
 * toast.error('Failed to save changes');
 * ```
 *
 * @example Show toast with custom duration
 * ```tsx
 * toast.success('Saved!', { duration: 2 });
 * ```
 */

import * as Burnt from "burnt";

/**
 * Haptic feedback options
 */
export type HapticType = "success" | "warning" | "error" | "none";

/**
 * Toast configuration options
 */
export interface ToastOptions {
  /** Duration in seconds (default: 3) */
  duration?: number;
  /** Whether the toast should be dismissed on drag */
  shouldDismissByDrag?: boolean;
  /** Haptic feedback type */
  haptic?: HapticType;
}

/**
 * Alert preset types (excluding custom which requires icon)
 */
export type AlertPreset = "done" | "error" | "none" | "heart";

/**
 * Alert configuration options (for more prominent notifications)
 */
export interface AlertOptions {
  /** Alert title */
  title: string;
  /** Alert message */
  message?: string;
  /** Duration in seconds (default: 5) */
  duration?: number;
  /** Preset style (default: done) */
  preset?: AlertPreset;
}

/**
 * Default toast configuration
 */
const DEFAULT_TOAST_DURATION = 3;

/**
 * Show a success toast notification
 */
function success(message: string, options?: ToastOptions) {
  Burnt.toast({
    title: message,
    preset: "done",
    duration: options?.duration ?? DEFAULT_TOAST_DURATION,
    shouldDismissByDrag: options?.shouldDismissByDrag ?? true,
    haptic: options?.haptic ?? "success",
  });
}

/**
 * Show an error toast notification
 */
function error(message: string, options?: ToastOptions) {
  Burnt.toast({
    title: message,
    preset: "error",
    duration: options?.duration ?? DEFAULT_TOAST_DURATION,
    shouldDismissByDrag: options?.shouldDismissByDrag ?? true,
    haptic: options?.haptic ?? "error",
  });
}

/**
 * Show an info toast notification
 */
function info(message: string, options?: ToastOptions) {
  Burnt.toast({
    title: message,
    preset: "none",
    duration: options?.duration ?? DEFAULT_TOAST_DURATION,
    shouldDismissByDrag: options?.shouldDismissByDrag ?? true,
    haptic: options?.haptic ?? "none",
  });
}

/**
 * Show a warning toast notification
 */
function warning(message: string, options?: ToastOptions) {
  Burnt.toast({
    title: message,
    preset: "error",
    duration: options?.duration ?? DEFAULT_TOAST_DURATION,
    shouldDismissByDrag: options?.shouldDismissByDrag ?? true,
    haptic: options?.haptic ?? "warning",
  });
}

/**
 * Show a more prominent alert notification
 */
function alert(options: AlertOptions) {
  Burnt.alert({
    title: options.title,
    message: options.message,
    duration: options.duration ?? 5,
    preset: options.preset ?? "done",
  });
}

/**
 * Dismiss all visible toasts
 */
function dismissAll() {
  Burnt.dismissAllAlerts();
}

/**
 * Toast notification utilities
 */
export const toast = {
  success,
  error,
  info,
  warning,
  alert,
  dismissAll,
};
