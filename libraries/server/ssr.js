// NPM
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider, useStaticRendering } from 'mobx-react';

// Libraries
import { stateNav } from 'libraries/navigation';
import { capitalize } from 'libraries/utils';
import template from 'libraries/server/template';

// Project
import App from 'project/client/views/app';
import Stores from 'project/stores';

// Project Name
const { project } = process.env;
const projectName = capitalize(project);

const ssr = (req, res, next) => {

  const nav = stateNav(req.url, (oldState, state, data) => {
    const Component = state.component;

    // Radium Config for passing server side styles to the client
    const radiumConfig = { userAgent: req.headers['user-agent'] };

    // Stores
    useStaticRendering(true);

    // Render the first time
    const markup = renderToString(
      <Provider {...Stores}>
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

}

export default ssr;
