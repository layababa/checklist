<template>
  <div class="app-wrapper">
    <header class="app-header">
      <div class="header-content">
        <h1>发版确认清单</h1>
        <div class="header-actions">
          <el-button v-if="!authStore.isLoggedIn" type="primary" @click="showLoginDialog">登录</el-button>
          <div v-else class="user-info">
            <span class="user-name-role">{{ authStore.username }} | {{ getRoleName(authStore.userRole) }}</span>
            <el-button type="text" @click="handleLogout">退出</el-button>
          </div>
        </div>
      </div>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
    <LoginDialog ref="loginDialog" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginDialog from '@/components/LoginDialog.vue'
import { getRoleName } from '@/utils/role'

const authStore = useAuthStore()
const router = useRouter()
const loginDialog = ref<InstanceType<typeof LoginDialog>>()

const showLoginDialog = () => {
  loginDialog.value?.open()
}

const handleLogout = () => {
  authStore.logout()
  router.push('/checklists')
}

onMounted(() => {
  // 监听需要登录的事件（来自 API 401 或其他地方）
  window.addEventListener('needLogin', () => {
    showLoginDialog()
  })
})
</script>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.app-header {
  background: #fff;
  border-bottom: 1px solid #dcdfe6;
  padding: 12px 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-header h1 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.user-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.user-name-role {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.app-main {
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 20px auto;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .app-header h1 {
    font-size: 16px;
  }

  .user-name-role {
    font-size: 12px;
  }

  .app-main {
    margin: 12px auto;
    padding: 0 12px;
  }
}
</style>

