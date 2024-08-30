import {Router} from "express";
import { forgetMyPassword, login, resetCodePasswordChange, signup, verifyResetCode } from './../services/authentication';
import { loginValidator, resetCodeValidator, sendMailValidator, signupValidator } from "../utiles/validation/authenticationValidator";
const authenticationRoute: Router = Router();

authenticationRoute.route('/signup')
    .post(signupValidator,signup);
// .get(getAllUsers)
authenticationRoute.route('/login')
    .post(loginValidator,login);

authenticationRoute.route('/forgetmypassword')
    .post(sendMailValidator,forgetMyPassword);

authenticationRoute.route('/verifyresetcode')
    .post(verifyResetCode);    

authenticationRoute.route('/resetcodepasswordchange')
    .post(resetCodeValidator,resetCodePasswordChange);    

// authenticationRoute.route('/:id')
// .get(getUserValidator,getUser)
// .put(uploadUserImageProfile,resizeUserImage,updateUserValidator,updateUser)
// .delete(deleteUserValidator,deleteUser)

export default authenticationRoute;