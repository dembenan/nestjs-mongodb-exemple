import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Menu, schemaName } from './schemas/menu.entity';
import { PlatService } from 'src/plat/plat.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: schemaName, schema: Menu }])],
  providers: [MenuService],
  controllers: [MenuController]
})
export class MenuModule { }
