import { expect, test } from 'vitest';
import { PorridgeDB } from '../../src/index.ts';

test(`Invalid event type`, () => {
	Object.defineProperty(globalThis, 'localStorage', {
		value: undefined,
		writable: true,
	});

	expect(() => new PorridgeDB({
		// @ts-expect-error Provide invalid event name
		eventName: 1
	})).toThrowError(`Event name must be of type "string", got "number"`);
});
