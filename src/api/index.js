import axios from "axios";

const agenticallerApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
});

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});


export  {agenticallerApi,api};