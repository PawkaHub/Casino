// NPM
import express from 'express';

// Models
import Blackjack from 'project/server/models/games/blackjack';

const router = express.Router();

export default router.post('/api/blackjack/stand', (req, res) => {
  const { body, auth } = req;
  const { playerId } = auth;

  // Initialize/Resume a game of blackjack for this player
  const game = new Blackjack({ playerId });

  // Stand
  game.stand();
  const { data } = game;

  console.log('DECK:');
  console.log(game.deck.cards);
  console.log('PLAYER HAND:');
  console.log(game.playerHand.cards);
  console.log('DEALER HAND:');
  console.log(game.dealerHand.cards);

  res.status(200).json({
    hello: 'Api Stand Result!',
  });

  /* return res.status(400).json({
    message: 'You can not STAND at this time.',
  });*/

  /* var session = req.session;

  //check to see if we're trying to stand before the deal or after we've stood
  if (session.game === null) {
    res.status(400).json("{ message: STAND action is not available at this time }");
  } else {
    // game over. clear the game from the session
    req.session.game = null;

    //let the player know the state of the game and whether they won or lost
    var message = game.getGamestate();
    if (game.playerHand.score() < game.dealerHand.score() && !game.dealerHand.isBusto()) {
      message += " You lose $" + game.bet;
    } else if (game.playerHand.score() > game.dealerHand.score() || game.dealerHand.isBusto()) {
      message += " You win $" + game.bet * 2;
    } else if (game.playerHand.score() === game.dealerHand.score() && game.dealerHand.isBlackjack()){
      message += " You lose $" + game.bet;
    } else {
      message += " Push, $" + game.bet + " returned to you";
    }

    res.status(200).json("{ message: " + message + " }");
  }*/
});
