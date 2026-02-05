// Dynamic Expo configuration with environment variable support
// Environment variables are loaded from .env files automatically by Expo

export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      // Environment configuration
      ENVIRONMENT: process.env.ENVIRONMENT || 'development',
      API_BASE_URL: process.env.API_BASE_URL,
    },
  };
};
