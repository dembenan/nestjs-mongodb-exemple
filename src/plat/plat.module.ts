import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatController } from './plat.controller';
import { PlatService } from './plat.service';
import { Plat, schemaName } from './schemas/plat.entity';


@Module({
  imports: [MongooseModule.forFeature([{ name: schemaName, schema: Plat }])],
  controllers: [PlatController],
  providers: [PlatService]
})
export class PlatModule { }
