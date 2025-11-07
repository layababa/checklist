<template>
  <div class="role-lock-switch">
    <el-switch
      :model-value="modelValue"
      :disabled="isDisabled || isLocked"
      :loading="loading"
      @change="handleChange"
    />
    <el-tooltip v-if="isDisabled || isLocked" placement="top" :content="disabledTip">
      <span class="lock-icon">🔒</span>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { canEditField } from '@/utils/role'
import { isFieldLocked } from '@/utils/fields'
import { updateWorkflow } from '@/api/workflow'
import { WorkflowRecord } from '@/api/workflow'

interface Props {
  modelValue: boolean
  fieldName: string
  recordId: number | string
  record: WorkflowRecord
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
})

const emit = defineEmits<{
  update: [value: boolean]
  error: [message: string]
}>()

const authStore = useAuthStore()
const loading = ref(false)

const isCanEdit = computed(() => {
  return canEditField(props.fieldName, authStore.userRole)
})

const isLocked = computed(() => {
  return isFieldLocked(props.fieldName, props.record)
})

const isDisabled = computed(() => {
  return !authStore.isLoggedIn || !isCanEdit.value
})

const disabledTip = computed(() => {
  if (!authStore.isLoggedIn) return '请先登录'
  if (!isCanEdit.value) return '您无权编辑此项'
  if (isLocked.value) return '此项已确认，无法更改'
  return ''
})

const handleChange = async (value: boolean) => {
  // 只允许 false → true
  if (!value) {
    ElMessage.warning('确认后无法取消，请谨慎操作')
    return
  }

  if (isDisabled.value || isLocked.value) return

  loading.value = true
  try {
    await updateWorkflow(props.recordId, {
      [props.fieldName]: true,
    })
    emit('update', true)
    ElMessage.success('已确认')
  } catch (error) {
    emit('error', '提交失败，请重试')
    ElMessage.error('提交失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.role-lock-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

.lock-icon {
  font-size: 12px;
  color: #e6a23c;
}

/* 覆盖 Element Plus 默认的 disabled opacity */
:deep(.el-switch.is-disabled) {
  opacity: 1 !important;
}

/* 激活状态的 Switch 保持绿色，即使被禁用 */
:deep(.el-switch.is-checked .el-switch__core) {
  background-color: #67c23a !important;
  border-color: #67c23a !important;
}

:deep(.el-switch.is-checked.is-disabled .el-switch__core) {
  background-color: #67c23a !important;
  border-color: #67c23a !important;
}

:deep(.el-switch.is-checked.is-disabled .el-switch__core::after) {
  background-color: #fff !important;
}

/* 未激活状态的 Switch 保持灰色 */
:deep(.el-switch:not(.is-checked) .el-switch__core) {
  background-color: #dcdfe6;
  border-color: #dcdfe6;
}

:deep(.el-switch:not(.is-checked).is-disabled .el-switch__core) {
  background-color: #dcdfe6;
  border-color: #dcdfe6;
}
</style>

