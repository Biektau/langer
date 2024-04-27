import { PrismaClient, User } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import bcrypt from "bcryptjs";
import { DatabaseException } from "../exceptions/database.exception";
import {
  validateCreateUserData,
  validateUpdateUserData,
} from "../validations/user.validation";
import { ValidationException } from "../exceptions/validation.exception";
import randomString from "randomstring";

const prisma = new PrismaClient();

class UserService {
  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const validationResult = validateCreateUserData(createUserDto);

    if (!validationResult.success) {
      throw ValidationException.UserValidationError(
        "Invalid validation",
        validationResult.errors || []
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw DatabaseException.BadRequest("User with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const activationLink = randomString.generate({
      length: 20,
      charset: "alphanumeric",
    });
    const newUser = await prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
        activationLink,
      },
    });
    if (!newUser) {
      throw DatabaseException.BadRequest("Could not create user");
    }
    return newUser;
  }

  public async updateUser(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<User> {
    const validationResult = validateUpdateUserData(updateUserDto);

    if (!validationResult.success) {
      throw ValidationException.UserValidationError(
        "Invalid validation",
        validationResult.errors || []
      );
    }
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw DatabaseException.BadRequest("Could not find user");
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username: updateUserDto.username || existingUser.username,
        email: updateUserDto.email || existingUser.email,
        password: updateUserDto.password || existingUser.password,
      },
    });
    if (!updatedUser) {
      throw DatabaseException.BadRequest("Could not update user");
    }
    return updatedUser;
  }

  public async deleteUser(id: number): Promise<User> {
    const deletedUser = await prisma.user.delete({ where: { id } });
    if (!deletedUser) {
      throw DatabaseException.BadRequest("Could not find user");
    }
    return deletedUser;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw DatabaseException.BadRequest("User with this email does not exist");
    }
    return user;
  }

  public async getUserById(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw DatabaseException.BadRequest("Could not find user by id");
    }
    return user;
  }

  public async comparePasswords(inputPassword: string, realPassword: string) {
    const match = await bcrypt.compare(inputPassword, realPassword);
    if (!match) {
      throw DatabaseException.BadRequest("Incorrect password");
    }
    return { message: "Passwords successfully matched" };
  }

  public async activateAccount(activationLink: string) {
    const userData = await prisma.user.findFirst({
      where: { activationLink: activationLink },
    });

    if (!userData) {
      throw DatabaseException.BadRequest(
        "Could not find user by activation link"
      );
    }

    const updateUser = await prisma.user.update({
      where: { id: userData.id },
      data: { isActivated: true },
    });

    if (!updateUser) {
      throw DatabaseException.BadRequest(
        "Could not activate user by activation link"
      );
    }

    return { message: "Activated" };
  }
}

export default new UserService();
