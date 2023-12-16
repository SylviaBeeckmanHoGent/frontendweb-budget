import axios from "axios";

const baseUrl = 'http://localhost:9000/api';

//async functie die alle transacties gaat ophalen
export const getAll = async (url) => { //url = key uit useSWR
  //we krijgen vanalles terug > dus enkel data uitpakken
  const { data } = await axios.get(`${baseUrl}/${url}`); //de get levert een Promise terug > dus await gebruiken
  return data.items;
};