import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		browser: {
			enabled: true,
			headless: true,
			provider: 'playwright',
			instances: [
				{ browser: 'chromium' },
				{ browser: 'firefox' },
				{ browser: 'webkit' },
			],
		},
		coverage: {
			exclude: ['src/index.ts'],
			include: ['src/**/*.ts'],
		},
		onConsoleLog: () => Boolean(process.env.CI),
		testTimeout: 2000,
	},
});
