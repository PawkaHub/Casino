// NPM
import mobx, { observable, asMap } from 'mobx';

// Libraries
import { log } from 'libraries/utils';

export default class Store {

  @observable data = asMap()

  set(key, value) {
    this.data.set(key, value);
    return this.showData();
  }

  get(key) {
    return this.data.get(key);
  }

  showData() {
    return mobx.toJS(this.data);
  }

  handleGameState(result) {
    console.log('handleGameState', result);

    // Check for server error or state
    const { blackjack, message } = result;

    // Write server data to local store
    if (blackjack) return this.set('blackjack', asMap(blackjack));
    throw message;
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

  async auth(data) {
    const result = await this.send({
      url: '/api/player/auth',
      data,
    }).catch(log.error);

    // If the user has successfully joined the lobby, save their JWT token to localStorage for inclusion in all subsequent API requests
    return this.createSession(result);
  }

  async reauth() {
    // If a casino-session-token value already exists for this client, pass the token to the server and re-verify it over there, and return the updated token to the client and re-intiailize the session. Naturally in a real world situation things like token expiration and other edge cases would have to be handled, but this is fine for a code sample.
    const result = await this.send({
      url: '/api/player/reauth'
    }).catch(log.error);
    return this.createSession(result);
  }

  async createSession(result) {
    console.log('createSession', result);
    if (result.token) {

      // Persist user data
      const { user, blackjack, token } = result;

      if (user) { this.set('user', asMap(user)); }
      if (blackjack) { this.set('blackjack', asMap(blackjack)); }

      localStorage.setItem('casino-session-token', token);

      return result;
    }
    // If there's no token returned, the session has failed for whatever reason and the localStorage should be cleared out accordingly
    localStorage.removeItem('casino-session-token');
    return console.warn(result.message);
  }

  async bet(data) {
    const result = await this.send({
      url: '/api/blackjack/bet',
      data,
    }).catch(log.error);

    return this.handleGameState(result);
  }

  async hit() {
    const result = await this.send({
      url: '/api/blackjack/hit',
    }).catch(log.error);

    return this.handleGameState(result);
  }

  async stand() {
    const result = await this.send({
      url: '/api/blackjack/stand',
    }).catch(log.error);

    return this.handleGameState(result);
  }

  async doubleDown() {
    const result = await this.send({
      url: '/api/blackjack/doubledown',
    }).catch(log.error);

    return this.handleGameState(result);
  }

  async surrender() {
    const result = await this.send({
      url: '/api/blackjack/surrender',
    }).catch(log.error);

    return this.handleGameState(result);
  }

}
