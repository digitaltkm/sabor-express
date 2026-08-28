# Tareas completadas

- [x] Implementar una portada visual asimétrica con la identidad Ruta Retro-Fuego.
- [x] Construir la carta filtrable y las tarjetas de producto con acciones simuladas.
- [x] Añadir una cesta lateral y controles de cantidad sin procesos de pago ni pedidos reales.
- [x] Verificar los diseños de escritorio y móvil antes de entregar la maqueta.

## Migración full-stack y almacenamiento

- [x] Revisar la guía full-stack y confirmar el alcance del almacenamiento de imágenes del menú.
- [x] Activar la capacidad full-stack con servidor, base de datos y gestión de usuarios.
- [x] Integrar subida, listado y eliminación segura de imágenes de productos.
- [x] Conectar la interfaz de administración visual con el almacenamiento persistente.
- [x] Verificar permisos, estados de carga, errores y compatibilidad responsive.


- [x] Corregir la referencia `useAuth` no definida en `client/src/pages/Home.tsx` y validar el renderizado de `/`.


## Correcciones de robustez detectadas

- [x] Rechazar explícitamente archivos mayores de 8 MB sin truncarlos y cubrirlo con una prueba.
- [x] Mostrar estados de error visibles para la carga y eliminación de archivos.
- [x] Verificar el panel de medios en móvil y comprobar el acceso prohibido para usuarios no autorizados.

- [x] Probar el endpoint real de subida con un payload mayor de 8 MB y confirmar respuesta 413 sin persistencia.

- [x] Añadir una prueba de integración HTTP del endpoint de subida con payload mayor de 8 MB.
- [x] Confirmar en esa prueba que storagePut y createMenuAsset no se ejecutan ante un 413.

## Exportación completa del proyecto

- [ ] Revisar la estructura y los recursos que deben formar parte del paquete exportable.
- [ ] Generar y verificar la carpeta `dist/` con el build de producción.
- [ ] Empaquetar código fuente, configuración, migraciones y recursos visuales sin secretos ni dependencias locales.
- [ ] Validar el contenido final del ZIP y entregarlo para descarga.
