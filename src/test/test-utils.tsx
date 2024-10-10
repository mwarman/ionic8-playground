import {
  queries,
  Queries,
  render,
  renderHook,
  RenderHookOptions,
  RenderOptions,
} from '@testing-library/react';

import 'common/utils/i18n';
import WithAllProviders from './wrappers/WithAllProviders';

const customRender = (ui: React.ReactElement, options?: RenderOptions, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: WithAllProviders, ...options });
};

function customRenderHook<
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props, Q, Container, BaseElement>,
) {
  return renderHook(render, { wrapper: WithAllProviders, ...options });
}

// re-export @testing-library/react
export * from '@testing-library/react';

// override the render function
export { customRender as render };

// override the renderHook function
export { customRenderHook as renderHook };
