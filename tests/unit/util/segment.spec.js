/* globals describe, it, expect, jest */

import { trackGlobalClickEvents } from '../../../src/util/segment';

describe('segment tracking util', () => {
  it('adds an event listener do the document once', () => {
    global.document.addEventListener = jest.fn();
    trackGlobalClickEvents();
    trackGlobalClickEvents();
    expect(global.document.addEventListener.mock.calls).toHaveLength(1);
  });
});
