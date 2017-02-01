// Project Views
import Lobby from 'project/client/views/lobby';
import Blackjack from 'project/client/views/blackjack';

// Configures the states for all views.
const States = [{
  key: 'lobby',
  route: '',
  component: Lobby,
}, {
  key: 'blackjack',
  route: 'blackjack',
  component: Blackjack,
}];

export default States;
