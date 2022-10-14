import { Controller, Res, Query, Get, HttpStatus, Post, Body, Param, NotFoundException, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PlatService } from './plat.service';
import { ApiQuery } from '@nestjs/swagger';
import { CreatePlatDto } from './dtos/create-plat.dto';
import { FileInterceptor } from '@nestjs/platform-express';




@Controller('plat')
export class PlatController {
    constructor(private readonly platService: PlatService) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async create(@Res() res, nom, description, prix, @UploadedFile() file: Express.Multer.File) {
        const fileToBase64 = file.buffer.toString('base64');
        const image = fileToBase64;
        const datas = await this.platService.create(nom, description, prix, image);
        return res.status(HttpStatus.OK).json({
            message: "Operation effectuée avec success",
            hasError: false,
            datas
        })
    }


    @Get('all')
    async findAll(@Res() res) {
        const datas = await this.platService.findAll();
        return res.status(HttpStatus.OK).json({ count: datas.length, datas });
    }
    @Get(':id')
    async findById(@Res() res, @Param('id') id: string) {
        const datas = await this.platService.findById(id);
        if (!datas) throw new NotFoundException('Id does not exist!');
        return res.status(HttpStatus.OK).json(datas);
    }

    @Put('update/:id')
    @UseInterceptors(FileInterceptor('file'))
    async update(@Res() res, @Param('id') id: string, nom: string, description: string, prix: number, @UploadedFile() file: Express.Multer.File) {
        //Conversion de l'image en base64
        const image = file.buffer.toString('base64');
        const createPlatDto = new CreatePlatDto;
        createPlatDto.nom = nom, createPlatDto.description = description, createPlatDto.prix = prix, createPlatDto.image = image;
        const datas = await this.platService.update(id, createPlatDto);
        if (!datas) throw new NotFoundException('Id does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Operation effectuée avec success',
            hasError: false,
            datas
        });
    }

    @Delete('delete/:id')
    async delete(@Res() res, @Param('id') id: string) {
        const datas = await this.platService.delete(id);
        if (!datas) throw new NotFoundException('Post does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Operation effectuée avec success',
            hasError: false,
            datas
        })
    }
}