#!/usr/bin/env node

/**
 * Script para configurar variables de entorno en Firebase Functions
 * Ejecuta: node setup-env.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Configuración de Variables de Entorno para Firebase Functions\n');

// Verificar si existe el archivo .env
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    console.log('📋 Copiando archivo de ejemplo...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Archivo .env creado desde env.example');
  } else {
    console.log('❌ No se encontró env.example');
    process.exit(1);
  }
} else {
  console.log('✅ Archivo .env ya existe');
}

console.log('\n📝 Ahora edita el archivo .env con tus credenciales reales:');
console.log('   - SENDER_EMAIL: Tu email de Gmail');
console.log('   - SENDER_PASSWORD: Contraseña de aplicación de Gmail');
console.log('   - RECIPIENT_EMAIL: Email donde recibir notificaciones');

console.log('\n🔐 Para configurar Gmail:');
console.log('   1. Activa verificación en dos pasos');
console.log('   2. Genera contraseña de aplicación');
console.log('   3. Usa esa contraseña en SENDER_PASSWORD');

console.log('\n🚀 Después de configurar .env, ejecuta:');
console.log('   firebase deploy --only functions');

console.log('\n📚 Consulta functions/README.md para más detalles');
