<template>
  <el-dialog v-model="visible" title="登录" :close-on-click-modal="false" :close-on-press-escape="false" width="350px">
    <el-form ref="formRef" :model="form" :rules="rules" @keyup.enter="handleLogin">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" @keyup.enter="handleLogin" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleLogin">登录</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElForm } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import { login } from '@/api/workflow'

interface LoginForm {
  username: string
  password: string
}

const authStore = useAuthStore()
const formRef = ref<InstanceType<typeof ElForm>>()
const visible = ref(false)
const loading = ref(false)

const form = reactive<LoginForm>({
  username: 'admin',
  password: 'admin123',
})

const rules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

const open = () => {
  visible.value = true
}

const handleLogin = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (!valid) return

    loading.value = true
    try {
      const response = await login(form)
      const { code, token, role } = response.data

      // 兼容 code=200 和 code=0
      if (code === 200 || code === 0) {
        authStore.setAuth(token, role, form.username)
        visible.value = false
        ElMessage.success('登录成功')
      } else {
        ElMessage.error(response.data.msg || '登录失败')
      }
    } catch (error) {
      ElMessage.error('登录失败，请检查账号密码')
    } finally {
      loading.value = false
    }
  })
}

const handleCancel = () => {
  visible.value = false
}

defineExpose({
  open,
})
</script>

