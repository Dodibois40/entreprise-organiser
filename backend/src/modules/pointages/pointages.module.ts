import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PointagesService } from './pointages.service';
import { PointagesController } from './pointages.controller';
import { AuthModule } from '../auth/auth.module'; // Pour la protection des routes et l'accès à l'utilisateur

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PointagesController],
  providers: [PointagesService],
  exports: [PointagesService],
})
export class PointagesModule {} 