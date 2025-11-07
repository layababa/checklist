import { WorkflowRecord } from '@/api/workflow'

// 字段分组定义
export const fieldGroups = {
  // 更新内容
  updateContent: {
    label: '更新内容',
    fields: [
      { key: 'putDate', label: '上线时间', type: 'date' },
      { key: 'frontInfo', label: '前端更新内容与额外说明', type: 'textarea' },
      { key: 'serverInfo', label: '后端更新内容与额外说明', type: 'textarea' },
      { key: 'tableInfo', label: '表结构涉及更新与额外说明', type: 'textarea' },
    ],
  },

  // 测试环境确认
  testEnv: {
    label: '测试环境确认',
    subsections: {
      productConfirm: {
        label: '产品确认',
        fields: [
          { key: 'demand', label: '所有需求变更已同步', type: 'switch' },
          { key: 'prd', label: 'PRD文档已更新', type: 'switch' },
          { key: 'frontDemand', label: '客户端开发内容符合产品需求', type: 'switch' },
          { key: 'serverDemand', label: '服务端开发内容符合产品需求', type: 'switch' },
        ],
      },
      testConfirm: {
        label: '测试确认',
        fields: [
          { key: 'frontTest', label: '客户端更新模块已逐一测试', type: 'switch' },
          { key: 'serverTest', label: '服务端更新模块已逐一测试', type: 'switch' },
        ],
      },
      regressionTest: {
        label: '回归测试',
        fields: [
          { key: 'coreTest', label: '核心功能回归测试已完成', type: 'switch' },
          { key: 'relevanceTest', label: '关联功能回归测试已完成', type: 'switch' },
          { key: 'bugTest', label: '已知bug已修复或延期处理', type: 'switch' },
        ],
      },
    },
  },

  // 预发布流程确认
  preRelease: {
    label: '预发布流程确认',
    subsections: {
      tableChange: {
        label: '运维确认',
        fields: [
          { key: 'table1', label: '已review服务端提供的表结构变更', type: 'switch' },
          { key: 'table2', label: '表结构变更脚本已准备', type: 'switch' },
          { key: 'table3', label: '表结构变更已在预发布环境执行', type: 'switch' },
        ],
      },
      serverDeploy: {
        label: '服务端部署',
        fields: [
          { key: 'server1', label: '预发布环境代码已更新', type: 'switch' },
          { key: 'server2', label: '所有服务启动正常', type: 'switch' },
          { key: 'server3', label: '日志无异常报错', type: 'switch' },
          { key: 'server4', label: '配置文件已检查', type: 'switch' },
        ],
      },
      frontendDeploy: {
        label: '前端部署',
        fields: [
          { key: 'front1', label: '前端代码已发布到预发布环境', type: 'switch' },
          { key: 'front2', label: '静态资源已更新', type: 'switch' },
          { key: 'front3', label: 'CDN缓存已刷新', type: 'switch' },
          { key: 'front4', label: '页面访问正常', type: 'switch' },
        ],
      },
      testAccept: {
        label: '测试验收',
        fields: [
          { key: 'test1', label: '新功能在预发布环境测试通过', type: 'switch' },
          { key: 'test2', label: '核心流程验证通过', type: 'switch' },
          { key: 'test3', label: '数据准确性验证通过', type: 'switch' },
          { key: 'test4', label: '性能表现符合预期', type: 'switch' },
        ],
      },
      productAccept: {
        label: '产品验收',
        fields: [
          { key: 'product1', label: '产品功能符合需求', type: 'switch' },
          { key: 'product2', label: '用户体验符合预期', type: 'switch' },
          { key: 'product3', label: '文案/UI 无误', type: 'switch' },
          { key: 'product4', label: '业务流程验证通过', type: 'switch' },
        ],
      },
    },
  },

  // 生产流程确认
  production: {
    label: '生产流程确认',
    subsections: {
      operationsDeploy: {
        label: '运维发布',
        fields: [
          { key: 'prod1', label: '预发布验收已通过', type: 'switch' },
          { key: 'prod2', label: '生产环境数据库变更已执行', type: 'switch' },
          { key: 'prod3', label: '服务端代码已发布', type: 'switch' },
          { key: 'prod4', label: '服务启动正常', type: 'switch' },
          { key: 'prod5', label: '健康检查通过', type: 'switch' },
          { key: 'prod6', label: '监控指标正常', type: 'switch' },
        ],
      },
      frontendOpsDeploy: {
        label: '前端运维发布',
        fields: [
          { key: 'prod7', label: '前端代码已发布', type: 'switch' },
          { key: 'prod8', label: 'CDN缓存已刷新', type: 'switch' },
          { key: 'prod9', label: '页面访问正常', type: 'switch' },
        ],
      },
      testVerify: {
        label: '测试功能验证',
        fields: [
          { key: 'verify1', label: '新功能验证通过', type: 'switch' },
          { key: 'verify2', label: '核心功能验证通过', type: 'switch' },
          { key: 'verify3', label: '正常流程回归通过', type: 'switch' },
          { key: 'verify4', label: '数据一致性检查通过', type: 'switch' },
        ],
      },
      allConfirm: {
        label: '全员确认',
        fields: [
          { key: 'verify5', label: '客户端确认', type: 'switch' },
          { key: 'verify6', label: '服务端确认', type: 'switch' },
          { key: 'verify7', label: '运维确认', type: 'switch' },
          { key: 'verify8', label: '前端运维确认', type: 'switch' },
          { key: 'verify9', label: '测试确认', type: 'switch' },
          { key: 'verify10', label: '产品确认', type: 'switch' },
        ],
      },
    },
  },
}

// 获取角色的进度统计
export const getProgressByRole = (
  record: WorkflowRecord | null | undefined,
  role: number
): {
  completed: number
  total: number
  percentage: number
} => {
  if (!record) {
    return {
      completed: 0,
      total: 0,
      percentage: 0,
    }
  }

  const roleFieldMap: Record<number, string[]> = {
    0: [
      'demand',
      'prd',
      'frontDemand',
      'serverDemand',
      'product1',
      'product2',
      'product3',
      'product4',
      'verify10',
    ],
    1: ['frontTest', 'serverTest', 'coreTest', 'relevanceTest', 'bugTest', 'test1', 'test2', 'test3', 'test4', 'verify1', 'verify2', 'verify3', 'verify4', 'verify9'],
    2: ['front1', 'front2', 'front3', 'front4', 'prod7', 'prod8', 'prod9', 'prod10', 'verify5', 'verify8'],
    3: ['table1', 'table2', 'table3', 'server1', 'server2', 'server3', 'server4', 'prod1', 'prod2', 'prod3', 'prod4', 'prod5', 'prod6', 'verify6', 'verify7'],
  }

  const fields = roleFieldMap[role] || []
  const completed = fields.filter((f) => record[f as keyof WorkflowRecord] === true).length
  const total = fields.length

  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  }
}

// 判断字段是否锁定
export const isFieldLocked = (fieldName: string, record: WorkflowRecord | null | undefined): boolean => {
  if (!record) return false

  const value = record[fieldName as keyof WorkflowRecord]

  // 布尔项：true 为锁定
  if (typeof value === 'boolean') {
    return value === true
  }

  // 文本/日期项：非空为锁定
  if (typeof value === 'string') {
    return value !== '' && value !== null && value !== undefined
  }

  return false
}

// 获取完整的字段标签
export const getFieldLabel = (fieldName: string): string => {
  for (const group of Object.values(fieldGroups)) {
    if ('fields' in group) {
      const field = group.fields.find((f) => f.key === fieldName)
      if (field) return field.label
    } else if ('subsections' in group) {
      for (const subsection of Object.values(group.subsections)) {
        const field = subsection.fields.find((f) => f.key === fieldName)
        if (field) return field.label
      }
    }
  }
  return fieldName
}

