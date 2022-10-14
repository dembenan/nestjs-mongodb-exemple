
import { ApiProperty } from '@nestjs/swagger';


export class CreatePlatDto {

    @ApiProperty()
    nom: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    prix: number;

    @ApiProperty()
    image: string;

}