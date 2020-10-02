import Axios from "axios"

export const createCategory = async(formData) =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await Axios.post('/api/category', formData, config);
    return response;
}