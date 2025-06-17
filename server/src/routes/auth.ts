import { Router, Request, Response } from "express";
import { validateSigninInputMiddleware } from "src/middlewares/signin";
import { validateSignupInputMiddleware } from "src/middlewares/signup";
import { signinService, signupService } from "src/services/auth";

const authRouter = Router();


authRouter.post('/signup', validateSignupInputMiddleware, async(req: Request, res: Response) => {
  try {
    const user = req.body;
    await signupService(user);
    res.status(201).json({message: 'Signup successful'});
  } catch (error: any) {
    if (error.message === 'Email Already Exists') {
      res.status(409).json({message: error.message});
    } else {
      res.status(400).json({message: "Bad request"});
    }
  }
})

authRouter.post("/signin", validateSigninInputMiddleware, async(req: Request, res: Response) => {
  try {
    const user = req.body;
    const token = await signinService(user);
    res.status(200).json({ token: token });
  } catch (error: any) {
    if (error.message === 'Invalid Credentials') {
      res.status(401).json({message: error.message});
    } else if (error.message === 'User Not Found') {
      res.status(404).json({message: error.message});
    } else {
      res.status(400).json({message: "Bad request"});
    }
  }
})



export default authRouter;
