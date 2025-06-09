const fs = require('fs');
const path = require('path');

const envContent = `# Database URL pour PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/entreprise_organiser?schema=public"

# JWT Secret
JWT_SECRET="votre_secret_jwt_super_securise"

# Refresh Token Secret
REFRESH_TOKEN_SECRET="votre_refresh_token_secret"

# Encryption Secret
ENCRYPTION_SECRET="votre_encryption_secret"

# Environnement
NODE_ENV="development"
`;

fs.writeFileSync(path.join(__dirname, '.env'), envContent);
console.log('Fichier .env créé avec succès!'); 