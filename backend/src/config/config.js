require('dotenv').config();

const config = {
  // Environnement
  env: process.env.NODE_ENV || 'development',
  
  // Serveur
  server: {
    port: process.env.PORT || 5001,
    host: process.env.HOST || 'localhost'
  },
  
  // Base de données
  db: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/entreprise-organiser',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  
  // JWT (JSON Web Token)
  jwt: {
    secret: process.env.JWT_SECRET || 'entreprise_organiser_secret_key_2025',
    expiresIn: process.env.JWT_EXPIRE || '1d'
  },

  // Refresh Token
  refreshToken: {
    secret: process.env.REFRESH_TOKEN_SECRET || 'entreprise_organiser_refresh_secret',
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '7d'
  },

  encryption: {
    secret: process.env.ENCRYPTION_SECRET || 'entreprise_organiser_encrypt_secret'
  },
  
  // Cors
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
  },
  
  // Pagination
  pagination: {
    limit: 10,
    maxLimit: 100
  },
  
  // URL du frontend pour les liens dans les emails
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  
  // Configuration des emails
  email: {
    from: process.env.EMAIL_FROM || '"Entreprise Organiser" <noreply@entreprise-organiser.com>',
    smtp: {
      host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true' || false,
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || ''
      }
    }
  }
};

module.exports = config; 