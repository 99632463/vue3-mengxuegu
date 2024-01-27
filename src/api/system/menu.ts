import request from '@/utils/request'

const baseUrl = '/system/menu'

export function getList(query?: SysMenuQuery) {
   return request({
      url: `${baseUrl}/search`,
      method: 'post',
      data: query
   })
}

export function getMenuSelect() {
   return request({
      url: `${baseUrl}/select`,
      method: 'get'
   })
}

export function add(data: SysMenuType) {
   return request({
      url: `${baseUrl}`,
      method: 'post',
      data
   })
}

export function update(data: SysMenuType) {
   return request({
      url: `${baseUrl}`,
      method: 'put',
      data
   })
}

export function getMenuUser() {
   return request({
      url: `${baseUrl}/user`,
      method: 'get'
   })
}