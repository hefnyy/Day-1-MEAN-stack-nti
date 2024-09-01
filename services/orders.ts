import { Orders } from "../interfaces/orders";
import { NextFunction, Request, Response } from 'express';
import { FilterData } from "../interfaces/filterData";
import asyncHandler from 'express-async-handler';
import { CartProducts } from "../interfaces/carts";
import { getAll, getOne } from "./refactorsHandler";
import ordersModel from "../Models/ordersModel";
import ApiErrors from "../utiles/APIErrors";
import cartsModel from "../Models/cartsModel";
import productsModel from "../Models/productsModel";


export const filterOrders = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role === 'user') {
    const filterData: FilterData = { user: req.user._id };
    req.filterData = filterData;
  }
  next();
};

export const getAllOrders = getAll<Orders>(ordersModel, 'orders')

export const getOrder = getOne<Orders>(ordersModel)


// create order
export const createOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  //Delivery Fees
  const deliveryFees: number = 100;

  //Get user cart
  const cart = await cartsModel.findOne({ user: req.user?._id });
  if (!cart) { 
    return next(new ApiErrors(`${req.__('cart_not_found')}`, 404)) 
};

  //Get order price
  const cartPrice: number = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
  const totalOrderPrice: number = cartPrice + deliveryFees;

  //Create order
  const order: Orders = await ordersModel.create({
    user: req.user?._id,
    totalPrice: totalOrderPrice,
    address: req.body.address,
    cartItems: cart.cartItems,
    deliveryFees
  })

  //Delete cart, update product quantity and sold
  if (order) {
    const bulkOption = cart.cartItems.map((item: CartProducts) => ({
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } }
      }
    }))
    await productsModel.bulkWrite(bulkOption);
    await cartsModel.findByIdAndDelete(cart._id);
  }
  res.status(201).json({ data: order })
});



export const isOrderPaid = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const order = await ordersModel.findByIdAndUpdate(req.params.id, {
    isPaid: true,
    paidAt: Date.now()
  }, { new: true })
  if (!order) { 
    return next(new ApiErrors(`${req.__('not_found')}`, 404)) 
};
  res.status(200).json({ data: order })
});

export const isOrderDelivered = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const order = await ordersModel.findByIdAndUpdate(req.params.id, {
    isDelivered: true,
    deliveredAt: Date.now()
  }, { new: true })

  if (!order) { 
    return next(new ApiErrors(`${req.__('not_found')}`, 404)) 
};
  res.status(200).json({ data: order })
});