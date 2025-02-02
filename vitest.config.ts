import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		browser: {
			enabled: true,
			headless: true,
			name: 'chromium',
			provider: 'playwright',
		},
		coverage: {
			exclude: ['src/index.ts'],
			include: ['src/**/*.ts'],
		},
		testTimeout: 2000,
	},
});
