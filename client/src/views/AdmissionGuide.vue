<template>
  <div class="admission-guide">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="container">
        <h1>入学须知</h1>
        <p>新生入学完整指南，助你顺利开启大学生活</p>
      </div>
    </div>

    <div class="content">
      <div class="container">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <el-skeleton :rows="8" animated />
        </div>

        <!-- 入学指南内容 -->
        <div v-else-if="admissionData" class="admission-content">
          <!-- 重要提醒 -->
          <section class="important-notice">
            <div class="notice-card">
              <div class="notice-header">
                <el-icon class="notice-icon"><Warning /></el-icon>
                <h3>重要提醒</h3>
              </div>
              <div class="notice-content">
                <p>请仔细阅读以下入学须知，准备好所有必需材料，确保顺利完成入学报到手续。</p>
                <p>如有疑问，请及时联系学校招生办公室。</p>
              </div>
            </div>
          </section>

          <!-- 报到时间安排 -->
          <section class="schedule-section">
            <h2 class="section-title">报到时间安排</h2>
            <div class="timeline-container">
              <div v-for="(event, index) in admissionData.schedule" :key="index" class="timeline-item">
                <div class="timeline-marker">
                  <div class="marker-dot"></div>
                  <div v-if="index < admissionData.schedule.length - 1" class="marker-line"></div>
                </div>
                <div class="timeline-content">
                  <div class="timeline-date">{{ event.date }}</div>
                  <h4>{{ event.event }}</h4>
                  <p>{{ event.location }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- 必备证件 -->
          <section class="documents-section">
            <h2 class="section-title">必备证件</h2>
            <div class="documents-grid">
              <div v-for="document in admissionData.documents" :key="document" class="document-card">
                <div class="document-icon">
                  <el-icon><Document /></el-icon>
                </div>
                <h4>{{ document }}</h4>
                <div class="check-mark">
                  <el-icon><Check /></el-icon>
                </div>
              </div>
            </div>
            <div class="documents-note">
              <el-alert
                title="温馨提示"
                type="info"
                :closable="false"
                show-icon
              >
                请提前准备好以上所有证件的原件和复印件，复印件建议多准备几份备用。
              </el-alert>
            </div>
          </section>

          <!-- 必备物品 -->
          <section class="items-section">
            <h2 class="section-title">必备物品</h2>
            <div class="items-categories">
              <div class="category-card">
                <h4>📚 学习用品</h4>
                <ul>
                  <li>笔记本电脑（推荐）</li>
                  <li>书包、文具</li>
                  <li>U盘、移动硬盘</li>
                </ul>
              </div>
              <div class="category-card">
                <h4>👕 生活用品</h4>
                <ul>
                  <li v-for="item in admissionData.items" :key="item">{{ item }}</li>
                </ul>
              </div>
              <div class="category-card">
                <h4>💊 健康用品</h4>
                <ul>
                  <li>常用感冒药</li>
                  <li>创可贴、体温计</li>
                  <li>个人常用药品</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- 费用明细 -->
          <section class="fees-section">
            <h2 class="section-title">费用明细</h2>
            <div class="fees-content">
              <div class="fees-overview">
                <div class="fees-card primary">
                  <h4>学费</h4>
                  <div class="fee-amount">{{ admissionData.fees.tuition }}</div>
                  <p>根据专业不同</p>
                </div>
                <div class="fees-card">
                  <h4>住宿费</h4>
                  <div class="fee-amount">{{ admissionData.fees.accommodation }}</div>
                  <p>按宿舍类型</p>
                </div>
                <div class="fees-card">
                  <h4>教材费</h4>
                  <div class="fee-amount">{{ admissionData.fees.textbooks }}</div>
                  <p>预收费用</p>
                </div>
                <div class="fees-card">
                  <h4>保险费</h4>
                  <div class="fee-amount">{{ admissionData.fees.insurance }}</div>
                  <p>学生平安保险</p>
                </div>
              </div>
              <div class="payment-info">
                <el-alert
                  title="缴费方式"
                  type="success"
                  :closable="false"
                  show-icon
                >
                  <template #default>
                    <p>支持以下缴费方式：</p>
                    <ul>
                      <li>💳 银行转账（推荐）</li>
                      <li>💰 现金缴费</li>
                      <li>📱 支付宝/微信支付</li>
                      <li>🏦 银行卡刷卡</li>
                    </ul>
                  </template>
                </el-alert>
              </div>
            </div>
          </section>

          <!-- 注意事项 -->
          <section class="tips-section">
            <h2 class="section-title">注意事项</h2>
            <div class="tips-grid">
              <div class="tip-card">
                <div class="tip-icon">🕐</div>
                <h4>报到时间</h4>
                <p>请按照录取通知书上的时间准时报到，如有特殊情况需提前联系学校。</p>
              </div>
              <div class="tip-card">
                <div class="tip-icon">🚗</div>
                <h4>交通安排</h4>
                <p>学校在火车站、汽车站设有接站点，请注意查看相关信息。</p>
              </div>
              <div class="tip-card">
                <div class="tip-icon">🏠</div>
                <h4>住宿安排</h4>
                <p>宿舍将在报到当天分配，请耐心等候工作人员安排。</p>
              </div>
              <div class="tip-card">
                <div class="tip-icon">📞</div>
                <h4>紧急联系</h4>
                <p>遇到问题请及时联系学校相关部门，我们将竭诚为您服务。</p>
              </div>
            </div>
          </section>

          <!-- 联系方式 -->
          <section class="contact-section">
            <div class="contact-card">
              <h3>需要帮助？</h3>
              <p>如果您在入学准备过程中遇到任何问题，请随时联系我们</p>
              <div class="contact-methods">
                <div class="contact-method">
                  <el-icon><Phone /></el-icon>
                  <div>
                    <h5>招生咨询热线</h5>
                    <span>0744-8255163</span>
                  </div>
                </div>
                <div class="contact-method">
                  <el-icon><Clock /></el-icon>
                  <div>
                    <h5>服务时间</h5>
                    <span>周一至周日 8:00-18:00</span>
                  </div>
                </div>
                <div class="contact-method">
                  <el-icon><Location /></el-icon>
                  <div>
                    <h5>学校地址</h5>
                    <span>湖南省张家界市永定区热水坑路1号</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- 错误状态 -->
        <div v-else class="error-container">
          <el-result
            icon="error"
            title="加载失败"
            sub-title="无法获取入学指南信息，请稍后重试"
          >
            <template #extra>
              <el-button type="primary" @click="fetchAdmissionGuide">重新加载</el-button>
            </template>
          </el-result>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Warning, Document, Check, Phone, Clock, Location } from '@element-plus/icons-vue'
import axios from 'axios'

const loading = ref(true)
const admissionData = ref(null)

const fetchAdmissionGuide = async () => {
  try {
    loading.value = true
    const response = await axios.get('/api/admission-guide')
    if (response.data.success) {
      admissionData.value = response.data.data
    }
  } catch (error) {
    console.error('获取入学指南信息失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAdmissionGuide()
})
</script>

<style lang="scss" scoped>
.admission-guide {
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

    .admission-content {
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

      .important-notice {
        .notice-card {
          background: linear-gradient(135deg, #faad14, #fa8c16);
          color: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(250, 173, 20, 0.3);

          .notice-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;

            .notice-icon {
              font-size: 28px;
            }

            h3 {
              font-size: 1.5rem;
              margin: 0;
            }
          }

          .notice-content {
            p {
              margin-bottom: 10px;
              line-height: 1.6;
              opacity: 0.95;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }

      .schedule-section {
        .timeline-container {
          max-width: 800px;
          margin: 0 auto;

          .timeline-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 30px;

            &:last-child {
              margin-bottom: 0;

              .marker-line {
                display: none;
              }
            }

            .timeline-marker {
              margin-right: 30px;
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;

              .marker-dot {
                width: 16px;
                height: 16px;
                background: #1890ff;
                border-radius: 50%;
                border: 4px solid white;
                box-shadow: 0 0 0 4px #1890ff;
                z-index: 1;
              }

              .marker-line {
                width: 2px;
                height: 60px;
                background: #e5e5e5;
                margin-top: 10px;
              }
            }

            .timeline-content {
              flex: 1;
              background: white;
              padding: 25px;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

              .timeline-date {
                background: #1890ff;
                color: white;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 0.9rem;
                display: inline-block;
                margin-bottom: 15px;
                font-weight: 500;
              }

              h4 {
                font-size: 1.2rem;
                margin-bottom: 8px;
                color: #333;
              }

              p {
                color: #666;
                margin: 0;
              }
            }
          }
        }
      }

      .documents-section {
        .documents-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          margin-bottom: 30px;

          .document-card {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            text-align: center;
            position: relative;
            transition: all 0.3s ease;
            border: 2px solid transparent;

            &:hover {
              border-color: #1890ff;
              transform: translateY(-4px);
            }

            .document-icon {
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
              margin-bottom: 15px;
              font-size: 1.1rem;
            }

            .check-mark {
              position: absolute;
              top: 15px;
              right: 15px;
              width: 24px;
              height: 24px;
              background: #52c41a;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;

              .el-icon {
                font-size: 14px;
                color: white;
              }
            }
          }
        }

        .documents-note {
          margin-top: 30px;
        }
      }

      .items-section {
        background: #f8fafc;
        padding: 60px 0;
        margin-left: -20px;
        margin-right: -20px;

        .items-categories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;

          .category-card {
            background: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

            h4 {
              font-size: 1.2rem;
              margin-bottom: 20px;
              color: #333;
              border-bottom: 2px solid #f0f0f0;
              padding-bottom: 10px;
            }

            ul {
              list-style: none;
              padding: 0;
              margin: 0;

              li {
                padding: 8px 0;
                color: #555;
                border-bottom: 1px solid #f8f8f8;
                position: relative;
                padding-left: 20px;

                &:before {
                  content: '•';
                  color: #1890ff;
                  position: absolute;
                  left: 0;
                  font-weight: bold;
                }

                &:last-child {
                  border-bottom: none;
                }
              }
            }
          }
        }
      }

      .fees-section {
        .fees-content {
          .fees-overview {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
            margin-bottom: 40px;

            .fees-card {
              background: white;
              padding: 30px;
              border-radius: 16px;
              text-align: center;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
              border-top: 4px solid #1890ff;

              &.primary {
                border-top-color: #52c41a;
                background: linear-gradient(135deg, #f6ffed, #f0f9ff);
              }

              h4 {
                font-size: 1.1rem;
                margin-bottom: 15px;
                color: #333;
              }

              .fee-amount {
                font-size: 1.5rem;
                font-weight: bold;
                color: #1890ff;
                margin-bottom: 10px;
              }

              p {
                color: #666;
                font-size: 0.9rem;
                margin: 0;
              }
            }
          }

          .payment-info {
            ul {
              margin: 10px 0 0 0;
              padding-left: 0;
              list-style: none;

              li {
                padding: 5px 0;
                color: #555;
              }
            }
          }
        }
      }

      .tips-section {
        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;

          .tip-card {
            background: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            text-align: center;

            .tip-icon {
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
              margin: 0;
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

          .contact-methods {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            text-align: left;

            .contact-method {
              display: flex;
              align-items: flex-start;
              gap: 15px;

              .el-icon {
                font-size: 24px;
                margin-top: 5px;
                color: #ffd700;
              }

              div {
                h5 {
                  font-size: 1rem;
                  margin-bottom: 5px;
                  opacity: 0.9;
                }

                span {
                  font-size: 1.1rem;
                  font-weight: 500;
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

      .admission-content {
        section {
          margin: 50px 0;

          .section-title {
            font-size: 1.8rem;
            margin-bottom: 35px;
          }
        }

        .documents-section {
          .documents-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
          }
        }

        .items-section {
          .items-categories {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
          }
        }

        .fees-section {
          .fees-content {
            .fees-overview {
              grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
              gap: 20px;
            }
          }
        }

        .tips-section {
          .tips-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
          }
        }

        .contact-section {
          .contact-card {
            .contact-methods {
              grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
              gap: 25px;
            }
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

      .admission-content {
        section {
          margin: 40px 0;

          .section-title {
            font-size: 1.6rem;
            margin-bottom: 30px;
          }
        }

        .important-notice {
          .notice-card {
            padding: 25px 20px;

            .notice-header {
              gap: 12px;
              margin-bottom: 18px;

              .notice-icon {
                font-size: 24px;
              }

              h3 {
                font-size: 1.3rem;
              }
            }

            .notice-content {
              p {
                font-size: 14px;
                margin-bottom: 8px;
              }
            }
          }
        }

        .schedule-section {
          .timeline-container {
            padding: 0 15px;

            .timeline-item {
              margin-bottom: 25px;

              .timeline-marker {
                margin-right: 20px;

                .marker-dot {
                  width: 14px;
                  height: 14px;
                  border: 3px solid white;
                  box-shadow: 0 0 0 3px #1890ff;
                }

                .marker-line {
                  height: 50px;
                  margin-top: 8px;
                }
              }

              .timeline-content {
                padding: 20px 18px;

                .timeline-date {
                  font-size: 0.85rem;
                  padding: 5px 10px;
                  margin-bottom: 12px;
                }

                h4 {
                  font-size: 1.1rem;
                  margin-bottom: 6px;
                }

                p {
                  font-size: 14px;
                }
              }
            }
          }
        }

        .documents-section {
          .documents-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 25px;

            .document-card {
              padding: 20px;

              .document-icon {
                width: 50px;
                height: 50px;
                margin: 0 auto 15px;

                .el-icon {
                  font-size: 24px;
                }
              }

              h4 {
                font-size: 1rem;
                margin-bottom: 12px;
              }

              .check-mark {
                width: 20px;
                height: 20px;
                top: 12px;
                right: 12px;

                .el-icon {
                  font-size: 12px;
                }
              }
            }
          }
        }

        .items-section {
          padding: 40px 0;

          .items-categories {
            grid-template-columns: 1fr;
            gap: 25px;
            padding: 0 15px;

            .category-card {
              padding: 25px 20px;

              h4 {
                font-size: 1.1rem;
                margin-bottom: 18px;
              }

              ul {
                li {
                  padding: 6px 0;
                  font-size: 14px;
                }
              }
            }
          }
        }

        .fees-section {
          .fees-content {
            .fees-overview {
              grid-template-columns: 1fr;
              gap: 20px;
              margin-bottom: 30px;

              .fees-card {
                padding: 25px 20px;

                h4 {
                  font-size: 1rem;
                  margin-bottom: 12px;
                }

                .fee-amount {
                  font-size: 1.3rem;
                  margin-bottom: 8px;
                }

                p {
                  font-size: 0.85rem;
                }
              }
            }
          }
        }

        .tips-section {
          .tips-grid {
            grid-template-columns: 1fr;
            gap: 25px;

            .tip-card {
              padding: 25px 20px;

              .tip-icon {
                font-size: 2.5rem;
                margin-bottom: 18px;
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

            .contact-methods {
              grid-template-columns: 1fr;
              gap: 20px;
              text-align: center;

              .contact-method {
                justify-content: center;
                gap: 12px;

                .el-icon {
                  font-size: 20px;
                }

                div {
                  h5 {
                    font-size: 0.95rem;
                    margin-bottom: 4px;
                  }

                  span {
                    font-size: 1rem;
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

      .admission-content {
        section {
          margin: 30px 0;

          .section-title {
            font-size: 1.4rem;
            margin-bottom: 25px;
          }
        }

        .important-notice {
          .notice-card {
            padding: 20px 15px;

            .notice-header {
              gap: 10px;
              margin-bottom: 15px;

              .notice-icon {
                font-size: 20px;
              }

              h3 {
                font-size: 1.2rem;
              }
            }

            .notice-content {
              p {
                font-size: 13px;
              }
            }
          }
        }

        .schedule-section {
          .timeline-container {
            padding: 0 10px;

            .timeline-item {
              margin-bottom: 20px;

              .timeline-marker {
                margin-right: 15px;

                .marker-dot {
                  width: 12px;
                  height: 12px;
                }

                .marker-line {
                  height: 45px;
                }
              }

              .timeline-content {
                padding: 18px 15px;

                .timeline-date {
                  font-size: 0.8rem;
                  padding: 4px 8px;
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
        }

        .documents-section {
          .documents-grid {
            gap: 15px;

            .document-card {
              padding: 18px 15px;

              .document-icon {
                width: 45px;
                height: 45px;

                .el-icon {
                  font-size: 20px;
                }
              }

              h4 {
                font-size: 0.95rem;
              }

              .check-mark {
                width: 18px;
                height: 18px;
                top: 10px;
                right: 10px;
              }
            }
          }
        }

        .items-section {
          padding: 30px 0;

          .items-categories {
            gap: 20px;
            padding: 0 10px;

            .category-card {
              padding: 20px 15px;

              h4 {
                font-size: 1rem;
                margin-bottom: 15px;
              }

              ul {
                li {
                  font-size: 13px;
                }
              }
            }
          }
        }

        .fees-section {
          .fees-content {
            .fees-overview {
              gap: 18px;

              .fees-card {
                padding: 20px 15px;

                h4 {
                  font-size: 0.95rem;
                }

                .fee-amount {
                  font-size: 1.2rem;
                }

                p {
                  font-size: 0.8rem;
                }
              }
            }
          }
        }

        .tips-section {
          .tips-grid {
            gap: 20px;

            .tip-card {
              padding: 20px 15px;

              .tip-icon {
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
          .contact-card {
            padding: 25px 15px;

            h3 {
              font-size: 1.2rem;
            }

            > p {
              font-size: 13px;
            }

            .contact-methods {
              gap: 18px;

              .contact-method {
                gap: 10px;

                .el-icon {
                  font-size: 18px;
                }

                div {
                  h5 {
                    font-size: 0.9rem;
                  }

                  span {
                    font-size: 0.95rem;
                  }
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