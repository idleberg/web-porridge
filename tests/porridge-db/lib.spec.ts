import { expect, test } from 'vitest';
import { PorridgeDB } from '../../src/index.ts';

test(`Invalid event type`, () => {
	Object.defineProperty(globalThis, 'localStorage', {
		value: undefined,
		writable: true,
	});

	// @ts-expect-error
	expect(() => new PorridgeDB({
		eventName: 1
	})).toThrowError(`Event name must be of type "string", got "number"`);
});
