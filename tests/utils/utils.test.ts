
// /tests/utils/utils.test.ts

import { sayHello } from 'src_root/utils/utils';
// Or if you've set up path aliases, you could use:
// import { sayHello } from 'plugin_root/utils/utils';

describe('Utils', () => {
  test('sayHello returns correct greeting', () => {
    const result = sayHello('World');
    expect(result).toBe('Hello, World!');
  });

  // You can add more test cases
  test('sayHello with empty string', () => {
    const result = sayHello('');
    expect(result).toBe('Hello, !');
  });
});
