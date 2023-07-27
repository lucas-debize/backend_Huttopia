const axios = require('axios');
const API_KEY = 'pat-na1-e9a27d01-43f8-4e0c-b158-192a5d0cf71c';
const BASE_URL = 'https://api.hubapi.com/';
const routes_contact = require('./routes/contacts');
const routes_companies = require('./routes/companies');
const routes_tickets = require('./routes/tickets');
const routes_transactions = require('./routes/transactions');

async function main() {
  try {
    const contacts = await routes_contact.getContacts();
    console.log(contacts);
    console.log('Liste des contacts:', contacts);
  } catch (error) {
    console.error('Une erreur est survenue:', error.message);
  }
}

main();
