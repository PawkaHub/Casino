// NPM
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { StateNavigator } from 'navigation';

// Project
import { getRootProps, configStateNav } from 'project/shared';

// State Navigator
const stateNavigator = new StateNavigator();
configStateNav(stateNavigator);

// Stores
import Stores from 'project/stores';

// Listens for navigation events and renders the Relay RootContainer, passing in the Relay Route and Component retrieved from the state.
stateNavigator.onNavigate((oldState, state, data) => {
  // We fetch the App from here on navigation change so that we can always ensure that whenever the App file has been changed, that we'll be getting the most recent version of the file and using that in our render function.
  const App = require('project/client/views/app').default;
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

stateNavigator.start();

if (module.hot) {
  // We accept the shared directory here as well as that's where the grand majority of our view imports live due to us making use of the shared server and client rendering functionality of react and navigation router, so we need to catch changes that get propagated there and update our state configuration accordingly so that we see the proper updated files
  module.hot.accept([
    'project/client/views/app',
    'project/shared',
    'project/stores',
  ], () => {
    console.log('Hot Reloading Client...');

    // Update the State Navigator and render the updated HMR files
    require('project/shared').configStateNav(stateNavigator);
    stateNavigator.navigate(
      stateNavigator.stateContext.state.key,
      stateNavigator.stateContext.includeCurrentData({})
    );
  });
}
