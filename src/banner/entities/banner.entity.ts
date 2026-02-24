import { Banner } from '@prisma/client';

export class BannerEntity implements Banner {
  id: string;
  img: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}
