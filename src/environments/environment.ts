// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  END_POINT: 'https://api.entrepatasch.com/',
  //END_POINT: 'http://localhost:9002/',
  TIMEOUT: 10000,
  MESSAGE_TIMEOUT: 'Tiempo de respuesta excedido',
  MESSAGE_ERROR_CONNECTION: 'Error al comunicarse con el servidor',
  MESSAGE_UNKNOWN: 'Error desconocido',
  SAVED_SUCCESS: 'Se guardó correctamente',

};
