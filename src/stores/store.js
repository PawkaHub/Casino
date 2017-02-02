// Libraries
import { log } from 'libraries/utils';

export default class Store {

  async send({ url = log.error('Please Provide an URL'), data }) {
    console.log('params', url, data);

    // Specify request headers
    const headers = new Headers({ 'Content-Type': 'application/json' });

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
