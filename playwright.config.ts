import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:3000',
    video: 'on',
  },
  timeout: 60000, // 60 seconds
});
