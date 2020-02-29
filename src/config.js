module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN || 'dummy-api-token',
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://xcppzgqesnmxic:fc2543aa64b2a0543ea3e0a558d07149633ff0f40a729f08df9f588f8a71eeb6@ec2-184-72-236-3.compute-1.amazonaws.com:5432/dedeh6gs4os95l',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '50d',
}