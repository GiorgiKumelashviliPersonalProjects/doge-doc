import axios from 'axios';
import {consts} from "./consts";

export const http = axios.create({
  baseURL: consts.backendApiUrl,
  timeout: 10000,
});

