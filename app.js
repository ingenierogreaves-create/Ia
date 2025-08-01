// === DATOS DE LA APLICACIÓN ===

console.log('🎵 Loading Greaves Samples Mastering Analyzer...');

// Configuración de la aplicación
const APP_CONFIG = {
  maxFileSize: 100 * 1024 * 1024, // 100MB
  supportedFormats: ['.wav', '.mp3', '.flac', '.m4a', '.ogg', '.aac'],
  analysisSteps: 5,
  adminCredentials: { username: 'Admin', password: '5582' }
};

// Datos técnicos de la aplicación
const AUDIO_DATA = {
  // Estándares de plataformas
  platforms: {
    spotify: { lufs: -14, truePeak: -1, name: 'Spotify' },
    youtube: { lufs: -14, truePeak: -1, name: 'YouTube' },
    apple: { lufs: -16, truePeak: -1, name: 'Apple Music' },
    tidal: { lufs: -14, truePeak: -1, name: 'TIDAL' }
  },

  // Tipos de problemas detectables
  problemTypes: {
    clipping: {
      name: { es: 'Saturación Digital', en: 'Digital Clipping' },
      description: {
        es: 'Se detectó saturación digital que causa distorsión audible',
        en: 'Digital clipping detected causing audible distortion'
      },
      actions: {
        es: [
          'Reducir ganancia general en 3-6 dB en la mezcla',
          'Aplicar limitador con techo en -1 dBTP',
          'Revisar niveles de entrada en la cadena de grabación'
        ],
        en: [
          'Reduce overall gain by 3-6 dB in mix',
          'Apply limiter with -1 dBTP ceiling',
          'Check input levels in recording chain'
        ]
      },
      plugins: ['FabFilter Pro-L 2', 'iZotope Ozone Maximizer', 'Waves L2 Ultramaximizer'],
      priority: 'high'
    },
    muddiness: {
      name: { es: 'Mudez Frecuencial', en: 'Frequency Muddiness' },
      description: {
        es: 'Exceso de energía en frecuencias bajas-medias reduce la claridad',
        en: 'Excess energy in low-mid frequencies reducing clarity'
      },
      actions: {
        es: [
          'Aplicar filtro high-pass en 80-120 Hz en instrumentos no fundamentales',
          'Corte bell en 300-400 Hz, Q=1.5, reducción 2-3 dB',
          'Usar compresión multibanda en rango 150-450 Hz'
        ],
        en: [
          'Apply high-pass filter at 80-120 Hz on non-fundamental instruments',
          'Bell cut at 300-400 Hz, Q=1.5, -2 to -3 dB reduction',
          'Use multiband compression in 150-450 Hz range'
        ]
      },
      plugins: ['FabFilter Pro-Q 3', 'Waves Renaissance EQ', 'SSL G-EQ'],
      priority: 'medium'
    },
    harshness: {
      name: { es: 'Dureza en Agudos', en: 'High-Frequency Harshness' },
      description: {
        es: 'Frecuencias altas agresivas que pueden resultar fatigosas',
        en: 'Aggressive high frequencies that may be fatiguing'
      },
      actions: {
        es: [
          'EQ paramétrico corte 6-10 kHz, Q=2.0, reducción 2-4 dB',
          'Aplicar de-esser suave en rango 5-8 kHz',
          'Usar compresión dinámica en frecuencias altas'
        ],
        en: [
          'Parametric EQ cut 6-10 kHz, Q=2.0, -2 to -4 dB',
          'Apply gentle de-esser at 5-8 kHz range',
          'Use dynamic compression on high frequencies'
        ]
      },
      plugins: ['FabFilter Pro-Q 3', 'Waves F6 Dynamic EQ', 'iZotope Ozone EQ'],
      priority: 'medium'
    },
    overcompression: {
      name: { es: 'Sobre-compresión', en: 'Over-compression' },
      description: {
        es: 'Compresión excesiva que reduce el rango dinámico natural',
        en: 'Excessive compression reducing natural dynamic range'
      },
      actions: {
        es: [
          'Reducir ratio del compresor a 2:1-3:1 máximo',
          'Aumentar attack time a 10-30ms para preservar transientes',
          'Usar compresión paralela en lugar de serial'
        ],
        en: [
          'Reduce compressor ratio to 2:1-3:1 maximum',
          'Increase attack time to 10-30ms to preserve transients',
          'Use parallel compression instead of serial'
        ]
      },
      plugins: ['Waves CLA-2A', 'TDR Kotelnikov', 'Universal Audio 1176'],
      priority: 'high'
    }
  },

  // Perfiles de análisis demo
  demoProfiles: {
    overcompressed: {
      name: 'Pop Overcompressed',
      lufs: -6.2,
      truePeak: 0.1,
      dynamicRange: 4.2,
      spectralCentroid: 3200,
      duration: 204,
      hasClipping: true,
      clippingTimestamps: ['1:23', '2:45', '3:12'],
      problems: ['clipping', 'overcompression'],
      genre: 'pop'
    },
    muddy: {
      name: 'Classical Dynamic',
      lufs: -18.5,
      truePeak: -3.2,
      dynamicRange: 14.8,
      spectralCentroid: 1600,
      duration: 252,
      hasClipping: false,
      clippingTimestamps: [],
      problems: ['muddiness'],
      genre: 'classical'
    },
    optimal: {
      name: 'Streaming Ready',
      lufs: -14.1,
      truePeak: -1.2,
      dynamicRange: 8.7,
      spectralCentroid: 2650,
      duration: 225,
      hasClipping: false,
      clippingTimestamps: [],
      problems: [],
      genre: 'pop'
    },
    harsh: {
      name: 'Indie Balanced',
      lufs: -14.3,
      truePeak: -0.8,
      dynamicRange: 11.2,
      spectralCentroid: 4200,
      duration: 241,
      hasClipping: false,
      clippingTimestamps: [],
      problems: ['harshness'],
      genre: 'indie'
    }
  }
};

// Traducciones completas
const TRANSLATIONS = {
  es: {
    // Autenticación
    'app-subtitle': 'Analizador Profesional de Masterización de Audio',
    'app-description': 'Análisis Técnico Avanzado para Evaluación de Mezcla y Master',
    'login-title': 'Iniciar Sesión',
    'register-title': 'Crear Cuenta',
    'username-label': 'Usuario',
    'password-label': 'Contraseña',
    'reg-username-label': 'Usuario',
    'reg-password-label': 'Contraseña',
    'email-label': 'Correo Electrónico',
    'login-btn-text': 'Iniciar Sesión',
    'register-btn-text': 'Crear Cuenta',
    'no-account-text': '¿No tienes cuenta?',
    'have-account-text': '¿Ya tienes cuenta?',
    'show-register': 'Registrarse',
    'show-login': 'Iniciar Sesión',
    
    // Navegación
    'nav-subtitle': 'Mastering Analyzer',
    'history-text': 'Historial',
    'admin-text': 'Admin',
    'logout-text': 'Salir',
    
    // Dashboard principal
    'welcome-title': 'Análisis Profesional de Masterización',
    'welcome-subtitle': 'Selecciona el nivel de exigencia para tu análisis técnico',
    'flexible-title': 'Flexible',
    'flexible-desc': 'Tolerancias amplias para revisiones generales',
    'regular-title': 'Regular',
    'regular-desc': 'Estándares profesionales normales',
    'strict-title': 'Estricto',
    'strict-desc': 'Máxima precisión técnica',
    
    // Modo de análisis
    'mode-title': 'Tipo de Material',
    'master-title': 'Master Finalizado',
    'master-desc': 'Material masterizado listo para distribución',
    'mix-title': 'Mezcla Sin Masterizar',
    'mix-desc': 'Mezcla previa al proceso de mastering',
    
    // Carga de archivos
    'upload-title': 'Arrastra tu archivo de audio aquí',
    'upload-subtitle': 'o haz clic para seleccionar desde tu dispositivo',
    'select-file-text': 'Seleccionar Archivo',
    'supported-text': 'Formatos soportados:',
    'max-size-text': 'Tamaño máximo:',
    'demo-text': 'Probar con Demo',
    
    // Análisis en progreso
    'analysis-title': 'Análisis Profundo en Progreso',
    'analysis-subtitle': 'Realizando 5 pasadas de análisis técnico',
    'step-1-title': 'Cargando Audio',
    'step-1-desc': 'Procesando archivo de audio',
    'step-2-title': 'Detectando Saturación',
    'step-2-desc': 'Analizando picos digitales',
    'step-3-title': 'Métricas Técnicas',
    'step-3-desc': 'Calculando LUFS, True Peak, DR',
    'step-4-title': 'Generando Diagnóstico',
    'step-4-desc': 'Creando recomendaciones técnicas',
    'step-5-title': 'Finalizando Reporte',
    'step-5-desc': 'Preparando resultados',
    
    // Resultados
    'report-title': 'Reporte de Análisis Técnico',
    'new-analysis-text': 'Analizar Otro',
    're-analyze-text': 'Re-analizar',
    'export-pdf-text': 'Descargar PDF',
    
    // Reproductor
    'player-title': '🎧 Reproductor con Marcadores de Problemas',
    
    // Información del archivo
    'file-info-title': '📋 Información del Archivo',
    'filename-label': 'Archivo:',
    'format-label': 'Formato:',
    'size-label': 'Tamaño:',
    'duration-label': 'Duración:',
    'mode-label': 'Modo:',
    'strictness-label': 'Exigencia:',
    
    // Saturación
    'clipping-title': '🔴 Saturación Digital Detectada',
    'clipping-solution-title': '💡 Solución Inmediata:',
    'clipping-solution-text': 'Reducir ganancia general en 3-6 dB y aplicar limitador con techo en -1 dBTP',
    
    // Métricas
    'metrics-title': '📊 Métricas Técnicas Principales',
    'lufs-metric-title': 'LUFS Integrado',
    'peak-metric-title': 'True Peak',
    'dr-metric-title': 'Rango Dinámico',
    'spectral-metric-title': 'Balance Espectral',
    
    // Gráfico
    'chart-title': '📈 Comparación con Estándares',
    
    // Recomendaciones
    'recommendations-title': '🔧 Diagnóstico y Recomendaciones Técnicas',
    
    // Plataformas
    'platforms-title': '🎯 Compatibilidad por Plataforma',
    
    // Referencias
    'standards-title': '📚 Referencias Normativas Aplicadas',
    'ebu-description': 'Recomendación europea para normalización de loudness en radiodifusión',
    'itu-description': 'Estándar internacional para medición de loudness de programas de audio',
    'aes-description': 'Documento técnico AES para estándares de audio digital',
    
    // Historial
    'history-screen-title': '📊 Historial de Análisis',
    'back-from-history-text': 'Volver al Dashboard',
    'total-analyses-label': 'Análisis Realizados',
    'avg-lufs-label': 'LUFS Promedio',
    
    // Admin
    'admin-screen-title': '⚙️ Panel de Administrador',
    'back-from-admin-text': 'Volver al Dashboard',
    'admin-users-label': 'Usuarios Registrados',
    'admin-total-analyses-label': 'Análisis Totales',
    'admin-avg-session-label': 'Análisis por Usuario',
    'users-management-title': '👥 Gestión de Usuarios'
  },
  
  en: {
    // Authentication
    'app-subtitle': 'Professional Audio Mastering Analyzer',
    'app-description': 'Advanced Technical Analysis for Mix and Master Evaluation',
    'login-title': 'Login',
    'register-title': 'Create Account',
    'username-label': 'Username',
    'password-label': 'Password',
    'reg-username-label': 'Username',
    'reg-password-label': 'Password',
    'email-label': 'Email',
    'login-btn-text': 'Login',
    'register-btn-text': 'Create Account',
    'no-account-text': "Don't have an account?",
    'have-account-text': 'Already have an account?',
    'show-register': 'Register',
    'show-login': 'Login',
    
    // Navigation
    'nav-subtitle': 'Mastering Analyzer',
    'history-text': 'History',
    'admin-text': 'Admin',
    'logout-text': 'Logout',
    
    // Main dashboard
    'welcome-title': 'Professional Mastering Analysis',
    'welcome-subtitle': 'Select the strictness level for your technical analysis',
    'flexible-title': 'Flexible',
    'flexible-desc': 'Wide tolerances for general reviews',
    'regular-title': 'Regular',
    'regular-desc': 'Normal professional standards',
    'strict-title': 'Strict',
    'strict-desc': 'Maximum technical precision',
    
    // Analysis mode
    'mode-title': 'Material Type',
    'master-title': 'Finished Master',
    'master-desc': 'Mastered material ready for distribution',
    'mix-title': 'Unmastered Mix',
    'mix-desc': 'Mix prior to mastering process',
    
    // File upload
    'upload-title': 'Drag your audio file here',
    'upload-subtitle': 'or click to select from your device',
    'select-file-text': 'Select File',
    'supported-text': 'Supported formats:',
    'max-size-text': 'Maximum size:',
    'demo-text': 'Try Demo',
    
    // Analysis in progress
    'analysis-title': 'Deep Analysis in Progress',
    'analysis-subtitle': 'Performing 5 passes of technical analysis',
    'step-1-title': 'Loading Audio',
    'step-1-desc': 'Processing audio file',
    'step-2-title': 'Detecting Clipping',
    'step-2-desc': 'Analyzing digital peaks',
    'step-3-title': 'Technical Metrics',
    'step-3-desc': 'Calculating LUFS, True Peak, DR',
    'step-4-title': 'Generating Diagnosis',
    'step-4-desc': 'Creating technical recommendations',
    'step-5-title': 'Finalizing Report',
    'step-5-desc': 'Preparing results',
    
    // Results
    'report-title': 'Technical Analysis Report',
    'new-analysis-text': 'Analyze Another',
    're-analyze-text': 'Re-analyze',
    'export-pdf-text': 'Download PDF',
    
    // Player
    'player-title': '🎧 Player with Problem Markers',
    
    // File information
    'file-info-title': '📋 File Information',
    'filename-label': 'File:',
    'format-label': 'Format:',
    'size-label': 'Size:',
    'duration-label': 'Duration:',
    'mode-label': 'Mode:',
    'strictness-label': 'Strictness:',
    
    // Clipping
    'clipping-title': '🔴 Digital Clipping Detected',
    'clipping-solution-title': '💡 Immediate Solution:',
    'clipping-solution-text': 'Reduce overall gain by 3-6 dB and apply limiter with -1 dBTP ceiling',
    
    // Metrics
    'metrics-title': '📊 Main Technical Metrics',
    'lufs-metric-title': 'Integrated LUFS',
    'peak-metric-title': 'True Peak',
    'dr-metric-title': 'Dynamic Range',
    'spectral-metric-title': 'Spectral Balance',
    
    // Chart
    'chart-title': '📈 Comparison with Standards',
    
    // Recommendations
    'recommendations-title': '🔧 Diagnosis and Technical Recommendations',
    
    // Platforms
    'platforms-title': '🎯 Platform Compatibility',
    
    // Standards
    'standards-title': '📚 Applied Normative References',
    'ebu-description': 'European recommendation for loudness normalization in broadcasting',
    'itu-description': 'International standard for measuring audio programme loudness',
    'aes-description': 'AES technical document for digital audio standards',
    
    // History
    'history-screen-title': '📊 Analysis History',
    'back-from-history-text': 'Back to Dashboard',
    'total-analyses-label': 'Analyses Performed',
    'avg-lufs-label': 'Average LUFS',
    
    // Admin
    'admin-screen-title': '⚙️ Administrator Panel',
    'back-from-admin-text': 'Back to Dashboard',
    'admin-users-label': 'Registered Users',
    'admin-total-analyses-label': 'Total Analyses',
    'admin-avg-session-label': 'Analyses per User',
    'users-management-title': '👥 User Management'
  }
};

// === ESTADO DE LA APLICACIÓN ===

// Variables de estado global
let currentUser = null;
let currentLanguage = 'es';
let currentStrictness = 'regular';
let currentMode = 'master';
let currentAnalysis = null;
let currentAudioFile = null;
let audioPlayer = null;
let metricsChart = null;

// Base de datos simulada
let users = [
  { 
    id: 1, 
    username: 'Admin', 
    password: '5582', 
    email: 'admin@greaves.com', 
    role: 'admin',
    createdAt: new Date('2024-01-01')
  }
];
let analyses = [];
let nextUserId = 2;
let nextAnalysisId = 1;

// === INICIALIZACIÓN COMPLETAMENTE NUEVA ===

// Método 1: DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎵 DOMContentLoaded - Initializing Greaves Samples...');
  initializeApplication();
});

// Método 2: Window load como backup
window.addEventListener('load', function() {
  console.log('🔄 Window load backup - Checking initialization...');
  if (!document.querySelector('.screen.active')) {
    console.log('🔄 Running backup initialization...');
    initializeApplication();
  }
});

// Método 3: Timeout como último recurso
setTimeout(function() {
  if (!document.querySelector('.screen.active')) {
    console.log('⏰ Timeout fallback - Initializing...');
    initializeApplication();
  }
}, 500);

function initializeApplication() {
  console.log('🚀 === INITIALIZING APPLICATION ===');
  
  try {
    // Paso 1: Configurar autenticación INMEDIATAMENTE
    setupAuthenticationImmediate();
    
    // Paso 2: Configurar idiomas
    setupLanguageSystem();
    
    // Paso 3: Configurar navegación
    setupNavigationSystem();
    
    // Paso 4: Configurar dashboard
    setupDashboardSystem();
    
    // Paso 5: Configurar upload
    setupUploadSystem();
    
    // Paso 6: Actualizar idioma
    updateLanguageDisplay();
    
    // Paso 7: Mostrar pantalla de auth
    showScreen('auth');
    
    console.log('✅ === APPLICATION INITIALIZED SUCCESSFULLY ===');
    
  } catch (error) {
    console.error('💥 Fatal error initializing app:', error);
    alert('Error crítico: ' + error.message);
  }
}

// === AUTENTICACIÓN COMPLETAMENTE REESCRITA ===

function setupAuthenticationImmediate() {
  console.log('🔐 === SETTING UP AUTHENTICATION SYSTEM ===');
  
  // ENFOQUE MÚLTIPLE PARA MÁXIMA COMPATIBILIDAD
  
  // Método 1: Obtener elementos y verificar existencia
  const loginForm = document.getElementById('login-form-element');
  const registerForm = document.getElementById('register-form-element');
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const showRegisterLink = document.getElementById('show-register');
  const showLoginLink = document.getElementById('show-login');
  
  console.log('🔍 Auth elements found:', {
    loginForm: !!loginForm,
    registerForm: !!registerForm,
    loginBtn: !!loginBtn,
    registerBtn: !!registerBtn,
    showRegisterLink: !!showRegisterLink,
    showLoginLink: !!showLoginLink
  });
  
  // Método 2: Event listeners con múltiples enfoques
  if (loginForm) {
    // Approach A: Form submit
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('📝 Login form submitted via addEventListener');
      processLogin();
      return false;
    });
    
    // Approach B: Form onsubmit backup
    loginForm.onsubmit = function(e) {
      e.preventDefault();
      console.log('📝 Login form submitted via onsubmit');
      processLogin();
      return false;
    };
  }
  
  if (loginBtn) {
    // Approach A: Click event
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('🖱️ Login button clicked via addEventListener');
      processLogin();
      return false;
    });
    
    // Approach B: onclick backup
    loginBtn.onclick = function(e) {
      e.preventDefault();
      console.log('🖱️ Login button clicked via onclick');
      processLogin();
      return false;
    };
    
    // Approach C: Direct assignment
    loginBtn.setAttribute('onclick', 'processLogin(); return false;');
  }
  
  // Método 3: Input field listeners para Enter key
  const usernameField = document.getElementById('login-username');
  const passwordField = document.getElementById('login-password');
  
  if (usernameField) {
    usernameField.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        console.log('⌨️ Enter pressed on username field');
        processLogin();
      }
    });
  }
  
  if (passwordField) {
    passwordField.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        console.log('⌨️ Enter pressed on password field');
        processLogin();
      }
    });
  }
  
  // Método 4: Registro
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('📝 Register form submitted');
      processRegister();
      return false;
    });
    
    registerForm.onsubmit = function(e) {
      e.preventDefault();
      processRegister();
      return false;
    };
  }
  
  if (registerBtn) {
    registerBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('🖱️ Register button clicked');
      processRegister();
      return false;
    });
    
    registerBtn.onclick = function(e) {
      e.preventDefault();
      processRegister();
      return false;
    };
  }
  
  // Método 5: Enlaces de cambio entre formularios
  if (showRegisterLink) {
    showRegisterLink.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('🔄 Show register link clicked');
      toggleAuthenticationForm('register');
      return false;
    });
    
    showRegisterLink.onclick = function(e) {
      e.preventDefault();
      toggleAuthenticationForm('register');
      return false;
    };
  }
  
  if (showLoginLink) {
    showLoginLink.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('🔄 Show login link clicked');
      toggleAuthenticationForm('login');
      return false;
    });
    
    showLoginLink.onclick = function(e) {
      e.preventDefault();
      toggleAuthenticationForm('login');
      return false;
    };
  }
  
  // Método 6: Hacer funciones globales para backup
  window.processLogin = processLogin;
  window.processRegister = processRegister;
  window.toggleAuthenticationForm = toggleAuthenticationForm;
  
  console.log('✅ Authentication system setup complete with multiple fallbacks');
}

// FUNCIÓN DE LOGIN COMPLETAMENTE SIMPLIFICADA
function processLogin() {
  console.log('🔐 === PROCESSING LOGIN ===');
  
  try {
    // Obtener valores de los campos
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    
    if (!usernameInput || !passwordInput) {
      console.error('❌ Login inputs not found');
      alert('Error: No se encontraron los campos de login');
      return;
    }
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    console.log('📋 Login attempt with:', { username, password: password ? '***' : 'empty' });
    
    // Validación básica
    if (!username || !password) {
      alert(currentLanguage === 'es' ? 
        'Por favor, completa usuario y contraseña.' : 
        'Please enter username and password.');
      return;
    }
    
    // Buscar usuario en la base de datos
    const user = users.find(u => u.username === username && u.password === password);
    
    console.log('👤 User lookup result:', !!user);
    
    if (user) {
      console.log('✅ === LOGIN SUCCESSFUL ===');
      
      // Establecer usuario actual
      currentUser = user;
      
      // Limpiar campos
      usernameInput.value = '';
      passwordInput.value = '';
      
      // Ir al dashboard
      proceedToMainDashboard();
      
      // Mensaje de éxito
      setTimeout(() => {
        alert(currentLanguage === 'es' ? 
          `¡Bienvenido ${user.username}! 🎉\n\nPuedes comenzar tu análisis de audio.` : 
          `Welcome ${user.username}! 🎉\n\nYou can start your audio analysis.`);
      }, 500);
      
    } else {
      console.log('❌ === LOGIN FAILED ===');
      
      // Mostrar error con las credenciales correctas
      alert(currentLanguage === 'es' ? 
        `❌ Credenciales incorrectas.\n\n✅ Usa estas credenciales de prueba:\n👤 Usuario: Admin\n🔑 Contraseña: 5582` : 
        `❌ Invalid credentials.\n\n✅ Use these test credentials:\n👤 Username: Admin\n🔑 Password: 5582`);
    }
    
  } catch (error) {
    console.error('💥 Error in processLogin:', error);
    alert('Error procesando login: ' + error.message);
  }
}

function processRegister() {
  console.log('📝 === PROCESSING REGISTER ===');
  
  try {
    const usernameInput = document.getElementById('register-username');
    const emailInput = document.getElementById('register-email');
    const passwordInput = document.getElementById('register-password');
    
    if (!usernameInput || !emailInput || !passwordInput) {
      console.error('❌ Register inputs not found');
      alert('Error: No se encontraron los campos de registro');
      return;
    }
    
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    console.log('📋 Register attempt with:', { username, email, password: password ? '***' : 'empty' });
    
    if (!username || !email || !password) {
      alert(currentLanguage === 'es' ? 
        'Por favor, completa todos los campos.' : 
        'Please fill in all fields.');
      return;
    }
    
    // Validar si usuario ya existe
    if (users.find(u => u.username === username)) {
      alert(currentLanguage === 'es' ? 
        'El usuario ya existe. Elige otro nombre.' : 
        'Username already exists. Choose another.');
      return;
    }
    
    if (users.find(u => u.email === email)) {
      alert(currentLanguage === 'es' ? 
        'El correo ya está registrado.' : 
        'Email already registered.');
      return;
    }
    
    // Crear nuevo usuario
    const newUser = {
      id: nextUserId++,
      username,
      email,
      password,
      role: 'user',
      createdAt: new Date()
    };
    
    users.push(newUser);
    
    console.log('✅ User registered successfully:', newUser.username);
    
    // Limpiar formulario
    usernameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    
    // Cambiar a login
    toggleAuthenticationForm('login');
    
    alert(currentLanguage === 'es' ? 
      `✅ Usuario ${username} registrado exitosamente.\n\nAhora puedes iniciar sesión.` : 
      `✅ User ${username} registered successfully.\n\nYou can now login.`);
    
  } catch (error) {
    console.error('💥 Error in processRegister:', error);
    alert('Error procesando registro: ' + error.message);
  }
}

function toggleAuthenticationForm(type) {
  console.log(`🔄 Toggling auth form to: ${type}`);
  
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  
  if (type === 'register') {
    if (loginForm) loginForm.classList.add('hidden');
    if (registerForm) registerForm.classList.remove('hidden');
  } else {
    if (registerForm) registerForm.classList.add('hidden');
    if (loginForm) loginForm.classList.remove('hidden');
  }
}

function proceedToMainDashboard() {
  console.log('🏠 === PROCEEDING TO MAIN DASHBOARD ===');
  
  // Cambiar a pantalla principal
  showScreen('main');
  
  // Mostrar/ocultar botón de admin según el rol
  const adminBtn = document.getElementById('admin-btn');
  if (adminBtn && currentUser) {
    adminBtn.style.display = currentUser.role === 'admin' ? 'block' : 'none';
    console.log(`Admin button: ${currentUser.role === 'admin' ? 'visible' : 'hidden'}`);
  }
  
  console.log('✅ Main dashboard loaded successfully');
}

// === SISTEMA DE IDIOMAS ===

function setupLanguageSystem() {
  console.log('🌐 Setting up language system...');
  
  const languageBtns = document.querySelectorAll('.language-btn');
  console.log(`Found ${languageBtns.length} language buttons`);
  
  languageBtns.forEach((btn, index) => {
    console.log(`Setting up language button ${index}: ${btn.dataset.lang}`);
    
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const lang = this.dataset.lang;
      console.log(`🌐 Language button clicked: ${lang}`);
      if (lang && lang !== currentLanguage) {
        changeLanguage(lang);
      }
      return false;
    });
    
    // Backup onclick
    btn.onclick = function(e) {
      e.preventDefault();
      const lang = this.dataset.lang;
      console.log(`🌐 Language button onclick: ${lang}`);
      if (lang && lang !== currentLanguage) {
        changeLanguage(lang);
      }
      return false;
    };
  });
  
  console.log('✅ Language system setup complete');
}

function changeLanguage(lang) {
  console.log(`🌐 Changing language to: ${lang}`);
  currentLanguage = lang;
  
  // Actualizar botones activos
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  updateLanguageDisplay();
}

function updateLanguageDisplay() {
  console.log(`🔄 Updating language display to: ${currentLanguage}`);
  const translations = TRANSLATIONS[currentLanguage];
  
  Object.keys(translations).forEach(key => {
    const element = document.getElementById(key);
    if (element) {
      if (element.tagName === 'INPUT') {
        element.placeholder = translations[key];
      } else {
        // Preservar iconos en botones
        const currentText = element.textContent;
        const iconMatch = currentText.match(/^[🎵📊⚙️🚪📁🔄📄←🎧🔧💡📋📈🎯📚👥🌐🇪🇺🇸]+\s*/);
        const icon = iconMatch ? iconMatch[0] : '';
        element.textContent = icon + translations[key];
      }
    }
  });
  
  // Actualizar idioma del documento
  document.documentElement.lang = currentLanguage;
  console.log('✅ Language display updated successfully');
}

// === NAVEGACIÓN ===

function setupNavigationSystem() {
  console.log('🧭 Setting up navigation system...');
  
  // Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('🚪 Logout clicked');
      handleLogout();
    });
    logoutBtn.onclick = function(e) {
      e.preventDefault();
      handleLogout();
      return false;
    };
  }
  
  // History
  const historyBtn = document.getElementById('history-btn');
  if (historyBtn) {
    historyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('📊 History clicked');
      showHistoryScreen();
    });
    historyBtn.onclick = function(e) {
      e.preventDefault();
      showHistoryScreen();
      return false;
    };
  }
  
  // Admin
  const adminBtn = document.getElementById('admin-btn');
  if (adminBtn) {
    adminBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('⚙️ Admin clicked');
      showAdminScreen();
    });
    adminBtn.onclick = function(e) {
      e.preventDefault();
      showAdminScreen();
      return false;
    };
  }
  
  // Back buttons
  const backFromHistoryBtn = document.getElementById('back-from-history');
  const backFromAdminBtn = document.getElementById('back-from-admin');
  
  if (backFromHistoryBtn) {
    backFromHistoryBtn.onclick = function() {
      showScreen('main');
    };
  }
  
  if (backFromAdminBtn) {
    backFromAdminBtn.onclick = function() {
      showScreen('main');
    };
  }
  
  // Make functions global
  window.handleLogout = handleLogout;
  window.showHistoryScreen = showHistoryScreen;
  window.showAdminScreen = showAdminScreen;
  
  console.log('✅ Navigation system setup complete');
}

function handleLogout() {
  console.log('👋 User logging out');
  currentUser = null;
  currentAudioFile = null;
  currentAnalysis = null;
  
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer = null;
  }
  
  showScreen('auth');
  toggleAuthenticationForm('login');
  
  const loginUsername = document.getElementById('login-username');
  const loginPassword = document.getElementById('login-password');
  
  if (loginUsername) loginUsername.value = '';
  if (loginPassword) loginPassword.value = '';
}

function showScreen(screenName) {
  console.log(`🔄 Switching to screen: ${screenName}`);
  
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  const targetScreen = document.getElementById(screenName + '-screen');
  if (targetScreen) {
    targetScreen.classList.add('active');
    console.log(`✅ Screen switched to: ${screenName}`);
  } else {
    console.error(`❌ Screen not found: ${screenName}-screen`);
  }
}

// === DASHBOARD ===

function setupDashboardSystem() {
  console.log('🎛️ Setting up dashboard system...');
  
  // Strictness selection
  document.querySelectorAll('.strictness-card').forEach(card => {
    card.addEventListener('click', function() {
      document.querySelectorAll('.strictness-card').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      currentStrictness = this.dataset.level;
      console.log(`🎯 Strictness level set to: ${currentStrictness}`);
    });
  });
  
  // Mode selection
  document.querySelectorAll('.mode-card').forEach(card => {
    card.addEventListener('click', function() {
      document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      currentMode = this.dataset.mode;
      console.log(`🎛️ Analysis mode set to: ${currentMode}`);
    });
  });
  
  console.log('✅ Dashboard system setup complete');
}

// === SISTEMA DE UPLOAD ===

function setupUploadSystem() {
  console.log('📁 Setting up upload system...');
  
  const uploadZone = document.getElementById('upload-zone');
  const fileInput = document.getElementById('file-input');
  const selectFileBtn = document.getElementById('select-file-btn');
  const demoBtn = document.getElementById('demo-btn');
  
  // Demo button - MÚLTIPLES ENFOQUES
  if (demoBtn) {
    demoBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('🎵 Demo button clicked via addEventListener');
      startDemoAnalysis();
    });
    
    demoBtn.onclick = function(e) {
      e.preventDefault();
      console.log('🎵 Demo button clicked via onclick');
      startDemoAnalysis();
      return false;
    };
    
    // Global function backup
    window.startDemoAnalysis = startDemoAnalysis;
  }
  
  // File upload zone
  if (uploadZone) {
    uploadZone.addEventListener('click', () => {
      console.log('📁 Upload zone clicked');
      fileInput?.click();
    });
  }
  
  if (selectFileBtn) {
    selectFileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('📁 Select file button clicked');
      fileInput?.click();
    });
  }
  
  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        console.log('📁 File selected:', file.name);
        processAudioFile(file);
      }
    });
  }
  
  console.log('✅ Upload system setup complete');
}

function startDemoAnalysis() {
  console.log('🎵 === STARTING DEMO ANALYSIS ===');
  
  const demoProfiles = Object.values(AUDIO_DATA.demoProfiles);
  const randomProfile = demoProfiles[Math.floor(Math.random() * demoProfiles.length)];
  
  console.log('🎵 Selected demo profile:', randomProfile.name);
  
  const demoFile = {
    name: `demo-${randomProfile.name.toLowerCase().replace(/\s+/g, '-')}.wav`,
    size: 45000000,
    type: 'audio/wav',
    isDemo: true
  };
  
  processAudioFile(demoFile, randomProfile);
}

function processAudioFile(file, demoProfile = null) {
  console.log(`📁 Processing audio file: ${file.name}`);
  
  if (!file.isDemo) {
    // Validar tipo de archivo
    const fileName = file.name.toLowerCase();
    const validExtension = APP_CONFIG.supportedFormats.some(ext => 
      fileName.endsWith(ext)
    );
    
    if (!validExtension) {
      alert(currentLanguage === 'es' ? 
        'Tipo de archivo no soportado. Usa: WAV, MP3, FLAC, M4A, OGG, AAC' :
        'Unsupported file type. Use: WAV, MP3, FLAC, M4A, OGG, AAC');
      return;
    }
    
    // Validar tamaño
    if (file.size > APP_CONFIG.maxFileSize) {
      alert(currentLanguage === 'es' ? 
        'Archivo demasiado grande. Máximo 100MB.' :
        'File too large. Maximum 100MB.');
      return;
    }
  }
  
  currentAudioFile = file;
  startUploadProcess(file, demoProfile);
}

function startUploadProcess(file, demoProfile) {
  console.log('⬆️ Starting upload process...');
  showUploadProgress();
  
  let progress = 0;
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  
  const progressInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress > 100) progress = 100;
    
    if (progressFill) {
      progressFill.style.width = progress + '%';
    }
    
    if (progressText) {
      progressText.textContent = Math.round(progress) + '%';
    }
    
    if (progress >= 100) {
      clearInterval(progressInterval);
      setTimeout(() => {
        startAnalysisProcess(file, demoProfile);
      }, 500);
    }
  }, 150);
}

function showUploadProgress() {
  const uploadContent = document.getElementById('upload-content');
  const uploadProgress = document.getElementById('upload-progress');
  
  uploadContent?.classList.add('hidden');
  uploadProgress?.classList.remove('hidden');
}

function hideUploadProgress() {
  const uploadContent = document.getElementById('upload-content');
  const uploadProgress = document.getElementById('upload-progress');
  
  uploadContent?.classList.remove('hidden');
  uploadProgress?.classList.add('hidden');
}

// === ANÁLISIS DE AUDIO ===

function startAnalysisProcess(file, demoProfile) {
  console.log('🔬 === STARTING ANALYSIS PROCESS ===');
  showScreen('analysis');
  
  // Inicializar waveform
  initializeAnalysisWaveform();
  
  let currentStep = 1;
  let currentPass = 1;
  
  function nextAnalysisStep() {
    // Actualizar paso actual
    document.querySelectorAll('.step-item').forEach(step => {
      step.classList.remove('active');
    });
    
    const stepElement = document.getElementById(`step-${currentStep}`);
    if (stepElement) {
      stepElement.classList.add('active');
    }
    
    // Actualizar contador de pasadas
    const passCounter = document.getElementById('current-pass');
    if (passCounter) {
      passCounter.textContent = currentPass;
    }
    
    // Actualizar texto de análisis
    const analyzingText = document.getElementById('analyzing-text');
    if (analyzingText) {
      const messages = {
        1: currentLanguage === 'es' ? 'Cargando archivo de audio...' : 'Loading audio file...',
        2: currentLanguage === 'es' ? 'Detectando saturación digital...' : 'Detecting digital clipping...',
        3: currentLanguage === 'es' ? 'Calculando métricas técnicas...' : 'Calculating technical metrics...',
        4: currentLanguage === 'es' ? 'Generando diagnóstico...' : 'Generating diagnosis...',
        5: currentLanguage === 'es' ? 'Finalizando análisis...' : 'Finalizing analysis...'
      };
      analyzingText.textContent = messages[currentStep] || messages[1];
    }
    
    currentStep++;
    
    if (currentStep > 5) {
      currentStep = 1;
      currentPass++;
      
      if (currentPass > 5) {
        // Análisis completado
        setTimeout(() => {
          completeAnalysisProcess(file, demoProfile);
        }, 1000);
        return;
      }
    }
    
    const stepDuration = Math.random() * 1000 + 800; // 800-1800ms por paso
    setTimeout(nextAnalysisStep, stepDuration);
  }
  
  nextAnalysisStep();
}

function initializeAnalysisWaveform() {
  const canvas = document.getElementById('waveform-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  function drawWaveform() {
    if (!document.getElementById('analysis-screen')?.classList.contains('active')) {
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-primary').trim();
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const time = Date.now() * 0.002;
    for (let x = 0; x < canvas.width; x += 3) {
      const amplitude = Math.sin(x * 0.01 + time) * 
                       Math.cos(x * 0.005 + time * 0.7) * 
                       (canvas.height * 0.3);
      const y = canvas.height / 2 + amplitude;
      
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    requestAnimationFrame(drawWaveform);
  }
  
  drawWaveform();
}

function completeAnalysisProcess(file, demoProfile) {
  console.log('✅ === ANALYSIS PROCESS COMPLETED ===');
  
  // Generar o usar perfil demo
  const profile = demoProfile || generateAnalysisProfile(file);
  
  // Crear análisis
  currentAnalysis = {
    id: nextAnalysisId++,
    userId: currentUser.id,
    fileName: file.name,
    fileSize: file.size,
    fileType: getFileFormat(file.name),
    mode: currentMode,
    strictness: currentStrictness,
    timestamp: new Date(),
    ...profile
  };
  
  // Guardar en historial
  analyses.push(currentAnalysis);
  
  console.log('📊 Analysis saved:', currentAnalysis);
  
  // Mostrar resultados
  showAnalysisResults();
}

function generateAnalysisProfile(file) {
  const baseProfile = Object.values(AUDIO_DATA.demoProfiles)[
    Math.floor(Math.random() * Object.values(AUDIO_DATA.demoProfiles).length)
  ];
  
  const strictnessMultiplier = {
    flexible: 0.7,
    regular: 1.0,
    strict: 1.3
  }[currentStrictness];
  
  return {
    lufs: baseProfile.lufs + (Math.random() - 0.5) * 4,
    truePeak: baseProfile.truePeak + (Math.random() - 0.5) * 2,
    dynamicRange: baseProfile.dynamicRange + (Math.random() - 0.5) * 5,
    spectralCentroid: baseProfile.spectralCentroid + (Math.random() - 0.5) * 1000,
    duration: Math.floor(Math.random() * 300) + 120,
    hasClipping: Math.random() < 0.3 * strictnessMultiplier,
    clippingTimestamps: Math.random() < 0.3 ? ['1:23', '2:45'] : [],
    problems: generateProblems(strictnessMultiplier)
  };
}

function generateProblems(strictnessMultiplier) {
  const allProblems = Object.keys(AUDIO_DATA.problemTypes);
  const problems = [];
  
  allProblems.forEach(problem => {
    if (Math.random() < 0.4 * strictnessMultiplier) {
      problems.push(problem);
    }
  });
  
  return problems;
}

function getFileFormat(filename) {
  const extension = filename.split('.').pop().toLowerCase();
  return extension.toUpperCase();
}

// === RESULTADOS ===

function showAnalysisResults() {
  console.log('📊 === SHOWING ANALYSIS RESULTS ===');
  showScreen('results');
  
  // Configurar eventos de la pantalla de resultados
  setupResultsEvents();
  
  updateFileInformation();
  updateMetricsDisplay();
  updateClippingSection();
  setupAudioPlayerSystem();
  generateTechnicalRecommendations();
  updatePlatformCompatibility();
  
  // Crear gráfico con delay
  setTimeout(() => {
    createMetricsChart();
  }, 100);
}

function setupResultsEvents() {
  const newAnalysisBtn = document.getElementById('new-analysis-btn');
  const reAnalyzeBtn = document.getElementById('re-analyze-btn');
  const exportPdfBtn = document.getElementById('export-pdf-btn');
  
  if (newAnalysisBtn) {
    newAnalysisBtn.onclick = function() {
      console.log('🆕 New analysis clicked');
      hideUploadProgress();
      showScreen('main');
    };
  }
  
  if (reAnalyzeBtn) {
    reAnalyzeBtn.onclick = function() {
      console.log('🔄 Re-analyze clicked');
      if (currentAudioFile) {
        startAnalysisProcess(currentAudioFile);
      }
    };
  }
  
  if (exportPdfBtn) {
    exportPdfBtn.onclick = function() {
      console.log('📄 Export PDF clicked');
      exportAnalysisToPDF();
    };
  }
}

function updateFileInformation() {
  const analysis = currentAnalysis;
  
  updateElementText('file-name-display', analysis.fileName);
  updateElementText('analysis-date', analysis.timestamp.toLocaleDateString());
  updateElementText('filename-value', analysis.fileName);
  updateElementText('format-value', analysis.fileType);
  updateElementText('size-value', formatFileSize(analysis.fileSize));
  updateElementText('duration-value', formatDuration(analysis.duration));
  updateElementText('mode-value', currentLanguage === 'es' ? 
    (analysis.mode === 'master' ? 'Master' : 'Mezcla') :
    (analysis.mode === 'master' ? 'Master' : 'Mix'));
  updateElementText('strictness-value', {
    flexible: currentLanguage === 'es' ? 'Flexible' : 'Flexible',
    regular: currentLanguage === 'es' ? 'Regular' : 'Regular',
    strict: currentLanguage === 'es' ? 'Estricto' : 'Strict'
  }[analysis.strictness]);
}

function updateMetricsDisplay() {
  const analysis = currentAnalysis;
  
  updateElementText('lufs-value', analysis.lufs.toFixed(1));
  updateElementText('peak-value', analysis.truePeak.toFixed(1));
  updateElementText('dr-value', analysis.dynamicRange.toFixed(1));
  updateElementText('spectral-value', (analysis.spectralCentroid / 1000).toFixed(1));
  
  updateMetricStatus('lufs', analysis.lufs, -20, -5, -14);
  updateMetricStatus('peak', analysis.truePeak, -6, 0, -1);
  updateMetricStatus('dr', analysis.dynamicRange, 0, 25, 12);
  updateMetricStatus('spectral', analysis.spectralCentroid, 1000, 5000, 2500);
  
  updateMetricProgress('lufs', analysis.lufs, -20, -5);
  updateMetricProgress('peak', analysis.truePeak, -6, 0);
  updateMetricProgress('dr', analysis.dynamicRange, 0, 25);
  updateMetricProgress('spectral', analysis.spectralCentroid, 1000, 5000);
}

function updateMetricStatus(metric, value, min, max, optimal) {
  const tolerance = {
    flexible: 3,
    regular: 2,
    strict: 1
  }[currentStrictness];
  
  let status = '🟢';
  if (Math.abs(value - optimal) > tolerance) {
    status = '🟡';
  }
  if (Math.abs(value - optimal) > tolerance * 2) {
    status = '🔴';
  }
  
  updateElementText(`${metric}-status`, status);
}

function updateMetricProgress(metric, value, min, max) {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const progressElement = document.getElementById(`${metric}-progress`);
  if (progressElement) {
    progressElement.style.width = percentage + '%';
  }
}

function updateClippingSection() {
  const clippingSection = document.getElementById('clipping-section');
  const clippingTimestamps = document.getElementById('clipping-timestamps');
  
  if (currentAnalysis.hasClipping && currentAnalysis.clippingTimestamps.length > 0) {
    clippingSection?.classList.remove('hidden');
    
    if (clippingTimestamps) {
      clippingTimestamps.innerHTML = '';
      currentAnalysis.clippingTimestamps.forEach(timestamp => {
        const marker = document.createElement('button');
        marker.className = 'timestamp-marker';
        marker.textContent = timestamp;
        marker.onclick = () => jumpToTimestamp(timestamp);
        clippingTimestamps.appendChild(marker);
      });
    }
  } else {
    clippingSection?.classList.add('hidden');
  }
}

function setupAudioPlayerSystem() {
  console.log('🎧 Setting up audio player system...');
  
  audioPlayer = document.getElementById('main-audio');
  
  if (audioPlayer && currentAudioFile && !currentAudioFile.isDemo) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const blob = new Blob([e.target.result], { type: currentAudioFile.type });
      const audioURL = URL.createObjectURL(blob);
      
      const audioSource = document.getElementById('audio-source');
      if (audioSource) {
        audioSource.src = audioURL;
        audioSource.type = currentAudioFile.type;
      }
      
      audioPlayer.load();
    };
    reader.readAsArrayBuffer(currentAudioFile);
  } else {
    setupDemoAudioPlayer();
  }
  
  setupPlayerControls();
  createPlayerWaveform();
  setupAudioEventListeners();
}

function setupDemoAudioPlayer() {
  const audioSource = document.getElementById('audio-source');
  if (audioSource) {
    audioSource.src = 'data:audio/wav;base64,UklGRnoAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoAAACBhYqFbF1fdJivrWJebiCCjGJdhmNdZmFdYm5hZiWOsJeihJKAhIaIj5CCgoaIf4SEhYSAgo2Ij4mEgo2EmoWQdVtlcIiQg1xqfnhxQA==';
    audioSource.type = 'audio/wav';
  }
  
  if (audioPlayer) {
    audioPlayer.load();
    Object.defineProperty(audioPlayer, 'duration', {
      get: () => currentAnalysis.duration
    });
  }
}

function setupPlayerControls() {
  const playPauseBtn = document.getElementById('play-pause-btn');
  const skipBackBtn = document.getElementById('skip-back-btn');
  const skipForwardBtn = document.getElementById('skip-forward-btn');
  const volumeSlider = document.getElementById('volume-slider');
  
  if (playPauseBtn) {
    playPauseBtn.onclick = togglePlayPause;
  }
  
  if (skipBackBtn) {
    skipBackBtn.onclick = () => skipAudio(-10);
  }
  
  if (skipForwardBtn) {
    skipForwardBtn.onclick = () => skipAudio(10);
  }
  
  if (volumeSlider) {
    volumeSlider.oninput = (e) => {
      if (audioPlayer) {
        audioPlayer.volume = e.target.value / 100;
      }
    };
  }
}

function setupAudioEventListeners() {
  if (!audioPlayer) return;
  
  audioPlayer.addEventListener('loadedmetadata', updateTimeDisplay);
  audioPlayer.addEventListener('timeupdate', updateTimeDisplay);
  audioPlayer.addEventListener('play', () => {
    updateElementText('play-pause-btn', '⏸️');
  });
  audioPlayer.addEventListener('pause', () => {
    updateElementText('play-pause-btn', '▶️');
  });
}

function togglePlayPause() {
  if (!audioPlayer) return;
  
  if (audioPlayer.paused) {
    audioPlayer.play().catch(e => {
      console.log('Playback prevented:', e);
      alert(currentLanguage === 'es' ? 
        'Reproducción bloqueada por el navegador. Usa el reproductor nativo.' :
        'Playback prevented by browser. Use the native player.');
    });
  } else {
    audioPlayer.pause();
  }
}

function skipAudio(seconds) {
  if (!audioPlayer) return;
  
  const newTime = Math.max(0, Math.min(
    audioPlayer.duration || currentAnalysis.duration, 
    audioPlayer.currentTime + seconds
  ));
  audioPlayer.currentTime = newTime;
}

function updateTimeDisplay() {
  if (!audioPlayer) return;
  
  const currentTime = audioPlayer.currentTime || 0;
  const duration = audioPlayer.duration || currentAnalysis.duration;
  
  updateElementText('current-time', formatDuration(Math.floor(currentTime)));
  updateElementText('total-time', formatDuration(Math.floor(duration)));
}

function jumpToTimestamp(timestamp) {
  console.log(`⏭️ Jumping to timestamp: ${timestamp}`);
  
  if (audioPlayer) {
    const parts = timestamp.split(':');
    const seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    audioPlayer.currentTime = seconds;
    
    if (audioPlayer.paused) {
      audioPlayer.play().catch(e => console.log('Playback prevented:', e));
    }
  }
}

function createPlayerWaveform() {
  const canvas = document.getElementById('player-waveform');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  ctx.fillStyle = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-primary').trim();
  
  for (let x = 0; x < canvas.width; x += 2) {
    const amplitude = Math.random() * canvas.height * 0.8;
    const y = (canvas.height - amplitude) / 2;
    ctx.fillRect(x, y, 1, amplitude);
  }
  
  if (currentAnalysis.hasClipping && currentAnalysis.clippingTimestamps.length > 0) {
    const markers = document.getElementById('waveform-markers');
    if (markers) {
      markers.innerHTML = '';
      
      currentAnalysis.clippingTimestamps.forEach(timestamp => {
        const parts = timestamp.split(':');
        const seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
        const position = (seconds / currentAnalysis.duration) * 100;
        
        const marker = document.createElement('div');
        marker.className = 'waveform-marker';
        marker.style.left = position + '%';
        markers.appendChild(marker);
      });
    }
  }
  
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const targetTime = percentage * currentAnalysis.duration;
    
    if (audioPlayer) {
      audioPlayer.currentTime = targetTime;
    }
  });
  
  canvas.style.cursor = 'pointer';
}

function generateTechnicalRecommendations() {
  const container = document.getElementById('recommendations-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  const problems = currentAnalysis.problems || [];
  
  if (problems.length === 0) {
    const noProblemsDiv = document.createElement('div');
    noProblemsDiv.className = 'recommendation-item low-priority';
    noProblemsDiv.innerHTML = `
      <div class="recommendation-header">
        <h4 class="recommendation-title">
          ${currentLanguage === 'es' ? '✅ Mastering Óptimo' : '✅ Optimal Mastering'}
        </h4>
        <span class="priority-badge low">
          ${currentLanguage === 'es' ? 'Óptimo' : 'Optimal'}
        </span>
      </div>
      <p class="recommendation-description">
        ${currentLanguage === 'es' ? 
          'Tu audio cumple con todos los estándares técnicos profesionales. No se requieren ajustes adicionales.' :
          'Your audio meets all professional technical standards. No additional adjustments required.'}
      </p>
    `;
    container.appendChild(noProblemsDiv);
    return;
  }
  
  problems.forEach(problemType => {
    const problem = AUDIO_DATA.problemTypes[problemType];
    if (!problem) return;
    
    const recommendationDiv = document.createElement('div');
    recommendationDiv.className = `recommendation-item ${problem.priority}-priority`;
    
    const priorityText = {
      high: currentLanguage === 'es' ? 'Alta' : 'High',
      medium: currentLanguage === 'es' ? 'Media' : 'Medium',
      low: currentLanguage === 'es' ? 'Baja' : 'Low'
    }[problem.priority];
    
    recommendationDiv.innerHTML = `
      <div class="recommendation-header">
        <h4 class="recommendation-title">${problem.name[currentLanguage]}</h4>
        <span class="priority-badge ${problem.priority}">${priorityText}</span>
      </div>
      <p class="recommendation-description">${problem.description[currentLanguage]}</p>
      
      <div class="recommendation-actions">
        <h5>${currentLanguage === 'es' ? '🎯 Acciones Técnicas:' : '🎯 Technical Actions:'}</h5>
        <ul class="action-list">
          ${problem.actions[currentLanguage].map(action => 
            `<li class="action-item">${action}</li>`
          ).join('')}
        </ul>
      </div>
      
      <div class="plugins-section">
        <h5>${currentLanguage === 'es' ? '🔌 Plugins Recomendados:' : '🔌 Recommended Plugins:'}</h5>
        <div class="plugins-list">
          ${problem.plugins.map(plugin => 
            `<span class="plugin-tag">${plugin}</span>`
          ).join('')}
        </div>
      </div>
    `;
    
    container.appendChild(recommendationDiv);
  });
}

function updatePlatformCompatibility() {
  const platforms = Object.keys(AUDIO_DATA.platforms);
  
  platforms.forEach(platformKey => {
    const platform = AUDIO_DATA.platforms[platformKey];
    const statusElement = document.getElementById(`${platformKey}-status`);
    
    if (!statusElement) return;
    
    const lufsMatch = Math.abs(currentAnalysis.lufs - platform.lufs) <= 2;
    const peakMatch = currentAnalysis.truePeak >= platform.truePeak;
    
    let statusText, statusClass;
    
    if (lufsMatch && peakMatch) {
      statusText = currentLanguage === 'es' ? 'Óptimo' : 'Optimal';
      statusClass = 'status--success';
    } else if (lufsMatch || peakMatch) {
      statusText = currentLanguage === 'es' ? 'Ajustar' : 'Adjust';
      statusClass = 'status--warning';
    } else {
      statusText = currentLanguage === 'es' ? 'Requiere ajustes' : 'Needs adjustment';
      statusClass = 'status--error';
    }
    
    statusElement.className = `platform-status ${statusClass}`;
    statusElement.textContent = statusText;
  });
}

function createMetricsChart() {
  const canvas = document.getElementById('metrics-chart');
  if (!canvas || !window.Chart) return;
  
  const ctx = canvas.getContext('2d');
  
  if (metricsChart) {
    metricsChart.destroy();
  }
  
  const analysis = currentAnalysis;
  
  metricsChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [
        'LUFS',
        currentLanguage === 'es' ? 'True Peak' : 'True Peak',
        currentLanguage === 'es' ? 'Rango Dinámico' : 'Dynamic Range',
        currentLanguage === 'es' ? 'Balance Espectral' : 'Spectral Balance'
      ],
      datasets: [
        {
          label: currentLanguage === 'es' ? 'Valores Actuales' : 'Current Values',
          data: [
            normalizeValue(analysis.lufs, -20, -5),
            normalizeValue(analysis.truePeak, -6, 0),
            normalizeValue(analysis.dynamicRange, 0, 25),
            normalizeValue(analysis.spectralCentroid, 1000, 5000)
          ],
          backgroundColor: '#1FB8CD40',
          borderColor: '#1FB8CD',
          borderWidth: 2,
          pointBackgroundColor: '#1FB8CD',
          pointBorderColor: '#1FB8CD',
          pointRadius: 5
        },
        {
          label: currentLanguage === 'es' ? 'Valores Óptimos' : 'Optimal Values',
          data: [
            normalizeValue(-14, -20, -5),
            normalizeValue(-1, -6, 0),
            normalizeValue(12, 0, 25),
            normalizeValue(2500, 1000, 5000)
          ],
          backgroundColor: '#FFC18540',
          borderColor: '#FFC185',
          borderWidth: 2,
          pointBackgroundColor: '#FFC185',
          pointBorderColor: '#FFC185',
          pointRadius: 5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue('--color-text').trim(),
            font: {
              family: 'FKGroteskNeue, Inter, sans-serif',
              size: 12
            }
          }
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            display: false
          },
          grid: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue('--color-border').trim()
          },
          angleLines: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue('--color-border').trim()
          },
          pointLabels: {
            color: getComputedStyle(document.documentElement)
              .getPropertyValue('--color-text').trim(),
            font: {
              family: 'FKGroteskNeue, Inter, sans-serif',
              size: 11
            }
          }
        }
      }
    }
  });
}

function normalizeValue(value, min, max) {
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
}

// === PANTALLAS ADICIONALES ===

function showHistoryScreen() {
  console.log('📊 Showing history screen...');
  showScreen('history');
  updateHistoryStats();
  renderHistoryList();
}

function updateHistoryStats() {
  const userAnalyses = analyses.filter(a => a.userId === currentUser.id);
  
  updateElementText('total-analyses-count', userAnalyses.length);
  
  if (userAnalyses.length > 0) {
    const avgLufs = userAnalyses.reduce((sum, a) => sum + a.lufs, 0) / userAnalyses.length;
    updateElementText('avg-lufs', avgLufs.toFixed(1));
  }
}

function renderHistoryList() {
  const historyList = document.getElementById('history-list');
  if (!historyList) return;
  
  const userAnalyses = analyses.filter(a => a.userId === currentUser.id);
  
  if (userAnalyses.length === 0) {
    historyList.innerHTML = `
      <div style="text-align: center; padding: var(--space-32); color: var(--color-text-secondary);">
        <h3>${currentLanguage === 'es' ? 'Sin análisis previos' : 'No previous analyses'}</h3>
        <p>${currentLanguage === 'es' ? 
          'Realiza tu primer análisis para ver el historial aquí.' :
          'Perform your first analysis to see history here.'}</p>
      </div>
    `;
    return;
  }
  
  historyList.innerHTML = '';
  
  userAnalyses.reverse().forEach(analysis => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    
    const modeText = analysis.mode === 'master' ?
      (currentLanguage === 'es' ? 'Master' : 'Master') :
      (currentLanguage === 'es' ? 'Mezcla' : 'Mix');
    
    const strictnessText = {
      flexible: currentLanguage === 'es' ? 'Flexible' : 'Flexible',
      regular: currentLanguage === 'es' ? 'Regular' : 'Regular',
      strict: currentLanguage === 'es' ? 'Estricto' : 'Strict'
    }[analysis.strictness];
    
    historyItem.innerHTML = `
      <div class="history-item-info">
        <h4>${analysis.fileName}</h4>
        <p>${analysis.timestamp.toLocaleDateString()} • ${modeText} (${strictnessText})</p>
        <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-top: var(--space-4);">
          LUFS: ${analysis.lufs.toFixed(1)} • Peak: ${analysis.truePeak.toFixed(1)} dBTP
        </div>
      </div>
      <button class="btn btn--outline btn--sm" onclick="viewPreviousAnalysis(${analysis.id})">
        ${currentLanguage === 'es' ? 'Ver Reporte' : 'View Report'}
      </button>
    `;
    
    historyList.appendChild(historyItem);
  });
}

function viewPreviousAnalysis(analysisId) {
  const analysis = analyses.find(a => a.id === analysisId);
  if (analysis) {
    currentAnalysis = analysis;
    showAnalysisResults();
  }
}

function showAdminScreen() {
  if (currentUser?.role !== 'admin') {
    alert(currentLanguage === 'es' ? 
      'Acceso no autorizado.' : 
      'Unauthorized access.');
    return;
  }
  
  console.log('⚙️ Showing admin screen...');
  showScreen('admin');
  updateAdminStats();
  renderUsersList();
}

function updateAdminStats() {
  updateElementText('admin-users-count', users.length);
  updateElementText('admin-total-analyses', analyses.length);
  
  const avgAnalyses = users.length > 0 ? 
    Math.round(analyses.length / users.length * 10) / 10 : 0;
  updateElementText('admin-avg-session', avgAnalyses);
}

function renderUsersList() {
  const usersList = document.getElementById('admin-users-list');
  if (!usersList) return;
  
  usersList.innerHTML = '';
  
  users.forEach(user => {
    const userAnalyses = analyses.filter(a => a.userId === user.id);
    
    const userItem = document.createElement('div');
    userItem.className = 'user-item';
    
    userItem.innerHTML = `
      <div class="user-info">
        <h4>${user.username} ${user.role === 'admin' ? '(Admin)' : ''}</h4>
        <p>${user.email}</p>
        <div style="font-size: var(--font-size-xs); color: var(--color-text-secondary); margin-top: var(--space-4);">
          ${userAnalyses.length} ${currentLanguage === 'es' ? 'análisis' : 'analyses'} • 
          ${currentLanguage === 'es' ? 'Registrado' : 'Registered'}: ${user.createdAt.toLocaleDateString()}
        </div>
      </div>
      <span class="user-role ${user.role}">
        ${user.role === 'admin' ? 'Admin' : (currentLanguage === 'es' ? 'Usuario' : 'User')}
      </span>
    `;
    
    usersList.appendChild(userItem);
  });
}

// === EXPORTACIÓN A PDF ===

function exportAnalysisToPDF() {
  console.log('📄 Exporting analysis to PDF...');
  
  const exportBtn = document.getElementById('export-pdf-btn');
  const originalText = exportBtn.textContent;
  exportBtn.textContent = currentLanguage === 'es' ? 'Generando...' : 'Generating...';
  exportBtn.disabled = true;
  
  setTimeout(() => {
    generatePDFReport();
    exportBtn.textContent = originalText;
    exportBtn.disabled = false;
  }, 2000);
}

function generatePDFReport() {
  const reportHTML = createPDFReportHTML();
  
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  
  if (printWindow) {
    printWindow.document.write(reportHTML);
    printWindow.document.close();
    
    setTimeout(() => {
      alert(currentLanguage === 'es' ? 
        '✅ Reporte generado exitosamente.\n\nSe abrió en una nueva ventana para descarga e impresión.' :
        '✅ Report generated successfully.\n\nOpened in new window for download and printing.');
    }, 500);
  } else {
    const blob = new Blob([reportHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `greaves-mastering-report-${currentAnalysis.fileName.replace(/\.[^/.]+$/, '')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert(currentLanguage === 'es' ? 
      '✅ Reporte descargado como archivo HTML.' :
      '✅ Report downloaded as HTML file.');
  }
}

function createPDFReportHTML() {
  const analysis = currentAnalysis;
  const isSpanish = currentLanguage === 'es';
  
  let problemsSection = '';
  if (analysis.problems && analysis.problems.length > 0) {
    problemsSection = `
      <div class="section">
        <h3>🔍 ${isSpanish ? 'Problemas Detectados y Soluciones' : 'Detected Problems and Solutions'}</h3>
        ${analysis.problems.map(problemType => {
          const problem = AUDIO_DATA.problemTypes[problemType];
          if (!problem) return '';
          
          return `
            <div class="problem-card">
              <h4>🔴 ${problem.name[currentLanguage]}</h4>
              <p><strong>${isSpanish ? 'Descripción:' : 'Description:'}</strong> ${problem.description[currentLanguage]}</p>
              <div class="actions">
                <h5>${isSpanish ? 'Acciones Técnicas:' : 'Technical Actions:'}</h5>
                <ul>
                  ${problem.actions[currentLanguage].map(action => `<li>${action}</li>`).join('')}
                </ul>
              </div>
              <div class="plugins">
                <h5>${isSpanish ? 'Plugins Recomendados:' : 'Recommended Plugins:'}</h5>
                <p>${problem.plugins.join(', ')}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
  
  return `
    <!DOCTYPE html>
    <html lang="${currentLanguage}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isSpanish ? 'Reporte de Mastering' : 'Mastering Report'} - ${analysis.fileName}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #e5e5e5; background: #1f2121; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #1FB8CD; padding-bottom: 20px; }
        .header h1 { color: #1FB8CD; margin-bottom: 10px; font-size: 2.5em; }
        .logo { font-size: 1.8em; color: #FFC185; font-weight: bold; margin-bottom: 15px; }
        .section { margin-bottom: 30px; page-break-inside: avoid; }
        .section h3 { color: #1FB8CD; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
        .metrics-table { width: 100%; border-collapse: collapse; margin: 20px 0; background: #262828; }
        .metrics-table th, .metrics-table td { border: 1px solid #404040; padding: 12px; text-align: left; }
        .metrics-table th { background-color: #333; font-weight: bold; color: #1FB8CD; }
        .problem-card { margin: 20px 0; padding: 20px; background: #262828; border-left: 4px solid #ff5459; border-radius: 8px; }
        .problem-card h4 { color: #ff5459; margin-top: 0; }
        .actions, .plugins { margin-top: 15px; }
        .actions h5, .plugins h5 { color: #1FB8CD; margin-bottom: 8px; }
        .actions ul { background: #1a1c1c; padding: 15px; border-radius: 6px; margin: 0; }
        .actions li { margin-bottom: 8px; color: #e5e5e5; }
        .plugins p { background: #1a1c1c; padding: 10px; border-radius: 6px; margin: 0; font-family: monospace; color: #FFC185; }
        .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #999; border-top: 2px solid #404040; padding-top: 20px; }
        .footer .logo { font-size: 1.4em; color: #1FB8CD; font-weight: bold; margin-bottom: 10px; }
        @media print { body { color: #333; background: white; } .metrics-table { background: white; } .metrics-table th { background: #f8f9fa; color: #333; } .problem-card { background: #f8f9fb; } .actions ul, .plugins p { background: #f8f9fa; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">🎵 GREAVES SAMPLES</div>
        <h1>${isSpanish ? 'Analizador Profesional de Mastering' : 'Professional Mastering Analyzer'}</h1>
        <h2>${isSpanish ? 'Reporte Técnico de Análisis de Audio' : 'Technical Audio Analysis Report'}</h2>
        <p><strong>${isSpanish ? 'Archivo:' : 'File:'}</strong> ${analysis.fileName}</p>
        <p><strong>${isSpanish ? 'Fecha:' : 'Date:'}</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>${isSpanish ? 'Modo:' : 'Mode:'}</strong> ${analysis.mode === 'master' ? 'Master' : (isSpanish ? 'Mezcla' : 'Mix')}</p>
      </div>
      
      <div class="section">
        <h3>📊 ${isSpanish ? 'Métricas Principales' : 'Main Metrics'}</h3>
        <table class="metrics-table">
          <thead>
            <tr>
              <th>${isSpanish ? 'Métrica' : 'Metric'}</th>
              <th>${isSpanish ? 'Valor' : 'Value'}</th>
              <th>${isSpanish ? 'Unidad' : 'Unit'}</th>
              <th>${isSpanish ? 'Estado' : 'Status'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>LUFS ${isSpanish ? 'Integrado' : 'Integrated'}</td>
              <td>${analysis.lufs.toFixed(1)}</td>
              <td>LUFS</td>
              <td>${Math.abs(analysis.lufs + 14) <= 2 ? '✅ Óptimo' : '⚠️ Revisar'}</td>
            </tr>
            <tr>
              <td>True Peak</td>
              <td>${analysis.truePeak.toFixed(1)}</td>
              <td>dBTP</td>
              <td>${analysis.truePeak <= -1 ? '✅ Óptimo' : '❌ Alto'}</td>
            </tr>
            <tr>
              <td>${isSpanish ? 'Rango Dinámico' : 'Dynamic Range'}</td>
              <td>${analysis.dynamicRange.toFixed(1)}</td>
              <td>dB</td>
              <td>${analysis.dynamicRange >= 8 ? '✅ Óptimo' : '⚠️ Bajo'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      ${problemsSection}

      <div class="section">
        <h3>📋 ${isSpanish ? 'Referencias Normativas' : 'Normative References'}</h3>
        <p><strong>EBU R 128:</strong> ${isSpanish ? 'Recomendación europea para normalización de loudness' : 'European recommendation for loudness normalization'}</p>
        <p><strong>ITU-R BS.1770:</strong> ${isSpanish ? 'Estándar internacional para medición de loudness' : 'International standard for loudness measurement'}</p>
        <p><strong>AES TD1004.1.20-05:</strong> ${isSpanish ? 'Documento técnico para estándares digitales' : 'Technical document for digital standards'}</p>
      </div>
      
      <div class="footer">
        <div class="logo">🎵 GREAVES SAMPLES</div>
        <p><strong>${isSpanish ? 'Analizador Profesional de Mastering' : 'Professional Mastering Analyzer'}</strong></p>
        <p>${isSpanish ? 'Análisis técnico profesional con recomendaciones específicas' : 'Professional technical analysis with specific recommendations'}</p>
        <p><em>${isSpanish ? 'Complementar con escucha crítica profesional' : 'Complement with professional critical listening'}</em></p>
      </div>
    </body>
    </html>
  `;
}

// === UTILIDADES ===

function updateElementText(id, content) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = content;
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// === FUNCIONES GLOBALES ===

// Hacer funciones disponibles globalmente para máxima compatibilidad
window.processLogin = processLogin;
window.processRegister = processRegister;
window.toggleAuthenticationForm = toggleAuthenticationForm;
window.startDemoAnalysis = startDemoAnalysis;
window.handleLogout = handleLogout;
window.showHistoryScreen = showHistoryScreen;
window.showAdminScreen = showAdminScreen;
window.viewPreviousAnalysis = viewPreviousAnalysis;

console.log('🎵 === GREAVES SAMPLES MASTERING ANALYZER LOADED SUCCESSFULLY ===');