import {Request,Response,NextFunction} from "express";
import subcategoryModel from "../Models/subcategoryModel";
import { createOne, getAll, removeOne, updateOne } from "./refactorsHandler";
import { Address } from "../interfaces/addresses";
import addressesModel from "../Models/addressesModel";
import  asyncHandler  from 'express-async-handler';
import usersModel from "../Models/usersModel";
import ApiErrors from "../utiles/APIErrors";
import { Users } from "../interfaces/users";

export const deleteAddress = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const user: Users | null = await usersModel.findByIdAndUpdate(req.user?._id, {
        $pull: { addresses: req.params.addressId }
    }, { new: true, runValidators: true});

    if (!user) 
        return next(new ApiErrors('User not found', 404));
    
    res.status(200).json();
});
// export const addAddress = createOne<Address>(subcategoryModel);

// export const getAllAddresses = getAll<Address>(addressesModel,'address');

// export const updateAddress = updateOne<Address>(addressesModel);

// export const deleteAddress = removeOne<Address>(addressesModel);

export const addAddressToLoggedInUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const address = await addressesModel.create(req.body);

    if (!address) 
        return next(new ApiErrors('Error while creating the address', 400));
    console.log("after address");
    // const user = await usersModel.findOne({user: req.user?.id})
    const user = await usersModel.findOneAndUpdate(
        {user:req.user?._id},
        { $addToSet: { address:  address._id} },
        { new: true, runValidators: true }
    )
        console.log(user);
    if (!user) 
        return next(new ApiErrors('User not found', 404));
    
    await user.save();
    res.status(200).json({ data: user?.address });
});
