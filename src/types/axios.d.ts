import * as axios from 'axios';

declare module 'axios' {
  export interface AxiosResponse {
    code: number;
    message: string;
    data: any;
  }
}
