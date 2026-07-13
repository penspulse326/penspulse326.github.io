# Common 公用與工具元件群說明文件 (SPEC)

## 📌 元件定位與架構

本資料夾存放全站共用的基礎排版元件（如頁尾）、全域工具元件（如圖片點擊放大）以及跨模組的社群留言系統。

```
layouts/default-layout.astro ──> footer.astro (全站頁尾)
layouts/article-layout.astro ──> image-zoom.astro (圖片放大燈箱 Web Component)
pages/*/[...slug].astro    ──> giscus-comment.astro (Giscus 留言區)
```

---

## 🛠️ 與 Layout / Pages 的協同運作

1. **`footer.astro` (頁尾)**
   - 被全域引入於 [default-layout.astro](file:///Users/vincent/dev/blog/src/layouts/default-layout.astro)，提供版權宣告與聯絡信箱，通常在頁面底部顯示。
2. **`image-zoom.astro` (圖片放大燈箱)**
   - 被加載於 [article-layout.astro](file:///Users/vincent/dev/blog/src/layouts/article-layout.astro) 中，作為所有 Markdown 閱讀頁面的通用附屬工具。
   - **運作邏輯**：`<image-zoom>` custom element 載入後，會自動抓取頁面中 `.markdown-body` 下的所有 `img`（排除本身已被連結 `<a>` 包裹的圖片），為其加上 `zoom-in` 手勢。點擊時彈出遮罩並顯示大圖。
   - 元件銷毀時（換頁）會將 `window` 的 Escape 鍵監聽與大圖點擊事件完全註銷，防範洩漏。
3. **`giscus-comment.astro` (Giscus 留言系統)**
   - 被加載於 `/notes/[...slug].astro`、`/plans/[...slug].astro` 以及 `/posts/[...slug].astro` 文章內容頁的最底部。
   - **運作邏輯**：動態建立 `<script>` 載入 Giscus 用戶端。使用 `MutationObserver` 監聽 `html` 的 `class` 變化。當用戶點擊切換深色/淺色主題時，會即時利用 `postMessage` 向 Giscus iframe 發送最新主題設定，實現無感切換留言區主題的流暢體驗。
