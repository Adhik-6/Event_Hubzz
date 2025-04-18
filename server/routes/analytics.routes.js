import { Router } from 'express';
import { getEventSummary, registrationsOverTime, getTableData, getPieChartData } from './../controllers/index.controllers.js'
import { asyncWrapper } from './../utils/index.utils.js'
import { authMiddleware } from './../middlewares/auth.middlewares.js'

const analyticsRouter = Router();

analyticsRouter.get("/event-summary/:id", authMiddleware , asyncWrapper(getEventSummary))
analyticsRouter.get("/registrations-over-time/:id", authMiddleware , asyncWrapper(registrationsOverTime))
analyticsRouter.get("/table-data/:id", authMiddleware , asyncWrapper(getTableData))
analyticsRouter.get("/pie-chart-data/:id", authMiddleware , asyncWrapper(getPieChartData))

export { analyticsRouter }