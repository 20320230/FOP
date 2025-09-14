const CACHE_NAME = 'isovolta-cache-v1';

// Archivos generales
const FILES_TO_CACHE = [
    'FORMAR AL PERSONAL.html',
    'isovolta.ico',
    'manifest.json',
    'service-worker.js',
    'style.css'
];

// Rutas de archivos dentro de las carpetas
const FOLDER_PATHS = [
 'FOP/'
];

// Obtener todos los archivos dentro de las carpetas
// Aquí es donde debes agregar manualmente los archivos dentro de cada carpeta si tienes nombres específicos
const ADDITIONAL_FILES = [
    // Ejemplo de cómo agregar archivos dentro de una carpeta
'FOP/Gantt.html',   
'FOP/Lista_Asistencia.html',     
'FOP/Matriz de capacitacion.html', 
'FOP/Personas_iluo.html', 
'FOP/Pendientes_reentrenar.html', 
'FOP/Calificaciones.html',  
'FOP/Matriz_iluo.html', 
'FOP/Matriz Competencias.html',    
'FOP/Examenes.html',  
'FOP/isovolta.ico',  

    // Agrega más archivos aquí según la estructura real de tus carpetas
];

// Combina los archivos generales con los archivos dentro de las carpetas
const ALL_FILES_TO_CACHE = [...FILES_TO_CACHE, ...ADDITIONAL_FILES];

// Instala el service worker y guarda los archivos en caché
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ALL_FILES_TO_CACHE);
        })
    );
});

// Responde con los archivos desde el caché o realiza una solicitud a la red
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(response => {
            return response || fetch(evt.request);
        })
    );
});

