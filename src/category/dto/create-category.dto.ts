import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Nome da Categoria' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Apelido da Categoria' })
  @IsString()
  @IsNotEmpty()
  slug: string;
}
