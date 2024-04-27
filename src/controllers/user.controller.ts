import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import { UpdateUserDto } from "../dto/user.dto";
class UserController {
  public async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const currentUser = req.currentUser;
      const user = await userService.getUserByEmail(currentUser.email);
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
      const deletedUser = await userService.deleteUser(currentUser.id);
      res
        .status(200)
        .json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
