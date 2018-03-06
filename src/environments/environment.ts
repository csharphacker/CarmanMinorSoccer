// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: 'AIzaSyCHhriyQAxp2rr69lngjJAjychfgmqAFz0',
      authDomain: 'carmanminorsoccer-test.firebaseapp.com',
      databaseURL: 'https://carmanminorsoccer-test.firebaseio.com',
      projectId: 'carmanminorsoccer-test',
      storageBucket: 'carmanminorsoccer-test.appspot.com',
      messagingSenderId: '725071391335'
    }
};
