// NPM
import loki from 'lokijs';

// In a real world scenario this DB would have schema, validation, and access (read/write control) enforced on it, but for the sake of a code sample we'll just allow for the entry of almost any value and worry about locking down the database at a later time
const DB = new loki('./db.json');

export default DB;
