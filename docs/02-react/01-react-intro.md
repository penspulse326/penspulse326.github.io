---
title: "框架概念"
description: "React 與框架的概念"
date: 2022-09-16 17:55:00
keywords: [程式語言, JavaScript, React, JSX]
slug: react-intro
---

## 為什麼要學 React

~~因為課綱就教 React。~~
回想一下學 JavaScript 的過程中，我們怎麼與畫面產生互動呢？

1. 選取 DOM 元素
2. 用 addEventListener 監聽特定行為
3. 被監聽的元素如果觸發特定行為就執行對應函式

要管理的事件變多之後邏輯就會變得繁瑣複雜，  
如果經常使用 innerHTML 代換畫面的內容，  
應該會感覺到渲染畫面的時間越來越長，而且常常會出錯。

撰寫按鈕 A 的事件，可能會需要新增 B 區塊，而 B 區塊的內容又有其他互動事件，  
產生 C 或 D 元素等，這樣一層又一層的衍生，不僅同時操作很多 DOM 元素，  
而且互相關聯的程式碼，也會造成追蹤 bug 的困難，  
很難逐一去定位哪部分的程式碼有錯。

前端框架目的便是希望可以減少直接操作 DOM，取而代之的是對資料模型的操作，  
也就是所謂的狀態(State)管理，形成一個可以追溯的資料循環：

`資料內容改變 => 改變畫面 => 畫面操作 => 改變資料內容`

---

## Virtual DOM

React 使用 **Virtual DOM** 的概念，透過比對 DOM 的狀態，  
來決定如何顯示要更新哪一部份的 DOM。

以往渲染一個新的 DOM 的做法就是用 innerHTML 直接替換，  
Virtual DOM 則是在比對的過程中，找出資料內容不一樣的起點（樹狀結構中的某個 node），  
從那個點開始整塊置換掉，以達到更好的效能（**時間複雜度**）。

---

## React 的彈性

React 的 conventions（既定的慣例或強制的規則）沒有太多，  
大部分的語法還是沿用原生 JavaScript，也表示要學好 React 的話，  
其實更仰賴對 JavaScript 的熟悉度。

React 自帶的功能並不多，必須加上其他套件來完善其功能，  
可說是彈性很大，但也容易令人摸不著頭緒。

初學過程要多多嘗試各種作業和小專案，  
除了熟悉 React 的語法，也可以知道什麼套件是經常被使用的，  
像是 React-Hook-Form、React-Router、Redux 等等，  
藉此慢慢熟悉整個 React 生態圈。

---

## 總結

- Virtual DOM 與創造可重複利用的元件是學習 React 的重要原因
- 以資料狀態(State)為思考中心，更容易追蹤程式碼的運作過程
- 對 JavaScript 熟悉度會直接影響到 React 學習曲線

---

## 　參考資料

- [[筆記] Why React?](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-why-react-424f2abaf9a2)
- [從 Native 到 React：初學 React.js 角度的 JavaScript「升級」整理](https://hackmd.io/@BOBYZH/H1JqsfYg9)
- [你了解 React JS 嗎 15 個 React JS 的面試問題](https://linyencheng.github.io/2021/05/07/react-interview-questions/#React-%E6%9C%89%E4%BB%80%E9%BA%BC%E7%BC%BA%E9%BB%9E%E5%92%8C%E9%99%90%E5%88%B6)
