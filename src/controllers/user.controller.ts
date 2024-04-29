import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import { UpdateUserDto } from "../dto/user.dto";
import languageService from "../services/language.service";
import sessionService from "../services/session.service";
class UserController {
  public async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const currentUser = req.currentUser;
      const user = await userService.getUserById(currentUser.id);
      res.status(200).json({ message: "User data successfully fetched", user });
    } catch (error) {
      next(error);
    }
  }

  public async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const currentUser = req.currentUser;

      const updateUserDto: UpdateUserDto = req.body;
      const updatedUser = await userService.updateUser(
        currentUser.id,
        updateUserDto
      );

      res
        .status(200)
        .json({ message: "User updated successfully", updatedUser });
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
     
      const currentUser = req.currentUser;
      const { refreshToken } = req.cookies;
      await languageService.deleteAllLanguages(currentUser.id);
      const deletedSession = await sessionService.deleteSession(refreshToken);
      const deletedUser = await userService.deleteUser(currentUser.id);
      res.clearCookie("refreshToken");
      res
        .status(200)
        .json({
          message: "User deleted successfully",
          deletedUser,
          deletedSession,
        });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
