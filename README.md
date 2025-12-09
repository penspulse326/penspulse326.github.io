# Pen's Pulse

我是 Shin，在 2024 年 6 月轉職成為前端工程師，至今仍在工作崗位上努力不被 AI 淘汰 XD

我從 2022 年年初開始自學前端，發現很多人都會自己建部落格紀錄學習過程，然後搜尋到 Hexo 這個工具，很快就建起來了！應該會一直更新到我再也不做這一行的那天吧。

<br/>

## 網站介紹 Intro

網站內容主要分為三個區塊：

- [研究筆記](https://penspulse326.github.io/notes/)：簡短的摘要，通常不會寫太長，主要寫給自己快速回顧
- [挑戰計畫](https://penspulse326.github.io/plans/)：以紀錄個人小型專案開發為主的系列文章
- [心得文章](https://penspulse326.github.io/posts/)：與職涯、工作、活動等相關的心得文章

<br/>

## 技術選型 Tech Stack

- **Framework**: Astro
- **UI**: Bootstrap 5
- **Styling**: Sass (SCSS)
- **Effects**: Three.js
- **Content**: Markdown (with Remark plugins)
- **Comment System**: Giscus
- **Tool Chain**: Vite
- **Code Quality**: ESLint, Prettier, Stylelint, Husky, lint-staged
- **Package Manager**: pnpm

<br/>

## 迭代歷史 Migration

- 2025.10.16：移植到 Astro
- 2023.10.08：移植到 Docusaurus
- 2022.09.02：使用 Hexo 建立網站

<br/>

## 分支 Branches

| 分支名稱 | 描述                                             |
| -------- | ------------------------------------------------ |
| `main`   | 使用 Astro 官方提供的 workflow 建立 GitHub Pages |
| `images` | orphan branch，存放網站文章使用到的圖片          |
| `legacy` | 過去在不同框架下的迭代痕跡                       |

<br/>

## 提交規範 Commit Conventions

### 類型 Type

| 類型       | 描述                                 |
| ---------- | ------------------------------------ |
| `docs`     | 新增或更新文章、筆記等內容           |
| `feat`     | 新增功能、樣式或特效                 |
| `fix`      | 修復問題或樣式                       |
| `refactor` | 重構程式碼或改善架構                 |
| `chore`    | 雜項更新（如依賴、配置、重新命名等） |

### 訊息 Message

| 訊息模板                        | 描述               |
| ------------------------------- | ------------------ |
| `docs: new post`                | 新增文章           |
| `docs: update post`             | 更新文章           |
| `docs: delete post`             | 刪除文章           |
| `feat: add [feature name]`      | 新增功能           |
| `feat: update styles`           | 更新樣式           |
| `fix: [issue description]`      | 修復問題           |
| `refactor: improve readability` | 改善可讀性或架構   |
| `chore: update dependencies`    | 更新依賴           |
| `chore: rename files`           | 重新命名檔案       |
| `chore: update [item]`          | 更新配置或其他項目 |
