// 角色常量
export const ROLES = {
  PRODUCT: 0,
  TEST: 1,
  FRONTEND: 2,
  BACKEND: 3,
} as const

export type RoleType = typeof ROLES[keyof typeof ROLES]

// 角色名称映射
const roleNameMap: Record<RoleType, string> = {
  [ROLES.PRODUCT]: '产品',
  [ROLES.TEST]: '测试',
  [ROLES.FRONTEND]: '前端',
  [ROLES.BACKEND]: '后端',
}

export const getRoleName = (role: number | null | undefined): string => {
  if (role === null || role === undefined) return '未登录'
  return roleNameMap[role as RoleType] || '未知角色'
}

// 角色权限域映射
const rolePermissionMap: Record<RoleType, string[]> = {
  [ROLES.PRODUCT]: ['chanpin'],
  [ROLES.TEST]: ['ceshi'],
  [ROLES.FRONTEND]: ['qianduan'],
  [ROLES.BACKEND]: ['houduan'],
}

export const getRolePermissions = (role: number | null | undefined): string[] => {
  if (role === null || role === undefined) return []
  return rolePermissionMap[role as RoleType] || []
}

// 判断字段是否可被该角色编辑
export const canEditField = (fieldName: string, role: number | null): boolean => {
  if (role === null) return false

  const editableFields: Record<RoleType, string[]> = {
    [ROLES.PRODUCT]: [
      'demand',
      'prd',
      'frontDemand',
      'serverDemand',
      'product1',
      'product2',
      'product3',
      'product4',
      'verify10',
      'putDate',
    ],
    [ROLES.TEST]: [
      'frontTest',
      'serverTest',
      'coreTest',
      'relevanceTest',
      'bugTest',
      'test1',
      'test2',
      'test3',
      'test4',
      'verify1',
      'verify2',
      'verify3',
      'verify4',
      'verify9',
    ],
    [ROLES.FRONTEND]: [
      'front1',
      'front2',
      'front3',
      'front4',
      'prod7',
      'prod8',
      'prod9',
      'prod10',
      'verify5',
      'verify8',
      'frontInfo',
    ],
    [ROLES.BACKEND]: [
      'table1',
      'table2',
      'table3',
      'server1',
      'server2',
      'server3',
      'server4',
      'prod1',
      'prod2',
      'prod3',
      'prod4',
      'prod5',
      'prod6',
      'verify6',
      'verify7',
      'serverInfo',
      'tableInfo',
    ],
  }

  const fields = editableFields[role as RoleType] || []
  return fields.includes(fieldName)
}

