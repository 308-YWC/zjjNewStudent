<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/" class="logo-link">
          <div class="logo-icon">
            <img src="/logo.png" alt="张家界航院logo" />
          </div>
        </router-link>
      </div>
      
      <nav class="nav-menu" :class="{ 'mobile-open': mobileMenuOpen }">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path" 
          class="nav-item"
          @click="closeMobileMenu"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          {{ item.name }}
        </router-link>
      </nav>
      
      <div class="mobile-menu-btn" @click="toggleMobileMenu">
        <el-icon><Menu /></el-icon>
      </div>
    </div>
    
    <!-- 移动端遮罩 -->
    <div v-if="mobileMenuOpen" class="mobile-overlay" @click="closeMobileMenu"></div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, House, School, Reading, Coffee, Document } from '@element-plus/icons-vue'

const mobileMenuOpen = ref(false)

const menuItems = [
  { name: '首页', path: '/', icon: 'House' },
  { name: '学校介绍', path: '/school-info', icon: 'School' },
  { name: '专业介绍', path: '/majors', icon: 'Reading' },
  { name: '校园生活', path: '/campus-life', icon: 'Coffee' },
  { name: '入学须知', path: '/admission-guide', icon: 'Document' }
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e5e5e5;
  z-index: 1000;
  height: 80px;

  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    .logo-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
      
      .logo-icon {
        width: 300px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      

    }
  }

  .nav-menu {
    display: flex;
    gap: 30px;

    .nav-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      text-decoration: none;
      color: #666;
      border-radius: 8px;
      transition: all 0.3s ease;
      font-weight: 500;

      &:hover {
        background: #f0f9ff;
        color: #1890ff;
      }

      &.router-link-active {
        background: #1890ff;
        color: white;
      }
    }
  }

  .mobile-menu-btn {
    display: none;
    padding: 8px;
    cursor: pointer;
    border-radius: 6px;
    
    &:hover {
      background: #f5f5f5;
    }
  }

  .mobile-overlay {
    display: none;
  }

  // 移动端和平板适配
  @media (max-width: 1024px) {
    .nav-menu {
      gap: 20px;
    }
  }

  @media (max-width: 768px) {
    .header {
      height: 70px;
    }

    .header-container {
      height: 100%;
    }

    .logo {
      .logo-link {
        .logo-icon {
          width: 65px;
          height: 65px;
        }
      }
    }

    .nav-menu {
      position: fixed;
      top: 70px;
      right: -320px;
      width: 300px;
      height: calc(100vh - 70px);
      background: white;
      flex-direction: column;
      padding: 30px 20px;
      gap: 0;
      box-shadow: -2px 0 15px rgba(0, 0, 0, 0.15);
      transition: right 0.3s ease;
      z-index: 1001;
      overflow-y: auto;

      &.mobile-open {
        right: 0;
      }

      .nav-item {
        width: 100%;
        padding: 18px 20px;
        justify-content: flex-start;
        border-radius: 12px;
        margin-bottom: 10px;
        font-size: 16px;
        
        .el-icon {
          font-size: 18px;
        }

        &:hover {
          background: #f0f9ff;
          color: #1890ff;
          transform: translateX(5px);
        }

        &.router-link-active {
          background: #1890ff;
          color: white;
          transform: translateX(5px);
        }
      }
    }

    .mobile-menu-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.3s ease;
      
      &:hover {
        background: #f5f5f5;
      }

      .el-icon {
        font-size: 22px;
      }
    }

    .mobile-overlay {
      display: block;
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }
  }

  @media (max-width: 480px) {
    .header {
      height: 65px;
    }

    .logo {
      .logo-link {
        .logo-icon {
          width: 55px;
          height: 55px;
        }
      }
    }

    .nav-menu {
      top: 65px;
      height: calc(100vh - 65px);
      width: 280px;
      right: -300px;
      padding: 20px 15px;

      .nav-item {
        padding: 15px 18px;
        font-size: 15px;
      }
    }

    .mobile-overlay {
      top: 65px;
    }
  }
}
</style>