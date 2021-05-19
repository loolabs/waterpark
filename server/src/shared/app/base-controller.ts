import express from 'express'
export abstract class BaseController {
  public abstract execute<Res extends express.Response>(
    req: express.Request,
    res: Res
  ): Promise<Res>

  public ok<Res extends express.Response, T>(res: Res, dto?: T): Res {
    if (dto) {
      res.type('application/json')
      return res.status(200).json(dto)
    } else {
      return res.sendStatus(200)
    }
  }

  public fail<Res extends express.Response>(res: Res, error: Error | string): Res {
    console.log(error)
    return res.status(500).json({
      message: error.toString(),
    })
  }

  public static jsonResponse<Res extends express.Response>(
    res: Res,
    code: number,
    message: string
  ): Res {
    return res.status(code).json({ message })
  }

  public created<Res extends express.Response>(res: Res): Res {
    return res.sendStatus(201)
  }

  public clientError<Res extends express.Response>(
    res: Res,
    message: string = 'Unauthorized'
  ): Res {
    return BaseController.jsonResponse(res, 400, message)
  }

  public unauthorized<Res extends express.Response>(
    res: Res,
    message: string = 'Unauthorized'
  ): Res {
    return BaseController.jsonResponse(res, 401, message)
  }

  public paymentRequired<Res extends express.Response>(
    res: Res,
    message: string = 'Payment required'
  ): Res {
    return BaseController.jsonResponse(res, 402, message)
  }

  public forbidden<Res extends express.Response>(res: Res, message: string = 'Forbidden'): Res {
    return BaseController.jsonResponse(res, 403, message)
  }

  public notFound<Res extends express.Response>(res: Res, message: string = 'Not found'): Res {
    return BaseController.jsonResponse(res, 404, message)
  }

  public conflict<Res extends express.Response>(res: Res, message: string = 'Conflict'): Res {
    return BaseController.jsonResponse(res, 409, message)
  }

  public tooMany<Res extends express.Response>(
    res: Res,
    message: string = 'Too many requests'
  ): Res {
    return BaseController.jsonResponse(res, 429, message)
  }

  public todo<Res extends express.Response>(res: Res, message: string = 'TODO'): Res {
    return BaseController.jsonResponse(res, 400, message)
  }
}
