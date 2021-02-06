import * as express from 'express'

export abstract class BaseController {
  public abstract execute(req: express.Request, res: express.Response): Promise<express.Response>

  public ok<T>(res: express.Response, dto?: T): express.Response {
    if (dto) {
      res.type('application/json')
      const temp = res.status(200).json(dto)
      return temp
    } else {
      return res.sendStatus(200)
    }
  }

  public fail(res: express.Response, error: Error | string): express.Response {
    console.log(error)
    return res.status(500).json({
      message: error.toString(),
    })
  }

  public static jsonResponse(res: express.Response, code: number, message: string) {
    return res.status(code).json({ message })
  }

  public created(res: express.Response) {
    return res.sendStatus(201)
  }

  public clientError(res: express.Response, message: string = 'Unauthorized') {
    return BaseController.jsonResponse(res, 400, message)
  }

  public unauthorized(res: express.Response, message: string = 'Unauthorized') {
    return BaseController.jsonResponse(res, 401, message)
  }

  public paymentRequired(res: express.Response, message: string = 'Payment required') {
    return BaseController.jsonResponse(res, 402, message)
  }

  public forbidden(res: express.Response, message: string = 'Forbidden') {
    return BaseController.jsonResponse(res, 403, message)
  }

  public notFound(res: express.Response, message: string = 'Not found') {
    return BaseController.jsonResponse(res, 404, message)
  }

  public conflict(res: express.Response, message: string = 'Conflict') {
    return BaseController.jsonResponse(res, 409, message)
  }

  public tooMany(res: express.Response, message: string = 'Too many requests') {
    return BaseController.jsonResponse(res, 429, message)
  }

  public todo(res: express.Response, message: string = 'TODO') {
    return BaseController.jsonResponse(res, 400, message)
  }
}
