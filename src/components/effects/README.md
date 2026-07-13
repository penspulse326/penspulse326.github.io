# Effects 特效與載入元件群說明文件 (SPEC)

## 📌 元件定位與架構

本資料夾元件負責網站的視覺特效與啟動畫面體驗。包括以 Three.js 驅動的 PlayStation / PSP 風格波浪背景，以及首頁載入時的加載遮罩。

```
pages/index.astro (首頁)
  ├── psp-waves.astro (Three.js 畫布 Web Component)
  │     └── [載入完成] ─> 拋出 window 自定義事件 'threejs-ready'
  │
  └── loading-overlay.astro (加載遮罩)
        └── [收到 'threejs-ready' 事件] ─> 執行 Fade Out 動畫並隱藏
```

---

## 🛠️ 與 Layout / Pages 的協同運作

1. **與 `index.astro` 首頁的連動**
   - 當用戶初次訪問 [index.astro](file:///Users/vincent/dev/blog/src/pages/index.astro) 首頁時，兩個元件會同步被加載。
   - `loading-overlay.astro` 會出現在最上層遮擋畫面，並執行 Neural Pulse 動畫，同時背景會以非同步的方式渲染 Three.js 波浪。
2. **事件驅動流程 (Event-Driven Pipeline)**
   - **啟動與效能優化 (PSP Waves)**：
     - `<psp-waves>` custom element 載入後，會利用 `IntersectionObserver` 監聽。若用戶滾動頁面使波浪背景離開視區，會**自動停止** `requestAnimationFrame` 重繪，大幅節省 GPU 與發熱度。當再度可見時自動回復。
     - 元件準備妥當後，會拋出 `window.dispatchEvent(new CustomEvent('threejs-ready'))`。
     - 在換頁或銷毀時，會自動進行 WebGL 上下文釋放（dispose），防範記憶體溢出。
   - **加載遮罩解除 (Loading Overlay)**：
     - 遮罩腳本會監聽全域的 `'threejs-ready'` 事件。當收到事件後，遮罩會加上 `.fade-out` class 並隱藏，呈現流暢的首頁開場效果。
     - 使用 `sessionStorage` 儲存已拜訪狀態，若用戶已看過開場動畫，後續造訪時會立即加入 `.skip-loading`，避免重複顯示遮罩造成不佳體驗。
