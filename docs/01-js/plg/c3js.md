---
title: "[圖表] C3"
description: "使用 C3.js 繪製簡單圖表"
date: 2023-09-27 11:42:34
keywords: [JavaScript, 程式語言, API, C3.js]
slug: c3js-chart
---

C3.js 是基於 D3.js 的圖表繪製套件，簡化了很多設定，  
因此我們只要把整理好的資料仍進去 C3 的函式就沒問題了～  
也因為圖表生成的方式被簡化了，樣式上能修改的東西就沒有那麼多，  
但如果只是要呈現簡易的示意資料也已經足夠了！

## 加入套件

最懶人的方式是直接引入 CDN 即可：

```HTML
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.18/c3.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.16.0/d3.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.18/c3.js"></script>
```

官方提供的方式是將函式庫直接下載到電腦裡，再透過 HTML 的 script 標籤引用。

[官方指引的方式](https://c3js.org/gettingstarted.html#setup)

還有一種是 npm 的方式...也是我最不推薦的方式（？）  
假因為從 node_modules 拿出來的套件，有時候是透過 Node.js 的規則 CommonJS 寫的，  
但是瀏覽器要讀取的 js 檔是依照 ES6 module 規則寫的，所以它不能將 CommonJS 語法打包的東西拿過來用。  
需要另外透過 webpack 編譯好規則的轉換。所以這邊就不詳細講怎麼使用了，改天再另寫筆記統整（逃）

---

## 生成圖表

以下是一個簡單的圖表生成程式碼：

```js
let chart = c3.generate({
  bindto: "#chart",
  data: {
    columns: [
      ["data1", 50, 15, 40, 20, 70, 30],
      ["data2", 1, 7, 2, 3, 6, 7],
    ],
  },
});
```

呼叫 c3.generate 之後就可以進行生成了，參數是一個物件的資料格式，  
裡面可以寫入 C3 規範的一些屬性，來改變圖表最後生成的樣子。

其中 bindto 類似 querySelector 和 CSS 選擇器，  
直接透過字串選取 HTML 元素就好，圖表最後也會生成在這個元素裡面，  
許多第三方套件如 gsap 也都提供這種方式綁定元素。

---

## 資料放在哪

觀察剛剛呼叫 c3 函式時參數物件的結構，應該可以很明確地看出來，  
圖表的資料是從 data 這個屬性的 columns 裡面的數據生成的，  
每個 column 代表一個資料種類，這個資料種類也用陣列表示，  
陣列的第一個元素是資料的標題，後面都是數據，  
所以這個標題最後也會被生成到圖表上：

```js
["資料1", 30, 200, 100, 400, 150, 250], ["資料2", 50, 20, 10, 40, 15, 25];
// "資料1" 與 "資料2" 這兩個字串也會生成到圖表上
```

---

## 豐富圖表的設定

C3 預設會生成折線圖，不過大家一定也看過一些與長條圖合併顯示的統計數據，  
所以我們也能在物件裡面一一客製這些內容！

C3 的文件可能一時之間會有看沒有懂，為什麼 colors 有時候跟 data 同一層，  
有時候又寫在 data 裡面？不過只要記住一個原則：  
**如果是針對個別資料的設定通常是寫在 data 裡面，用 key-value 的方式指定資料呈現的方式**  
下面可以跟著範例來看：

<iframe height="300" width="100%" scrolling="no" title="C3 Practice" src="https://codepen.io/shin9626/embed/mdaLxyB?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/shin9626/pen/mdaLxyB">
  C3 Practice</a> by SHIN (<a href="https://codepen.io/shin9626">@shin9626</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### data 裡面的屬性

- colors 指定個別資料的顏色（[寫在 data 外面的寫法](https://c3js.org/samples/options_color.html)）
- axes 指定資料要呈現的軸區（最多就是 y2 了沒有 y3 或 x2）
- types 指定資料的呈現方式

### data 外面的屬性

- aixs 可以為每個軸線做客製化
- x 軸的通常是離散的標籤，所以我們可以設成 type category，
  category 則通常會放時間之類的數字：

```js
 axis: {
  x: {
    type: "category",
    categories: ["t1", "t2", "t3", "t4", "t5", "t6"],
    label: {
      text: "X軸名稱",
      position: "outer-left" //名稱位置
    }
  }
}
```

- lable 可以設定軸線的名稱與名稱顯示位置
- 要注意 y2 軸通常不會顯示出來，我們必須手動設定 show: true
- 可以對折線圖的軸線設 min 來表示最小區間，讓折線圖不要緊貼到 x 軸

---

## 圓餅圖與甜甜圈圖

剛剛在 data 裡面有寫入 types 分別指定每種資料的顯示方式，  
如果想做出圓餅圖或甜甜圈圖，則要把 types 改成 type，  
內容也不再需要個別指定，寫上 "pie"、"donut" 就可以改變呈現方式。

此時如果 colums 裡面是 ['data', 1, 2, 3] 這種多個數據的資料，  
圓餅圖與甜甜圈圖都會呈現它們加總後的結果～

---

## 與 API 的串接

假設我們拿到的資料是這樣，現在要統計各地區的比例：

```js
const apiData = {
  data: [
    { area: "北部" },
    { area: "南部" },
    { area: "東部" },
    { area: "中部" },
    { area: "北部" },
    { area: "中部" },
    { area: "中部" },
  ],
};
```

我們就可以自行整理成 c3 的 columns 可以吃到的格式，方法有很多，  
這邊示範把 API 資料的陣列根據內容新增到一個物件，物件的 key-value 代表每個地區對應的總數，  
最後再用物件方法轉成 c3 column 的陣列格式：

```js
const dataObj = {};

apiData.data.forEach((item) => {
  // 如果存在該地區的屬性，就 +1
  if (dataObj[item.area]) {
    dataObj[item.area]++;
  } else {
    dataObj[item.area] = 1;
  }
});

const columns = Object.entries(dataObj);
console.log(columns);
// [
//  ["北部", 2]
//  ["南部", 1]
//  ["東部", 1]
//  ["中部", 2]
// ]
```

C3 可以呈現簡單的圖表資料，不過要怎麼整理資料再餵進去就各自發揮囉（？）

---

## 參考資料

- [C3.js Examples](https://c3js.org/examples.html)
- [好用的輕量統計圖表 C3.js](https://www.tpisoftware.com/tpu/articleDetails/2589)
- [C3.js 資料圖表](https://hackmd.io/@ericacadu/H1k5d1Xew)
