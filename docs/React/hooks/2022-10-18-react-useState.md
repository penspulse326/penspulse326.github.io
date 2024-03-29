---
title: "useState"
description: "useState 的用法"
date: 2022-10-18 21:33:41
keywords: [程式語言, JavaScript, React, JSX, Hooks]
slug: react-tutorial-3
---

在開始之前，可以試著回想看看，用原生 JavaScript 寫 todo list，  
大概會有什麼步驟呢？

1. 可能會有 input、button、ul 這些標籤
2. 監聽 button 的 click、submit 或 input 的 Enter 的事件
3. 事件觸發後把 input 的內容抓出來存到一個陣列
4. 利用陣列方法產生一串 HTML 字串
5. 把剛剛產生的字串賦值到 ul 的 innerHTML

步驟看起來不會太多，但一般網站不會只有 todo list 這麼一塊地方要寫邏輯，  
而且頁面會更多，所以要呈現的資料也會更複雜，這時原生的程式碼就會開始變得混亂，  
利用 React、Vue 等等的前端框架就可以更簡潔地處理這些畫面的邏輯。

## 程式的起點是「狀態」

使用者感覺到有「互動」，是因為畫面的內容改變了，  
原因來自於透過 innerHTML 賦值的行為，那要怎麼決定什麼時候改變畫面？  
是資料的「**狀態**」，也就是所有 React 教學都會強調的。

具體來說我們可以自己決定要觀察「誰的狀態」，  
以剛剛的 todo list 為例，我們是在 input 的值存進陣列後產生新的列表，  
所以這個陣列就是我們要觀察的**狀態**，  
list 的資料內容被改變了，就是狀態改變，因此產生新的畫面。

React 的運作大致上是圍繞這個概念，
所以出 bug 的第一步通常也是去追溯是哪個東西的狀態有問題！

---

## The First Hook：useState

上一篇筆記有示範到元件可以在指定的地方用 root.render 呈現出來，  
root.render 是剛載入網頁時做的事，會把許多元件做成一包叫做 `<App />`的元件，  
再用 root.render 渲染出來，這個函式通常也只會執行一次。

之後重新渲染畫面的工作都會交給 React 的內建函式來決定，也就是 useState，  
原本用來儲存變數的方法，現在要改為用 useState 的方法來管理變數：

```jsx
const [value, setValue] = useState(0);
```

透過解構的語法宣告出要操作的變數，呼叫 useState 時要傳入一個值作為 value 的初始值。  
然後就跟剛剛在模擬 todo list 的步驟一樣，我們需要監聽某個元素當作觸發點，  
這邊使用 button 來實作計數器的行為：

```jsx
<button onClick={() => setValue((state) => state + 1)}>加1</button>
<button onClick={() => setValue((state) => state - 1)}>減1</button>
```

要特別注意這邊的 onClick 是 React 封裝好的監聽方式，而**不是 JS 中的 addEventListener**！

onClick 裡面預設是一個 callback，和 addEventListener 一樣可以拿到預設的 event 參數，  
所以不能直接執行函式 `onClick={setValue(state => state + 1)}`，
必須透過像上面 button 的範例 callback 的寫法才能正確執行 setValue。

### 表達式

還記得表達式嗎？JSX 中任何跟變數有關的東西都要用大括號包住，  
大括號的內容會是一個表達式。

雖然 onClick 裡面不需要真的回傳一個值，只需要定義好一個 callback function，  
但如果像剛剛說到的錯誤示範 `onClick={setValue(state => state + 1)}` 這樣寫的話，  
代表元件在渲染的時候已經同時執行了大括號裡面的程式碼了，剛好執行的又是 setAction，  
於是會變成：

1. 元件在第一次渲染時執行了 setValue
2. setValue 改變了 value 所以重新渲染
3. 重新渲染時又執行了 setValue

這時畫面就會直接爆炸，console 也會收到 **Too many re-renders** 的警告，  
代表我們不小心寫出無限迴圈了。

---

## setAction 中的 callback

透過呼叫 useState 宣告出來的 setXXX 被稱作 **setAction**，  
在 React 裡面只能透過 setAction 改變 state 變數，  
所以執行 setAction 通常也會引發畫面重新渲染的。

setAction 除了像這樣 `setValue(123)` 給一個純值之外，  
也經常像上面 button 的範例一樣，用 callback 的方式傳入值，  
callback 預設的參數會是當下的 state：

```jsx
<button
  onClick={() => {
    setValue((state) => {
      console.log(state);
      return state - 1;
    });
  }}
>
  減1
</button>
```

假如載入畫面後還沒有進行過任何操作，這時候 value 應該是初始值 0，  
我在 onClick 事件裡面執行 setAction 時用 callback 的方式取出 state，  
再用 console.log 印出來看，確實是 0 沒錯！

當我們要依據前一次狀態來做計算時，  
通常建議使用 callback 來處理 setAction 的邏輯：

```jsx
// 傳純值
const badAddValue = () => {
  setValue(value + 1);
  setValue(value + 1);
  setValue(value + 1);
};

// 傳 callback
const goodAddValue = () => {
  setValue((prev) => prev + 1);
  setValue((prev) => prev + 1);
  setValue((prev) => prev + 1);
};
```

執行 badAddValue 的話 value 在下次渲染時會是 1 而不是 3，  
這是因為它取出的 value 還是前一次渲染時的初始值 0，  
等於只是連續執行了 3 次並且用 `0 + 1` 改變 value 而已。

goodAddValue 會得到 3 是因為 setAction 的 callback 在下次渲染之前，  
每次執行都會更新 state，所以取到的也是更新後的 state，  
所以最後得到的 value 已經是在 callback 執行期間處理好的 state 了。

要注意的是 setAction 本身是非同步的行為，  
所以在上面範例連續執行的時雖然沒什麼問題，  
但如果要精準控制執行順序，還是會用`useEffect` 確保順序是正確的。

---

### 參考資料

- [走歪的工程師 James：一個範例讓你搞懂 useState, useRef, useEffect](https://www.youtube.com/watch?v=q0C5g4WIrKU)
