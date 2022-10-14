import { Controller, Res, Query, Get, HttpStatus, Post, Body, Param, NotFoundException, Put, Delete } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { MenuService } from './menu.service';



@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    @Post('create')
    async addCustomer(@Res() res, @Body() createPlatDto: CreateMenuDto) {

        const datas = await this.menuService.create(createPlatDto);
        return res.status(HttpStatus.OK).json({
            message: "Operation effectuée avec success",
            hasError: false,
            datas
        })
    }

    @Get('all')
    async findAll(@Res() res) {
        const datas = await this.menuService.findAll();
        return res.status(HttpStatus.OK).json({ count: datas.length, datas });
    }
    @Get(':id')
    async findById(@Res() res, @Param('id') id: string) {
        const datas = await this.menuService.findById(id);
        if (!datas) throw new NotFoundException('Id does not exist!');
        return res.status(HttpStatus.OK).json(datas);
    }

    @Put('update/:id')
    async update(@Res() res, @Param('id') id: string, @Body() createPlatDto: CreateMenuDto) {
        const datas = await this.menuService.update(id, createPlatDto);
        if (!datas) throw new NotFoundException('Id does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Operation effectuée avec success',
            hasError: false,
            datas
        });
    }

    @Delete('delete/:id')
    async delete(@Res() res, @Param('id') id: string) {
        const datas = await this.menuService.delete(id);
        if (!datas) throw new NotFoundException('Post does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Operation effectuée avec success',
            hasError: false,
            datas
        })
    }
}