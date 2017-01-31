// NPM
import { observable, action, computed, asMap } from 'mobx';

// Libraries
import { capitalize, alphanumeric } from 'libraries/utils';

export default class Game {
  constructor() {
    console.log('Game');
  }

  @action draw = ({ card }) => {
    console.log('Draw!', card);
  }
}
