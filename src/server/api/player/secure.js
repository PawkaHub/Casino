// NPM
import express from 'express';
import jwtMiddleware from 'express-jwt';

// Project
import {
  FAKE_SERVER_SECRET_KEY,
  SERVER_URL,
  SERVER_PORT,
} from 'project/config/constants';

const router = express.Router();

// Require JWT Authentication for all API Routes (except the join api route)
export default router.all('/api/*', jwtMiddleware({
  secret: FAKE_SERVER_SECRET_KEY,
  audience: `${SERVER_URL}:${SERVER_PORT}/api`,
  issuer: `${SERVER_URL}:${SERVER_PORT}`,
  credentialsRequired: false,
  requestProperty: 'auth',
}), (req, res, next) => {
  const { auth } = req;
  // console.log('api auth', auth);
  // If the jwt was successfully verified and an auth property is set on the request object, we know that the user login is valid and we can proceed with making the appropriate API calls as a trusted user
  if (!auth) return res.sendStatus(401);
  next();
});
