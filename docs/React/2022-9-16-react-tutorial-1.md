---
title: "[筆記] React 初心者(1)：前言"
description: "React 是什麼東西？"
date: 2022-9-16 16:34:12
keywords: [JavaScript, 程式語言, 變數型別]
slug: react-tutorial-1
---

隨著 Lidemy 的課綱，我自學的進度就卡在 React。  
起初完全不懂 React 到底在寫什麼，JSX 是什麼概念，  
而後硬著頭皮做完了整個課程的作業，加上同時我也參加了六角學院舉辦的，  
React 讀書會之後，才終於對 React 有初步的認識。

## 為什麼要學 React ？

~~因為課綱就教 React~~。

畫面互動經常需要操作到 DOM 元素，尤其是 addEventListener，
當需要管理的元素越來越多，邏輯就會開始變得複雜，  
所以也會帶來效能上的負擔和維護的難度。

如撰寫按鈕 A 的事件，可能會需要新增 B 區塊，  
而 B 區塊又有一些個別狀態所觸發的不同事件，產生 C 或 D 元素等，  
這樣一層又一層的衍生，在只用原生 JS 的情況下，  
不僅同時操作了很多 DOM 元素，而且互相關聯的部分也經常造成追蹤程式碼的困難。

React 的目的便是希望我們可以減少直接操作 DOM，取而代之的是對資料模型的操作，  
也就是所謂的狀態(State)管理，形成一個單向的資料循環：  
`資料狀態改變 => 改變畫面 => 資料狀態改變 `  
而 React 厲害之處便是在渲染 DOM 的環節，使用了 **Virtual DOM** 的概念，  
透過比對狀態改變前後的虛擬 DOM，來決定如何顯示我們看到的畫面。

以往直接渲染一個新的 DOM 的做法在資料量龐大時容易導致效能耗損，  
如果該請求邏輯又沒有設計妥善，通常也會在 console 裡面收到：  
**你同一時刻發出太多 request 所以我們拒絕了** 這樣的回應而導致網頁的某個區塊，  
甚至是整個網頁都沒有資料。

Virtual DOM 則是在比對的過程中，找出不一樣的 Node( DOM 是樹狀結構)，  
並從那個 Node 開始整塊拆掉，一起置換下面所有的 Leaf，以達到更好的**時間複雜度**。

![Tree of Virtual DOM](https://i1.wp.com/programmingwithmosh.com/wp-content/uploads/2018/11/lnrn_0201.png)

## React 的彈性:

React 嚴格來說是個函式庫，不像其他框架有自己內建一套完整的功能，  
所以必須加上其他套件或函式庫來完善其功能，因此可以說是彈性很大，但也容易令人摸不著頭緒。

初學的過程要多多嘗試不一樣的作業或作者提供的小專案，  
來了解 React 除了它自己的基礎功能，還有什麼套件是經常被使用的。  
（像是 React-Hook-Form、React-Router-Dom、Redux 等等）

最後總結一下 React 是什麼樣的存在：

- Virtual DOM 與創造可重複利用的元件是啟用它的重要原因
- 獨特的 JSX 寫法在初學時期腦袋會很星爆
- 以狀態(State)為思考中心
- 單向的資料流容易追蹤狀態
- 需要其他第三方套件輔助

---

### 　參考資料

- [[筆記] Why React?](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-why-react-424f2abaf9a2)
- [從 Native 到 React：初學 React.js 角度的 JavaScript「升級」整理](https://hackmd.io/@BOBYZH/H1JqsfYg9)
- [你了解 React JS 嗎 15 個 React JS 的面試問題](https://linyencheng.github.io/2021/05/07/react-interview-questions/#React-%E6%9C%89%E4%BB%80%E9%BA%BC%E7%BC%BA%E9%BB%9E%E5%92%8C%E9%99%90%E5%88%B6)
