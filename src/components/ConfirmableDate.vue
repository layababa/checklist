<template>
  <div class="confirmable-date">
    <el-date-picker
      :model-value="modelValue"
      type="date"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
      placeholder="请选择日期"
      :disabled="isDisabled || isLocked"
      @update:model-value="handleDateChange"
    />
    <div class="button-group">
      <el-button
        v-if="!isLocked"
        type="primary"
        size="small"
        :loading="loading"
        :disabled="isDisabled || !hasChanged"
        @click="handleConfirm"
      >
        确定
      </el-button>
      <span v-if="isLocked" class="locked-label">✓ 已确认</span>
    </div>
    <el-tooltip v-if="isDisabled && !isLocked" placement="top" :content="disabledTip">
      <span class="disabled-icon">ⓘ</span>
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
  modelValue: string
  fieldName: string
  recordId: number | string
  record: WorkflowRecord
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
})

const emit = defineEmits<{
  update: [value: string]
  error: [message: string]
}>()

const authStore = useAuthStore()
const loading = ref(false)
const dateValue = ref(props.modelValue)

const isCanEdit = computed(() => {
  return canEditField(props.fieldName, authStore.userRole)
})

const isLocked = computed(() => {
  return isFieldLocked(props.fieldName, props.record)
})

const isDisabled = computed(() => {
  return !authStore.isLoggedIn || !isCanEdit.value
})

const hasChanged = computed(() => {
  return dateValue.value !== props.modelValue && dateValue.value !== ''
})

const disabledTip = computed(() => {
  if (!authStore.isLoggedIn) return '请先登录'
  if (!isCanEdit.value) return '您无权编辑此项'
  if (isLocked.value) return '此项已确认，无法更改'
  return ''
})

const handleDateChange = (value: string) => {
  dateValue.value = value
}

const handleConfirm = async () => {
  if (isDisabled.value || isLocked.value || !hasChanged.value) return

  loading.value = true
  try {
    await updateWorkflow(props.recordId, {
      [props.fieldName]: dateValue.value,
    })
    emit('update', dateValue.value)
    ElMessage.success('已保存')
  } catch (error) {
    emit('error', '提交失败，请重试')
    ElMessage.error('提交失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.confirmable-date {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.button-group {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
}

.locked-label {
  color: #67c23a;
  font-size: 12px;
  font-weight: 500;
}

.disabled-icon {
  color: #e6a23c;
  font-size: 12px;
  cursor: help;
}
</style>

