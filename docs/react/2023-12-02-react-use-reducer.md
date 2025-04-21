---
title: "useReducer"
description: "useReducer 的用法"
date: 2023-12-02 15:21:00
keywords: [程式語言, JavaScript, React, JSX, Hooks, useReducer]
tags: ["筆記", "React"]
slug: react-use-reducer
---

在要管理的 state 慢慢變多之後管理上就會變得繁瑣，  
有規模一點的專案會投入 redux， 但與 useReducer 兩者的概念算是類似的！

## 設定

假設原本有 data、isLoading 這兩個 state：

```jsx
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(true);
```

改為用 reducer 的方式管理後，這些 state 可以拉出來做成一個大的 state 物件並設定初始值，  
變數習慣命名會有 initial 前綴：

```jsx
const initialCompStates = {
  data: [],
  isLoading: true,
};
```

原本用來改變狀態的 setStateAction 方法，會拉出來存到 reducer 這個變數，  
來定義這些方法是給哪個狀態用的， 並且改成用 switch 來判斷有哪些動作可以被觸發：

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_DATA":
      return { ...state, data: action.payload };

    case "RESET":
      return initialCompStates;

    default:
      return state;
  }
};
```

每個 case 跟原本的 setStateAction 差不多，  
差別在於想要變更的值要透過 `action.payload` 取得，  
也可以額外定義新的 action 來一次改變好幾個 state，像是讓全部 state 都回到初始值的 reset。

---

## 用法

狀態跟方法都被分別定義好之後，這時就可以呼叫 useReducer，  
把剛剛定義好的 state 與 reducer 傳入：

```jsx
const MyComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialCompStates);

  console.log(state); // 會印出 initialCompStates 裡面的東西

  return (
    <div>
      {state.data.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
};
```

原本要使用 setStateAction 觸發的狀態變更，要改用 dispatch 傳入對應格式，  
type 就是剛剛在 reducer 裡面定好的 case，payload 就是要變更的值：

```jsx
dispatch({ type: "SET_LOADING", payload: false });
```

---

## 優化

改變狀態的方式從 setAction 改為 dispatch 後，  
這樣的格式`{ type: "SET_LOADING", payload: false }` 讓語法看起來變冗長了，  
如果有要把方法傳遞下去時，最好再封裝成一個函式，  
原本 setXXX 開頭的 props 寫法，也建議改為更語意化的 on 事件，  
否則掛在 component 上的 callback 會很長也不好閱讀：

```jsx
const handleChange = () => {
  dispatch({ type: "SET_LOADING", payload: false });
};

return <ChildComponent onChange={handleChange} />;
```

action type 目前全部都是用字串傳下去的，  
如果字串有打錯的話第一時間沒報錯就很難抓到 bug，  
所以這些字串通常會拉出來做成可存取的物件：

```jsx
const ACTION = {
  _SET_LOADING: "SET_LOADING",
  _SET_DATA: "SET_DATA",
};

// 改成變數後能降低出包率
dispatch({ type: ACTION._SET_LOADING, payload: false });
```

也推薦在 reducer 的定義中加上 error：

```jsx
const。reducer = (state, action) => {
	switch (action.type) {
		case 'SET_LOADING':
			return { ...state, isLoading: action.payload };

		case 'SET_DATA':
			return { ...state, data: action.payload };

    case 'RESET':
      return initialCompStates;

		default: {
      throw Error('Unknown action: ' + action.type);
    }
	}
}
```

---

## 參考資料

- [既生 useState 何生 useReducer ?](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-hooks-usestate-vs-usereducer-b14966ad37dd)
- [Day6-React Hook 篇-useReducer](https://ithelp.ithome.com.tw/articles/10268258)
- [react.dev - useReducer](https://react.dev/reference/react/useReducer#)
