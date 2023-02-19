import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LaboratoryModule } from './laboratories/laboratories.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    LaboratoryModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
