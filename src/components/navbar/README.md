# Navbar 導覽列元件群說明文件 (SPEC)

## 📌 元件定位與架構

本資料夾底下的元件負責整個部落格的頂部導覽列（Navbar）、搜尋視窗（Search Modal）以及深淺色主題切換。

```
default-layout.astro (版面外殼)
  └── navbar.astro (頂部導覽列總管)
        ├── nav-logo.astro (網站 Logo)
        ├── nav-links.astro (主導覽連結，支援桌面與手機)
        ├── theme-toggler.astro (深淺色切換 Web Component)
        ├── search-trigger.astro (搜尋按鈕)
        ├── search-modal.astro (搜尋彈出窗 Web Component)
        └── mobile-menu-content.astro (手機下拉選單容器)
              ├── content-menu.astro (研究筆記/挑戰計畫子選單)
              └── posts-menu.astro (近期文章與標籤子選單)
```

---

## 🛠️ 與 Layout / Pages 的協同運作

1. **與 `default-layout.astro` 配合**
   - `navbar.astro` 被全域載入於 [default-layout.astro](file:///Users/vincent/dev/blog/src/layouts/default-layout.astro) 中，因此出現在所有網頁頁面中。
2. **與頁面路徑 (Pages / Route) 的連動**
   - `navbar.astro` 在 Astro Frontmatter 中會解析當前 URL 路徑：
     - 若為 `/notes/*` 或 `/plans/*`，則動態載入對應的分類導覽資料傳遞給 `content-menu.astro`。
     - 若為 `/posts/*`，則動態讀取近期文章與標籤雲傳遞給 `posts-menu.astro`。
3. **視圖過渡與生命週期優化**
   - 內含 `<theme-toggler>`、`<search-modal>` 與 `<mobile-menu-content>` 等自定義元素 (Web Components)，以確保在 Client-side 換頁時，全域事件監聽器（如 `Cmd+K` 搜尋快捷鍵、`Esc` 關閉）以及 DOM 元素參照不會過期或遺失，防範記憶體洩漏。
