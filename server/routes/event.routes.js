import express from 'express';
import { createEvent, getAllEvents, getEventDetails, getCurrentUserEvents, updateEvent } from '../controllers/index.controllers.js';
import { asyncWrapper } from './../utils/index.utils.js'
import { authMiddleware } from './../middlewares/index.middlewares.js';

const eventRouter = express.Router();

eventRouter.get('/', asyncWrapper(getAllEvents))
eventRouter.get('/:id', asyncWrapper(getEventDetails))

eventRouter.get('/organiser/user-event', authMiddleware , asyncWrapper(getCurrentUserEvents))
eventRouter.post('/organiser/create-event', authMiddleware, asyncWrapper(createEvent))
eventRouter.post('/organiser/update-event', authMiddleware, asyncWrapper(updateEvent))

export { eventRouter };