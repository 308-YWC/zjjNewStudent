<template>
  <div class="home">
    <!-- 英雄区域 -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            欢迎来到<br>
            <span class="highlight">张家界航空工业职业技术学院</span>
          </h1>
          <p class="hero-subtitle">
            在世界著名旅游胜地张家界，开启你的航空梦想之旅
          </p>
          <div class="hero-buttons">
            <el-button type="primary" size="large" @click="$router.push('/school-info')">
              <el-icon><School /></el-icon>
              了解学校
            </el-button>
            <el-button size="large" @click="$router.push('/admission-guide')">
              <el-icon><Document /></el-icon>
              入学指南
            </el-button>
          </div>
        </div>
        <div class="hero-image">
          <div class="image-placeholder">
            <el-icon class="large-icon"><School /></el-icon>
            <p>校园风光</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 快速导航 -->
    <section class="quick-nav">
      <div class="container">
        <h2 class="section-title">新生必看</h2>
        <div class="nav-grid">
          <div 
            v-for="item in quickNavItems" 
            :key="item.path"
            class="nav-card"
            @click="$router.push(item.path)"
          >
            <div class="card-icon">
              <el-icon><component :is="item.icon" /></el-icon>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 学校亮点 -->
    <section class="highlights">
      <div class="container">
        <h2 class="section-title">学校亮点</h2>
        <div class="highlights-grid">
          <div v-for="highlight in highlights" :key="highlight.title" class="highlight-card">
            <div class="highlight-icon">{{ highlight.icon }}</div>
            <h3>{{ highlight.title }}</h3>
            <p>{{ highlight.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 重要时间节点 -->
    <section class="timeline">
      <div class="container">
        <h2 class="section-title">重要时间节点</h2>
        <div class="timeline-container">
          <div v-for="(event, index) in timelineEvents" :key="index" class="timeline-item">
            <div class="timeline-date">{{ event.date }}</div>
            <div class="timeline-content">
              <h4>{{ event.title }}</h4>
              <p>{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { School, Reading, Coffee, Document } from '@element-plus/icons-vue'

const quickNavItems = [
  {
    title: '学校介绍',
    description: '了解学校历史、办学特色和发展成就',
    icon: 'School',
    path: '/school-info'
  },
  {
    title: '专业介绍',
    description: '探索各个专业的课程设置和就业前景',
    icon: 'Reading',
    path: '/majors'
  },
  {
    title: '校园生活',
    description: '了解住宿、餐饮、社团等校园生活信息',
    icon: 'Coffee',
    path: '/campus-life'
  },
  {
    title: '入学须知',
    description: '新生报到流程、必备物品和注意事项',
    icon: 'Document',
    path: '/admission-guide'
  }
]

const highlights = [
  {
    icon: '🎓',
    title: '专业教育',
    description: '航空特色鲜明，专业设置与行业需求紧密结合'
  },
  {
    icon: '🏭',
    title: '实训基地',
    description: '拥有先进的实训设备和完善的实践教学体系'
  },
  {
    icon: '🌟',
    title: '就业保障',
    description: '与多家航空企业建立合作关系，就业前景广阔'
  },
  {
    icon: '🏔️',
    title: '优美环境',
    description: '坐落在张家界市，拥有得天独厚的自然环境'
  }
]

const timelineEvents = [
  {
    date: '8月中旬',
    title: '录取通知书发放',
    description: '收到录取通知书，准备入学相关材料'
  },
  {
    date: '9月1-2日',
    title: '新生报到',
    description: '携带相关证件到学校各学院报到点办理入学手续'
  },
  {
    date: '9月3-7日',
    title: '入学教育',
    description: '参加新生入学教育，了解校规校纪和学习生活安排'
  },
  {
    date: '9月8-21日',
    title: '军训',
    description: '参加为期两周的军训，锻炼体魄，培养团队精神'
  },
  {
    date: '9月22日',
    title: '正式上课',
    description: '开始正常的教学活动，开启大学学习生涯'
  }
]
</script>

<style lang="scss" scoped>
.home {
  .hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 80px 0;
    min-height: 600px;
    display: flex;
    align-items: center;

    .hero-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;

      .hero-text {
        .hero-title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 20px;
          line-height: 1.2;

          .highlight {
            color: #ffd700;
          }
        }

        .hero-subtitle {
          font-size: 1.2rem;
          margin-bottom: 40px;
          opacity: 0.9;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
      }

      .hero-image {
        .image-placeholder {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 60px;
          text-align: center;
          backdrop-filter: blur(10px);

          .large-icon {
            font-size: 120px;
            margin-bottom: 20px;
            opacity: 0.7;
          }

          p {
            font-size: 1.1rem;
            opacity: 0.8;
          }
        }
      }
    }
  }

  .quick-nav, .highlights, .timeline {
    padding: 80px 0;

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .section-title {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 60px;
      color: #333;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 4px;
        background: #1890ff;
        border-radius: 2px;
      }
    }
  }

  .quick-nav {
    background: #f8fafc;

    .nav-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 30px;

      .nav-card {
        background: white;
        border-radius: 16px;
        padding: 40px 30px;
        text-align: center;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .card-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;

          .el-icon {
            font-size: 36px;
            color: white;
          }
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: #333;
        }

        p {
          color: #666;
          line-height: 1.6;
        }
      }
    }
  }

  .highlights {
    .highlights-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;

      .highlight-card {
        text-align: center;
        padding: 30px 20px;

        .highlight-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: #333;
        }

        p {
          color: #666;
          line-height: 1.6;
        }
      }
    }
  }

  .timeline {
    background: #f8fafc;

    .timeline-container {
      max-width: 800px;
      margin: 0 auto;

      .timeline-item {
        display: flex;
        margin-bottom: 40px;
        align-items: flex-start;

        .timeline-date {
          background: #1890ff;
          color: white;
          padding: 12px 20px;
          border-radius: 25px;
          font-weight: bold;
          min-width: 120px;
          text-align: center;
          margin-right: 30px;
          flex-shrink: 0;
        }

        .timeline-content {
          flex: 1;
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);

          h4 {
            font-size: 1.2rem;
            margin-bottom: 10px;
            color: #333;
          }

          p {
            color: #666;
            line-height: 1.6;
          }
        }
      }
    }
  }

  // 平板适配
  @media (max-width: 1024px) {
    .hero {
      padding: 60px 0;
      min-height: 500px;

      .hero-content {
        gap: 40px;

        .hero-text {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }
        }
      }
    }

    .quick-nav, .highlights, .timeline {
      padding: 60px 0;

      .section-title {
        font-size: 2.2rem;
        margin-bottom: 50px;
      }
    }

    .nav-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 25px;
    }

    .highlights-grid {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 30px;
    }
  }

  // 移动端适配
  @media (max-width: 768px) {
    .hero {
      padding: 40px 0;
      min-height: 400px;

      .hero-content {
        grid-template-columns: 1fr;
        gap: 30px;
        text-align: center;
        padding: 0 15px;

        .hero-text {
          .hero-title {
            font-size: 2rem;
            line-height: 1.1;
            margin-bottom: 15px;
          }

          .hero-subtitle {
            font-size: 1rem;
            margin-bottom: 30px;
          }

          .hero-buttons {
            justify-content: center;
            gap: 15px;
            flex-direction: column;
            align-items: center;

            .el-button {
              width: 200px;
              padding: 12px 20px;
            }
          }
        }

        .hero-image {
          .image-placeholder {
            padding: 40px 20px;

            .large-icon {
              font-size: 80px;
            }

            p {
              font-size: 1rem;
            }
          }
        }
      }
    }

    .quick-nav, .highlights, .timeline {
      padding: 40px 0;

      .container {
        padding: 0 15px;
      }

      .section-title {
        font-size: 1.8rem;
        margin-bottom: 30px;
      }
    }

    .nav-grid {
      grid-template-columns: 1fr;
      gap: 20px;

      .nav-card {
        padding: 30px 20px;

        .card-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 15px;

          .el-icon {
            font-size: 28px;
          }
        }

        h3 {
          font-size: 1.2rem;
          margin-bottom: 12px;
        }

        p {
          font-size: 14px;
        }
      }
    }

    .highlights-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 25px;

      .highlight-card {
        padding: 25px 15px;

        .highlight-icon {
          font-size: 3rem;
          margin-bottom: 15px;
        }

        h3 {
          font-size: 1.1rem;
          margin-bottom: 12px;
        }

        p {
          font-size: 14px;
        }
      }
    }

    .timeline {
      .timeline-container {
        padding: 0 15px;

        .timeline-item {
          flex-direction: column;
          margin-bottom: 25px;

          .timeline-date {
            margin-right: 0;
            margin-bottom: 15px;
            align-self: center;
            font-size: 14px;
            padding: 10px 16px;
            min-width: auto;
          }

          .timeline-content {
            padding: 20px;

            h4 {
              font-size: 1.1rem;
              margin-bottom: 8px;
            }

            p {
              font-size: 14px;
            }
          }
        }
      }
    }
  }

  // 小屏手机适配
  @media (max-width: 480px) {
    .hero {
      padding: 30px 0;
      min-height: 350px;

      .hero-content {
        padding: 0 10px;

        .hero-text {
          .hero-title {
            font-size: 1.6rem;
          }

          .hero-subtitle {
            font-size: 0.9rem;
            margin-bottom: 25px;
          }

          .hero-buttons {
            .el-button {
              width: 180px;
              padding: 10px 16px;
              font-size: 14px;
            }
          }
        }

        .hero-image {
          .image-placeholder {
            padding: 30px 15px;

            .large-icon {
              font-size: 60px;
            }

            p {
              font-size: 0.9rem;
            }
          }
        }
      }
    }

    .quick-nav, .highlights, .timeline {
      padding: 30px 0;

      .container {
        padding: 0 10px;
      }

      .section-title {
        font-size: 1.5rem;
        margin-bottom: 25px;
      }
    }

    .nav-grid {
      gap: 15px;

      .nav-card {
        padding: 25px 15px;

        .card-icon {
          width: 50px;
          height: 50px;

          .el-icon {
            font-size: 24px;
          }
        }

        h3 {
          font-size: 1.1rem;
        }

        p {
          font-size: 13px;
        }
      }
    }

    .highlights-grid {
      grid-template-columns: 1fr;
      gap: 20px;

      .highlight-card {
        padding: 20px 15px;

        .highlight-icon {
          font-size: 2.5rem;
        }

        h3 {
          font-size: 1rem;
        }

        p {
          font-size: 13px;
        }
      }
    }

    .timeline {
      .timeline-container {
        .timeline-item {
          margin-bottom: 20px;

          .timeline-date {
            font-size: 13px;
            padding: 8px 14px;
          }

          .timeline-content {
            padding: 15px;

            h4 {
              font-size: 1rem;
            }

            p {
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
</style>