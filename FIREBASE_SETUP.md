# Configuración de Firebase para Closers On Demand

## Descripción
Este proyecto ha sido configurado para usar Firebase como backend para almacenar los datos de los formularios de closers y empresas.

## Configuración Actual
- **Proyecto Firebase**: closwork-web
- **Base de datos**: Firestore
- **Colecciones configuradas**:
  - `closer_forms`: Para formularios de closers
  - `company_forms`: Para formularios de empresas

## Credenciales de Firebase
Las credenciales están configuradas en `src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyCFxh6ODdFOSUghlKOQkI8S7bGReC1NYZ8",
  authDomain: "closwork-web.firebaseapp.com",
  projectId: "closwork-web",
  storageBucket: "closwork-web.firebasestorage.app",
  messagingSenderId: "304002514641",
  appId: "1:304002514641:web:b1abe9833ec267aa324ff0",
  measurementId: "G-C6LN3K8GL3"
};
```

## Funcionalidades Implementadas

### CloserForm
- Envía datos a la colección `closer_forms`
- Campos incluidos:
  - Email, LinkedIn, WhatsApp
  - Años de experiencia
  - Deal más grande
  - Industrias de expertise
  - Mercados vendidos
  - Superpoder (Hunter, Farmer, etc.)
  - Performance (deals, revenue, empleo)
  - Deal épico

### CompanyForm
- Envía datos a la colección `company_forms`
- Campos incluidos:
  - Email, nombre, LinkedIn
  - Métricas de ventas (ticket, ciclo, deals)
  - Industria y mercados
  - Tipo de venta y equipo
  - Frustraciones del proceso

## Reglas de Firestore
Las reglas están configuradas en `firestore.rules`:
- Lectura y creación públicas
- Sin permisos de actualización o eliminación

## Dependencias
- `firebase`: ^11.8.1 (instalada)
- Todas las dependencias necesarias están en `package.json`

## Uso
Los formularios ahora:
1. Validan los datos con Zod
2. Envían automáticamente a Firebase
3. Muestran estado de carga y errores
4. Redirigen a páginas de agradecimiento

## Notas de Desarrollo
- Los datos se almacenan con timestamps automáticos
- Manejo de errores implementado
- Estados de carga para mejor UX
- Logs detallados en consola para debugging
