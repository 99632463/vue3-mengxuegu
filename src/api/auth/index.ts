import request from "@/utils/request";

const baseUrl = '/auth'

export function login(query: LoginData) {
   return request({
      url: `${baseUrl}/token`,
      method: 'post',
      data: query
   })
}
