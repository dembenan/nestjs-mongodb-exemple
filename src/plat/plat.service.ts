import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlatDto } from './dtos/create-plat.dto';
import { PlatInterface, schemaName } from './schemas/plat.entity';


@Injectable()
export class PlatService {
    constructor(@InjectModel(schemaName) private platModel: Model<PlatInterface>) { }


    async create(nom, description, prix, image): Promise<any> {
        const createPlatDto = new CreatePlatDto;
        createPlatDto.nom = nom;
        createPlatDto.description = description;
        createPlatDto.prix = prix;
        createPlatDto.image = image;
        const createdPlat = new this.platModel(createPlatDto);
        return createdPlat.save();
    }
    async findAll(): Promise<any> {
        return await this.platModel.find().exec();
    }
    async findById(id): Promise<PlatInterface> {
        const customer = await this.platModel.findById(id).exec();
        return customer;
    }
    async find(req): Promise<any> {
        return await this.platModel.find(req).exec();
    }
    async update(id, createPlatDto: CreatePlatDto): Promise<any> {
        return await this.platModel.findByIdAndUpdate(id, createPlatDto, { new: true });
    }
    async delete(id): Promise<any> {
        return await this.platModel.findByIdAndRemove(id);
    }
}