import axios from "axios";

const aibazeApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL || 'https://api.aibaze.com'}/api/v1`,
});

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL || 'https://api.aibaze.com'}/api`,
});


export  {aibazeApi,api};