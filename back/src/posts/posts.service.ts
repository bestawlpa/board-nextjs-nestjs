import { Injectable,NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>,) {}
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const result = new this.postModel(createPostDto)
    return result.save();
  }

  async findAll(): Promise<Post[]>{
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id).exec();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const result = this.postModel.findByIdAndUpdate(
      id,updatePostDto, {new: true}
    ).exec();
    return result;
  }

  async remove(id: string) {
    try {
      const result = await this.postModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new Error('id not found');
      }
      return { message: 'Delete Successful'}
    } catch (error) {
      throw error
    }
  }
}
