const axios = require('axios');
const API_KEY = 'pat-na1-e9a27d01-43f8-4e0c-b158-192a5d0cf71c';
const BASE_URL = 'https://api.hubapi.com/';

function handleRequestError(error) {
  console.error('In Tickets :');
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

async function getTickets() {
  try {
    const response = await axios.get(`${BASE_URL}/crm-objects/v1/objects/tickets`, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function getTicketById(ticketId) {
  try {
    const response = await axios.get(`${BASE_URL}/crm-objects/v1/objects/tickets/${ticketId}`, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function createTicket(ticket) {
  try {
    const response = await axios.post(`${BASE_URL}/crm-objects/v1/objects/tickets`, ticket, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function updateTicket(ticketId, updatedData) {
  try {
    const response = await axios.put(`${BASE_URL}/crm-objects/v1/objects/tickets/${ticketId}`, updatedData, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function deleteTicket(ticketId) {
  try {
    const response = await axios.delete(`${BASE_URL}/crm-objects/v1/objects/tickets/${ticketId}`, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
};