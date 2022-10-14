import { BadRequestException, Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserInterface, schemaName } from './schemas/user.entity';
import { LoginUserDto } from './dtos/login-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { role } from './role.enum';
import { Response, Request, response } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";




@Injectable()
export class UserService {
    JwtService: any;
    constructor(@InjectModel(schemaName) private userModel: Model<UserInterface>) { }


    async create(createUserDto: CreateUserDto): Promise<any> {

        // Verifions si le username existe deja
        const existingUser = await this.userModel.findOne({ username: createUserDto.username }).exec();
        console.log(existingUser)
        if (existingUser) {
            throw new BadRequestException(' le username' + '  ' + existingUser.username + '  déja occupé')
        }

        // encrypt le password
        const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
        //set password encrypted
        createUserDto.password = hashedPassword;
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }


    async findAll(): Promise<any> {
        return await this.userModel.find().exec();
    }


    async findById(id): Promise<UserInterface> {
        const customer = await this.userModel.findById(id).exec();
        return customer;
    }

    async find(req): Promise<any> {
        return await this.userModel.find(req).exec();
    }
    async update(id, updateUserDto: UpdateUserDto): Promise<any> {
        return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    }
    async delete(id): Promise<any> {
        return await this.userModel.findByIdAndRemove(id);
    }


}