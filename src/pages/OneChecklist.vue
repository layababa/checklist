<template>
  <div class="one-checklist-page">
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="10" animated />
    </div>
    <div v-else-if="record" class="card">
      <!-- 顶部信息 -->
      <div class="header-info">
        <div class="info-item">
          <span class="label">ID:</span>
          <span class="value">{{ record.id }}</span>
        </div>
        <el-button type="primary" @click="goBack" class="back-button">返回列表</el-button>
      </div>

      <!-- 更新内容 -->
      <div class="section">
        <h2 class="section-title">📝 更新内容</h2>
        <div class="form-group">
          <div class="form-row">
            <label class="form-label">上线时间</label>
            <ConfirmableDate
              :model-value="record.putDate || ''"
              field-name="putDate"
              :record-id="recordId"
              :record="record"
              @update="(val) => updateRecord('putDate', val)"
            />
          </div>
          <div class="form-row">
            <label class="form-label">前端更新内容与额外说明</label>
            <ConfirmableTextarea
              :model-value="record.frontInfo || ''"
              field-name="frontInfo"
              :record-id="recordId"
              :record="record"
              @update="(val) => updateRecord('frontInfo', val)"
            />
          </div>
          <div class="form-row">
            <label class="form-label">后端更新内容与额外说明</label>
            <ConfirmableTextarea
              :model-value="record.serverInfo || ''"
              field-name="serverInfo"
              :record-id="recordId"
              :record="record"
              @update="(val) => updateRecord('serverInfo', val)"
            />
          </div>
          <div class="form-row">
            <label class="form-label">表结构涉及更新与额外说明</label>
            <ConfirmableTextarea
              :model-value="record.tableInfo || ''"
              field-name="tableInfo"
              :record-id="recordId"
              :record="record"
              @update="(val) => updateRecord('tableInfo', val)"
            />
          </div>
        </div>
      </div>

      <!-- 折叠面板：测试环境确认、预发布流程确认、生产流程确认 -->
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item name="testEnv" title="🧪 测试环境确认">
          <div class="section-content">

        <!-- 产品确认 -->
        <div class="subsection">
          <h3 class="subsection-title">产品确认</h3>
          <div class="switch-group">
            <div class="switch-item" :class="{ 'is-confirmed': record.demand }">
              <label>所有需求变更已同步</label>
              <RoleLockSwitch
                :model-value="record.demand || false"
                field-name="demand"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('demand', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.prd }">
              <label>PRD文档已更新</label>
              <RoleLockSwitch
                :model-value="record.prd || false"
                field-name="prd"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('prd', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.frontDemand }">
              <label>客户端开发内容符合产品需求</label>
              <RoleLockSwitch
                :model-value="record.frontDemand || false"
                field-name="frontDemand"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('frontDemand', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.serverDemand }">
              <label>服务端开发内容符合产品需求</label>
              <RoleLockSwitch
                :model-value="record.serverDemand || false"
                field-name="serverDemand"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('serverDemand', val)"
              />
            </div>
          </div>
        </div>

        <!-- 测试确认 -->
        <div class="subsection">
          <h3 class="subsection-title">测试确认</h3>
          <div class="switch-group">
            <div class="switch-item" :class="{ 'is-confirmed': record.frontTest }">
              <label>客户端更新模块已逐一测试</label>
              <RoleLockSwitch
                :model-value="record.frontTest || false"
                field-name="frontTest"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('frontTest', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.serverTest }">
              <label>服务端更新模块已逐一测试</label>
              <RoleLockSwitch
                :model-value="record.serverTest || false"
                field-name="serverTest"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('serverTest', val)"
              />
            </div>
          </div>
        </div>

        <!-- 回归测试 -->
        <div class="subsection">
          <h3 class="subsection-title">回归测试</h3>
          <div class="switch-group">
            <div class="switch-item" :class="{ 'is-confirmed': record.coreTest }">
              <label>核心功能回归测试已完成</label>
              <RoleLockSwitch
                :model-value="record.coreTest || false"
                field-name="coreTest"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('coreTest', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.relevanceTest }">
              <label>关联功能回归测试已完成</label>
              <RoleLockSwitch
                :model-value="record.relevanceTest || false"
                field-name="relevanceTest"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('relevanceTest', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.bugTest }">
              <label>已知bug已修复或延期处理</label>
              <RoleLockSwitch
                :model-value="record.bugTest || false"
                field-name="bugTest"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('bugTest', val)"
              />
            </div>
          </div>
        </div>
          </div>
        </el-collapse-item>

        <el-collapse-item name="preRelease" title="📦 预发布流程确认">
          <div class="section-content">

        <!-- 运维确认 -->
        <div class="subsection">
          <h3 class="subsection-title">运维确认</h3>
          <div class="switch-group">
            <div class="switch-item" :class="{ 'is-confirmed': record.table1 }">
              <label>已review服务端提供的表结构变更</label>
              <RoleLockSwitch
                :model-value="record.table1 || false"
                field-name="table1"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('table1', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.table2 }">
              <label>表结构变更脚本已准备</label>
              <RoleLockSwitch
                :model-value="record.table2 || false"
                field-name="table2"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('table2', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.table3 }">
              <label>表结构变更已在预发布环境执行</label>
              <RoleLockSwitch
                :model-value="record.table3 || false"
                field-name="table3"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('table3', val)"
              />
            </div>
          </div>
        </div>

        <!-- 服务端部署 -->
        <div class="subsection">
          <h3 class="subsection-title">服务端部署</h3>
          <div class="switch-group">
            <div class="switch-item" :class="{ 'is-confirmed': record.server1 }">
              <label>预发布环境代码已更新</label>
              <RoleLockSwitch
                :model-value="record.server1 || false"
                field-name="server1"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('server1', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.server2 }">
              <label>所有服务启动正常</label>
              <RoleLockSwitch
                :model-value="record.server2 || false"
                field-name="server2"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('server2', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.server3 }">
              <label>日志无异常报错</label>
              <RoleLockSwitch
                :model-value="record.server3 || false"
                field-name="server3"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('server3', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.server4 }">
              <label>配置文件已检查</label>
              <RoleLockSwitch
                :model-value="record.server4 || false"
                field-name="server4"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('server4', val)"
              />
            </div>
          </div>
        </div>

        <!-- 前端部署 -->
        <div class="subsection">
          <h3 class="subsection-title">前端部署</h3>
          <div class="switch-group">
            <div class="switch-item" :class="{ 'is-confirmed': record.front1 }">
              <label>前端代码已发布到预发布环境</label>
              <RoleLockSwitch
                :model-value="record.front1 || false"
                field-name="front1"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('front1', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.front2 }">
              <label>静态资源已更新</label>
              <RoleLockSwitch
                :model-value="record.front2 || false"
                field-name="front2"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('front2', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.front3 }">
              <label>CDN缓存已刷新</label>
              <RoleLockSwitch
                :model-value="record.front3 || false"
                field-name="front3"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('front3', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.front4 }">
              <label>页面访问正常</label>
              <RoleLockSwitch
                :model-value="record.front4 || false"
                field-name="front4"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('front4', val)"
              />
            </div>
          </div>
        </div>

        <!-- 测试验收 -->
        <div class="subsection">
          <h3 class="subsection-title">测试验收</h3>
          <div class="switch-group">
            <div class="switch-item" :class="{ 'is-confirmed': record.test1 }">
              <label>新功能在预发布环境测试通过</label>
              <RoleLockSwitch
                :model-value="record.test1 || false"
                field-name="test1"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('test1', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.test2 }">
              <label>核心流程验证通过</label>
              <RoleLockSwitch
                :model-value="record.test2 || false"
                field-name="test2"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('test2', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.test3 }">
              <label>数据准确性验证通过</label>
              <RoleLockSwitch
                :model-value="record.test3 || false"
                field-name="test3"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('test3', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.test4 }">
              <label>性能表现符合预期</label>
              <RoleLockSwitch
                :model-value="record.test4 || false"
                field-name="test4"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('test4', val)"
              />
            </div>
          </div>
        </div>

        <!-- 产品验收 -->
        <div class="subsection">
          <h3 class="subsection-title">产品验收</h3>
          <div class="switch-group">
            <div class="switch-item" :class="{ 'is-confirmed': record.product1 }">
              <label>产品功能符合需求</label>
              <RoleLockSwitch
                :model-value="record.product1 || false"
                field-name="product1"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('product1', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.product2 }">
              <label>用户体验符合预期</label>
              <RoleLockSwitch
                :model-value="record.product2 || false"
                field-name="product2"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('product2', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.product3 }">
              <label>文案/UI 无误</label>
              <RoleLockSwitch
                :model-value="record.product3 || false"
                field-name="product3"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('product3', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.product4 }">
              <label>业务流程验证通过</label>
              <RoleLockSwitch
                :model-value="record.product4 || false"
                field-name="product4"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('product4', val)"
              />
            </div>
          </div>
        </div>
          </div>
        </el-collapse-item>

        <el-collapse-item name="production" title="🚀 生产流程确认">
          <div class="section-content">

        <!-- 运维发布 -->
        <div class="subsection">
          <h3 class="subsection-title">运维发布</h3>
          <div class="switch-group">
            <div class="switch-item" :class="{ 'is-confirmed': record.prod1 }">
              <label>预发布验收已通过</label>
              <RoleLockSwitch
                :model-value="record.prod1 || false"
                field-name="prod1"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('prod1', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.prod2 }">
              <label>生产环境数据库变更已执行</label>
              <RoleLockSwitch
                :model-value="record.prod2 || false"
                field-name="prod2"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('prod2', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.prod3 }">
              <label>服务端代码已发布</label>
              <RoleLockSwitch
                :model-value="record.prod3 || false"
                field-name="prod3"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('prod3', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.prod4 }">
              <label>服务启动正常</label>
              <RoleLockSwitch
                :model-value="record.prod4 || false"
                field-name="prod4"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('prod4', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.prod5 }">
              <label>健康检查通过</label>
              <RoleLockSwitch
                :model-value="record.prod5 || false"
                field-name="prod5"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('prod5', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.prod6 }">
              <label>监控指标正常</label>
              <RoleLockSwitch
                :model-value="record.prod6 || false"
                field-name="prod6"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('prod6', val)"
              />
            </div>
          </div>
        </div>

        <!-- 前端运维发布 -->
        <div class="subsection">
          <h3 class="subsection-title">前端运维发布</h3>
          <div class="switch-group">
            <div class="switch-item" :class="{ 'is-confirmed': record.prod7 }">
              <label>前端代码已发布</label>
              <RoleLockSwitch
                :model-value="record.prod7 || false"
                field-name="prod7"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('prod7', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.prod8 }">
              <label>CDN缓存已刷新</label>
              <RoleLockSwitch
                :model-value="record.prod8 || false"
                field-name="prod8"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('prod8', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.prod9 }">
              <label>页面访问正常</label>
              <RoleLockSwitch
                :model-value="record.prod9 || false"
                field-name="prod9"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('prod9', val)"
              />
            </div>
          </div>
        </div>

        <!-- 测试功能验证 -->
        <div class="subsection">
          <h3 class="subsection-title">测试功能验证</h3>
          <div class="switch-group">
            <div class="switch-item" :class="{ 'is-confirmed': record.verify1 }">
              <label>新功能验证通过</label>
              <RoleLockSwitch
                :model-value="record.verify1 || false"
                field-name="verify1"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('verify1', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.verify2 }">
              <label>核心功能验证通过</label>
              <RoleLockSwitch
                :model-value="record.verify2 || false"
                field-name="verify2"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('verify2', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.verify3 }">
              <label>正常流程回归通过</label>
              <RoleLockSwitch
                :model-value="record.verify3 || false"
                field-name="verify3"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('verify3', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.verify4 }">
              <label>数据一致性检查通过</label>
              <RoleLockSwitch
                :model-value="record.verify4 || false"
                field-name="verify4"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('verify4', val)"
              />
            </div>
          </div>
        </div>

        <!-- 全员确认 -->
        <div class="subsection">
          <h3 class="subsection-title">全员确认</h3>
          <div class="switch-group">
            <div class="switch-item" :class="{ 'is-confirmed': record.verify5 }">
              <label>客户端确认</label>
              <RoleLockSwitch
                :model-value="record.verify5 || false"
                field-name="verify5"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('verify5', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.verify6 }">
              <label>服务端确认</label>
              <RoleLockSwitch
                :model-value="record.verify6 || false"
                field-name="verify6"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('verify6', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.verify7 }">
              <label>运维确认</label>
              <RoleLockSwitch
                :model-value="record.verify7 || false"
                field-name="verify7"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('verify7', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.verify8 }">
              <label>前端运维确认</label>
              <RoleLockSwitch
                :model-value="record.verify8 || false"
                field-name="verify8"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('verify8', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.verify9 }">
              <label>测试确认</label>
              <RoleLockSwitch
                :model-value="record.verify9 || false"
                field-name="verify9"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('verify9', val)"
              />
            </div>
            <div class="switch-item" :class="{ 'is-confirmed': record.verify10 }">
              <label>产品确认</label>
              <RoleLockSwitch
                :model-value="record.verify10 || false"
                field-name="verify10"
                :record-id="recordId"
                :record="record"
                @update="(val) => updateRecord('verify10', val)"
              />
            </div>
          </div>
        </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div v-else class="empty-state">
      <el-empty description="清单不存在" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getWorkflow, WorkflowRecord } from '@/api/workflow'
import RoleLockSwitch from '@/components/RoleLockSwitch.vue'
import ConfirmableTextarea from '@/components/ConfirmableTextarea.vue'
import ConfirmableDate from '@/components/ConfirmableDate.vue'

const router = useRouter()
const route = useRoute()
const recordId = ref<string | string[]>(route.params.id)
const record = ref<WorkflowRecord | null>(null)
const loading = ref(true)
// 折叠面板状态管理（默认全部折叠，accordion 模式下是 string | undefined）
const activeNames = ref<string | undefined>(undefined)

const loadRecord = async () => {
  try {
    const response = await getWorkflow(recordId.value)
    const { code, data } = response.data

    if (code === 0 || code === 200) {
      record.value = data
    } else {
      ElMessage.error('加载失败')
    }
  } catch (error) {
    ElMessage.error('加载清单失败')
  } finally {
    loading.value = false
  }
}

const updateRecord = (fieldName: string, value: any) => {
  if (record.value) {
    record.value[fieldName as keyof WorkflowRecord] = value
  }
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  loadRecord()
})
</script>

<style scoped>
.one-checklist-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.loading-container {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
}

.empty-state {
  background: #fff;
  border-radius: 4px;
  padding: 60px 20px;
  text-align: center;
}

.header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #dcdfe6;
}

.back-button {
  margin-left: auto;
}

.info-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.info-item .label {
  color: #606266;
  font-weight: 500;
}

.info-item .value {
  color: #303133;
}

.section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 3px solid #409eff;
}

/* 折叠面板内容样式 */
.section-content {
  padding: 20px;
}

/* 折叠面板样式调整 */
:deep(.el-collapse) {
  border: none;
  margin-bottom: 32px;
}

:deep(.el-collapse-item) {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 16px;
  background: #f5f7fa;
}

:deep(.el-collapse-item__header) {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  padding: 16px 20px;
  background: transparent;
  border-bottom: none;
}

:deep(.el-collapse-item__header.is-active) {
  border-bottom: 3px solid #409eff;
  color: #409eff;
}

:deep(.el-collapse-item__wrap) {
  border-top: none;
  background: #fff;
}

:deep(.el-collapse-item__content) {
  padding: 0;
}

.subsection {
  margin-bottom: 24px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 4px;
}

.subsection-title {
  font-size: 14px;
  font-weight: 600;
  color: #409eff;
  margin-bottom: 12px;
}

.switch-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.switch-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  transition: background-color 0.3s ease;
}

.switch-item.is-confirmed {
  background-color: #f0f9ff;
  border-color: #b3d8ff;
}

.switch-item label {
  flex: 1;
  font-size: 13px;
  color: #303133;
  margin: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.form-label {
  width: 200px;
  font-weight: 500;
  color: #303133;
  flex-shrink: 0;
  text-align: right;
  padding-top: 8px;
}

@media (max-width: 1024px) {
  .switch-group {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .card {
    padding: 12px;
  }

  .header-info {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .back-button {
    margin-left: 0;
    flex-shrink: 0;
  }

  .form-row {
    flex-direction: column;
    align-items: stretch;
  }

  .form-label {
    width: 100%;
    text-align: left;
    padding-top: 0;
  }

  .section-title {
    font-size: 16px;
  }

  .switch-item {
    flex-wrap: wrap;
  }

  .switch-item label {
    width: 100%;
  }
}
</style>

