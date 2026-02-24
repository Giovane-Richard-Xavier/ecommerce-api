import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class ProductEntity implements Product {
  id: string;
  label: string;
  price: Decimal;
  description: string | null;
  viewsCount: number;
  salesCount: number;
  category_id: string;
  createdAt: Date;
  updatedAt: Date;
}
