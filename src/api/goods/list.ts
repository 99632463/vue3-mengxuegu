import request from "@/utils/request";

const baseUrl = '/goods'

export function getPageList(query: GoodsQuery, current = 1, size = 10) {
   return request({
      url: `${baseUrl}/search`,
      method: 'post',
      data: {...query, current, size}
   })
}
