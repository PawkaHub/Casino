// NPM
import express from 'express';

// Models
import Blackjack from 'project/server/models/games/blackjack';
import Hand from 'project/server/models/hand';

const router = express.Router();

export default router.post('/api/blackjack/stand', (req, res) => {
  const { body, auth } = req;
  const { id: playerId } = auth;

  const blackjack = new Blackjack();
  const currentGame = blackjack.start({ playerId });
  console.log('Api Stand Post Body', currentGame);

  if (currentGame) {
    blackjack.stand();
    return res.status(200).json(currentGame);
  }
  return res.status(400).json({
    message: 'You can not STAND at this time.',
  });

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

  res.status(200).json({
    hello: 'Api Stand Result',
  });
});
