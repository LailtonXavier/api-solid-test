import { expect, test } from 'vitest';
import { getFutureDate } from './get-future-date';

test('Increases date with one year', () => {
  const year = new Date().getFullYear()

  expect(getFutureDate(`${year}`).getFullYear()).toEqual(2024)
})