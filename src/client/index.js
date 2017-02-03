// NPM
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';

// Libraries
import { stateNav } from 'libraries/navigation';

// Listens for navigation events and renders the Relay RootContainer, passing in the Relay Route and Component retrieved from the state.
const nav = stateNav((oldState, state, data) => {
  // We fetch the App from here on navigation change so that we can always ensure that whenever the App file has been changed, that we'll be getting the most recent version of the file and using that in our render function.
  const App = require('project/client/views/app').default;
  const Stores = require('project/stores').default;
  const Component = state.component;

  render(
    <Provider {...Stores}>
      <AppContainer>
        <App>
          <Component />
        </App>
      </AppContainer>
    </Provider>,
    document.getElementById('root'),
  );
});


if (module.hot) {
  // We accept the shared directory here as well as that's where the grand majority of our view imports live due to us making use of the shared server and client rendering functionality of react and navigation router, so we need to catch changes that get propagated there and update our state configuration accordingly so that we see the proper updated files
  module.hot.accept([
    'project/client/views/app',
    'libraries/navigation',
    'project/stores',
  ], () => {
    console.log('Hot Reloading Client...');

    // Update the State Navigator and render the updated HMR files
    require('libraries/navigation').configStateNav(nav);
    nav.navigate(
      nav.stateContext.state.key,
      nav.stateContext.includeCurrentData({})
    );
  });
}
