//
//API alphavantage :  J2P1QBD2TNF8JITY
//API finhub : cqsckkpr01qg43b8dgh0cqsckkpr01qg43b8dghg
//API fmp : nlxgH1uIYtZzQrVvyLsOkXLsN3he4HPt
//API nasdaq : njHszFhNKbZ-3GYRKHia

import axios, { AxiosInstance } from 'axios';
import { Cookies } from 'quasar';
//import { Configurable } from 'src/classes/Configurable';
import {
  ApiError,
  ApiInternalError,
//  ApiUnauthorizedError,
} from 'src/classes/ApiError';
//import { useRoute } from 'vue-router'

export interface ApiConfig {
  baseUrl: string;
}

export class Api {
  private _unAuthenticatedAxios: AxiosInstance | undefined;
  private baseUrl = 'https://api.exchange.coinbase.com/';

  public async info(url: string) {
    const response = await this._getUnauthenticatedAxios().get(url.replace('https://api.exchange.coinbase.com', ''));
    return response.data;
  }
  public async prix(url: string) {
    const response = await this._getUnauthenticatedAxios().get(url.replace('https://api.exchange.coinbase.com', ''));
    return response.data;
  }
  public async allAct() {
    const response = await this._getUnauthenticatedAxios().get('https://api.exchange.coinbase.com/products');
    return response.data;
  }
  public async fmpData(url: string) {
    const response = await this._getUnauthenticatedAxios().get('https://financialmodelingprep.com/api/v3/' + url + 'apikey=nlxgH1uIYtZzQrVvyLsOkXLsN3he4HPt');
    return response.data;
  }
  public async fmpData2(url: string) {
    const response = await this._getUnauthenticatedAxios().get('https://financialmodelingprep.com/api/v3/' + url + 'apikey=2iyWSRWL2pSkY2QbvkRqvapyYD4T0vUf');
    return response.data;
  }
  /* public async ran() {
    const response = await this._getUnauthenticatedAxios().get('https://thingproxy.freeboard.io/fetch/https://www.etoro.com/sapi/candles/candles/desc.json/OneDay/365/1111?client_request_id=4943bbf3-504b-4865-861a-d43b8bbfc434');
    return response.data;
  } */

  private _getUnauthenticatedAxios(): AxiosInstance {
    if (this._unAuthenticatedAxios === undefined) {
      this._unAuthenticatedAxios = axios.create({
        baseURL: this.baseUrl,
      });
      this._unAuthenticatedAxios.interceptors.request.use(
        async requestConfig => {
          return requestConfig;
        }
      );
      this._unAuthenticatedAxios.interceptors.response.use(
        res => {
          if (res.data.cookies !== undefined) {
            for (const cookie of res.data.cookies) {
              Cookies.set(cookie, res.data.cookies[cookie]);
            }
          }
          return res;
        },
        async error => {
          if (error?.response?.data !== undefined) {
            throw new ApiError(error?.response?.data);
          } else {
            throw new ApiInternalError(error);
          }
        }
      );
    }
    return this._unAuthenticatedAxios;
  }

}
