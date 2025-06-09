import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AffairesModule } from './modules/affaires/affaires.module';
import { BdcModule } from './modules/bdc/bdc.module';
import { PointagesModule } from './modules/pointages/pointages.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { CategoriesAchatModule } from './modules/categories-achat/categories-achat.module';
import { ParametresModule } from './modules/parametres/parametres.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { ReportingModule } from './modules/reporting/reporting.module';
import { MigrationModule } from './modules/migration/migration.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    AffairesModule,
    BdcModule,
    PointagesModule,
    CategoriesAchatModule,
    ParametresModule,
    ArticlesModule,
    ReportingModule,
    MigrationModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {} 