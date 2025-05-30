---
title: "useEffect"
description: "useEffect 的用法"
date: 2022-11-02 15:21:00
keywords: [程式語言, JavaScript, React, JSX, Hooks, useEffect]
tags: ["筆記", "React"]
slug: react-use-effect
---

假設 todo list 內容是透過 API 取得的，那麼要元件中要如何進行 AJAX 呢？

```jsx
function List() {
  const [data, setData] = useState([]);

  fetch('url')
    .then(res => res.json())
    .then(result => setData(result))
    .catch(err => console.error(err));

  return (
    <ul>
      {
        data.map((item) => <li key={item.id}>{item.content}</li>)
      }
    </ul>
  );
}
```

這樣寫會跑出 `too many re-render` 的報錯，這是正常的。

在重新渲染時 React 會運用 **閉包（closure）** 的特性把狀態保留下來，  
而剩下的程式碼都會逐行執行，包含變數宣告與函式呼叫等等。  

範例中的 `fetch` 在第一次渲染時執行，並且在 then 中執行 setter，  
看起來很合理，因為目的就是要拿到 API 回來的資料再渲染到畫面上。  

但是 `then` 裡面的 setter 會觸發下一次渲染，  
渲染後 `fetch` 又會再被執行一次，於是 `then` 又會再執行 setter 觸發重新渲染...  
變成無限迴圈了...

此時就需要 `useEffect` 來解決這個問題！  

---

## 用法

effect 指的是 **side effect**，表示功能的運作流程中執行了其他的衍生操作所帶來的效果，  
這個效果通常不影響到主要的元件邏輯運作，也不應該寫入太多跟元件邏輯無關的變動。

把 `fetch` 放在 `useEffect` 來操作：

```jsx
useEffect(() => {
  fetch('url')
    .then(res => res.json())
    .then(result => setData(result))
    .catch(err => console.error(err));
}, [])
```

`useEffect` 的第一個參數為 callback，代表**希望在渲染完成後執行的內容**。

第二個參數為 dependencies，也稱作**依賴項目**，是一個陣列，  
裡面可以放入變數，代表只有**該變數的內容改變**，才會執行前面的 callback。  
如果給空陣列，則只有第一次渲染時會執行 callback；連陣列都不傳，則每次渲染時都會執行：

```jsx
// 只有第一次渲染後執行
useEffect(() => {
  console.log('effect 執行');
}, [])

// 每次渲染後都執行
useEffect(() => {
  console.log('effect 執行');
})
```

無論元件本身的邏輯是什麼，**useEffect 至少都會執行一次**！

上面的範例，依賴項目是空陣列，表示只有第一次渲染會執行 callback，  
如果沒有其他邏輯要寫，寫空陣列就可以完成資料初始化的需求了！  

---

## 有條件的 side effect

上面的範例是用於資料初始化，沒有什麼額外的運算邏輯，  
但在依賴項目裡加入變數後，要特別注意 callback 的內容：

```jsx
const [value, setValue] = useState(0);

useEffect(() => {
  setValue(value + 1);
}, [value])
```

馬上可以發現這段程式碼的問題是，依賴項加入了 `value`，  
並且在 callback 嘗試執行 `setValue`，這就和一開始的範例一樣，會觸發無窮迴圈，  
跑出 `too many re-render` 的錯誤。

撰寫 `useEffect` 時要**釐清這裡面的行為需要滿足什麼條件才執行**，  
像是上面有提到 `useEffect` 無論如何至少會在元件被創造的那次渲染後**執行一次**，  
有時候我們並不希望這麼做，所以 callback 內部會加入判斷式來中斷執行：

```jsx
const [value, setValue] = useState(0);

useEffect(() => {
	if(value === 0) {
		return;
	}
	
  setValue(value + 1);
}, [ value ])
```

---

## cleanup function

`useEffect` 的 callback 有設計 `return` 的功能，  
`return` 的內容會是一個 callback，稱作 **cleanup function**。  

執行時機是元件在畫面上消失（清除 DOM），  
因此這個 callback 通常是用來改變或清除一些在這個元件中**訂閱過的事件**，  
例如 `addEventListener`、通訊連線，或是 `setInterval` 等等的 Web API：

```jsx
// DOM 滾動事件
useEffect(() => {
  const element = pageRef.current;

  if(!element) {
    return;
  }

  const scrollEvent = () => {
    // 滾動事件內容
  }

  element.addEventListener('scroll', scrollEvent);

  // cleanup function
  return () => {
    element.removeEventListener('scroll', scrollEvent);
  };
}, []);
```

--- 

## 參考資料

- [useEffect 其實不是 function component 的生命週期 API](https://ithelp.ithome.com.tw/articles/10305220)
- [走歪的工程師 James：一個範例讓你搞懂 useState, useRef, useEffect](https://www.youtube.com/watch?v=q0C5g4WIrKU)

