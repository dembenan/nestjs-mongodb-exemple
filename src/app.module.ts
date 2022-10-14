import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { PlatModule } from './plat/plat.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://food:PasswordFood85@cluster0.judo6.mongodb.net/food?retryWrites=true&w=majority'),
    UserModule, MenuModule, PlatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
