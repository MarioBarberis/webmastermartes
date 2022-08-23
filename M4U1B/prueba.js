const moment = require('moment');
moment.locale('es');
console.log('Naci ' + moment('09/02/1993','dd/mm/yyyy').fromNow() )