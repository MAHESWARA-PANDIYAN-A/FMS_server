import express from 'express'
import { signUp, login } from '../Controller/controller.js'
import { createRequest, getRequests, getUserRequests, updateRequestStatus } from '../Controller/requestController.js'

const route = express.Router();

// Auth routes
route.post('/signup', signUp);
route.post('/login', login);

// Request routes
route.post('/requests', createRequest);
route.get('/requests', getRequests);
route.get('/requests/user/:userId', getUserRequests);
route.put('/requests/:id/status', updateRequestStatus);

export default route;