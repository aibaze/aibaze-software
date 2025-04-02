import axios from "axios";

const agenticallerApi = axios.create({
    baseURL: "http://localhost:4004/api/v1",
});

export  {agenticallerApi};