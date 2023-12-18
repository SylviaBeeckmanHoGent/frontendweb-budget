import axiosRoot from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

//axios instantie maken die zich afsplitst van de axiosRoot
//we maken dus een duplicaat aan en geven andere configuratie mee
const axios = axiosRoot.create({
  baseURL: baseUrl,
});

export const setAuthToken = (token) => {
  if (token) {
    //axios.defaults = standaard voor elke request
    //headers = object waar je de HTTP-headers mee kan instellen
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    //wordt niet op null gezet maar gewoon echt volledig verwijderd
    delete axios.defaults.headers['Authorization'];
  }
}

//url krijgen we door van de SWR
export const getAll = async (url) => {
  const {
    data,
  } = await axios.get(url); 

  return data.items;
};

export const deleteById = async (url, { arg: id }) => {
  await axios.delete(`${url}/${id}`);
};

export const save = async (url, { arg: body }) => {
  const { id, ...values } = body;
  await axios({
    method: id ? 'PUT' : 'POST',
    url: `${url}/${id ?? ''}`,
    data: values,
  });
};

//url krijgen we door van de SWR > arg: id is niet nodig want die wordt al meegegeven in de url van SWR
export const getById = async (url) => {
  const {
    data,
  } = await axios.get(url);

  return data;
};

//url is de key die ik meegeef aan SWR; wij krijgen een trigger functie terug van SWR en die komt binnen via arg
//arg zal hier het e-mailadres + wachtwoord bevatten
export const post = async (url, { arg }) => {
  const { data } = await axios.post(url, arg);
  return data;
}