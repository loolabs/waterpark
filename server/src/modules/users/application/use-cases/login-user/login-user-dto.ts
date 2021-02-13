import Joi from 'joi'

export interface LoginUserDTO {
  email: string
  password: string
}

export const loginUserDTOSchema = Joi.object<LoginUserDTO>({
  email: Joi.string(),
  password: Joi.string(),
}).options({ abortEarly: false })
