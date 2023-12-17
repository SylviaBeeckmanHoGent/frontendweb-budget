import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

//url krijgen we door van de SWR
export const getAll = async (url) => {
  const {
    data,
  } = await axios.get(`${baseUrl}/${url}`); 

  return data.items;
};

export const deleteById = async (url, { arg: id }) => {
  await axios.delete(`${baseUrl}/${url}/${id}`);
};

export const save = async (url, { arg: body }) => {
  const { id, ...values } = body;
  await axios({
    method: id ? 'PUT' : 'POST',
    url: `${baseUrl}/${url}/${id ?? ''}`,
    data: values,
  });
};

//url krijgen we door van de SWR > arg: id is niet nodig want die wordt al meegegeven in de url van SWR
export const getById = async (url) => {
  const {
    data,
  } = await axios.get(`${baseUrl}/${url}`);

  return data;
};
