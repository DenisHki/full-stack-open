import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const deletePersonById = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const updateNumber = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson);
  return request.then((response) => response.data);
};

const personService = {
  getAll,
  create,
  deletePersonById,
  updateNumber,
};
export default personService;
