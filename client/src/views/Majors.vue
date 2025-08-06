<template>
  <div class="majors">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="container">
        <h1>专业介绍</h1>
        <p>探索我们的专业设置，找到最适合你的发展方向</p>
      </div>
    </div>

    <div class="content">
      <div class="container">
        <!-- 专业分类筛选 -->
        <div class="filter-section">
          <h3>专业分类</h3>
          <div class="category-filters">
            <el-button 
              :type="selectedCategory === '' ? 'primary' : ''"
              @click="filterByCategory('')"
            >
              全部专业
            </el-button>
            <el-button 
              v-for="category in categories" 
              :key="category"
              :type="selectedCategory === category ? 'primary' : ''"
              @click="filterByCategory(category)"
            >
              {{ category }}
            </el-button>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="6" animated />
        </div>

        <!-- 专业列表 -->
        <div v-else-if="filteredMajors.length > 0" class="majors-grid">
          <div v-for="major in filteredMajors" :key="major.id" class="major-card">
            <div class="card-header">
              <div class="major-category">{{ major.category }}</div>
              <h3 class="major-name">{{ major.name }}</h3>
            </div>
            
                      <div class="card-content">
            <p class="major-description">{{ major.description }}</p>
            
            <div class="major-details">
              <div class="detail-item">
                <el-icon><School /></el-icon>
                <span>所属学院：{{ major.college }}</span>
              </div>
              <div class="detail-item" v-if="major.code">
                <el-icon><Document /></el-icon>
                <span>专业代码：{{ major.code }}</span>
              </div>
              <div class="detail-item">
                <el-icon><Clock /></el-icon>
                <span>学制：{{ major.duration }}</span>
              </div>
              <div class="detail-item">
                <el-icon><Briefcase /></el-icon>
                <span>就业方向：{{ major.employment }}</span>
              </div>
              <div class="detail-item" v-if="major.features && major.features.length > 0">
                <el-icon><Star /></el-icon>
                <span>专业特色：{{ major.features.join('、') }}</span>
              </div>
            </div>
          </div>

            <div class="card-footer">
              <el-button type="primary" plain>了解更多</el-button>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-else-if="!loading" class="empty-state">
          <el-empty description="暂无相关专业信息" />
        </div>

        <!-- 专业优势 -->
        <section class="advantages-section">
          <h2 class="section-title">专业优势</h2>
          <div class="advantages-grid">
            <div class="advantage-card">
              <div class="advantage-icon">✈️</div>
              <h4>航空特色</h4>
              <p>依托航空工业背景，专业设置紧贴行业需求，培养航空专门人才</p>
            </div>
            <div class="advantage-card">
              <div class="advantage-icon">🔧</div>
              <h4>实践导向</h4>
              <p>注重实践能力培养，拥有完善的实训基地和先进的教学设备</p>
            </div>
            <div class="advantage-card">
              <div class="advantage-icon">🤝</div>
              <h4>校企合作</h4>
              <p>与多家知名企业建立合作关系，为学生提供实习和就业机会</p>
            </div>
            <div class="advantage-card">
              <div class="advantage-icon">📈</div>
              <h4>就业保障</h4>
              <p>毕业生就业率高，就业质量好，深受用人单位欢迎</p>
            </div>
          </div>
        </section>

        <!-- 联系咨询 -->
        <section class="contact-section">
          <div class="contact-card">
            <h3>专业咨询</h3>
            <p>如果您对我们的专业有任何疑问，欢迎联系我们</p>
            <div class="contact-info">
              <div class="contact-item">
                <el-icon><Phone /></el-icon>
                <span>咨询电话：0744-8255163</span>
              </div>
              <div class="contact-item">
                <el-icon><Message /></el-icon>
                <span>在线咨询：周一至周五 8:00-17:00</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Clock, Briefcase, Phone, Message, School, Document, Star } from '@element-plus/icons-vue'
import axios from 'axios'

const loading = ref(true)
const majors = ref([])
const categories = ref([])
const selectedCategory = ref('')

const filteredMajors = computed(() => {
  if (!selectedCategory.value) {
    return majors.value
  }
  return majors.value.filter(major => major.category === selectedCategory.value)
})

const filterByCategory = (category) => {
  selectedCategory.value = category
}

const fetchMajors = async () => {
  try {
    loading.value = true
    const [majorsResponse, categoriesResponse] = await Promise.all([
      axios.get('/api/majors'),
      axios.get('/api/major-categories')
    ])
    
    if (majorsResponse.data.success) {
      majors.value = majorsResponse.data.data
    }
    
    if (categoriesResponse.data.success) {
      categories.value = categoriesResponse.data.data
    }
  } catch (error) {
    console.error('获取专业信息失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMajors()
})
</script>

<style lang="scss" scoped>
.majors {
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

    .filter-section {
      margin: 40px 0;
      text-align: center;

      h3 {
        margin-bottom: 20px;
        color: #333;
        font-size: 1.3rem;
      }

      .category-filters {
        display: flex;
        justify-content: center;
        gap: 15px;
        flex-wrap: wrap;
      }
    }

    .loading-container {
      padding: 40px 0;
    }

    .majors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 30px;
      margin: 40px 0;

      .major-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;
        border: 1px solid #f0f0f0;

        &:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 25px;

          .major-category {
            background: rgba(255, 255, 255, 0.2);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            display: inline-block;
            margin-bottom: 10px;
          }

          .major-name {
            font-size: 1.4rem;
            margin: 0;
            font-weight: bold;
          }
        }

        .card-content {
          padding: 25px;

          .major-description {
            color: #555;
            line-height: 1.6;
            margin-bottom: 20px;
          }

          .major-details {
            .detail-item {
              display: flex;
              align-items: center;
              gap: 10px;
              margin-bottom: 12px;
              color: #666;

              .el-icon {
                color: #1890ff;
                font-size: 16px;
              }

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }

        .card-footer {
          padding: 0 25px 25px;
        }
      }
    }

    .empty-state {
      text-align: center;
      padding: 60px 0;
    }

    .advantages-section, .contact-section {
      margin: 80px 0;

      .section-title {
        font-size: 2rem;
        text-align: center;
        margin-bottom: 50px;
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

    .advantages-section {
      background: #f8fafc;
      padding: 60px 0;
      margin-left: -20px;
      margin-right: -20px;

      .advantages-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;

        .advantage-card {
          background: white;
          padding: 30px;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

          .advantage-icon {
            font-size: 3rem;
            margin-bottom: 20px;
          }

          h4 {
            font-size: 1.2rem;
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

    .contact-section {
      .contact-card {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 40px;
        border-radius: 16px;
        text-align: center;

        h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
        }

        > p {
          margin-bottom: 30px;
          opacity: 0.9;
        }

        .contact-info {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;

          .contact-item {
            display: flex;
            align-items: center;
            gap: 10px;

            .el-icon {
              font-size: 18px;
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

      .majors-grid {
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 25px;
      }

      .advantages-section {
        .advantages-grid {
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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

      .filter-section {
        margin: 30px 0;

        h3 {
          font-size: 1.2rem;
          margin-bottom: 15px;
        }

        .category-filters {
          justify-content: flex-start;
          overflow-x: auto;
          padding-bottom: 10px;
          gap: 10px;

          .el-button {
            flex-shrink: 0;
            font-size: 14px;
            padding: 8px 16px;
          }
        }
      }

      .majors-grid {
        grid-template-columns: 1fr;
        gap: 20px;
        margin: 30px 0;

        .major-card {
          .card-header {
            padding: 20px;

            .major-category {
              font-size: 0.8rem;
              padding: 3px 10px;
            }

            .major-name {
              font-size: 1.2rem;
            }
          }

          .card-content {
            padding: 20px;

            .major-description {
              font-size: 14px;
              margin-bottom: 15px;
            }

            .major-details {
              .detail-item {
                margin-bottom: 10px;
                font-size: 14px;

                .el-icon {
                  font-size: 14px;
                }
              }
            }
          }

          .card-footer {
            padding: 0 20px 20px;

            .el-button {
              width: 100%;
              font-size: 14px;
            }
          }
        }
      }

      .advantages-section {
        padding: 40px 0;

        .section-title {
          font-size: 1.6rem;
          margin-bottom: 30px;
        }

        .advantages-grid {
          grid-template-columns: 1fr;
          gap: 20px;
          padding: 0 15px;

          .advantage-card {
            padding: 25px 20px;

            .advantage-icon {
              font-size: 2.5rem;
              margin-bottom: 15px;
            }

            h4 {
              font-size: 1.1rem;
              margin-bottom: 12px;
            }

            p {
              font-size: 14px;
            }
          }
        }
      }

      .contact-section {
        margin: 40px 0;

        .contact-card {
          padding: 30px 20px;

          h3 {
            font-size: 1.3rem;
            margin-bottom: 12px;
          }

          > p {
            margin-bottom: 25px;
            font-size: 14px;
          }

          .contact-info {
            flex-direction: column;
            gap: 15px;

            .contact-item {
              justify-content: center;
              font-size: 14px;

              .el-icon {
                font-size: 16px;
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

      .filter-section {
        margin: 25px 0;

        h3 {
          font-size: 1.1rem;
        }

        .category-filters {
          gap: 8px;

          .el-button {
            font-size: 13px;
            padding: 6px 12px;
          }
        }
      }

      .majors-grid {
        gap: 15px;
        margin: 25px 0;

        .major-card {
          .card-header {
            padding: 18px 15px;

            .major-category {
              font-size: 0.75rem;
            }

            .major-name {
              font-size: 1.1rem;
            }
          }

          .card-content {
            padding: 18px 15px;

            .major-description {
              font-size: 13px;
            }

            .major-details {
              .detail-item {
                font-size: 13px;

                .el-icon {
                  font-size: 13px;
                }
              }
            }
          }

          .card-footer {
            padding: 0 15px 18px;

            .el-button {
              font-size: 13px;
            }
          }
        }
      }

      .advantages-section {
        padding: 30px 0;

        .section-title {
          font-size: 1.4rem;
          margin-bottom: 25px;
        }

        .advantages-grid {
          gap: 15px;
          padding: 0 10px;

          .advantage-card {
            padding: 20px 15px;

            .advantage-icon {
              font-size: 2rem;
            }

            h4 {
              font-size: 1rem;
            }

            p {
              font-size: 13px;
            }
          }
        }
      }

      .contact-section {
        margin: 30px 0;

        .contact-card {
          padding: 25px 15px;

          h3 {
            font-size: 1.2rem;
          }

          > p {
            font-size: 13px;
          }

          .contact-info {
            .contact-item {
              font-size: 13px;

              .el-icon {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
}
</style>