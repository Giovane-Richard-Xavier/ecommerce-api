import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Label do produto' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({ example: 'Preço do produto' })
  @IsDecimal({ decimal_digits: '0,2' })
  @IsNotEmpty()
  price: string;

  @ApiProperty({ example: 'Descrição do produto' })
  @IsString()
  @IsOptional()
  description: string | null;

  @ApiProperty({ example: 'Quatidade de visualização do produto' })
  @IsOptional()
  @IsNumber()
  viewsCount: number;

  @ApiProperty({ example: 'Quntidade de vendas do produto' })
  @IsOptional()
  @IsNumber()
  salesCount: number;

  @ApiProperty({ example: 'id da Categoria' })
  @IsUUID()
  @IsNotEmpty()
  category_id: string;
}
