@echo off
echo 正在配置Git用户信息...
git config --global user.name "308-YWC"
git config --global user.email "3082076259@qq.com"

echo 正在初始化Git仓库...
git init

echo 正在添加所有文件...
git add .

echo 正在创建初始提交...
git commit -m "Initial commit: 张家界航院新生指南项目"

echo.
echo =================================================
echo Git仓库已准备就绪！
echo.
echo 接下来请手动执行以下步骤：
echo.
echo 1. 在浏览器中访问 https://github.com/new
echo 2. 使用用户名 308-YWC 登录GitHub
echo 3. 创建一个新的仓库，建议命名为: zjjhyxsxd-guide
echo 4. 不要初始化README、.gitignore或license（我们已经有了）
echo 5. 创建仓库后，复制仓库的HTTPS URL
echo.
echo 然后运行以下命令（请替换YOUR_REPO_URL为实际的仓库URL）：
echo git remote add origin YOUR_REPO_URL
echo git branch -M main
echo git push -u origin main
echo.
echo =================================================
pause