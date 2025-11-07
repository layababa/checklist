import http from './http'

export interface WorkflowRecord {
  id?: number | string
  frontInfo?: string
  serverInfo?: string
  tableInfo?: string
  putDate?: string
  demand?: boolean
  prd?: boolean
  frontDemand?: boolean
  serverDemand?: boolean
  frontTest?: boolean
  serverTest?: boolean
  coreTest?: boolean
  relevanceTest?: boolean
  bugTest?: boolean
  table1?: boolean
  table2?: boolean
  table3?: boolean
  server1?: boolean
  server2?: boolean
  server3?: boolean
  server4?: boolean
  front1?: boolean
  front2?: boolean
  front3?: boolean
  front4?: boolean
  test1?: boolean
  test2?: boolean
  test3?: boolean
  test4?: boolean
  product1?: boolean
  product2?: boolean
  product3?: boolean
  product4?: boolean
  prod1?: boolean
  prod2?: boolean
  prod3?: boolean
  prod4?: boolean
  prod5?: boolean
  prod6?: boolean
  prod7?: boolean
  prod8?: boolean
  prod9?: boolean
  prod10?: boolean
  verify1?: boolean
  verify2?: boolean
  verify3?: boolean
  verify4?: boolean
  verify5?: boolean
  verify6?: boolean
  verify7?: boolean
  verify8?: boolean
  verify9?: boolean
  verify10?: boolean
  createBy?: string
  createTime?: string
  updateBy?: string
  updateTime?: string
}

export interface ListResponse {
  code: number
  rows: WorkflowRecord[]
  msg?: string
  total?: number
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  code: number
  msg: string
  token: string
  role: number
}

// 登录
export const login = (data: LoginRequest) => {
  return http.post<LoginResponse>('/login', data)
}

// 获取列表
export const getWorkflowList = (params: { pageNum: number; pageSize: number; [key: string]: any }) => {
  return http.get<ListResponse>('/system/workflow/list', { params })
}

// 获取单个记录
export const getWorkflow = (id: number | string) => {
  return http.get<{ code: number; data: WorkflowRecord }>(`/system/workflow/${id}`)
}

// 新增
export const createWorkflow = (data: WorkflowRecord) => {
  return http.post<{ code: number; data: WorkflowRecord; msg: string }>('/system/workflow', data)
}

// 更新（最小化提交：仅更新指定字段）
export const updateWorkflow = (id: number | string, data: Partial<WorkflowRecord>) => {
  return http.put<{ code: number; data: WorkflowRecord; msg: string }>('/system/workflow', {
    id,
    ...data,
  })
}

// 删除
export const deleteWorkflow = (id: number | string) => {
  return http.delete<{ code: number; msg: string }>(`/system/workflow/${id}`)
}

