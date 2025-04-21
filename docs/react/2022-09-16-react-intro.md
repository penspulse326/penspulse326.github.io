---
title: "框架概念"
description: "React 與框架的概念"
date: 2022-09-16 17:55:00
keywords: [程式語言, 前端框架, JavaScript, React, Virtual DOM]
tags: ["筆記", "React"]
slug: react-intro
---

## 為何要學

~~因為老師就教 React。~~  
回想學 JavaScript 的過程中，我們如何讓畫面產生互動呢？

> 1. 選取 DOM 元素
> 2. 用 addEventListener 綁定選到的元素，監聽特定行為
> 3. 被監聽的元素如果觸發特定行為就執行對應函式

管理的事件變多時，程式碼自然就會變得繁雜，  
也會感覺到畫面的更新越來越久，而且常常會出錯，  
即便只是慢了 0.3 秒。

撰寫按鈕 A 的事件，可能會需要新增 B 區塊，而 B 區塊的內容又有其他互動事件，  
產生 C 或 D 元素等，一層又一層的衍生，不僅同時操作很多 DOM 元素，  
不斷嵌套的程式碼也會造成追蹤 bug 的困難，很難梳理好是哪部分的程式碼有問題。

框架的目的是可以減少直接操作 DOM，更強調的是對資料模型的操作，  
形成一個可以追溯的資料流：

`畫面互動 => 資料內容改變 => 改變畫面呈現的資料`

---

## Virtual DOM

以往就是用 `innerHTML` 直接替換 DOM，而 React 使用 **Virtual DOM** 的概念，  
透過比對 DOM 的狀態，來決定要從哪裡開始、從什麼時候開始來更新 DOM。

在 React 操作資料時會先作用在新的 Virtual DOM 上，再與舊的 Virtual DOM 比對，  
定位出所有會被此資料影響的 DOM 的起始點，再更新到瀏覽器的 DOM 上，  
減少直接、大量操作 DOM 的次數，而不是像 `innerHTML` 固定把整塊東西換掉。

---

## 開發彈性

React 的 conventions（既定的慣例或強制的規則）沒有太多，  
大多還是沿用原生 JS，也表示要學好 React 很仰賴對 JS 的熟悉度。

React 開箱即用的功能並不多，要加上其他套件來完善其功能，  
所以彈性很大，卻也容易令人摸不著頭緒。

初學需多多嘗試各種作業和小專案，  
除了熟悉 React 的語法，也可以知道什麼套件是經常被使用的，  
像是 react-hook-form、react-router、redux 等等，  
藉此慢慢熟悉整個 React 生態圈。

---

## 學習路徑

1. 理解 React 與原生 JS 的差異與整體運作流程
2. 學習最常用的 useState 與 useEffect 的用法
3. 嘗試改寫 todo list
4. 透過各種練習慢慢熟悉其他 hook 和常用套件的用法
5. 嘗試建構一個完整功能的網站
6. 學習 Next.js

---

## 　參考資料

- [Why React?](https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-why-React-424f2abaf9a2)
- [從 Native 到 React：初學 React.js 角度的 JavaScript「升級」整理](https://hackmd.io/@BOBYZH/H1JqsfYg9)
- [你了解 React JS 嗎 15 個 React JS 的面試問題](https://linyencheng.github.io/2021/05/07/React-interview-questions/#React-%E6%9C%89%E4%BB%80%E9%BA%BC%E7%BC%BA%E9%BB%9E%E5%92%8C%E9%99%90%E5%88%B6)
