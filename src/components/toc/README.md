# TOC 文章目錄元件群說明文件 (SPEC)

## 📌 元件定位與架構

本資料夾元件負責在文章閱讀頁面中，擷取文章標題（h2, h3）並生成側邊目錄，讓讀者能快速掌握文章段落結構，並點擊進行定位。

```
article-layout.astro / notes/[...slug].astro / plans/[...slug].astro / posts/[...slug].astro
  └── table-of-contents.astro (目錄總管，自定義 Web Component)
        ├── [Variant: Desktop] ─> toc-desktop.astro (桌面版側邊目錄)
        └── [Variant: Mobile]  ─> toc-mobile.astro (手機版摺疊目錄)
```

---

## 🛠️ 與 Layout / Pages 的協同運作

1. **與 Layout / Pages 的配合**
   - 目錄元件需要知道當前頁面的標題階層，因此在 `notes/[...slug].astro`、`plans/[...slug].astro` 或 `posts/[...slug].astro` 等頁面路由中，透過 Astro 的 `headings` 物件（`const { headings } = await entry.render()`）取得標題陣列，再傳入 [table-of-contents.astro](file:///Users/vincent/dev/blog/src/components/toc/table-of-contents.astro)。
   - [article-layout.astro](file:///Users/vincent/dev/blog/src/layouts/article-layout.astro) 中預設會載入並以 `variant="desktop"` 的形式固定在文章右側（`sticky` 定位）。
2. **運行邏輯說明**
   - **視窗滾動偵測 (IntersectionObserver)**：
     當頁面滾動時，`<table-of-contents>` custom element 會啟動 `IntersectionObserver` 監聽 `.markdown-body` 下的所有 `h2` 與 `h3` 元素。當某段落標題進入螢幕頂部視窗範圍內，便會自動為對應的目錄連結加上 `.active-toc` 樣式並高亮它。
   - **平滑滾動定位**：
     點擊目錄連結時，JS 會阻擋預設的錨點跳轉行為，計算出扣除頂部 Navbar 高度後的目標 offset，使用 `window.scrollTo({ behavior: 'smooth' })` 進行流暢滾動定位，並將錨點寫入瀏覽器歷史狀態中。
   - **生命週期自動釋放**：
     當換頁或離開文章時，`disconnectedCallback()` 會主動呼叫 `observer.disconnect()`，完整回收偵聽器，避免累積過多 Observer。
