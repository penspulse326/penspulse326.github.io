---
title: "框架概念"
description: "React 與框架的概念"
date: 2022-09-16 17:55:00
keywords: [程式語言, JavaScript, React, JSX]
slug: react-intro
---

起初接觸框架時完全不懂 React 在寫什麼，JSX 是什麼概念，  
都是硬著頭皮做完作業，爾後參考不同教材之後才終於對 React 有初步的認識。

## 為什麼要學 React ？

~~因為課綱就教 React~~。
回想一下學 JavaScript 的過程中，我們是怎麼與畫面產生互動的？

1. 選取 DOM 元素
2. 用 addEventListener 監聽特定行為並觸發對應的方法

當需要管理的互動事件變多，邏輯就會開始變得複雜，  
並且如果我們經常使用 innerHTML 代換畫面的內容，  
應該會感覺到渲染畫面的時間越來越長，而且常常會出錯。

撰寫按鈕 A 的事件，可能會需要新增 B 區塊，而 B 區塊的內容又有其他互動事件，  
產生 C 或 D 元素等，這樣一層又一層的衍生，不僅同時操作很多 DOM 元素，  
而且互相關聯的程式碼，也會造成追蹤 bug 的困難，  
很難逐一去定位哪部分的程式碼有錯。

前端框架目的便是希望可以減少直接操作 DOM，取而代之的是對資料模型的操作，  
也就是所謂的狀態(State)管理，形成一個可以追溯的資料循環：

`資料狀態有改變 => 才改變畫面`

而 React 的就是使用了 **Virtual DOM** 的概念，透過比對狀態改變前後的虛擬 DOM，  
來決定如何顯示我們看到的畫面。

以往渲染一個新的 DOM 的做法就是用 innerHTML 直接替換，  
Virtual DOM 則是在比對的過程中，找出不一樣的結構( DOM 是樹狀結構)，  
並從那個結構的起點（Node）開始整塊置換掉，以達到更好的效能（**時間複雜度**）。

![Tree of Virtual DOM](https://i1.wp.com/programmingwithmosh.com/wp-content/uploads/2018/11/lnrn_0201.png)
[圖片來源](https://i1.wp.com/programmingwithmosh.com/wp-content/uploads/2018/11/lnrn_0201.png)

## React 的彈性

React 嚴格來說是個函式庫，不像其他框架自身有囊括很多功能，  
所以必須加上其他套件來完善其功能，可說是彈性很大，但也容易令人摸不著頭緒。

大部分的語法還是沿用原生 JavaScript，這也表示要學好 React 的話，  
其實更仰賴對 JavaScript 的熟悉度。

初學的過程要多多嘗試不一樣的作業和小專案，  
除了熟悉 React 的語法，也可以知道什麼套件是經常被使用的，  
像是 React-Hook-Form、React-Router、Redux 等等，  
藉此慢慢熟悉整個 React 生態圈。

## 總結

- Virtual DOM 與創造可重複利用的元件是啟用它的重要原因
- 以狀態(State)為思考中心，更容易追蹤程式碼的流程
- 對 JavaScript 熟悉度會直接影響到 React 容不容易上手

---

### 　參考資料

- [[筆記] Why React?](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-why-react-424f2abaf9a2)
- [從 Native 到 React：初學 React.js 角度的 JavaScript「升級」整理](https://hackmd.io/@BOBYZH/H1JqsfYg9)
- [你了解 React JS 嗎 15 個 React JS 的面試問題](https://linyencheng.github.io/2021/05/07/react-interview-questions/#React-%E6%9C%89%E4%BB%80%E9%BA%BC%E7%BC%BA%E9%BB%9E%E5%92%8C%E9%99%90%E5%88%B6)
