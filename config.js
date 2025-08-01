// Configuration de l'application
const APP_CONFIG = {
  // Hash SHA-256 du mot de passe "262626"
  PASSWORD_HASH: "35a5ea9db6c0b4a0e946902c33e1759a9156c50fd3678078d5c6628a6ec62722",
  
  // Utilisateurs autorisés (optionnel)
  ALLOWED_USERS: ["admin", "user1", "user2"],
  
  // Clé API pour accès privilégié
  API_KEY: "rbm-2025-colisage-secure-key",
  
  // Configuration de l'application
  APP_NAME: "EAN List",
  VERSION: "1.0.0",
  
  // URLs de la base de données
  DATABASE_URLS: [
    'https://cdn.jsdelivr.net/gh/rbmfinance1/26005@gh-pages/bdd.csv',
    'https://raw.githubusercontent.com/rbmfinance1/26005/gh-pages/bdd.csv',
    'https://rbmfinance1.github.io/26005/bdd.csv'
  ]
};

// Fonction de hash pour vérifier les mots de passe
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Fonction de vérification d'authentification
async function verifyAuthentication(password) {
  const hashedPassword = await hashPassword(password);
  return hashedPassword === APP_CONFIG.PASSWORD_HASH;
}

// Fonction de vérification par clé API
function verifyApiKey(apiKey) {
  return apiKey === APP_CONFIG.API_KEY;
} 