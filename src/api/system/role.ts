import request from '@/utils/request'

const baseUrl = '/system/role'

export function getPageList(query: SysRoleQuery, current = 1, size = 20) {
   return request({
      url: `${baseUrl}/search`,
      method: 'post',
      data: {...query, current, size}
   })
}

export function getMenuIdsByRoleId(roleId: string) {
   return request({
      url: `/system/role/${roleId}/menu/ids`,
      method: 'get'
   })
}

export function saveRoleMenu(roleId: string, menuIds: string[]) {
   return request({
      url: `/system/role/${roleId}/menu/ids`,
      method: 'post',
      data: menuIds
   })
}

export function getRoleList() {
   return request({
      url: `${baseUrl}/list`,
      method: 'get'
   })
}

export function add(data: SysRoleType) {
   return request({
      url: `${baseUrl}`,
      method: 'post',
      data
   })
}

export function update(data: SysRoleType) {
   return request({
      url: `${baseUrl}`,
      method: 'put',
      data
   })
}