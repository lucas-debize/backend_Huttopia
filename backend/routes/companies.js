const axios = require('axios');
const API_KEY = 'pat-na1-e9a27d01-43f8-4e0c-b158-192a5d0cf71c';
const BASE_URL = 'https://api.hubapi.com/';

function handleRequestError(error) {
  console.error('In Companies :');
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

async function getCompanies() {
  try {
    const response = await axios.get(`${BASE_URL}/companies/v2/companies/`, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function getCompanyById(companyId) {
  try {
    const response = await axios.get(`${BASE_URL}/companies/v2/companies/${companyId}`, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function createCompany(company) {
  try {
    const response = await axios.post(`${BASE_URL}/companies/v2/companies`, company, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function updateCompany(companyId, updatedData) {
  try {
    const response = await axios.put(`${BASE_URL}/companies/v2/companies/${companyId}`, updatedData, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

async function deleteCompany(companyId) {
  try {
    const response = await axios.delete(`${BASE_URL}/companies/v2/companies/${companyId}`, {
      headers: { 'Authorization' : `Bearer ${API_KEY}`},
    });
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
}

module.exports = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
};