import axios from "axios";

const aibazeApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
});

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});


export  {aibazeApi,api};