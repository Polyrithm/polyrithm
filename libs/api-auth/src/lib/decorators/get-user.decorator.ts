import {createParamDecorator} from '@nestjs/common';
import { User } from '../entities';

export const GetUser = createParamDecorator((data, request): User => {
  return request.user;
})
