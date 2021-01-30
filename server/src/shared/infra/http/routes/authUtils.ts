import { Request, Response } from "express";
import passport from "passport";
import "../../../../auth";
import { BaseController } from "../../../app/base-controller";

const authenticate = (req: Request, res: Response, controllerFunc: BaseController) => {
    passport.authenticate("jwt", function (err, user) {
      if (err) {
        console.log(err);
        return res.status(401).json({ status: "error", code: "unauthorized" });
      }
      if (!user) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      } else {
        return controllerFunc.execute(req, res);
      }
    })(req, res, controllerFunc);
}

export { authenticate }