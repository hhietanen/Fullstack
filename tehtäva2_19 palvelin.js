import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
	if (window.confirm(`${newObject.name} on jo luettelossa. Korvataanko vanha numero uudella tiedolla?`)){
  return axios.put(`${baseUrl}/${id}`, newObject)
	}
 return axios.get(baseUrl)
}

const remove = (id) => {
	if (window.confirm(`Haluatko varmasti tuhota käyttäjä #${id}?`)){
  		return axios.delete(`${baseUrl}/${id}`)
	}
 return axios.get(baseUrl)
}

export default { getAll, create, update, remove }