import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CheckPolicies } from '../casl/policy.decorator';
import { PoliciesGuard } from '../casl/policies.guard';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
        // console.log('UserController import...' + User.name);
    }

    @Post('create')
    async create(@Body() user: Partial<User>): Promise<User> {
        return this.userService.create(user);
    }

    @Get()
    @UseGuards(PoliciesGuard)
    @CheckPolicies((ability) => ability.can('read', 'User'))
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