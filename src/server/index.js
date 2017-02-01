// NPM
import express from 'express';

// Server Side Only Routes
import deal from 'project/server/api/deal';
import hit from 'project/server/api/hit';
import stand from 'project/server/api/stand';
import doubledown from 'project/server/api/doubledown';
import split from 'project/server/api/split';
import surrender from 'project/server/api/surrender';

// API Router
const router = express.Router();

// API Routes
router.use(deal);
router.use(hit);
router.use(stand);
router.use(doubledown);
router.use(split);
router.use(surrender);

export default router;
