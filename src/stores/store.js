// NPM
import mobx, { observable, asMap } from 'mobx';

// Libraries
import { log } from 'libraries/utils';

export default class Store {

  @observable data = asMap()

  showData() {
    return mobx.toJS(this.data);
  }

  async send({ url = log.error('Please Provide an URL'), data }) {
    console.log('params', url, data);

    // Pass in JWT with every request to confirm authorization for API endpoints
    const token = localStorage.getItem('casino-session-token');

    // Specify request headers
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });

    // Specify request type
    const request = { method: 'POST', headers };

    // Specify JSON Data, if there is any
    if (data) { request.body = JSON.stringify(data); }
    console.log('send', request);

    // Fetch the data from the API endpoint for the server
    const result = await fetch(url, request).catch(log.error);

    // Parse the server result into JSON
    const json = await result.json();
    console.log('json', json);

    return json;
  }

  createSession(result) {
    if (result) {
      const { id, name, token } = result;
      this.data.set('id', id);
      this.data.set('name', name);
      localStorage.setItem('casino-session-token', token);
      return { id, name };
    }
    return console.error('Error Creating User Session');
  }

  async join(data) {
    const result = await this.send({
      url: '/api/join',
      data,
    }).catch(log.error);

    // If the user has successfully joined the lobby, save their JWT token to localStorage for inclusion in all subsequent API requests
    return this.createSession(result);
  }

  async rejoin() {
    // If a casino-session-token value already exists for this client, pass the token to the server and re-verify it over there, and return the updated token to the client and re-intiailize the session. Naturally in a real world situation things like token expiration and other edge cases would have to be handled, but this is fine for a code sample.
    const result = await this.send({ url: '/api/rejoin' }).catch(log.error);
    return this.createSession(result);
  }

  async deal(data) {
    return await this.send({ url: '/api/deal', data }).catch(log.error);
  }

  async hit(data) {
    return await this.send({ url: '/api/hit', data }).catch(log.error);
  }

  async stand(data) {
    return await this.send({ url: '/api/stand', data }).catch(log.error);
  }

  async doubleDown(data) {
    return await this.send({ url: '/api/doubledown', data }).catch(log.error);
  }

  async split(data) {
    return await this.send({ url: '/api/split', data }).catch(log.error);
  }

  async surrender(data) {
    return await this.send({ url: '/api/surrender', data }).catch(log.error);
  }
}
