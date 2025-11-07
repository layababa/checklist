<template>
  <div class="checklists-page">
    <div class="card list-container">
      <div class="list-header">
        <h2>发版清单列表</h2>
        <el-button v-if="authStore.isLoggedIn" type="success" @click="showCreateDialog">新建清单</el-button>
      </div>
      <!-- 卡片式布局 -->
      <div v-loading="loading" class="card-list">
        <div v-for="row in tableData" :key="row.id" class="checklist-card" @click="goToDetail(row.id)">
          <div class="card-header">
            <div class="card-title">
              <span class="card-id">#{{ row.id }}</span>
              <span class="card-date" v-if="row.putDate">{{ row.putDate }}</span>
            </div>
            <el-button type="primary" size="small" @click.stop="goToDetail(row.id)">查看</el-button>
          </div>

          <div class="card-progress">
            <div class="progress-item">
              <span class="progress-label">产品</span>
              <div class="progress-wrapper">
                <el-progress
                  :percentage="getProgressByRole(row, 0).percentage"
                  :color="getProgressColor(getProgressByRole(row, 0).percentage)"
                  :show-text="false"
                  class="progress-bar"
                />
                <span class="progress-value">{{ getProgressByRole(row, 0).percentage }}%</span>
              </div>
            </div>
            <div class="progress-item">
              <span class="progress-label">测试</span>
              <div class="progress-wrapper">
                <el-progress
                  :percentage="getProgressByRole(row, 1).percentage"
                  :color="getProgressColor(getProgressByRole(row, 1).percentage)"
                  :show-text="false"
                  class="progress-bar"
                />
                <span class="progress-value">{{ getProgressByRole(row, 1).percentage }}%</span>
              </div>
            </div>
            <div class="progress-item">
              <span class="progress-label">前端</span>
              <div class="progress-wrapper">
                <el-progress
                  :percentage="getProgressByRole(row, 2).percentage"
                  :color="getProgressColor(getProgressByRole(row, 2).percentage)"
                  :show-text="false"
                  class="progress-bar"
                />
                <span class="progress-value">{{ getProgressByRole(row, 2).percentage }}%</span>
              </div>
            </div>
            <div class="progress-item">
              <span class="progress-label">后端</span>
              <div class="progress-wrapper">
                <el-progress
                  :percentage="getProgressByRole(row, 3).percentage"
                  :color="getProgressColor(getProgressByRole(row, 3).percentage)"
                  :show-text="false"
                  class="progress-bar"
                />
                <span class="progress-value">{{ getProgressByRole(row, 3).percentage }}%</span>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <span class="card-time" v-if="row.createTime">创建：{{ formatTime(row.createTime) }}</span>
            <span class="card-time" v-if="row.updateTime">更新：{{ formatTime(row.updateTime) }}</span>
          </div>
        </div>

        <el-empty v-if="!loading && tableData.length === 0" description="暂无数据" />
      </div>

      <el-pagination
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        :total="total"
        :layout="isMobile ? 'prev, pager, next' : 'total, sizes, prev, pager, next, jumper'"
        :class="{ 'pagination-mobile': isMobile }"
        style="margin-top: 16px"
        @change="loadList"
      />
    </div>

    <!-- 新建清单对话框 -->
    <el-dialog v-model="createDialogVisible" title="新建发版清单" width="400px">
      <el-form ref="createFormRef" :model="createForm" :rules="createRules">
        <el-form-item label="上线时间（可选）" prop="putDate">
          <el-date-picker
            v-model="createForm.putDate"
            type="date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="请选择上线时间"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createDialogVisible = false">取消</el-button>
          <el-button type="primary" :loading="createLoading" @click="handleCreate">创建</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { getWorkflowList, createWorkflow, WorkflowRecord } from '@/api/workflow'
import { getProgressByRole } from '@/utils/fields'

const authStore = useAuthStore()
const router = useRouter()

// 检测是否为移动端
const windowWidth = ref(window.innerWidth)
const isMobile = computed(() => windowWidth.value <= 768)

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  loadList()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// 数据
const tableData = ref<WorkflowRecord[]>([])
const loading = ref(false)
const total = ref(0)
const pageNum = ref(1)
const pageSize = ref(10)

// 新建对话框
const createDialogVisible = ref(false)
const createLoading = ref(false)
const createFormRef = ref()
const createForm = reactive({
  putDate: '',
})
const createRules = {
  putDate: [],
}

const getProgressColor = (percentage: number): string => {
  if (percentage >= 100) return '#67c23a'
  if (percentage >= 50) return '#409eff'
  return '#f56c6c'
}

const loadList = async () => {
  loading.value = true
  try {
    const params: any = {
      pageNum: pageNum.value,
      pageSize: pageSize.value,
    }


    const response = await getWorkflowList(params)
    const { code, rows, msg, total: totalCount } = response.data

    if (code === 0 || code === 200) {
      // 确保 rows 是数组
      let data = Array.isArray(rows) ? rows : []
      // 倒序排列（最新的在前面）
      // 优先按创建时间倒序，如果没有创建时间则按ID倒序
      data = data.sort((a, b) => {
        // 如果有创建时间，按创建时间倒序
        if (a.createTime && b.createTime) {
          return new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
        }
        // 否则按ID倒序
        const idA = Number(a.id) || 0
        const idB = Number(b.id) || 0
        return idB - idA
      })
      tableData.value = data
      // 使用返回的 total 字段
      total.value = totalCount || tableData.value.length || 0
    } else {
      ElMessage.error(msg || '加载失败')
      tableData.value = []
      total.value = 0
    }
  } catch (error) {
    ElMessage.error('加载清单列表失败')
    tableData.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}


const showCreateDialog = () => {
  if (!authStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }
  createDialogVisible.value = true
}

const handleCreate = async () => {
  if (!createFormRef.value) return

  await createFormRef.value.validate(async (valid: boolean) => {
    if (!valid) return

    createLoading.value = true
    try {
      const response = await createWorkflow({
        putDate: createForm.putDate || undefined,
      })
      const { code, data } = response.data

      if (code === 0 || code === 200) {
        ElMessage.success('创建成功')
        createDialogVisible.value = false
        createForm.putDate = ''
        // 刷新列表，留在当前页
        loadList()
      } else {
        ElMessage.error('创建失败')
      }
    } catch (error) {
      ElMessage.error('创建失败，请重试')
    } finally {
      createLoading.value = false
    }
  })
}

const goToDetail = (id: number | string) => {
  router.push(`/checklists/${id}`)
}

// 格式化时间（只显示日期部分）
const formatTime = (timeStr: string | undefined | null): string => {
  if (!timeStr) return ''
  // 如果是完整的日期时间字符串，只取日期部分
  if (timeStr.includes(' ')) {
    return timeStr.split(' ')[0]
  }
  return timeStr
}
</script>

<style scoped>
.checklists-page {
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


.list-container {
  padding: 0;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #dcdfe6;
}

.list-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.card-list {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 16px;
}

.checklist-card {
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.checklist-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  border-color: #409eff;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-id {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.card-date {
  font-size: 14px;
  color: #909399;
}

.card-progress {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-label {
  width: 50px;
  font-size: 13px;
  color: #606266;
  font-weight: 500;
  flex-shrink: 0;
}

.progress-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-bar {
  flex: 1;
  min-width: 0;
}

:deep(.progress-bar .el-progress-bar__outer) {
  height: 8px;
  border-radius: 4px;
}

:deep(.progress-bar .el-progress-bar__inner) {
  border-radius: 4px;
}

.progress-value {
  width: 45px;
  font-size: 12px;
  font-weight: 600;
  color: #303133;
  text-align: right;
  flex-shrink: 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
  font-size: 12px;
  color: #909399;
}

.card-time {
  font-size: 12px;
  color: #909399;
}

@media (max-width: 768px) {
  .card {
    padding: 12px;
  }


  .list-header {
    padding: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .list-header h2 {
    font-size: 16px;
  }

  /* 卡片列表在移动端单列显示 */
  .card-list {
    padding: 12px;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .checklist-card {
    padding: 12px;
  }

  .card-header {
    margin-bottom: 12px;
    padding-bottom: 8px;
  }

  .card-id {
    font-size: 14px;
  }

  .card-date {
    font-size: 12px;
  }

  .card-progress {
    gap: 10px;
    margin-bottom: 10px;
  }

  .progress-item {
    gap: 8px;
  }

  .progress-label {
    width: 45px;
    font-size: 12px;
  }

  .progress-value {
    width: 40px;
    font-size: 11px;
  }

  :deep(.progress-bar .el-progress-bar__outer) {
    height: 6px;
  }

  .card-footer {
    flex-direction: column;
    gap: 4px;
    padding-top: 8px;
  }

  .card-time {
    font-size: 11px;
  }

  /* 分页组件在移动端优化 */
  .pagination-mobile {
    display: flex;
    justify-content: center;
  }

  :deep(.el-pagination) {
    margin-top: 12px;
    padding: 0 12px 12px;
  }

  :deep(.el-pagination .el-pager li),
  :deep(.el-pagination .btn-prev),
  :deep(.el-pagination .btn-next) {
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .card-list {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
</style>

