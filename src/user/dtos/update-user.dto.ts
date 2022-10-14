import { ApiProperty } from '@nestjs/swagger';


export class UpdateUserDto {

    @ApiProperty()
    nom: string;

    @ApiProperty()
    prenom: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    imagePath: string;

}