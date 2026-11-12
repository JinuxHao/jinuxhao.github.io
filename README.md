# Homepage of Jinux Hao

GitHub个人主页

面向 GitHub Pages 的静态个人网站，内容围绕遥感建模、科学计算与空间可视化组织。

**网站地址：** <https://jinuxhao.github.io/>（仓库启用 Pages 并完成部署后生效）

**GitHub：** <https://github.com/JinuxHao>

## 页面内容

- **首页**：姓名、个人简介、项目入口与原创等高线示意图。
- **关于我**：个人实践方向及公开机构信息。
- **探索方向**：遥感与物理建模、并行与科学计算、空间与交互可视化。
- **项目展示**：4 个真实公开仓库，可按科学计算、Web 与可视化筛选。
- **技术栈**：MATLAB、C++、PROSAIL、MPI、OpenMP、JavaScript、React、Vue、Cesium。
- **联系入口**：GitHub 个人资料页。

支持中英文切换、浅色/深色主题、系统主题跟随、偏好本地保存、移动端排版、键盘访问与减少动画偏好。禁用 JavaScript 时仍可浏览所有正文与项目链接；主题默认跟随系统。无外部字体、统计脚本或第三方卡片依赖。

## 文件结构

```text
.
├── index.html                       # 正文、个人资料、项目与英文译文
├── assets/
│   ├── style.css                    # 配色、字体、排版与响应式样式
│   ├── main.js                      # 主题、语言、筛选与进入视口动画
│   └── favicon.svg                  # JH 网站图标
├── scripts/
│   └── preview.mjs                  # 无依赖本地预览服务
├── .github/workflows/
│   └── jekyll-gh-pages.yml          # 已改为静态文件部署，保留原文件名
└── .nojekyll                        # 声明无需 Jekyll 处理
```

## 本地预览

安装 Node.js 18 或以上版本后，在项目目录运行：

```powershell
node scripts/preview.mjs
```

浏览器访问 <http://127.0.0.1:4173>，按 `Ctrl+C` 停止。无需 `npm install`。修改文件后刷新浏览器即可。端口被占用时可在 PowerShell 中运行：

```powershell
$env:PORT = 4174
node scripts/preview.mjs
```

也可直接打开 [index.html](./index.html) 查看静态页面；建议使用本地服务测试完整的浏览器偏好保存行为。

## 修改个人内容

编辑 [index.html](./index.html)：

| 内容 | 查找位置 | 修改方式 |
| --- | --- | --- |
| 姓名与首页简介 | `id="home"` | 修改姓名、介绍和按钮链接 |
| 机构与个人介绍 | `id="about"`，以及首页 `hero-meta` | 同步修改两处机构信息 |
| 方向介绍 | `id="focus"` | 修改三个方向的标题和说明 |
| 展示项目 | `id="projects"` | 复制一段 `project-card`，更新仓库名、链接、说明和标签 |
| 项目类别 | `data-category` | 科学计算用 `science`；Web/可视化用 `web`；新增类别还需添加筛选按钮 |
| 技术栈 | `id="toolkit"` | 按实际项目使用情况调整 |
| 联系方式 | `id="contact"` | 目前只使用真实 GitHub 地址，可自行增加已确认的邮箱或个人网站 |
| 英文文本 | 对应元素的 `data-en` | 同步更新英文译文；中文正文保留在元素内部 |
| 搜索与分享信息 | 文件顶部 `title`、`description`、`og:*`、`canonical` | 更换域名或介绍时同步修改；切换语言的标题在 JS 中同步修改 |

主题颜色集中在 [assets/style.css](./assets/style.css) 顶部的 CSS 变量中；浅色、系统深色和手动深色分别有对应变量定义。中文字体使用系统字体，英文标题使用系统衬线字体，无需下载字体。

项目数量由脚本自动计算。若改变初始项目数量，也请同步更新 HTML 中 `project-count` 的初始文字。主题和语言存储键分别是 `jh-theme`、`jh-language`；如需恢复系统主题跟随，可在浏览器开发者工具中执行 `localStorage.removeItem('jh-theme')` 后刷新。

## 内容来源与边界

本版资料于 **2026-11-12** 根据 GitHub 公开 API 核对：

- [GitHub 个人资料](https://api.github.com/users/JinuxHao)：显示名 `Jinux Hao`、所在地 `China`、机构字段 `Wuhan University`。机构信息照录公开资料，未推断学位、职称或在读状态。
- [公开仓库列表](https://api.github.com/users/JinuxHao/repos?per_page=100)：项目介绍与主要语言来自仓库说明；主页文字为相应内容的整理。
- [LUT_PROSAIL](https://github.com/JinuxHao/LUT_PROSAIL)：MATLAB / PROSAIL 查找表与 LAI 反演。
- [Multiply_mat_on_MPI](https://github.com/JinuxHao/Multiply_mat_on_MPI)：MPI / OpenMP 矩阵乘法并行化。
- [Cesium-vue](https://github.com/JinuxHao/Cesium-vue)：Cesium / Vue / Tomcat 加载 3D Tiles。
- [Election-React](https://github.com/JinuxHao/Election-React)：React 美国大选模拟系统。

首页没有虚构论文、奖项、学历、工作履历、性能提升或邮箱。方向介绍概括现有项目，不代表已发表研究成果。等高线为本地 SVG 装饰示意，不代表真实地理观测。页面不在访问时请求 GitHub API，仓库更新后需手动同步展示内容。

## 部署到 GitHub Pages

1. 将本项目文件提交并推送到 `JinuxHao/jinuxhao.github.io` 的 `main` 分支。
2. 仓库打开 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
3. 在 **Actions** 查看 **Deploy personal homepage to GitHub Pages**，也可通过 **Run workflow** 手动触发。
4. 工作流成功后访问 <https://jinuxhao.github.io/>。

工作流只上传 `index.html`、`assets/` 和 `.nojekyll`；本说明和本地预览脚本不进入部署产物。无需 Jekyll、Ruby、npm 构建或 GitHub Token 配置。

当前仓库是 Pages 网站仓库。若还需要在 GitHub 个人资料页直接显示介绍，应另建与用户名同名的 `JinuxHao/JinuxHao` 仓库并编写其 README；这里的网页样式不会应用到 GitHub 的 README 渲染器。
