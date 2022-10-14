import { ApiProperty } from '@nestjs/swagger';
import { role } from '../role.enum';


export class CreateUserDto {

    @ApiProperty()
    nom: string;

    @ApiProperty()
    prenom: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    imagePath: string;

}