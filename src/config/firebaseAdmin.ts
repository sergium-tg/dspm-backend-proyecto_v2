import * as admin from 'firebase-admin';

// Configuración de Firebase usando variables de entorno para Render
let serviceAccount;

try {
  // En producción (Render), usar variables de entorno
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    
    // Manejar diferentes formatos de la clave privada
    // Si la clave tiene \n literales, reemplazarlos por saltos de línea
    if (privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }
    
    console.log('Firebase config loaded from environment variables');
    console.log('Project ID:', process.env.FIREBASE_PROJECT_ID);
    console.log('Client email:', process.env.FIREBASE_CLIENT_EMAIL);
    
    serviceAccount = {
      type: 'service_account',
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || '',
      private_key: privateKey,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID || '',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL || '',
      universe_domain: 'googleapis.com'
    };
  } else {
    // En desarrollo local, usar archivo JSON si existe
    const fs = require('fs');
    const path = require('path');
    const serviceAccountPath = path.join(__dirname, '..', '..', 'serviceAccountKey.json');
    
    if (fs.existsSync(serviceAccountPath)) {
      serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    } else {
      throw new Error('No se encontró serviceAccountKey.json y no hay variables de entorno configuradas');
    }
  }

  // Inicializamos Firebase
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
} catch (error) {
  console.error("Error crítico: No se pudo inicializar Firebase Admin");
  console.error("Detalle del error:", error);
  throw error;
}

export const db = admin.firestore();
export const auth = admin.auth();