/* eslint-disable */
import {GrpcMethod, GrpcStreamMethod} from "@nestjs/microservices"
import {util, configure} from "protobufjs/minimal"
import Long from "long"
import {Observable} from "rxjs"

export const protobufPackage = "auth"

export interface CreateUserDto {
  username: string
  password: string
  age: number
}

export interface PaginationDto {
  page: number
  skip: number
}

export interface UpdateUserDto {
  id: string
  socialMedia: SocialMedia | undefined
}

export interface FindOneUserDto {
  id: string
}

export interface Empty {}

export interface Users {
  users: User[]
}

export interface User {
  id: string
  username: string
  password: string
  age: number
  subscribed: boolean
  socialMedia: SocialMedia | undefined
}

export interface SocialMedia {
  twitterUri?: string | undefined
  facebookUri?: string | undefined
}

export const AUTH_PACKAGE_NAME = "auth"

export interface UserServiceClient {
  createUser(request: CreateUserDto): Observable<User>

  findAllUSers(request: Empty): Observable<Users>

  findOneUSer(request: FindOneUserDto): Observable<User>

  updateUser(request: UpdateUserDto): Observable<User>

  removeUser(request: FindOneUserDto): Observable<User>

  queryUsers(request: Observable<PaginationDto>): Observable<Users>
}

export interface UserServiceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User

  findAllUSers(request: Empty): Promise<Users> | Observable<Users> | Users

  findOneUSer(request: FindOneUserDto): Promise<User> | Observable<User> | User

  updateUser(request: UpdateUserDto): Promise<User> | Observable<User> | User

  removeUser(request: FindOneUserDto): Promise<User> | Observable<User> | User

  queryUsers(request: Observable<PaginationDto>): Observable<Users>
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createUser",
      "findAllUSers",
      "findOneUSer",
      "updateUser",
      "removeUser"
    ]
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      )
      GrpcMethod("UserService", method)(
        constructor.prototype[method],
        method,
        descriptor
      )
    }
    const grpcStreamMethods: string[] = ["queryUsers"]
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      )
      GrpcStreamMethod("UserService", method)(
        constructor.prototype[method],
        method,
        descriptor
      )
    }
  }
}

export const USER_SERVICE_NAME = "UserService"

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
