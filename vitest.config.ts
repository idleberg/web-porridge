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
			include: ['src/**/*.ts'],
		},
	},
});
