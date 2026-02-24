import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guards';
import { CategoryModule } from './category/category.module';
import { BannerModule } from './banner/banner.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, CategoryModule, BannerModule, ProductModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
