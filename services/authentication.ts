import usersModel from "../Models/usersModel";
import  asyncHandler  from 'express-async-handler';
import Jwt from 'jsonwebtoken';
import { Request,Response,NextFunction } from "express";
import { Users } from "../interfaces/users";
import { createToken } from "../utiles/tokenCreation";
import ApiErrors from "../utiles/APIErrors";
import  bcrypt  from 'bcryptjs';

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
    console.log("before decoded");
    const decodedToken: any = Jwt.verify(token, process.env.JWT_PRIVATE_KEY!);
    console.log(decodedToken);
    // 3- check if user exist
    const currentUser = await usersModel.findById(decodedToken._id);
    if (!currentUser) { return next(new ApiErrors("This User doesn't exist", 401)) }
    // 4- check if password updated
    if (currentUser.passwordUpdatedAt instanceof Date) {
      const updatedPasswordTime: number = (currentUser.passwordUpdatedAt.getTime() / 1000);

      if (updatedPasswordTime > decodedToken.iat) { 
        return next(new ApiErrors('Please try to login again', 401)) }
    }
    req.user = currentUser;
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
    next();
  });