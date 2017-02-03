// NPM
import express from 'express';

// Require JWT Authentication for all API Routes (except the join api route)
import auth from 'project/server/api/auth';

// Api Specific Routes
import join from 'project/server/api/join';
import rejoin from 'project/server/api/rejoin';
import deal from 'project/server/api/deal';
import hit from 'project/server/api/hit';
import stand from 'project/server/api/stand';
import doubledown from 'project/server/api/doubledown';
import split from 'project/server/api/split';
import surrender from 'project/server/api/surrender';

// API Router
const router = express.Router();

// Public API Routes (No JWT required)
router.use(join);
router.use(rejoin);

// We put the auth route after the join route as we want users to still be able to login to that route, so we don't protect that route, but every route placed after this auth middleware will be protected
router.use(auth);

// Protected API Routes (JWT required)
router.use(deal);
router.use(hit);
router.use(stand);
router.use(doubledown);
router.use(split);
router.use(surrender);

export default router;
