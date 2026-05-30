import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

let serviceAccount: any;

try {
  // Primero intentar cargar desde variable de entorno (para Render/producción)
  const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (serviceAccountEnv) {
    try {
      serviceAccount = JSON.parse(serviceAccountEnv);
      console.log('Firebase Admin inicializado desde variable de entorno');
    } catch (parseError) {
      console.error('Error al parsear FIREBASE_SERVICE_ACCOUNT_KEY:', parseError);
      throw parseError;
    }
  } else {
    // Si no hay variable de entorno, intentar cargar desde archivo (para desarrollo local)
    const serviceAccountPath = path.join(__dirname, '..', '..', 'serviceAccountKey.json');
    console.log('Intentando cargar serviceAccountKey.json desde:', serviceAccountPath);
    
    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccountFile = fs.readFileSync(serviceAccountPath, 'utf8');
      serviceAccount = JSON.parse(serviceAccountFile);
      console.log('Firebase Admin inicializado desde archivo local');
    } else {
      throw new Error(`Archivo de credenciales no encontrado en: ${serviceAccountPath}`);
    }
  }

  // Inicializamos Firebase
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin inicializado correctamente');
  }
} catch (error) {
  console.error("Error crítico: No se pudo inicializar Firebase Admin");
  console.error("Detalle del error:", error);
  throw error;
}

export const db = admin.firestore();
export const auth = admin.auth();
