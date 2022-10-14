import { Controller, Res, Query, Get, HttpStatus, Post, Body, Param, NotFoundException, Put, Delete, UploadedFile, UseInterceptors, BadRequestException, UnauthorizedException, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiQuery } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { schemaName, User, UserInterface } from './schemas/user.entity';
import { LoginUserDto } from './dtos/login-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from 'express';

import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
        @InjectModel(schemaName) private userModel: Model<UserInterface>

    ) { }

    @Post('register')
    async registerUser(@Res() res, @Body() createUserDto: CreateUserDto) {
        const item = await this.userService.create(createUserDto);
        return res.status(HttpStatus.OK).json({
            message: "Operation effectuée avec success",
            hasError: false,
            item
        })
    }

    @Post('login')
    async login(@Body('username') username: string, @Body('password') password: string, @Res({ passthrough: true }) response: Response
    ) {
        console.log("******************BEGIN METHOD LOGIN*****************")
        const user = await this.userModel.findOne({ username: username });
        console.log(user)
        if (!user) {
            throw new BadRequestException('invalid credentials username' + username);
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({ id: user.id });

        response.cookie('jwt', jwt, { httpOnly: true });


        return {
            message: 'success'
        };
    }


    @Get('currentUser')
    async user(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.userModel.findOne({ id: data['id'] });
            return user;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'success'
        }
    }




    @Get('all')
    async findAll(@Res() res) {
        const items = await this.userService.findAll();
        return res.status(HttpStatus.OK).json({ count: items.length, items });
    }

    @Get('restaurants')
    async findAllRestaurants(@Res() res,) {
        const prest = "prestataire"
        const items = await this.userService.find({ role: prest });
        return res.status(HttpStatus.OK).json({ count: items.length, items });
    }

    @Get(':id')
    async findById(@Res() res, @Param('id') id: string) {
        const items = await this.userService.findById(id);
        if (!items) throw new NotFoundException('Id does not exist!');
        return res.status(HttpStatus.OK).json(items);
    }
    @Get('role/:typeUser')
    async findByRole(@Res() res, @Param('typeUser') typeUser: string) {
        const items = await this.userService.find({ role: typeUser });
        console.log(items)
        if (!items) throw new NotFoundException('Id does not exist!');
        return res.status(HttpStatus.OK).json(items);
    }

    @Put('update/:id')
    async update(@Res() res, @Param('id') id: string, @Body() createUserDto: CreateUserDto) {
        const items = await this.userService.update(id, createUserDto);
        if (!items) throw new NotFoundException('Id does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Operation effectuée avec success',
            hasError: false,
            items
        });
    }

    @Delete('delete/:id')
    async delete(@Res() res, @Param('id') id: string) {
        const items = await this.userService.delete(id);
        if (!items) throw new NotFoundException('Post does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Operation effectuée avec success',
            hasError: false,
            items
        })
    }

    @Post('uploadProfile/:id')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Res() res, @UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
        console.log(file);
        const fileToBase64 = file.buffer.toString('base64');
        const user = await this.userService.findById(id);
        const createUserDto = new CreateUserDto;
        createUserDto.imagePath = fileToBase64;
        const items = await this.userService.update(id, createUserDto);
        if (!items) throw new NotFoundException('Id does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Operation effectuée avec success',
            hasError: false,
            items
        });

    }

}
