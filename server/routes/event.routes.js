import express from 'express';
import { createEvent, getAllEvents, getEventDetails, getCurrentUserEvents, updateEvent, getRegisteredEvents, deleteEvent } from '../controllers/index.controllers.js';
import { asyncWrapper } from './../utils/index.utils.js'
import { authMiddleware } from './../middlewares/index.middlewares.js';

const eventRouter = express.Router();

eventRouter.get('/', asyncWrapper(getAllEvents))
eventRouter.get('/:id', asyncWrapper(getEventDetails))

eventRouter.get('/organiser/user-event', authMiddleware , asyncWrapper(getCurrentUserEvents))
eventRouter.get('/organiser/registered-event', authMiddleware , asyncWrapper(getRegisteredEvents))
eventRouter.post('/organiser/create-event', authMiddleware, asyncWrapper(createEvent))
eventRouter.post('/organiser/update-event', authMiddleware, asyncWrapper(updateEvent))
eventRouter.delete('/organiser/delete-event/:id', authMiddleware, asyncWrapper(deleteEvent))

export { eventRouter };