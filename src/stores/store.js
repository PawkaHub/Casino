// Libraries
import { log } from 'libraries/utils';

export default class Store {
  constructor() {
    console.log('Store');
  }

  async send({ url = log.error('Please Provide an URL'), data }) {
    // Specify request headers
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    // Specify request type
    const request = {
      method: 'POST',
      headers,
    };

    console.log('send', request);
    // Fetch the data from the API endpoint for the server
    const result = await fetch(url, request).catch(log.error);

    // Parse the server result into JSON
    const json = await result.json();
    console.log('json', json);

    return json;
  }
}
