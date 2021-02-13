import Joi from 'joi'

export interface CreateUserDTO {
  email: string
  password: string
}

export const createUserDTOSchema = Joi.object<CreateUserDTO>({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).options({ abortEarly: false })
