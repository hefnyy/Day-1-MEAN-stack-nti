import {Router} from "express";
import { allowedTo, isActive, protectRoutes } from "../services/authentication";
import { createReview, deleteReview, filterReviews, getAllReviews, getReview, setProductAndUserId } from "../services/reviews";
import { updateReview } from './../services/reviews';
import { createReviewValidator, deleteReviewValidator, getReviewValidator, updateReviewValidator } from "../utiles/validation/reviewsValidator";

const reviewsRoute: Router = Router({ mergeParams: true });

reviewsRoute.route('/')
.get(filterReviews,getAllReviews)
.post(protectRoutes,isActive,allowedTo('user'),setProductAndUserId,createReviewValidator,createReview);

reviewsRoute.route('/myreviews').get(protectRoutes, isActive, allowedTo('user'), filterReviews, getAllReviews);

reviewsRoute.route('/:id')
.get(getReviewValidator,getReview)
.put(protectRoutes,isActive,allowedTo('user'),updateReviewValidator,updateReview)
.delete(protectRoutes,isActive,allowedTo('admin','manager','user'),deleteReviewValidator,deleteReview)

export default reviewsRoute;