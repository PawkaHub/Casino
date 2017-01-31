// NPM
import express from 'express';

const router = express.Router();

export default router.get('/deal', (req, res) => {
  res.send({
    title: 'Api Deal!',
    body: 'Deal!',
  });
});
