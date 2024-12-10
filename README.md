# Progetto Node.js

## Descrizione
Orizon Travel Agency API è un sistema backend completo sviluppato per gestire le operazioni di un'agenzia di viaggi moderna. L'applicazione offre un'interfaccia RESTful per la gestione di prodotti turistici, utenti e ordini, garantendo scalabilità e manutenibilità attraverso un'architettura modulare.

## Architettura
Il sistema è costruito seguendo il pattern architetturale MVC (Model-View-Controller), implementato attraverso Node.js e Express.js. L'architettura modulare permette una chiara separazione delle responsabilità tra i diversi componenti dell'applicazione.

## Tecnologie Utilizzate
- **Node.js**: Runtime JavaScript per il backend
- **Express.js**: Framework web per la gestione delle route e middleware
- **MongoDB**: Database NoSQL per la persistenza dei dati
- **Mongoose**: ODM per la modellazione dei dati
- **Joi**: Libreria per la validazione dei dati
- **Mocha**: Framework per il testing
- **Sinon**: Libreria per la creazione di stub e mock nei test

## Struttura del Database
Il database MongoDB è strutturato in tre collezioni principali:
- **Users**: Gestisce le informazioni degli utenti
- **Products**: Contiene il catalogo dei viaggi disponibili
- **Orders**: Registra gli ordini effettuati, collegando utenti e prodotti

## API Endpoints
- `/api/users`: Gestione completa degli utenti (CRUD)
- `/api/products`: Gestione del catalogo viaggi (CRUD)
- `/api/orders`: Gestione degli ordini (CRUD)

## Installazione e Setup

### Prerequisiti
- Node.js (versione 14 o superiore)
- MongoDB (versione 4 o superiore)
- npm (incluso con Node.js)

### Passi per l'installazione

1. **Clona il repository**
```bash
git clone [URL_DEL_REPOSITORY]
cd orizon-travel-api
```

2. **Installa le dipendenze**
```bash
npm install
```

3. **Configura le variabili d'ambiente**
Crea un file `.env` nella root del progetto:
```env
MONGODB_URI=mongodb://localhost:27017/orizon_travel
PORT=3000
NODE_ENV=development
```

4. **Avvia MongoDB**
```bash
mongod
```

5. **Avvia il server**
```bash
# Per sviluppo (con nodemon)
npm run dev

# Per produzione
npm start
```

### Test
Per eseguire i test:
```bash
npm test
```

## Sicurezza
Il sistema implementa diverse misure di sicurezza:
- Validazione dei dati in ingresso tramite Joi
- Sanitizzazione degli input
- Gestione centralizzata degli errori
- Validazione degli ID MongoDB

## Testing
La suite di test verifica:
- Funzionalità dei controller
- Validazione dei dati
- Gestione degli errori
- Integrazione tra i componenti

## Scalabilità e Performance
L'applicazione è ottimizzata per la scalabilità attraverso:
- Connessione pooling con MongoDB
- Gestione efficiente delle risorse
- Architettura modulare
- Caching delle query frequenti

## Sviluppi Futuri
- Implementazione di autenticazione JWT
- Sistema di notifiche
- Integrazione con servizi di pagamento
- Dashboard amministrativa

## Struttura del Progetto
```
Progetto Node js/
├── config/
│   └── database.js
├── controllers/
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
├── middleware/
│   └── validationMiddleware.js
├── models/
│   ├── Order.js
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── test/
│   ├── orderTest.js
│   ├── productTest.js
│   └── userTest.js
├── .env
├── server.js
└── package.json
```
