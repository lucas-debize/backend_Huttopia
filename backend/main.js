const axios = require('axios');
const API_KEY = 'pat-na1-e9a27d01-43f8-4e0c-b158-192a5d0cf71c';
const BASE_URL = 'https://api.hubapi.com/';
const routes_contact = require('./routes/contacts');
const routes_companies = require('./routes/companies');
const routes_tickets = require('./routes/tickets');
const routes_transactions = require('./routes/transactions');

function handleRequestError(error) {
  console.error('In Link :');
  if (error.response) {
    const { status, data } = error.response;
    console.error(`Erreur de requête: ${status} - ${data.message}`);
    throw new Error(data.message);
  } else if (error.request) {
    console.error('Erreur de requête: Aucune réponse du serveur.');
    throw new Error('Erreur de réseau. Veuillez réessayer.');
  } else {
    console.error('Erreur de requête:', error.message);
    throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
  }
}

async function linkTransactionToContact(transactionId, contactId) {
  try {
    const response = await axios.put(
      `${BASE_URL}/contacts/v1/contact/vid/${contactId}/associations/transaction/${transactionId}`,
      {},
      { headers: { 'Authorization' : `Bearer ${API_KEY}`} }
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

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
