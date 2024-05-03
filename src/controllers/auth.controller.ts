import { NextFunction, Request, Response } from "express";
import { SignupDto, SigninDto } from "../dto/auth.dto";
import userService from "../services/user.service";
import mailService from "../services/mail.service";
import sessionService from "../services/session.service";
import { SessionDto, TokenPayloadDto } from "../dto/session.dto";

class AuthController {
  public async signup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const signupDto: SignupDto = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };
      const newUser = await userService.createUser(signupDto);

      const sendedMailStatus = await mailService.sendActivationMail(
        newUser.email,
        newUser.activationLink
      );

      const tokenPayloadDto: TokenPayloadDto = {
        id: newUser.id,
        username: newUser.username,
      };
      const tokens = sessionService.generateTokens(tokenPayloadDto);

      const sessionDto: SessionDto = {
        userId: newUser.id,
        token: tokens.refreshToken,        
      };
      const session = await sessionService.saveSession(sessionDto);

      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(201).json({
        message: "Signup completed successfully",
        data: { newUser, sendedMailStatus, tokens, session },
      });
    } catch (error) {
      next(error);
    }
  }

  public async signin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {

      const signinDto: SigninDto = {
        email: req.body.email,
        password: req.body.password,
      };
      const user = await userService.getUserByEmail(signinDto.email);

      const comparePasswordsResult = await userService.comparePasswords(
        signinDto.password,
        user.password
      );

      const tokenPayloadDto: TokenPayloadDto = {
        id: user.id,
        username: user.username,
      };
      const tokens = sessionService.generateTokens(tokenPayloadDto);

      const sessionDto: SessionDto = {
        userId: user.id,
        token: tokens.refreshToken,       
      };
      const session = await sessionService.saveSession(sessionDto);

      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(201).json({
        message: "Signin completed successfully",
        data: { user, comparePasswordsResult, tokens, session },
      });
    } catch (error) {
      next(error);
    }
  }

  public async signout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { refreshToken } = req.cookies;
      const deletedSession = await sessionService.deleteSession(refreshToken);
      res.clearCookie("refreshToken");
      res
        .status(201)
        .json({ message: "signout completed successfully", deletedSession });
    } catch (error) {
      next(error);
    }
  }

  public async activateAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { activationLink } = req.params;
      const activationResult = await userService.activateAccount(
        activationLink
      );
      res.status(201).json(activationResult);
    } catch (error) {
      next(error);
    }
  }

  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { refreshToken } = req.cookies;

      const validationRefreshTokenResult =
        sessionService.validateRefreshToken(refreshToken);

      const findedSession = await sessionService.findSessionByToken(
        refreshToken
      );
      const findedUser = await userService.getUserById(findedSession.userId);

      const tokenPayloadDto: TokenPayloadDto = {
        id: findedUser.id,
        username: findedUser.username,
      };
      const tokens = sessionService.generateTokens(tokenPayloadDto);

      const sessionDto: SessionDto = {
        userId: findedUser.id,
        token: tokens.refreshToken,       
      };
      const savedSession = await sessionService.saveSession(sessionDto);

      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(201).json({
        message: "tokens updated successfully, new session created/updated",
        validationRefreshTokenResult,
        findedSession,
        findedUser,
        savedSession,
        tokens,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
