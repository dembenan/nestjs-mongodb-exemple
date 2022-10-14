import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { MenuInterface, schemaName } from './schemas/menu.entity';


@Injectable()
export class MenuService {
    constructor(@InjectModel(schemaName) private menuModel: Model<MenuInterface>) { }


    async create(createMenuDto: CreateMenuDto): Promise<any> {
        const createdMenu = new this.menuModel(createMenuDto);
        return createdMenu.save();
    }

    async findAll(): Promise<any> {
        return await this.menuModel.find().exec();
    }
    async findById(id): Promise<MenuInterface> {
        const customer = await this.menuModel.findById(id).exec();
        return customer;
    }
    async find(req): Promise<any> {
        return await this.menuModel.find(req).exec();
    }
    async update(id, createMenuDto: CreateMenuDto): Promise<any> {
        return await this.menuModel.findByIdAndUpdate(id, createMenuDto, { new: true });
    }
    async delete(id): Promise<any> {
        return await this.menuModel.findByIdAndRemove(id);
    }
}