import {Router} from "express";
import {changeUserPassword, createUser, deleteUser, getAllUsers, getLoggedInUserData, getUser, loggedInUserChangePassword, resizeUserImage, updateLoggedInUserData, updateUser, uploadUserImageProfile} from "../services/users"
import { changeLoggedInUserPasswordValidator, changeUserPasswordValidator, createUserValidator, deleteUserValidator, getUserValidator, updateLoggedInUserValidator, updateUserValidator } from "../utiles/validation/usersValidator";
import { allowedTo, isActive, protectRoutes } from "../services/authentication";
const usersRoute: Router = Router();


usersRoute.use(protectRoutes,isActive)
usersRoute.get('/me',getLoggedInUserData,getUser);
usersRoute.put('/changemydata',updateLoggedInUserValidator,updateLoggedInUserData);
usersRoute.put('/changemypassword',changeLoggedInUserPasswordValidator,loggedInUserChangePassword);
usersRoute.delete('/deleteme',allowedTo('user'),getLoggedInUserData,deleteUser);

usersRoute.use(allowedTo('manager'));
usersRoute.route('/')
.get(getAllUsers)
.post(uploadUserImageProfile,resizeUserImage,createUserValidator,createUser);

usersRoute.route('/:id')
.get(getUserValidator,getUser)
.put(uploadUserImageProfile,resizeUserImage,updateUserValidator,updateUser)
.delete(deleteUserValidator,deleteUser)

usersRoute.put('/:id/updatePassword',changeUserPasswordValidator,changeUserPassword)

export default usersRoute;