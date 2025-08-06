<template>
  <div class="campus-life">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="container">
        <h1>校园生活</h1>
        <p>了解丰富多彩的校园生活，感受温馨的校园氛围</p>
      </div>
    </div>

    <div class="content">
      <div class="container">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="8" animated />
        </div>

        <!-- 校园生活内容 -->
        <div v-else-if="campusData" class="campus-content">
          <!-- 住宿环境 -->
          <section class="dormitory-section">
            <h2 class="section-title">住宿环境</h2>
            <div class="dormitory-content">
              <div class="dormitory-info">
                <div class="info-card">
                  <h4>宿舍类型</h4>
                  <div class="dormitory-types">
                    <div v-for="type in campusData.dormitory.types" :key="type" class="type-tag">
                      {{ type }}
                    </div>
                  </div>
                </div>
                
                <div class="info-card">
                  <h4>配套设施</h4>
                  <div class="facilities-list">
                    <div v-for="facility in campusData.dormitory.facilities" :key="facility" class="facility-item">
                      <el-icon><Check /></el-icon>
                      <span>{{ facility }}</span>
                    </div>
                  </div>
                </div>

                <div class="info-card cost-card">
                  <h4>住宿费用</h4>
                  <div class="cost-info">
                    <span class="cost-amount">{{ campusData.dormitory.cost }}</span>
                  </div>
                </div>
              </div>
              
              <div class="dormitory-image">
                <div class="image-placeholder">
                  <el-icon class="large-icon"><House /></el-icon>
                  <p>宿舍环境</p>
                </div>
              </div>
            </div>
          </section>

          <!-- 餐饮服务 -->
          <section class="dining-section">
            <h2 class="section-title">餐饮服务</h2>
            <div class="dining-content">
              <div class="dining-overview">
                <div class="overview-card">
                  <div class="card-icon">🍽️</div>
                  <h4>食堂数量</h4>
                  <p>{{ campusData.dining.canteens.length }}个食堂</p>
                </div>
                <div class="overview-card">
                  <div class="card-icon">💰</div>
                  <h4>平均消费</h4>
                  <p>{{ campusData.dining.avgCost }}</p>
                </div>
              </div>

              <div class="dining-details">
                <div class="canteens-list">
                  <h4>食堂列表</h4>
                  <div class="canteens-grid">
                    <div v-for="canteen in campusData.dining.canteens" :key="canteen" class="canteen-card">
                      <el-icon><Shop /></el-icon>
                      <span>{{ canteen }}</span>
                    </div>
                  </div>
                </div>

                <div class="dining-features">
                  <h4>餐饮特色</h4>
                  <div class="features-list">
                    <div v-for="feature in campusData.dining.features" :key="feature" class="feature-item">
                      <el-icon><Star /></el-icon>
                      <span>{{ feature }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 校园设施 -->
          <section class="facilities-section">
            <h2 class="section-title">校园设施</h2>
            <div class="facilities-grid">
              <div v-for="facility in campusData.facilities" :key="facility" class="facility-card">
                <div class="facility-icon">
                  <el-icon><School /></el-icon>
                </div>
                <h4>{{ facility }}</h4>
              </div>
            </div>
          </section>

          <!-- 社团活动 -->
          <section class="clubs-section">
            <h2 class="section-title">社团活动</h2>
            <div class="clubs-intro">
              <p>学校拥有丰富多样的社团组织，为学生提供展示才华、发展兴趣爱好的平台</p>
            </div>
            <div class="clubs-grid">
              <div v-for="club in campusData.clubs" :key="club" class="club-card">
                <div class="club-icon">👥</div>
                <h4>{{ club }}</h4>
                <el-button type="text" size="small">了解更多</el-button>
              </div>
            </div>
          </section>

          <!-- 生活指南 -->
          <section class="life-guide-section">
            <h2 class="section-title">生活指南</h2>
            <div class="guide-grid">
              <div class="guide-card">
                <div class="guide-icon">📱</div>
                <h4>校园网络</h4>
                <ul>
                  <li>全校覆盖WiFi</li>
                  <li>宿舍有线网络</li>
                  <li>网络办理指南</li>
                </ul>
              </div>
              <div class="guide-card">
                <div class="guide-icon">🏥</div>
                <h4>医疗服务</h4>
                <ul>
                  <li>校内医务室</li>
                  <li>24小时急诊服务</li>
                  <li>医保报销指导</li>
                </ul>
              </div>
              <div class="guide-card">
                <div class="guide-icon">🚌</div>
                <h4>交通出行</h4>
                <ul>
                  <li>校内班车服务</li>
                  <li>公交线路指南</li>
                  <li>共享单车服务</li>
                </ul>
              </div>
              <div class="guide-card">
                <div class="guide-icon">🛒</div>
                <h4>购物服务</h4>
                <ul>
                  <li>校内超市</li>
                  <li>快递服务点</li>
                  <li>生活用品采购</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <!-- 错误状态 -->
        <div v-else class="error-container">
          <el-result
            icon="error"
            title="加载失败"
            sub-title="无法获取校园生活信息，请稍后重试"
          >
            <template #extra>
              <el-button type="primary" @click="fetchCampusLife">重新加载</el-button>
            </template>
          </el-result>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Check, House, Shop, Star, School } from '@element-plus/icons-vue'
import axios from 'axios'

const loading = ref(true)
const campusData = ref(null)

const fetchCampusLife = async () => {
  try {
    loading.value = true
    const response = await axios.get('/api/campus-life')
    if (response.data.success) {
      campusData.value = response.data.data
    }
  } catch (error) {
    console.error('获取校园生活信息失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCampusLife()
})
</script>

<style lang="scss" scoped>
.campus-life {
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

  .content {
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .loading-container, .error-container {
      padding: 60px 0;
    }

    .campus-content {
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

      .dormitory-section {
        .dormitory-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 50px;
          align-items: start;

          .dormitory-info {
            display: flex;
            flex-direction: column;
            gap: 25px;

            .info-card {
              background: white;
              padding: 25px;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

              h4 {
                font-size: 1.2rem;
                margin-bottom: 15px;
                color: #333;
              }

              .dormitory-types {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;

                .type-tag {
                  background: linear-gradient(135deg, #667eea, #764ba2);
                  color: white;
                  padding: 8px 16px;
                  border-radius: 20px;
                  font-size: 0.9rem;
                }
              }

              .facilities-list {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 12px;

                .facility-item {
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  color: #555;

                  .el-icon {
                    color: #52c41a;
                    font-size: 16px;
                  }
                }
              }

              &.cost-card {
                background: linear-gradient(135deg, #52c41a, #389e0d);
                color: white;

                .cost-info {
                  text-align: center;

                  .cost-amount {
                    font-size: 1.5rem;
                    font-weight: bold;
                  }
                }
              }
            }
          }

          .dormitory-image {
            .image-placeholder {
              background: #f8fafc;
              border-radius: 16px;
              padding: 80px 30px;
              text-align: center;
              border: 2px dashed #d1d5db;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              .large-icon {
                font-size: 80px;
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

      .dining-section {
        background: #f8fafc;
        padding: 60px 0;
        margin-left: -20px;
        margin-right: -20px;

        .dining-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;

          .dining-overview {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
            margin-bottom: 40px;

            .overview-card {
              background: white;
              padding: 30px;
              border-radius: 16px;
              text-align: center;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

              .card-icon {
                font-size: 3rem;
                margin-bottom: 15px;
              }

              h4 {
                font-size: 1.1rem;
                margin-bottom: 10px;
                color: #333;
              }

              p {
                color: #666;
                font-size: 1rem;
                margin: 0;
              }
            }
          }

          .dining-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;

            .canteens-list, .dining-features {
              background: white;
              padding: 30px;
              border-radius: 16px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

              h4 {
                font-size: 1.2rem;
                margin-bottom: 20px;
                color: #333;
              }
            }

            .canteens-grid {
              display: grid;
              gap: 15px;

              .canteen-card {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                background: #f8fafc;
                border-radius: 8px;

                .el-icon {
                  color: #1890ff;
                  font-size: 18px;
                }
              }
            }

            .features-list {
              .feature-item {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 12px;
                color: #555;

                .el-icon {
                  color: #faad14;
                  font-size: 16px;
                }

                &:last-child {
                  margin-bottom: 0;
                }
              }
            }
          }
        }
      }

      .facilities-section {
        .facilities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 25px;

          .facility-card {
            background: white;
            padding: 30px;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;

            &:hover {
              transform: translateY(-4px);
              box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
            }

            .facility-icon {
              width: 60px;
              height: 60px;
              background: linear-gradient(135deg, #667eea, #764ba2);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 20px;

              .el-icon {
                font-size: 28px;
                color: white;
              }
            }

            h4 {
              color: #333;
              margin: 0;
            }
          }
        }
      }

      .clubs-section {
        background: #f8fafc;
        padding: 60px 0;
        margin-left: -20px;
        margin-right: -20px;

        .clubs-intro {
          max-width: 1200px;
          margin: 0 auto 40px;
          padding: 0 20px;
          text-align: center;

          p {
            font-size: 1.1rem;
            color: #666;
            line-height: 1.6;
          }
        }

        .clubs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 25px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;

          .club-card {
            background: white;
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

            .club-icon {
              font-size: 2.5rem;
              margin-bottom: 15px;
            }

            h4 {
              font-size: 1.1rem;
              margin-bottom: 15px;
              color: #333;
            }
          }
        }
      }

      .life-guide-section {
        .guide-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;

          .guide-card {
            background: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

            .guide-icon {
              font-size: 3rem;
              margin-bottom: 20px;
            }

            h4 {
              font-size: 1.2rem;
              margin-bottom: 20px;
              color: #333;
            }

            ul {
              list-style: none;
              padding: 0;
              margin: 0;

              li {
                padding: 8px 0;
                color: #555;
                border-bottom: 1px solid #f0f0f0;
                position: relative;
                padding-left: 20px;

                &:before {
                  content: '•';
                  color: #1890ff;
                  position: absolute;
                  left: 0;
                }

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

      .campus-content {
        section {
          margin: 50px 0;

          .section-title {
            font-size: 1.8rem;
            margin-bottom: 35px;
          }
        }

        .dormitory-section {
          .dormitory-content {
            gap: 40px;
          }
        }

        .dining-section {
          .dining-content {
            .dining-overview {
              grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
              gap: 25px;
            }

            .dining-details {
              gap: 30px;
            }
          }
        }

        .facilities-section {
          .facilities-grid {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
          }
        }

        .clubs-section {
          .clubs-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
          }
        }

        .life-guide-section {
          .guide-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
          }
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

      .campus-content {
        section {
          margin: 40px 0;

          .section-title {
            font-size: 1.6rem;
            margin-bottom: 30px;
          }
        }

        .dormitory-section {
          .dormitory-content {
            grid-template-columns: 1fr;
            gap: 30px;

            .dormitory-info {
              gap: 20px;

              .info-card {
                padding: 20px;

                h4 {
                  font-size: 1.1rem;
                  margin-bottom: 12px;
                }

                .dormitory-types {
                  gap: 8px;

                  .type-tag {
                    padding: 6px 12px;
                    font-size: 0.85rem;
                  }
                }

                .facilities-list {
                  grid-template-columns: 1fr;
                  gap: 10px;

                  .facility-item {
                    font-size: 14px;

                    .el-icon {
                      font-size: 14px;
                    }
                  }
                }

                &.cost-card {
                  .cost-info {
                    .cost-amount {
                      font-size: 1.3rem;
                    }
                  }
                }
              }
            }

            .dormitory-image {
              .image-placeholder {
                padding: 50px 20px;

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

        .dining-section {
          padding: 40px 0;

          .dining-content {
            padding: 0 15px;

            .dining-overview {
              grid-template-columns: 1fr;
              gap: 20px;
              margin-bottom: 30px;

              .overview-card {
                padding: 25px 20px;

                .card-icon {
                  font-size: 2.5rem;
                  margin-bottom: 12px;
                }

                h4 {
                  font-size: 1rem;
                  margin-bottom: 8px;
                }

                p {
                  font-size: 0.9rem;
                }
              }
            }

            .dining-details {
              grid-template-columns: 1fr;
              gap: 25px;

              .canteens-list, .dining-features {
                padding: 25px 20px;

                h4 {
                  font-size: 1.1rem;
                  margin-bottom: 15px;
                }
              }

              .canteens-grid {
                gap: 12px;

                .canteen-card {
                  padding: 10px 12px;
                  font-size: 14px;

                  .el-icon {
                    font-size: 16px;
                  }
                }
              }

              .features-list {
                .feature-item {
                  margin-bottom: 10px;
                  font-size: 14px;

                  .el-icon {
                    font-size: 14px;
                  }
                }
              }
            }
          }
        }

        .facilities-section {
          .facilities-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 18px;

            .facility-card {
              padding: 25px 20px;

              .facility-icon {
                width: 50px;
                height: 50px;
                margin: 0 auto 15px;

                .el-icon {
                  font-size: 24px;
                }
              }

              h4 {
                font-size: 0.95rem;
              }
            }
          }
        }

        .clubs-section {
          padding: 40px 0;

          .clubs-intro {
            padding: 0 15px;
            margin: 0 auto 30px;

            p {
              font-size: 1rem;
            }
          }

          .clubs-grid {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
            padding: 0 15px;

            .club-card {
              padding: 20px 18px;

              .club-icon {
                font-size: 2rem;
                margin-bottom: 12px;
              }

              h4 {
                font-size: 1rem;
                margin-bottom: 12px;
              }

              .el-button {
                font-size: 13px;
              }
            }
          }
        }

        .life-guide-section {
          .guide-grid {
            grid-template-columns: 1fr;
            gap: 25px;

            .guide-card {
              padding: 25px 20px;

              .guide-icon {
                font-size: 2.5rem;
                margin-bottom: 15px;
              }

              h4 {
                font-size: 1.1rem;
                margin-bottom: 15px;
              }

              ul {
                li {
                  padding: 6px 0;
                  font-size: 14px;

                  &:before {
                    font-size: 14px;
                  }
                }
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

      .campus-content {
        section {
          margin: 30px 0;

          .section-title {
            font-size: 1.4rem;
            margin-bottom: 25px;
          }
        }

        .dormitory-section {
          .dormitory-content {
            gap: 25px;

            .dormitory-info {
              gap: 18px;

              .info-card {
                padding: 18px 15px;

                h4 {
                  font-size: 1rem;
                }

                .dormitory-types {
                  .type-tag {
                    font-size: 0.8rem;
                    padding: 5px 10px;
                  }
                }

                .facilities-list {
                  .facility-item {
                    font-size: 13px;
                  }
                }

                &.cost-card {
                  .cost-info {
                    .cost-amount {
                      font-size: 1.2rem;
                    }
                  }
                }
              }
            }

            .dormitory-image {
              .image-placeholder {
                padding: 40px 15px;

                .large-icon {
                  font-size: 50px;
                }

                p {
                  font-size: 0.85rem;
                }
              }
            }
          }
        }

        .dining-section {
          padding: 30px 0;

          .dining-content {
            padding: 0 10px;

            .dining-overview {
              gap: 18px;

              .overview-card {
                padding: 20px 15px;

                .card-icon {
                  font-size: 2rem;
                }

                h4 {
                  font-size: 0.95rem;
                }

                p {
                  font-size: 0.85rem;
                }
              }
            }

            .dining-details {
              gap: 20px;

              .canteens-list, .dining-features {
                padding: 20px 15px;

                h4 {
                  font-size: 1rem;
                }
              }

              .canteens-grid {
                .canteen-card {
                  padding: 8px 10px;
                  font-size: 13px;

                  .el-icon {
                    font-size: 14px;
                  }
                }
              }

              .features-list {
                .feature-item {
                  font-size: 13px;
                }
              }
            }
          }
        }

        .facilities-section {
          .facilities-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;

            .facility-card {
              padding: 20px 15px;

              .facility-icon {
                width: 45px;
                height: 45px;

                .el-icon {
                  font-size: 20px;
                }
              }

              h4 {
                font-size: 0.9rem;
              }
            }
          }
        }

        .clubs-section {
          padding: 30px 0;

          .clubs-intro {
            padding: 0 10px;

            p {
              font-size: 0.9rem;
            }
          }

          .clubs-grid {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 15px;
            padding: 0 10px;

            .club-card {
              padding: 18px 15px;

              .club-icon {
                font-size: 1.8rem;
              }

              h4 {
                font-size: 0.95rem;
              }

              .el-button {
                font-size: 12px;
              }
            }
          }
        }

        .life-guide-section {
          .guide-grid {
            gap: 20px;

            .guide-card {
              padding: 20px 15px;

              .guide-icon {
                font-size: 2rem;
              }

              h4 {
                font-size: 1rem;
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
  }
}
</style>