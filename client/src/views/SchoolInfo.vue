<template>
  <div class="school-info">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="container">
        <h1>学校介绍</h1>
        <p>了解张家界航空工业职业技术学院的历史沿革、办学特色和发展成就</p>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="8" animated />
    </div>

    <!-- 学校信息内容 -->
    <div v-else-if="schoolData" class="content">
      <div class="container">
        <!-- 学校概况 -->
        <section class="school-overview">
          <div class="overview-content">
            <div class="text-content">
              <h2>{{ schoolData.name }}</h2>
              <h3>{{ schoolData.englishName }}</h3>
              <div class="basic-info">
                <div class="info-item">
                  <el-icon><Calendar /></el-icon>
                  <span>建校时间：{{ schoolData.established }}</span>
                </div>
                <div class="info-item">
                  <el-icon><Location /></el-icon>
                  <span>学校位置：{{ schoolData.location }}</span>
                </div>
                <div class="info-item">
                  <el-icon><Phone /></el-icon>
                  <span>联系电话：{{ schoolData.phone }}</span>
                </div>
                <div class="info-item">
                  <el-icon><Link /></el-icon>
                  <a :href="schoolData.website" target="_blank">{{ schoolData.website }}</a>
                </div>
              </div>
              <p class="description">{{ schoolData.description }}</p>
            </div>
            <div class="image-content">
              <div class="school-image">
                <el-icon class="large-icon"><School /></el-icon>
                <p>校园景观</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 学校特色 -->
        <section class="school-features">
          <h2 class="section-title">办学特色</h2>
          <div class="features-grid">
            <div v-for="(feature, index) in schoolData.features" :key="index" class="feature-card">
              <div class="feature-icon">
                <el-icon><Star /></el-icon>
              </div>
              <div class="feature-content">
                <h4>{{ feature }}</h4>
              </div>
            </div>
          </div>
        </section>

        <!-- 详细地址 -->
        <section class="address-section">
          <h2 class="section-title">学校地址</h2>
          <div class="address-card">
            <div class="address-info">
              <el-icon class="address-icon"><Location /></el-icon>
              <div class="address-text">
                <h3>详细地址</h3>
                <p>{{ schoolData.address }}</p>
                <div class="address-tips">
                  <h4>交通指南</h4>
                  <ul>
                    <li>🚌 市内可乘坐1路、2路、6路公交车到达</li>
                    <li>🚗 自驾车可通过导航软件搜索"张家界航空工业职业技术学院"</li>
                    <li>✈️ 张家界荷花国际机场距离学校约15公里</li>
                    <li>🚄 张家界火车站距离学校约8公里</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 校园风光 -->
        <section class="campus-gallery">
          <h2 class="section-title">校园风光</h2>
          <div class="gallery-grid">
            <div v-for="i in 6" :key="i" class="gallery-item">
              <div class="image-placeholder">
                <el-icon><Picture /></el-icon>
                <p>校园图片 {{ i }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else class="error-container">
      <el-result
        icon="error"
        title="加载失败"
        sub-title="无法获取学校信息，请稍后重试"
      >
        <template #extra>
          <el-button type="primary" @click="fetchSchoolInfo">重新加载</el-button>
        </template>
      </el-result>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Calendar, Location, Phone, Link, School, Star, Picture } from '@element-plus/icons-vue'
import axios from 'axios'

const loading = ref(true)
const schoolData = ref(null)

const fetchSchoolInfo = async () => {
  try {
    loading.value = true
    const response = await axios.get('/api/school-info')
    if (response.data.success) {
      schoolData.value = response.data.data
    }
  } catch (error) {
    console.error('获取学校信息失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSchoolInfo()
})
</script>

<style lang="scss" scoped>
.school-info {
  .page-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 60px 0;
    text-align: center;

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 15px;
      font-weight: bold;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
    }
  }

  .loading-container, .error-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 20px;
  }

  .content {
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    section {
      margin: 60px 0;

      .section-title {
        font-size: 2rem;
        text-align: center;
        margin-bottom: 40px;
        color: #333;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: #1890ff;
          border-radius: 2px;
        }
      }
    }

    .school-overview {
      .overview-content {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 60px;
        align-items: center;

        .text-content {
          h2 {
            font-size: 2.2rem;
            color: #1890ff;
            margin-bottom: 10px;
          }

          h3 {
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 30px;
            font-weight: normal;
          }

          .basic-info {
            margin-bottom: 30px;

            .info-item {
              display: flex;
              align-items: center;
              gap: 10px;
              margin-bottom: 15px;
              color: #555;

              .el-icon {
                color: #1890ff;
                font-size: 18px;
              }

              a {
                color: #1890ff;
                text-decoration: none;

                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }

          .description {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #444;
          }
        }

        .image-content {
          .school-image {
            background: #f8fafc;
            border-radius: 16px;
            padding: 60px;
            text-align: center;
            border: 2px dashed #d1d5db;

            .large-icon {
              font-size: 120px;
              color: #9ca3af;
              margin-bottom: 20px;
            }

            p {
              color: #6b7280;
              font-size: 1.1rem;
            }
          }
        }
      }
    }

    .school-features {
      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;

        .feature-card {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border-left: 4px solid #1890ff;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          }

          .feature-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;

            .el-icon {
              font-size: 28px;
              color: white;
            }
          }

          .feature-content {
            h4 {
              font-size: 1.1rem;
              color: #333;
              margin: 0;
            }
          }
        }
      }
    }

    .address-section {
      .address-card {
        background: white;
        border-radius: 16px;
        padding: 40px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

        .address-info {
          display: flex;
          gap: 30px;
          align-items: flex-start;

          .address-icon {
            font-size: 48px;
            color: #1890ff;
            flex-shrink: 0;
          }

          .address-text {
            flex: 1;

            h3 {
              font-size: 1.3rem;
              margin-bottom: 10px;
              color: #333;
            }

            > p {
              font-size: 1.1rem;
              color: #555;
              margin-bottom: 25px;
            }

            .address-tips {
              h4 {
                font-size: 1.1rem;
                margin-bottom: 15px;
                color: #333;
              }

              ul {
                list-style: none;
                padding: 0;

                li {
                  padding: 8px 0;
                  color: #555;
                  border-bottom: 1px solid #f0f0f0;

                  &:last-child {
                    border-bottom: none;
                  }
                }
              }
            }
          }
        }
      }
    }

    .campus-gallery {
      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;

        .gallery-item {
          .image-placeholder {
            background: #f8fafc;
            border-radius: 12px;
            padding: 80px 20px;
            text-align: center;
            border: 2px dashed #d1d5db;
            transition: all 0.3s ease;

            &:hover {
              border-color: #1890ff;
              background: #f0f9ff;
            }

            .el-icon {
              font-size: 48px;
              color: #9ca3af;
              margin-bottom: 15px;
            }

            p {
              color: #6b7280;
              margin: 0;
            }
          }
        }
      }
    }
  }

  // 平板适配
  @media (max-width: 1024px) {
    .page-header {
      padding: 50px 0;

      .container {
        padding: 0 30px;
      }

      h1 {
        font-size: 2.5rem;
      }

      p {
        font-size: 1.1rem;
      }
    }

    .content {
      .container {
        padding: 0 30px;
      }

      section {
        margin: 50px 0;

        .section-title {
          font-size: 1.8rem;
          margin-bottom: 35px;
        }
      }

      .school-overview {
        .overview-content {
          gap: 50px;

          .text-content {
            h2 {
              font-size: 2rem;
            }

            h3 {
              font-size: 1.1rem;
            }
          }
        }
      }

      .school-features {
        .features-grid {
          grid-template-columns: 1fr;
          gap: 25px;
        }
      }

      .campus-gallery {
        .gallery-grid {
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
        }
      }
    }
  }

  // 移动端适配
  @media (max-width: 768px) {
    .page-header {
      padding: 40px 0;

      .container {
        padding: 0 15px;
      }

      h1 {
        font-size: 2rem;
        margin-bottom: 12px;
      }

      p {
        font-size: 1rem;
      }
    }

    .content {
      .container {
        padding: 0 15px;
      }

      section {
        margin: 40px 0;

        .section-title {
          font-size: 1.6rem;
          margin-bottom: 30px;
        }
      }

      .school-overview {
        .overview-content {
          grid-template-columns: 1fr;
          gap: 30px;

          .text-content {
            h2 {
              font-size: 1.8rem;
              margin-bottom: 8px;
            }

            h3 {
              font-size: 1rem;
              margin-bottom: 25px;
            }

            .basic-info {
              margin-bottom: 25px;

              .info-item {
                margin-bottom: 12px;
                font-size: 14px;
                flex-wrap: wrap;

                .el-icon {
                  font-size: 16px;
                  flex-shrink: 0;
                }

                span, a {
                  font-size: 14px;
                }
              }
            }

            .description {
              font-size: 1rem;
              line-height: 1.7;
            }
          }

          .image-content {
            .school-image {
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

      .school-features {
        .features-grid {
          grid-template-columns: 1fr;
          gap: 20px;

          .feature-card {
            padding: 25px 20px;
            flex-direction: column;
            text-align: center;
            gap: 15px;

            .feature-icon {
              width: 50px;
              height: 50px;

              .el-icon {
                font-size: 24px;
              }
            }

            .feature-content {
              h4 {
                font-size: 1rem;
              }
            }
          }
        }
      }

      .address-section {
        .address-card {
          padding: 30px 20px;

          .address-info {
            flex-direction: column;
            gap: 20px;
            text-align: center;

            .address-icon {
              font-size: 36px;
              align-self: center;
            }

            .address-text {
              h3 {
                font-size: 1.2rem;
                margin-bottom: 8px;
              }

              > p {
                font-size: 1rem;
                margin-bottom: 20px;
              }

              .address-tips {
                h4 {
                  font-size: 1rem;
                  margin-bottom: 12px;
                }

                ul {
                  li {
                    padding: 6px 0;
                    font-size: 14px;
                    text-align: left;
                  }
                }
              }
            }
          }
        }
      }

      .campus-gallery {
        .gallery-grid {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;

          .gallery-item {
            .image-placeholder {
              padding: 60px 15px;

              .el-icon {
                font-size: 36px;
              }
            }
          }
        }
      }
    }
  }

  // 小屏手机适配
  @media (max-width: 480px) {
    .page-header {
      padding: 30px 0;

      .container {
        padding: 0 10px;
      }

      h1 {
        font-size: 1.6rem;
      }

      p {
        font-size: 0.9rem;
      }
    }

    .content {
      .container {
        padding: 0 10px;
      }

      section {
        margin: 30px 0;

        .section-title {
          font-size: 1.4rem;
          margin-bottom: 25px;
        }
      }

      .school-overview {
        .overview-content {
          gap: 25px;

          .text-content {
            h2 {
              font-size: 1.5rem;
            }

            h3 {
              font-size: 0.9rem;
            }

            .basic-info {
              .info-item {
                font-size: 13px;

                .el-icon {
                  font-size: 14px;
                }

                span, a {
                  font-size: 13px;
                }
              }
            }

            .description {
              font-size: 0.9rem;
            }
          }

          .image-content {
            .school-image {
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

      .school-features {
        .features-grid {
          gap: 15px;

          .feature-card {
            padding: 20px 15px;

            .feature-icon {
              width: 45px;
              height: 45px;

              .el-icon {
                font-size: 20px;
              }
            }

            .feature-content {
              h4 {
                font-size: 0.95rem;
              }
            }
          }
        }
      }

      .address-section {
        .address-card {
          padding: 25px 15px;

          .address-info {
            .address-icon {
              font-size: 30px;
            }

            .address-text {
              h3 {
                font-size: 1.1rem;
              }

              > p {
                font-size: 0.9rem;
              }

              .address-tips {
                h4 {
                  font-size: 0.95rem;
                }

                ul {
                  li {
                    font-size: 13px;
                  }
                }
              }
            }
          }
        }
      }

      .campus-gallery {
        .gallery-grid {
          grid-template-columns: 1fr;
          gap: 15px;

          .gallery-item {
            .image-placeholder {
              padding: 50px 15px;

              .el-icon {
                font-size: 30px;
              }

              p {
                font-size: 0.9rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>