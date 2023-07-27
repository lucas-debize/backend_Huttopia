const axios = require('axios');
const API_KEY = 'pat-na1-e9a27d01-43f8-4e0c-b158-192a5d0cf71c';
const BASE_URL = 'https://api.hubapi.com/';

function handleRequestError(error) {
  console.error('In Transactions :');
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

async function getTransactions() {
  try {
    const response = await axios.get(`${BASE_URL}/deals/v1/deal/paged`, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data.deals;
  } catch (error) {
    handleRequestError(error);
  }
}

async function getTransactionById(transactionId) {
  try {
    const response = await axios.get(`${BASE_URL}/deals/v1/deal/${transactionId}`, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function createTransaction(transaction) {
  try {
    const response = await axios.post(`${BASE_URL}/deals/v1/deal`, transaction, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function updateTransaction(transactionId, updatedData) {
  try {
    const response = await axios.put(`${BASE_URL}/deals/v1/deal/${transactionId}`, updatedData, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function deleteTransaction(transactionId) {
  try {
    const response = await axios.delete(`${BASE_URL}/deals/v1/deal/${transactionId}`, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

module.exports = {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
};