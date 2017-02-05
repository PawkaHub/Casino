// Libraries
import { log } from 'libraries/utils';

// Project
import DB from 'project/server/db';

// Standard Base Adapter
export default class Base {

  constructor({ collection } = {}) {
    if (collection) {
      // If a collection with this name exists, retrieve it.
      let dbCollection = DB.getCollection(collection);

      // If it a collection with this name doesn't exist, create one.
      if (!dbCollection) { dbCollection = DB.addCollection(collection); }

      // Assign to instance
      this.collection = dbCollection;
    }
  }

  find(data) {
    // console.log('find', this.collection, data);
    return this.collection.find(data);
  }

  findOne(data) {
    // console.log('findOne', this.collection.data);
    return this.collection.findOne(data);
  }

  insertData(data) {
    this.collection.insert(data);
    // console.log('insertData', this.collection.data);
    return this.findOne(data);
  }

  updateData(data) {
    // console.log('updateData', data);
    return this.collection.update(data);
  }

  /* removeData(collection, data) {
    console.log('removeData', this.collection, collection, data);
  }

  saveData(collection) {
    console.log('saveData', this.collection, collection);
  }*/
}
