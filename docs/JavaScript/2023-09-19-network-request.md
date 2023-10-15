---
title: "網路請求與非同步"
description: "JavaScript 中的網路請求"
date: 2023-09-19 14:43:08
keywords: [JavaScript, 程式語言, API, 網路請求, AJAX]
slug: network-request-ajax-api
---

從練習串接 API 開始就會有很多五欸ㄇ欸問題發生，  
因為要處理網路請求就要認識更多相關的系統機制，  
這篇記錄會碰到的知識點。

## 等你回來：非同步

同步是指一次能進行幾個任務的概念，一般高階語言如 Java、Python、C# 等等的，  
它們是**多執行緒**的程式語言，因此主程式啟動之後，可以一次執行多個函式甚至是多個獨立的程式碼檔案～

可以想像成玩 RPG 的時身為主角的你正在跑主線劇情，  
但同時你能夠僱傭很多工人去跑相關的支線，因此你能在很短的時間內就通關這個遊戲。

而 JS 是**單執行緒**的程式語言，這表示 JS 一次只能執行一段程式碼，  
所以在 RPG 的世界裡，你一次只能開一個任務，慢慢地把主線或支線農完.....

但這不表示 JS 是廢物，因為上面舉例的多執行緒語言，  
和它們出現的年代、被設計用來做什麼應用程式的原因有關。  
JS 起初是用來豐富網頁的動態性，所以只能在瀏覽器內跑的程式。  
（因此沒辦法做出多執行緒，多執行緒的引擎容量通常很大）

JS 也透過一些機制，讓它可以把程式執行的過程變成非同步！

---

## Call Me In Your Stack：callback function

callback 就是 JS 一種非同步的機制，比如 forEach、陣列的 map 方法等等，  
可以發現它們在函式內帶入的參數也是一個函式。

這些參數函式就是 callback，它們會被丟到**引擎內的容器**，如果是 JS 自己的程式就會在容器內先執行，  
如果是 Web API 程式就會丟到，**Web API 的容器**等待，再透過 Event loop 這個事件檢查機制，  
丟到 JS 引擎內的容器執行。（也因此跟網路請求有關的函式通常會比較慢執行才得到結果）

Web API 包含 setTimeout、fetch 等等...

回顧一開始介紹變數宣告的時候為什麼最好少用 var，  
因為這些 callback 在後續回到執行緒（全域環境）跑的時候，  
var 很容易造成污染，callback 這時候要取值也會取錯。

---

## 壞男人從不承諾：Promise

JS 也是個壞男人...因為這些非同步的機制，  
它可以把需要等待時間、延後執行的 callback 先打入冷宮，  
繼續往下找別的女...阿不，是繼續往下執行別的程式，  
因此可以發現進到購物網站時，有時商品的列表是一片空白還在讀取，  
但是點擊網頁其他的地方還是可以正常動作，因為 JS 可以利用非同步把它們的任務切割，
不會因為某個地方載入太慢或失敗導致整個網頁都崩潰。

Promise 在戳 API 這類網路請求的功能時是經常會用到的方式，  
**Promise 簡單地說是一種包裝好的特別物件**，內容為非同步請求的結果，  
請求成功或失敗都會有對應的資料，但是沒辦法直接用 console.log 看到 Promise 物件的內容，  
因此也無法直接取出使用，**需要用後綴 then() 的方式取出資料**。

```js
function getData(apiUrl) {
  fetch.(apiUrl).then((res) => console.log(res)).catch((error)=>console.log(error))
}
```

在 fetch 方法裡帶入網址後會回傳一個 Promise 物件，  
如上面所說，如果我們要取出資料就必須在後面接一個 .then，  
.then 裡面的 callback 預設參數就是伺服器回應的資料，  
這時才能用 console.log 查看內容，或是用外層的變數儲存起來。

所以一般購物網站的商品列因為圖片和資料屬性比較多，  
戳 API 之後把這些資料接收過來到顯示在網頁上是需要一段時間的，  
這段過程是在等待伺服器傳回來的資料，並且打包成 Promise 物件再解析出來。

因為非同步的網路請求並不是每次都會成功，有時會遇到伺服器的問題，或是網頁程式碼的問題，  
因此除了 .then() 之外也需要 .catch() 來捕捉錯誤通知，  
.catch() 只會在錯誤發生的時候捕捉到，但要注意的是 .then 裡面也有可能拿到錯誤通知，  
所以 .then 與 .catch 都要下才能知道是前後端或資料庫的錯誤訊息！

另外非同步函式回到主程式的時間也不一定，
可以發現購物網站裡面每張圖載入的順序或時間大多都不是固定的，
所以非同步函式往往會在主程式的某個行程中突然插隊進來。

---

## AJAX

AJAX 就是非同步網路請求的技術，  
比如 JS 原生的 fetch、或是 axios、jQuery 這類好用的套件都是一種 AJAX 技術。

原生的 fetch 雖然可以直接使用，不過要寫的東西還有機制就相對複雜一點，  
以剛剛的範例來說：

```JS
function getData(apiUrl) {
  fetch.(apiUrl)
    .then((res) => res.json())
    .then((result) => console.log(result))
    .catch((error)=>console.log(error))
}
```

第一個 then 拿到的參數通常不會是結構化的資料，所以要透過內建的 .json() 方法，  
再丟出一個 Promise 物件，然後加上第二個 then 取出來...就是這麼麻煩 XD

axios 則簡化了這些流程，從 axios 回傳的 Promise 物件，  
只要用一次 then 就可以取出，HTTP method 也可以透過點記法直接叫出對應的方法。

另外 axios 可以在發送請求前就取消，或是對請求做一些格式驗證，  
但是 fetch 就沒有內建的方法了，需要自己再額外撰寫。

---

## 參考資料

- [一次搞懂同步與非同步的一切](https://medium.com/itsems-frontend/javascript-sync-async-22e75e1ca1dc)
- [AJAX 完整解說系列：基礎觀念](https://www.casper.tw/development/2020/09/30/about-ajax/)
- [Event loop 詳解](https://youtu.be/8aGhZQkoFbQ?si=DzQ752C64Pn_y8mo)
