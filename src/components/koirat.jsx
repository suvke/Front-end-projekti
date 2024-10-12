//tietokantakäsittelijä
import axios from 'axios';

let palvelin = 'http://localhost:8080/koira/';

export const getKoirat = async () => {
  try {
    const response = await axios.get(palvelin + 'all');
    return ({ status: response.status, data: response.data });
  } catch (error) {
    return ({ status: response.status, message: 'Haku ei onnistunut: ' + error.message });
  }
}

export const addKoira = async (koira) => {
  try {
    const response = await axios.post(palvelin + 'add', koira);
    return ({ status: response.status, data: response.data });
  } catch (error) {
    return ({ status: response.status, message: 'Lisäys ei onnistunut: ' + error.message })
  }
}

//tätä toimintoa ei toteutettu käyttöliittymään
export const deleteKoira = async (id) => {
  try {
    const response = await axios.delete(palvelin + 'delete/' +  id);
    return ({ status: response.status, data: response.data });
  } catch (error) {
    return ({ status: response.status, message: 'Poisto ei onnistunut: ' + error.message })
  }
}

export const getKuvat = async () => {
  try {
    const response = await axios.get(palvelin + 'kuvat');
    return ({ status: response.status, data: response.data });
  } catch (error) {
    return ({ status: response.status, message: 'Kuvien haku ei onnistunut: ' + error.message })
  }
}