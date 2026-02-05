import Constants from 'expo-constants';

/**
 * Environment types supported by the application
 */
export type Environment = 'development' | 'staging' | 'production';

/**
 * Environment configuration interface
 */
export interface EnvConfig {
  API_BASE_URL: string;
  ENVIRONMENT: Environment;
}

/**
 * Get the current environment from Expo Constants
 * Falls back to 'development' if not specified
 */
function getEnvironment(): Environment {
  const env = Constants.expoConfig?.extra?.ENVIRONMENT;
  if (env === 'staging' || env === 'production') {
    return env;
  }
  return 'development';
}

/**
 * Default API URLs for each environment
 */
const DEFAULT_API_URLS: Record<Environment, string> = {
  development: 'http://localhost:3000/api',
  staging: 'https://staging-api.example.com',
  production: 'https://api.example.com',
};

/**
 * Get the API base URL from environment variables or use default
 */
function getApiBaseUrl(): string {
  const customUrl = Constants.expoConfig?.extra?.API_BASE_URL;
  if (customUrl && typeof customUrl === 'string') {
    return customUrl;
  }
  return DEFAULT_API_URLS[getEnvironment()];
}

/**
 * Application environment configuration
 * Access environment variables through this object
 */
export const env: EnvConfig = {
  API_BASE_URL: getApiBaseUrl(),
  ENVIRONMENT: getEnvironment(),
};

/**
 * Helper to check if running in development
 */
export const isDevelopment = env.ENVIRONMENT === 'development';

/**
 * Helper to check if running in staging
 */
export const isStaging = env.ENVIRONMENT === 'staging';

/**
 * Helper to check if running in production
 */
export const isProduction = env.ENVIRONMENT === 'production';
