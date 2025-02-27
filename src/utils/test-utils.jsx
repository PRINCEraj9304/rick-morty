import { setupStore } from '../store/store';
import { render } from '@testing-library/react';
import {Provider} from 'react-redux'

export function renderWithProviders(ui, extendedRenderOptions = {}) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),  // Correct store initialization
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

