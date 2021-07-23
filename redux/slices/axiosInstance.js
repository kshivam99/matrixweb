import baseUrl from "../../utilsClient/baseUrl";
import axios from "axios";


export function createInstance(token, path){
  return axios.create({
    baseURL: `${baseUrl}${path}`,
    headers: { Authorization: token },
  })
}

