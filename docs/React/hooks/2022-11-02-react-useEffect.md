---
title: "useEffect"
description: "React 的 useEffect"
date: 2023-12-02 15:21:00
keywords: [程式語言, JavaScript, React, JSX, Hooks, useEffect]
slug: react-useeffect
---

假設我們設計的 todo list，內容是透過 API 取得的，那麼我要如何設計元件呢？

```jsx
function List() {
  const [data, setData] = useState([]);

  fetch("url")
    .then((res) => res.json())
    .then((result) => setData(result))
    .catch((err) => console.error(err));

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.content}</li>
      ))}
    </ul>
  );
}
```

這時會發現畫面卡死，跑出 too many re-render 的報錯，這是正常的...  
在重新渲染時，因為 React 會運用閉包的特性把 useState 的值保留下來，  
剩下的程式碼都會逐行執行一次，包含變數宣告與函式呼叫等等。

範例中的 fetch 在第一次渲染時執行，並且在 then 中執行 setAction，  
看起來似乎很合理，因為我就是需要拿到 API 回來的資料再渲染到畫面上嘛，  
但是 then 裡面的 setAction 觸發下一次渲染後，fetch 又會再被執行一次，  
於是 then 又會再執行 setAction 觸發重新渲染...變成無限輪迴了。

---

## 使用時機

此時就需要 useEffect 來解決這個問題！  
Effect 指的是 **Side Effect**，表示執行函式時的衍生效果，  
雖然這個效果並不會影響到主要邏輯，但仍然有可能改變部分程式碼。

把 fetch 改為 useEffect 來操作：

```jsx
useEffect(() => {
  fetch("url")
    .then((res) => res.json())
    .then((result) => setData(result))
    .catch((err) => console.error(err));
}, []);
```

第一個參數為 callback，代表我們**希望在渲染完成後執行的函式**，  
第二個參數為 dependency，是一個陣列，也稱作依賴項，裡面可以放入變數，  
代表只有**該變數的內容改變**，才會執行前面的 callback，  
如果給空陣列，則只有第一次渲染時會執行 callback。

所以 useEffect 的內容，無論如何元件本身的邏輯是什麼，至少都會執行一次，  
套用剛剛對 Side Effect，useEffect 就是元件渲染的衍生效果。

上面的範例，dependency 是空陣列，表示只有第一次渲染會執行 callback，  
因為暫時沒有其他邏輯要寫，所以空陣列就可以完成資料初始化的需求了！

## 有條件的 Side Effect

上面的範例只是用於資料初始化，所以沒有什麼複雜的邏輯，  
但是當我們開始在 dependency 加入需要被觀察的變數後，  
要特別小心 callback 的邏輯：

```jsx
const [value, setValue] = useState(0);

useEffect(() => {
  setValue(value + 1);
}, [value]);
```

馬上可以發現這段程式碼的問題是，依賴項加入了 value，  
並且在 callback 嘗試執行 setValue，理所當然會觸發無窮迴圈，  
跑出 too many re-render 的錯誤。

雖然好像不太會犯這種錯誤，但假如我們是在 callback 執行封裝好的函式，  
還是會有不小心寫出無窮迴圈的可能，所以在撰寫 useEffect 時，  
要**釐清需求是什麼再決定依賴項和判斷條件**，所以 useEffect 不一定要執行和 state 有關的行為，  
但是**任何 state 的改變都必定是因為某個條件被滿足才會發生**，而不是無意義地去觸發狀態改變。

## 總結

- useEffect 可以用在元件初始化時或是必須依賴某些變數時要執行的行為
- useEffect 會在渲染後執行，所以不論有沒有依賴項，至少會執行一次
- 小心在 useEffect 裡面觸發無窮迴圈

---

## 參考資料

- [useEffect 其實不是 function component 的生命週期 API](https://ithelp.ithome.com.tw/articles/10305220)
- [走歪的工程師 James：一個範例讓你搞懂 useState, useRef, useEffect](https://www.youtube.com/watch?v=q0C5g4WIrKU)
