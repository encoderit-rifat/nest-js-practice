import { Controller, Get, Post, Body, Param, Put, Delete,BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
        // console.log('UserController import...' + User.name);
    }

    @Post('create')
    async create(@Body() user: Partial<User>): Promise<User> {
        try {
            return await this.userService.create(user);
        }
        catch (error) {
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map((err: any) => err.message);
                throw new BadRequestException(messages);
            }
            throw error;
        }
    }

    @Get()
    async list(): Promise<User[]> {
        return this.userService.list();
    }
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User | null> {
        return this.userService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: Partial<User>): Promise<User | null> {
        return this.userService.update(id, user);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User | null> {
        return this.userService.remove(id);
    }
}