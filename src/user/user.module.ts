import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, schemaName } from './schemas/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [MongooseModule.forFeature([{ name: schemaName, schema: User }]),
  PassportModule.register({ defaultStrategy: 'local' }),
  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '1d' }
  })
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }


