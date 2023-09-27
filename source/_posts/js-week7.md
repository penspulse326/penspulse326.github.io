---
title: "[筆記] 用 C3.js 在 JavaScript 繪製簡單圖表"
date: 2023-09-27 11:42:34
tags:
  - JavaScript
  - 程式語言
  - API
  - C3.js
categories: 程式學習
---

C3.js 是基於 D3.js 的圖表繪製套件，
簡化了很多設定，因此我們只要把整理好的資料仍進去 C3 的函式就沒問題了～
也因為圖表生成的方式被簡化了，樣式上能修改的東西就沒有那麼多，
但如果只是要呈現簡易的示意資料也已經足夠了！

<!-- more -->

## 加入套件

最懶人的方式是直接引入 CDN 即可：

```HTML
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.18/c3.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.16.0/d3.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.18/c3.js"></script>
```

官方提供的方式是將函式庫直接下載到電腦裡，
再透過 HTML 的 script 標籤引用。

[官方指引的方式](https://c3js.org/gettingstarted.html#setup)

還有一種是 npm 的方式...也是我最不推薦的方式（？）
假如是從乾淨的 html 開始寫，或是使用不含 webpack 的模板引擎生成的專案，
就會相對麻煩一點～因為從 node_modules 拿出來的套件，有時候是透過 Node.js 的規則 CommonJS 寫的，
但是瀏覽器要讀取的 js 檔是依照 ES6 module 規則寫的，所以它不能將 CommonJS 語法打包的東西拿過來用。
需要另外透過 webpack 編譯好規則的轉換。

如果是用模板引擎生成的 react、vue 等等的專案，它們已經內含 webpack 編譯的設定，
所以我們隨便 import 第三方套件進來都是沒問題的。

這邊就不詳細講怎麼使用了，改天再另寫筆記統整（逃）

---

## 生成圖表

以下是一個簡單的圖表生成程式碼：

```JS
const chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
        ['data1', 50, 15, 40, 20, 70, 30],
        ['data2', 1, 7, 2, 3, 6, 7]
      ]
    }
});
```

呼叫 c3.generate 之後就可以進行生成了，
參數是一個物件的資料格式，裡面可以寫入 C3 規範的一些屬性，
來改變圖表最後生成的樣子。

其中 bindto 類似 querySelector 和 CSS 選擇器，
直接透過字串選取 HTML 元素就好，圖表最後也會生成在這個元素裡面，
許多第三方套件如 gsap 也都提供這種方式綁定元素。
