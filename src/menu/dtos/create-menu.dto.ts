import { ApiProperty } from '@nestjs/swagger';


export class CreateMenuDto {

    @ApiProperty()
    nom: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    dateDebut: Date;

    @ApiProperty()
    dateFin: Date;

    @ApiProperty()
    plats: [];


}