import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  
  const app = await NestFactory.create(AppModule);
  
  // Configuration CORS améliorée pour Chrome
  app.enableCors({
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
      // Permettre les requêtes sans origin (applications mobiles, Postman, etc.)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:8080',  // Port frontend configuré
        'http://localhost:3000', 
        'http://localhost:5174',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:8080',  // Port frontend configuré
        'http://127.0.0.1:3000',
        process.env.FRONTEND_URL
      ].filter(Boolean);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS: Origin ${origin} non autorisée`);
        // En développement, on permet quand même (pour Chrome strict)
        if (process.env.NODE_ENV === 'development') {
          callback(null, true);
        } else {
          callback(null, false);
        }
      }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'Accept', 
      'Origin', 
      'X-Requested-With',
      'Cache-Control',
      'Pragma'
    ],
    exposedHeaders: ['Set-Cookie'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200 // Chrome préfère 200 à 204
  });

  // Middleware pour les en-têtes de sécurité Chrome
  app.use((req: any, res: any, next: any) => {
    // En-têtes de sécurité compatibles Chrome
    res.header('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.header('Cross-Origin-Embedder-Policy', 'unsafe-none');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Gestion explicite des requêtes OPTIONS pour Chrome
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept,Origin,X-Requested-With,Cache-Control,Pragma');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Max-Age', '86400'); // Cache preflight pour 24h
      return res.status(200).end();
    }
    
    next();
  });
  
  // Préfixe global pour toutes les routes API, sauf certaines exceptions
  app.setGlobalPrefix('api', {
    exclude: ['/health', '/']
  });

  // Validation des requêtes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('API Entreprise Organiser')
    .setDescription('API pour la gestion des affaires, achats et pointages')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  // Démarrage du serveur
  const port = process.env.PORT || 8000;
  await app.listen(port);
  console.log(`Application démarrée sur: http://localhost:${port}`);
}

bootstrap(); 