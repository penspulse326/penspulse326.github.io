# Content Nav 內容導覽元件群說明文件 (SPEC)

## 📌 元件定位與架構

本資料夾元件負責在「研究筆記 (Notes)」與「挑戰計畫 (Plans)」的文章閱讀頁面中，提供多層級的分類導覽選單（Accordion 摺疊選單與抽屜式選單）。

```
article-layout.astro (文章閱讀佈局)
  └── content-sidebar.astro (側邊導覽外殼)
        └── content-navigation.astro (導覽模式分流)
              ├── [isDrawer=true] ─> content-drawer (抽屜式 Web Component)
              │                       └── content-nav-list.astro (渲染選單清單)
              └── [isDrawer=false] ─> content-nav-list.astro (渲染選單清單)
```

---

## 🛠️ 與 Layout / Pages 的協同運作

1. **與 `article-layout.astro` 配合**
   - 當用戶閱讀筆記或計畫的文章時，[article-layout.astro](file:///Users/vincent/dev/blog/src/layouts/article-layout.astro) 會自動加載 `content-sidebar.astro`。
   - 它會傳入從 Markdown 資料中動態解析出來的 `navigation` 清單，並藉由 `activeId` 來高亮顯示當前閱讀的文章項目。
2. **與頁面 (Pages) 的連動**
   - `/notes/[...slug].astro` 與 `/plans/[...slug].astro` 頁面會讀取 Markdown 內容與對應的目錄階層，傳遞給 `ArticleLayout` 元件，進而渲染出該類別的完整側邊導覽。
3. **單一職責與優化設計**
   - **呈現與邏輯分離**：[content-nav-list.astro](file:///Users/vincent/dev/blog/src/components/content-nav/content-nav-list.astro) 專注於將文章樹狀架構轉換成 CSS 的摺疊細節 (`<details>`)；而 [content-navigation.astro](file:///Users/vincent/dev/blog/src/components/content-nav/content-navigation.astro) 負責抽屜動畫行為。
   - **按需載入腳本**：只有當 `isDrawer` 被設定為 `true` 時，網頁才會載入 `<content-drawer>` 自定義元素的 JS 腳本，避免一般平鋪清單加載多餘的程式碼。
