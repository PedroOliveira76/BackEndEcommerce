import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findUnique(@Param('id') id: string) {
        return this.usersService.findUnique(Number(id));
    }

    @Post()
    async createUsers(@Body() createUserDto:CreateUserDto){
        return this.usersService.createUser(createUserDto)
    }

    @Put(':id')
    async updateUsers(@Param('id') id:string, @Body() updateUserDto:UpdateUserDto){
        return this.usersService.updateUser(Number(id), updateUserDto)
    }

    @Delete(':id')
    async deleteUsers(@Param('id') id:string){
        return this.usersService.deleteUser(Number(id))
    }
}