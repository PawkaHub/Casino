// NPM
import { observable, action, computed, asMap } from 'mobx';

export default class Game {
  constructor() {
    console.log('Game');
  }

  @action draw = ({ card }) => {
    console.log('Draw!', card);
  }
}
