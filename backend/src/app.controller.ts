import { Controller, Get } from '@nestjs/common';
import { Public } from './modules/auth/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  getHello(): object {
    return {
      status: 'OK',
      message: 'Backend Entreprise Organiser - API fonctionne !',
      timestamp: new Date().toISOString(),
      endpoints: {
        auth: '/auth/login',
        profile: '/auth/profile',
        affaires: '/affaires',
        articles: '/articles',
        pointages: '/pointages'
      }
    };
  }

  @Public()
  @Get('health')
  getHealth(): object {
    return {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
  }
} 