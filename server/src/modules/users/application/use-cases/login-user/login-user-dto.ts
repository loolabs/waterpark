import Joi from 'joi'
import express from 'express'

export interface LoginUserDTO {
  req: express.Request,
  res: express.Response
}

export const loginUserDTOSchema = Joi.object<LoginUserDTO>({
  req: Joi.object().required(),
  res: Joi.object().required()
}).options({ abortEarly: false })
