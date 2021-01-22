import Joi from 'joi'

export interface CreateUserDTO {
  email: string
  password: string
}

export const createUserDTOSchema = Joi.object({
  email: Joi.string(),
  password: Joi.string(),
}).options({ abortEarly: false })
