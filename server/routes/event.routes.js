import express from 'express';
import { createEvent, getAllEvents, getEventDetails } from '../controllers/index.controllers.js';
import { asyncWrapper } from './../utils/index.utils.js'
import { authMiddleware } from './../middlewares/index.middlewares.js';

const eventRouter = express.Router();

eventRouter.get('/', getAllEvents)
eventRouter.get('/:id', getEventDetails)

eventRouter.post('/organiser/create-event', authMiddleware, asyncWrapper(createEvent));

export { eventRouter };