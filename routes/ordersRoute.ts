import { Router } from "express";
import { createOrder, filterOrders, getOrder, isOrderDelivered, isOrderPaid } from "../services/orders";
import { allowedTo, isActive, protectRoutes } from "../services/authentication";
import { getAllOrders } from "../services/orders";
import { createOrderValidator, getOrderValidator } from "../utiles/validation/ordersValidators";

const ordersRoute: Router = Router();
ordersRoute.use(protectRoutes, isActive)

ordersRoute.route('/')
  .get(filterOrders, getAllOrders)
  .post(allowedTo('user'), createOrderValidator, createOrder);

ordersRoute.route('/:id').get(getOrderValidator, getOrder)

ordersRoute.use(allowedTo('manager', 'admin'))

ordersRoute.route('/:id/paid')
.put(getOrderValidator, isOrderPaid)

ordersRoute.route('/:id/delivered')
.put(getOrderValidator, isOrderDelivered)

export default ordersRoute;