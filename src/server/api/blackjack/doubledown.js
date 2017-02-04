// NPM
import express from 'express';

// Models
import Blackjack from 'project/server/models/games/blackjack';
import Hand from 'project/server/models/hand';

const router = express.Router();

export default router.post('/api/blackjack/doubledown', (req, res) => {
  const { body } = req;
  console.log('Api Doubledown Post Body', body);

  /* var session = req.session;

  //check to see if we're trying to doubledown before the deal
  if (session.game === null) {
    res.status(400).json("{ message: DOUBLEDOWN action is not available at this time }");
  } else {
    var game = Game.clone(session.game);

    // check to see if player has already hit or doubled down
    if (game.playerHand.cards.length > 2) {
      res.status(400).json("{ message: DOUBLEDOWN action is not available at this time }");
    } else {

      //the player doubles their bet and hits once
      game.bet = game.bet * 2;
      game.playerHand.hit(game.deck.draw());

      //run out the rest of the dealer hand
      do {
        game.dealerHand.hit(game.deck.draw());
      } while (game.dealerHand.score() < Hand.DEALER_STAND);

      // game over. clear the game from the session
      req.session.game = null;

      //let the player know the state of the game and whether they won or lost
      var message = game.getGamestate();
      if (game.playerHand.score() < game.dealerHand.score() && !game.dealerHand.isBusto()) {
        message += " You lose $" + game.bet;
      } else if (game.playerHand.score() > game.dealerHand.score()  || game.dealerHand.isBusto()) {
        message += " You win $" + game.bet * 2;
      } else if (game.playerHand.score() === game.dealerHand.score() && game.dealerHand.isBlackjack()){
        message += " You lose $" + game.bet;
      } else {
        message += " Push, $" + game.bet + " returned to you";
      }

      res.status(200).json("{ message: " + message + " }");
    }
  }*/

  res.status(200).json({
    hello: 'Api Doubledown Result',
  });
});
