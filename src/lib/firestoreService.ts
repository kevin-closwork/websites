import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';

// Tipos de datos para CloserForm
export type CloserFormData = {
  id?: string;
  created_at: any;
  updated_at: any;
  
  // Validación inicial
  nombre: string;
  apellido: string;
  email: string;
  linkedin: string;
  whatsapp: string;
  years: string;
  biggestDeal: number;
  
  // Experiencia y expertise
  expertIndustries: string[];
  ticket: string;
  soldMarkets: string[];
  superpower: string;
  
  // Performance
  dealsLastQ: number;
  revenueLastYear: string;
  employment: string;
  
  // Pregunta killer
  epicDeal: string;
};

// Tipos de datos para CompanyForm
export type CompanyFormData = {
  id?: string;
  created_at: any;
  updated_at: any;
  
  // Información básica
  email: string;
  name: string;
  companyName: string;
  employeeCount: string;
  whatsappPhone: string;
  linkedin: string;
  
  // Plan seleccionado
  selectedPlan: string;
  
  // Métricas de ventas
  ticket: string;
  cycle: string;
  deals: number;
  what: string;
  
  // Información de la empresa
  industry: string;
  markets: string[];
  sellingType: string;
  hasTeam: string;
  teamSize?: number;
  hasLeadsBase: string;
  leadsBaseSize?: number;
  
  // Frustración
  frustration?: string;
};

// Tipos de datos para CloserTyc
export type CloserTycData = {
  id?: string;
  created_at: any;
  updated_at: any;
  
  // Información básica
  fullName: string;
  accepted: boolean;
  acceptedAt: string;
  userAgent: string;
  timestamp: string;
};

// Tipos de datos para EmpresasTyc
export type EmpresasTycData = {
  id?: string;
  created_at: any;
  updated_at: any;
  
  // Información básica de la empresa
  companyName: string;
  contactName: string;
  email: string;
  rfc: string;
  accepted: boolean;
  acceptedAt: string;
  userAgent: string;
  timestamp: string;
};

// Funciones para CloserForm
export const addCloserFormData = async (data: Omit<CloserFormData, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    console.log('Intentando agregar registro de closer:', data);
    
    // Filtrar campos undefined para evitar errores de Firebase
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );
    
    // Crear el documento con timestamp
    const docData = {
      ...cleanData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Datos preparados para Firestore:', docData);
    
    // Intentar Firebase primero (si está habilitado)
    try {
      if (db) {
        const firebaseData = {
          ...cleanData,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp()
        };
        const docRef = await addDoc(collection(db, 'closer_forms'), firebaseData);
        console.log('✅ Registro de closer agregado a Firebase con ID:', docRef.id);
        return { id: docRef.id, ...cleanData };
      } else {
        console.log('ℹ️ Firebase deshabilitado, usando localStorage');
      }
    } catch (firebaseError) {
      console.warn('⚠️ Firebase falló, usando respaldo local:', firebaseError);
    }
    
    // Fallback: Guardar en localStorage
    const localData = {
      ...docData,
      id: Date.now().toString()
    };
    
    // Guardar en localStorage
    const existingData = JSON.parse(localStorage.getItem('closer_forms_backup') || '[]');
    existingData.push(localData);
    localStorage.setItem('closer_forms_backup', JSON.stringify(existingData));
    
    console.log('✅ Registro de closer guardado localmente con ID:', localData.id);
    return localData;
    
  } catch (error) {
    console.error('Error detallado al agregar registro de closer:', error);
    if (error instanceof Error) {
      console.error('Mensaje de error:', error.message);
      console.error('Stack trace:', error.stack);
    }
    throw new Error('Error al guardar el registro. Por favor, intenta nuevamente.');
  }
};

export const getCloserFormData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'closer_forms'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting closer form data:', error);
    throw error;
  }
};

// Funciones para CompanyForm
export const addCompanyFormData = async (data: Omit<CompanyFormData, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    console.log('Intentando agregar registro de empresa:', data);
    
    // Filtrar campos undefined para evitar errores
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );
    
    // Crear el documento con timestamp
    const docData = {
      ...cleanData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('Datos preparados:', docData);
    
    // Intentar Firebase primero (si está habilitado)
    try {
      if (db) {
        const firebaseData = {
          ...cleanData,
          created_at: serverTimestamp(),
          updated_at: serverTimestamp()
        };
        const docRef = await addDoc(collection(db, 'company_forms'), firebaseData);
        console.log('✅ Registro de empresa agregado a Firebase con ID:', docRef.id);
        return { id: docRef.id, ...cleanData };
      } else {
        console.log('ℹ️ Firebase deshabilitado, usando localStorage');
      }
    } catch (firebaseError) {
      console.warn('⚠️ Firebase falló, usando respaldo local:', firebaseError);
    }
    
    // Fallback: Guardar en localStorage
    const localData = {
      ...docData,
      id: Date.now().toString()
    };
    
    // Guardar en localStorage
    const existingData = JSON.parse(localStorage.getItem('company_forms_backup') || '[]');
    existingData.push(localData);
    localStorage.setItem('company_forms_backup', JSON.stringify(existingData));
    
    console.log('✅ Registro de empresa guardado localmente con ID:', localData.id);
    return localData;
    
  } catch (error) {
    console.error('Error al agregar registro de empresa:', error);
    throw new Error('Error al guardar el registro. Por favor, intenta nuevamente.');
  }
};

export const getCompanyFormData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'company_forms'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting company form data:', error);
    throw error;
  }
};

// Funciones para CloserTyc
export const addCloserTycData = async (data: Omit<CloserTycData, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    console.log('Intentando agregar registro de closer TYC:', data);
    
    // Filtrar campos undefined para evitar errores de Firebase
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );
    
    // Crear el documento con timestamp
    const docData = {
      ...cleanData,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    };

    console.log('Datos preparados para Firestore:', docData);
    
    const docRef = await addDoc(collection(db, 'closer_tyc'), docData);
    console.log('Registro de closer TYC agregado exitosamente con ID:', docRef.id);
    return { id: docRef.id, ...cleanData };
  } catch (error) {
    console.error('Error detallado al agregar registro de closer TYC:', error);
    if (error instanceof Error) {
      console.error('Mensaje de error:', error.message);
      console.error('Stack trace:', error.stack);
    }
    throw new Error('Error al guardar el registro. Por favor, intenta nuevamente.');
  }
};

export const getCloserTycData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'closer_tyc'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting closer TYC data:', error);
    throw error;
  }
};

// Funciones para EmpresasTyc
export const addEmpresasTycData = async (data: Omit<EmpresasTycData, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    console.log('Intentando agregar registro de empresa TYC:', data);
    
    // Filtrar campos undefined para evitar errores de Firebase
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );
    
    // Crear el documento con timestamp
    const docData = {
      ...cleanData,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    };

    console.log('Datos preparados para Firestore:', docData);
    
    const docRef = await addDoc(collection(db, 'empresas_tyc'), docData);
    console.log('Registro de empresa TYC agregado exitosamente con ID:', docRef.id);
    return { id: docRef.id, ...cleanData };
  } catch (error) {
    console.error('Error detallado al agregar registro de empresa TYC:', error);
    if (error instanceof Error) {
      console.error('Mensaje de error:', error.message);
      console.error('Stack trace:', error.stack);
    }
    throw new Error('Error al guardar el registro. Por favor, intenta nuevamente.');
  }
};

export const getEmpresasTycData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'empresas_tyc'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting empresas TYC data:', error);
    throw error;
  }
};
