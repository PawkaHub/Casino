// Libraries
import { log } from 'libraries/utils';

export default class Store {
  constructor() {
    console.log('Store');
  }

  async send({ url = log.error('Please Provide an URL'), data }) {
    console.log('params', url, data);

    // Specify request headers
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    // Specify request type
    const request = {
      method: 'POST',
      headers,
    };

    // Specify JSON Data, if there is any
    if (data) {
      // const bodyData = new FormData();
      // bodyData.append('json', JSON.stringify(data));
      request.body = JSON.stringify(data);
    }

    console.log('send', request);
    // Fetch the data from the API endpoint for the server
    const result = await fetch(url, request).catch(log.error);

    // Parse the server result into JSON
    const json = await result.json();
    console.log('json', json);

    return json;
  }
}
