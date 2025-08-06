<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>联系我们</h3>
          <div class="contact-info">
            <div class="contact-item">
              <el-icon><Location /></el-icon>
              <span>中国湖南张家界市武陵山大道学院路1号</span>
            </div>
            <div class="contact-item">
              <el-icon><Phone /></el-icon>
              <span>0744-8255163</span>
            </div>
            <div class="contact-item">
              <el-icon><Link /></el-icon>
              <a href="https://www.zjjhy.edu.cn/" target="_blank">www.zjjhy.edu.cn</a>
            </div>
          </div>
        </div>
        
        <div class="footer-section">
          <h3>快速链接</h3>
          <div class="quick-links">
            <router-link to="/school-info">学校介绍</router-link>
            <router-link to="/majors">专业介绍</router-link>
            <router-link to="/campus-life">校园生活</router-link>
            <router-link to="/admission-guide">入学须知</router-link>
          </div>
        </div>
        
        <div class="footer-section">
          <h3>关于我们</h3>
          <p class="about-text">
            张家界航空工业职业技术学院致力于培养高素质技能人才，
            为学生提供优质的教育资源和良好的成长环境。
          </p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="copyright">
          <p>&copy; 2024 张家界航空工业职业技术学院 新生指南网站</p>
          <p>为新生提供全方位入学指导服务</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Location, Phone, Link } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.footer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-top: 60px;

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px 20px;
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    margin-bottom: 30px;

    .footer-section {
      h3 {
        font-size: 18px;
        margin-bottom: 20px;
        color: #fff;
        border-bottom: 2px solid rgba(255, 255, 255, 0.3);
        padding-bottom: 8px;
        display: inline-block;
      }

      .contact-info {
        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          color: rgba(255, 255, 255, 0.9);

          .el-icon {
            font-size: 16px;
            color: #ffd700;
          }

          a {
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            
            &:hover {
              color: #ffd700;
            }
          }
        }
      }

      .quick-links {
        display: flex;
        flex-direction: column;
        gap: 12px;

        a {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          padding: 5px 0;
          border-bottom: 1px solid transparent;
          transition: all 0.3s ease;

          &:hover {
            color: #ffd700;
            border-bottom-color: #ffd700;
            padding-left: 10px;
          }
        }
      }

      .about-text {
        color: rgba(255, 255, 255, 0.9);
        line-height: 1.8;
        font-size: 14px;
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 20px;
    text-align: center;

    .copyright {
      p {
        margin: 5px 0;
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
      }
    }
  }

  @media (max-width: 1024px) {
    .footer-content {
      grid-template-columns: repeat(2, 1fr);
      gap: 40px;
    }
  }

  @media (max-width: 768px) {
    .footer {
      margin-top: 40px;
    }

    .footer-container {
      padding: 30px 15px 15px;
    }

    .footer-content {
      grid-template-columns: 1fr;
      gap: 30px;

      .footer-section {
        text-align: center;

        h3 {
          font-size: 16px;
          margin-bottom: 15px;
        }

        .contact-info {
          .contact-item {
            justify-content: center;
            margin-bottom: 10px;
            font-size: 14px;

            .el-icon {
              font-size: 14px;
            }
          }
        }

        .quick-links {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;

          a {
            font-size: 14px;
            padding: 3px 0;
            
            &:hover {
              padding-left: 0;
            }
          }
        }

        .about-text {
          font-size: 13px;
          text-align: center;
        }
      }
    }

    .footer-bottom {
      padding-top: 15px;

      .copyright {
        p {
          font-size: 13px;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .footer-container {
      padding: 25px 10px 10px;
    }

    .footer-content {
      gap: 25px;

      .footer-section {
        h3 {
          font-size: 15px;
        }

        .contact-info {
          .contact-item {
            font-size: 13px;
            flex-direction: column;
            gap: 5px;
            text-align: center;

            .el-icon {
              font-size: 16px;
            }
          }
        }

        .quick-links {
          gap: 10px;

          a {
            font-size: 13px;
          }
        }

        .about-text {
          font-size: 12px;
        }
      }
    }

    .footer-bottom {
      .copyright {
        p {
          font-size: 12px;
          margin: 3px 0;
        }
      }
    }
  }
}
</style>