import { defineConfig } from 'vitest/config';
import process from 'node:process';

export default defineConfig({
	test: {
		browser: {
			enabled: true,
			headless: true,
			provider: 'playwright',
			instances: [
				{ browser: 'chromium' },
			],
		},
		coverage: {
			exclude: ['src/index.ts'],
			include: ['src/**/*.ts'],
		},
		onConsoleLog: () => Boolean(process.env.CI),
		testTimeout: process.env.CI ? undefined : 3000,
	},
});
