# 🔥 Guía de Configuración de Firebase para Closwork

## 🚨 Problema Actual
El proyecto Firebase `closwork-web` no está configurado correctamente, causando el error:
```
CONFIGURATION_NOT_FOUND - 400 Bad Request
```

## ✅ Solución Temporal
Actualmente el sistema usa **localStorage** como respaldo, por lo que los formularios funcionan perfectamente.

## 🛠️ Pasos para Configurar Firebase Correctamente

### 1. Verificar/Crear Proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Busca el proyecto `closwork-web`
3. Si no existe, crea uno nuevo:
   - Haz clic en "Agregar proyecto"
   - Nombre: `closwork-web`
   - Habilita Google Analytics (opcional)

### 2. Configurar Firestore Database

1. En el proyecto Firebase, ve a **Firestore Database**
2. Haz clic en **Crear base de datos**
3. Selecciona **Modo de prueba** (para desarrollo)
4. Elige una ubicación (recomendado: `us-central1`)

### 3. Configurar Authentication (Opcional)

1. Ve a **Authentication** > **Sign-in method**
2. Habilita **Email/Password** si planeas usar autenticación

### 4. Obtener Nueva Configuración

1. Ve a **Configuración del proyecto** (ícono de engranaje)
2. Scroll hacia abajo hasta **Tus aplicaciones**
3. Haz clic en **Agregar aplicación** > **Web**
4. Nombre: `closwork-web`
5. Copia la nueva configuración

### 5. Actualizar Configuración en el Código

Reemplaza la configuración en `src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "TU_NUEVA_API_KEY",
  authDomain: "closwork-web-nuevo.firebaseapp.com",
  projectId: "closwork-web-nuevo",
  storageBucket: "closwork-web-nuevo.firebasestorage.app",
  messagingSenderId: "TU_NUEVO_SENDER_ID",
  appId: "TU_NUEVO_APP_ID",
  measurementId: "TU_NUEVO_MEASUREMENT_ID"
};
```

### 6. Configurar Reglas de Firestore

En **Firestore Database** > **Reglas**, usa:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura y escritura para las colecciones de formularios
    match /company_forms/{document} {
      allow read, write: if true;
    }
    match /closer_forms/{document} {
      allow read, write: if true;
    }
    match /closer_tyc/{document} {
      allow read, write: if true;
    }
  }
}
```

## 📊 Verificar Funcionamiento

1. Despliega los cambios
2. Completa un formulario
3. Verifica en Firebase Console que aparezcan los datos
4. Revisa la consola del navegador para confirmar: `✅ Firebase initialized successfully`

## 🔄 Estado Actual

- ✅ **Formularios funcionan** con localStorage
- ✅ **Emails funcionan** correctamente
- ✅ **Pixel events funcionan** correctamente
- ⚠️ **Firebase pendiente** de configuración

## 📝 Notas Importantes

- Los datos se guardan en localStorage como respaldo
- Puedes acceder a los datos con: `localStorage.getItem('company_forms_backup')`
- Una vez configurado Firebase, los datos se guardarán en ambas ubicaciones
- No hay pérdida de datos durante la transición

## 🆘 Si Necesitas Ayuda

1. Verifica que el proyecto Firebase existe
2. Confirma que Firestore está habilitado
3. Revisa que las reglas de Firestore permiten escritura
4. Asegúrate de que la configuración es correcta
