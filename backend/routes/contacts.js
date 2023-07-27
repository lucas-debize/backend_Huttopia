const axios = require('axios');
const API_KEY = 'pat-na1-e9a27d01-43f8-4e0c-b158-192a5d0cf71c';
const BASE_URL = 'https://api.hubapi.com/';

function handleRequestError(error) {
  console.error('In Contacts :');
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

async function getContacts() {
  try {
    const response = await axios.get(`${BASE_URL}/contacts/v1/lists/all/contacts/all`, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function getContactById(contactId) {
  try {
    const response = await axios.get(`${BASE_URL}/crm/v3/objects/contacts/${contactId}`, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function createContact(contact) {
  try {
    const response = await axios.post(`${BASE_URL}/contacts/v1/contact`, contact, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function updateContact(contactId, updatedData) {
  try {
    const response = await axios.put(`${BASE_URL}/contacts/v1/contact/vid/${contactId}/profile`, updatedData, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function deleteContact(contactId) {
  try {
    const response = await axios.delete(`${BASE_URL}/contacts/v1/contact/vid/${contactId}`, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};