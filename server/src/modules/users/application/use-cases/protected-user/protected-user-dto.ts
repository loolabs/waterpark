import Joi from 'joi'

export interface ProtectedUserDTO {
  val: string
}

export const protectedUserDTOSchema = Joi.object<ProtectedUserDTO>({
  val: Joi.string().required()
}).options({ abortEarly: false })
