import { Injectable, NotFoundException,ConflictException  } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument} from './schemas/user.schema'




@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });

    if (existingUser) {
        throw new ConflictException('username or email already exists.');
    }

    const result = new this.userModel(createUserDto);
    return result.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const result = this.userModel
      .findByIdAndUpdate(id, updateUserDto,{new: true})
      .exec();
    return result;
  }

  async remove(id: string) {
    try {
      const result = await this.userModel.findByIdAndDelete(id).exec()
      if(!result){
        throw new NotFoundException('id not found');
      } 
      return {message: 'Delete successful'}
    } catch (error) {
      throw error;
    }
  }
}
