import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBannerDto {
  @ApiProperty({ example: 'Imagem do produto' })
  @IsString()
  @IsNotEmpty()
  img: string;

  @ApiProperty({ example: 'link imagem do produto' })
  @IsString()
  @IsNotEmpty()
  link: string;
}
