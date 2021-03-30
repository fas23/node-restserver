/* 
===========
PUERTO
===========
*/

process.env.PORT = process.env.PORT || 3000;


/* 
===========
Entorno
===========
*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* 
===========
Base de datos 
===========
*/

let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
}else {
    urlDB = 'mongodb+srv://fas23:Fasunju23@cafe.stfyt.mongodb.net/cafe?retryWrites=true&w=majority';
}


//creamos una variable de entorno URLDB
process.env.URLDB = urlDB;

