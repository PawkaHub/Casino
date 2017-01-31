// NPM
import express from 'express';

// Router for exporting
const router = express.Router();

// Server Side Only Routes
import deal from 'project/server/routes/deal';

// API Routes
router.use('/api', deal);

export default router;
