import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) {}

    async create(user: Partial<User>): Promise<User> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }
    async list(): Promise<User[]> {
        return this.userModel.find().exec();
    }
    async findOne(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }
    async update(id: string, user: Partial<User>): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
    }
    async remove(id: string): Promise<User | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
    
}