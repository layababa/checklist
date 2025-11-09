<template>
  <div class="confirmable-textarea">
    <el-input
      v-model="textModelValue"
      :disabled="isDisabled || isLocked"
      type="textarea"
      :rows="3"
      placeholder="请输入内容"
      @input="handleInput"
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
    <el-tooltip
      v-if="isDisabled && !isLocked"
      placement="top"
      :content="disabledTip"
    >
      <span class="disabled-icon">ⓘ</span>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { useAuthStore } from "@/stores/auth";
import { canEditField } from "@/utils/role";
import { isFieldLocked } from "@/utils/fields";
import { updateWorkflow } from "@/api/workflow";
import { WorkflowRecord } from "@/api/workflow";

interface Props {
  modelValue: string;
  fieldName: string;
  recordId: number | string;
  record: WorkflowRecord;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
});

const textModelValue = ref(props.modelValue);
watch(textModelValue, (newVal) => {
  emit("update", newVal as string);
});

const emit = defineEmits<{
  update: [value: string];
  error: [message: string];
}>();

const authStore = useAuthStore();
const loading = ref(false);
const inputValue = ref(props.modelValue);

const isCanEdit = computed(() => {
  return canEditField(props.fieldName, authStore.userRole);
});

const isLocked = computed(() => {
  return isFieldLocked(props.fieldName, props.record);
});

const isDisabled = computed(() => {
  return !authStore.isLoggedIn || !isCanEdit.value;
});

const hasChanged = computed(() => {
  return (
    inputValue.value !== props.modelValue && inputValue.value.trim() !== ""
  );
});

const disabledTip = computed(() => {
  if (!authStore.isLoggedIn) return "请先登录";
  if (!isCanEdit.value) return "您无权编辑此项";
  if (isLocked.value) return "此项已确认，无法更改";
  return "";
});

const handleInput = (value: string) => {
  inputValue.value = value;
};

const handleConfirm = async () => {
  if (isDisabled.value || isLocked.value || !hasChanged.value) return;

  loading.value = true;
  try {
    await updateWorkflow(props.recordId, {
      [props.fieldName]: inputValue.value,
    });
    emit("update", inputValue.value);
    ElMessage.success("已保存");
  } catch (error) {
    emit("error", "提交失败，请重试");
    ElMessage.error("提交失败");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.confirmable-textarea {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  flex: 1;
  min-width: 0;
}

:deep(.el-textarea) {
  width: 100%;
}

:deep(.el-textarea__inner) {
  width: 100%;
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

@media (max-width: 768px) {
  .confirmable-textarea {
    flex: none;
    width: 100%;
  }
}
</style>
