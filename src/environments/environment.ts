// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  END_POINT: 'http://localhost:9002/api/',
  TIMEOUT: 10000,
  MESSAGE_TIMEOUT: 'Tiempo de respuesta excedido',
  MESSAGE_ERROR_CONNECTION: 'Error al comunicarse con el servidor',
  MESSAGE_UNKNOWN: 'Error desconocido',
  SAVED_SUCCESS: 'Se guardó correctamente',

  // monitor
  ventanillasPorPaginaMonitor: 5,

  // socket
  socketHost: 'localhost:9003'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
