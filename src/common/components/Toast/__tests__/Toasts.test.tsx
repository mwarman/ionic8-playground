import { describe, expect, it, vi } from 'vitest';

import { render, screen } from 'test/test-utils';
import * as UseToasts from 'common/hooks/useToasts';
import { toastFixture1 } from '__fixtures__/toasts';

import Toasts from '../Toasts';

describe('Toasts', () => {
  const useToastsSpy = vi.spyOn(UseToasts, 'useToasts');

  beforeEach(() => {
    useToastsSpy.mockReturnValue({
      createToast: vi.fn(),
      removeToast: vi.fn(),
      toasts: [toastFixture1],
    });
  });

  it('should render successfully', async () => {
    // ARRANGE
    render(<Toasts />);
    await screen.findByTestId('toasts');

    // ASSERT
    expect(screen.getByTestId('toasts')).toBeDefined();
  });

  it('should render toasts', async () => {
    // ARRANGE
    render(<Toasts />);
    await screen.findByTestId(`toast-${toastFixture1.id}`);

    // ASSERT
    expect(screen.getByTestId(`toast-${toastFixture1.id}`)).toBeDefined();
  });
});
