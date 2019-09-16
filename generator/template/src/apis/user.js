import { Get, Post } from './index'

export const Login = Post('/api/xaos/v1/auth/user/login')
export const Register = Post('/api/xaos/v1/auth/user')
export const Logout = Get('/api/xaos/v1/auth/user/logout')
