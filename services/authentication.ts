import usersModel from "../Models/usersModel";
import  asyncHandler  from 'express-async-handler';
import Jwt from 'jsonwebtoken';
import { Request,Response,NextFunction } from "express";
import { Users } from "../interfaces/users";
import { createResetToken, createToken } from "../utiles/tokenCreation";
import ApiErrors from "../utiles/APIErrors";
import  bcrypt  from 'bcryptjs';
import crypto from 'crypto';
import sendEmail from "../utiles/sendEmail";

export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user: Users = await usersModel.create(req.body);
    const token = createToken(user._id);
    res.status(201).json({ token, data: user })
  });

  export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await usersModel.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return next(new ApiErrors('Invalid Email or Password', 401));
    }
    const token = createToken(user._id);
    res.status(200).json({ token, message: 'Logged in has been successfully' });
  });  

  export const protectRoutes = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // 1- check if token found
    let token: string = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else { return next(new ApiErrors('You Have To Login first to access the application', 401)) }
    // 2- check if token not expired
    // console.log("before decoded");
    const decodedToken: any = Jwt.verify(token, process.env.JWT_PRIVATE_KEY!);
    // console.log(decodedToken);
    // 3- check if user exist
    const currentUser = await usersModel.findById(decodedToken._id);
    if (!currentUser) { return next(new ApiErrors("This User doesn't exist", 401)) }
    // 4- check if password updated
    if (currentUser.passwordUpdatedAt instanceof Date) {
      const updatedPasswordTime: number = parseInt((currentUser.passwordUpdatedAt.getTime() / 1000).toString());

      if (updatedPasswordTime > decodedToken.iat) { 
        return next(new ApiErrors('Please try to login again', 401)) }
    }
    req.user = currentUser;
    // console.log('after protect routes');
    next();
  });

  export const allowedTo = (...roles: string[]) => asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!(roles.includes(req.user?.role ?? ''))) {
      return next(new ApiErrors("This User can't access this!", 403))
    }
    next();
  });
  
  export const isActive = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.active) {
      return next(new ApiErrors('Your account is not active', 403))
    }
    // console.log('after is active');
    next();
  });

  export const forgetMyPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await usersModel.findOne({email:req.body.email})
    if(!user){
      return next(new ApiErrors('Email not found',404));
    }
    const resetCode:string =Math.floor(100000+Math.random()*900000).toString();
    user.resetCode = crypto.createHash('sha256').update(resetCode).digest('hex'); 
    user.resetCodeExpireTime= Date.now()+(10*60*1000);
    user.resetCodeVerify= false;
    try {
        await sendEmail({email: user.email , subject:'Reset Password Code',message:`Your reset password\'s code is ${resetCode}`});
        await user.save({ validateModifiedOnly: true });
    }
    catch(err){
      console.log(err);
      return next(new ApiErrors('Error while sending the Email',400));
    }
    const resetToken:string = createResetToken(user._id)
    res.status(200).json({message: 'Your reset password\'s code has been sent to your Email',resetToken})
  });

  export const verifyResetCode = asyncHandler (async (req: Request, res: Response, next: NextFunction) => {
    let resetToken: string = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      resetToken = req.headers.authorization.split(' ')[1];
    } else { 
      return next(new ApiErrors('You should have Reset Code first', 404)) 
    }
    const decodedToken: any = Jwt.verify(resetToken, process.env.JWT_PRIVATE_KEY!);
    const hasahedResetCode: string = crypto.createHash('sha256').update(req.body.resetCode).digest('hex');
    const user = await usersModel.findOne({
      _id:decodedToken._id,
      resetCode: hasahedResetCode,
      resetCodeExpireTime:{$gt: Date.now()}})
    if(!user){
      return next(new ApiErrors('Invalid or Expired Reset Code',400))
    };
    user.resetCodeVerify=true;  
    await user.save({validateModifiedOnly:true});
    res.status(200).json({message: 'Reset Code has been verified successfully'});
  });

  export const resetCodePasswordChange = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let resetToken: string = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      resetToken = req.headers.authorization.split(' ')[1];
    } else { 
      return next(new ApiErrors("You can't do this action", 400)) 
    }
    const decodedToken: any = Jwt.verify(resetToken, process.env.JWT_PRIVATE_KEY!);

    const user = await usersModel.findOne({_id: decodedToken._id,resetCodeVerify: true})
    
    if (!user) { 
      return next(new ApiErrors('You should Verify your Reset Code first', 400)) 
    };
    user.password = req.body.password;
    user.resetCode = undefined;
    user.resetCodeExpireTime = undefined;
    user.resetCodeVerify = undefined;
    user.passwordUpdatedAt = Date.now();
    await user.save({ validateModifiedOnly: true });
    res.status(200).json({message:'Your password has been changed successfully'});
  });