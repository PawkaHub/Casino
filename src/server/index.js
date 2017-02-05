// NPM
import express from 'express';

// Require JWT Authentication for all API Routes (except the join api route)
import secure from 'project/server/api/player/secure';

// Player Specific Routes
import auth from 'project/server/api/player/auth';
import reauth from 'project/server/api/player/reauth';

// Game Routes - Blackjack
import bet from 'project/server/api/blackjack/bet';
import hit from 'project/server/api/blackjack/hit';
import stand from 'project/server/api/blackjack/stand';
import doubledown from 'project/server/api/blackjack/doubledown';
import surrender from 'project/server/api/blackjack/surrender';

// API Router
const router = express.Router();

// Public API Routes (No JWT required)
router.use(auth);
router.use(reauth);

// We put the auth route after the auth route as we want users to still be able to login to that route, so we don't protect that route, but every route placed after this auth middleware will be protected
router.use(secure);

// Protected API Routes (JWT required)
router.use(bet);
router.use(hit);
router.use(stand);
router.use(doubledown);
router.use(surrender);

export default router;
