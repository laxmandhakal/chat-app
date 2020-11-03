import axios from "axios";

const instance = axios.create({
    baseURL: "https://whatsapp-backend-app.herokuapp.com",
});

export default instance;