import {Request,Response,NextFunction} from "express";
import { FilterData } from "../interfaces/filterData";
import { createOne, getAll, getOne, removeOne, updateOne } from "./refactorsHandler";
import reviewsModel from "../Models/reviewsModel";
import { Reviews } from "../interfaces/reviews";



export const filterReviews = (req: Request, res: Response, next: NextFunction) => {
    let filterData: FilterData = {};
    if (req.params.productId) { filterData.product = req.params.productId };
    req.filterData = filterData;
    next();
  }

export const createReview = createOne<Reviews>(reviewsModel);

export const getAllReviews = getAll<Reviews>(reviewsModel,'reviews');

export const getReview = getOne<Reviews>(reviewsModel);

export const updateReview = updateOne<Reviews>(reviewsModel);

export const deleteReview = removeOne<Reviews>(reviewsModel);

export const setProductAndUserId = (req:Request, res: Response, next:NextFunction) => {
  if(!req.body.product){
    req.body.product = req.params.productId
  };
  if(!req.body.user){
    req.body.user = req.user?._id
  };
  next();
};

