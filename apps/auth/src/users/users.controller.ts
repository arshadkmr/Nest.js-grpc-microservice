import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserServiceController, CreateUserDto, UpdateUserDto, UserServiceControllerMethods, FindOneUserDto, PaginationDto, User } from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) { }

  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  findAllUSers() {
    return this.usersService.findAll();
  }

  findOneUSer(findOneUserDto: FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  removeUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>) {
      return this.usersService.queryUsers(paginationDtoStream)
  }
}
