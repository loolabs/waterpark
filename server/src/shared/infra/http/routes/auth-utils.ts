import { Request, Response } from "express";
import passport from "passport";
import "../../../../setup/http/express/auth";
import { GetUserUseCaseResponse } from "../../../../modules/users/application/use-cases/get-user/get-user-use-case";
import { BaseController } from "../../../app/base-controller";

const authenticate = (req: Request, res: Response, controllerFunc: BaseController) => {
    passport.authenticate("jwt", function (_err, result: GetUserUseCaseResponse) {
      if (!result) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      }
      if (result.isErr()) {
        return res.status(401).json({ status: "error", code: result.error });
      } else {
        return controllerFunc.execute(req, res);
      }
    })(req, res, controllerFunc);
}

export { authenticate }
