// NPM
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StateNavigator } from 'navigation';
import { Provider, useStaticRendering } from 'mobx-react';

// Libraries
import { capitalize } from 'libraries/utils';

// Project
import App from 'project/client/views/app';
import template from 'project/server/template';
import { configStateNav } from 'project/shared';

// Stores
import Game from 'project/stores/game';

// Project Name
const { project } = process.env;
const projectName = capitalize(project);

const ssr = (req, res, next) => {
  // State Navigator
  const stateNavigator = new StateNavigator();
  configStateNav(stateNavigator);

  // Handle State Navigation
  stateNavigator.onNavigate((oldState, state, data) => {
    const Component = state.component;

    // Radium Config for passing server side styles to the client
    const radiumConfig = { userAgent: req.headers['user-agent'] };

    // console.log('data', state, data);

    // Stores
    useStaticRendering(true);
    const gameStore = new Game();

    // Render the first time
    const markup = renderToString(
      <Provider gameStore={gameStore}>
        <App radiumConfig={radiumConfig}>
          <Component />
        </App>
      </Provider>
    );

    // Send the final markup off to the client
    res.write(template({
      title: projectName,
      data: JSON.stringify(data),
      body: markup,
    }));
    res.end();
  });

  // This has to be put after the onNavigate handler, otherwise the server will hang indefinitely
  stateNavigator.start(req.url);
}

export default ssr;
