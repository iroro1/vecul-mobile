import { jwtDecode } from "jwt-decode";

import { decode } from "base-64";
global.atob = decode;

export const BASE_URL = "https://api.vecul.co/";
export const API_VERSION = "v1";
export const decodeJwt = (jwt) => jwtDecode(jwt);
