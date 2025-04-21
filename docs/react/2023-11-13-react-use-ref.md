---
title: "useRef"
description: "useRef 的用法"
date: 2023-11-13 14:11:00
keywords: [程式語言, JavaScript, React, JSX, Hooks, useRef]
tags: ["筆記", "React"]
slug: react-use-ref
---

在要管理的 state 慢慢變多之後管理上就會變得繁瑣，  
在 React 通常可以使用 useReducer 做管理，有規模一點的專案就會投入 Redux，  
但兩者的語法跟概念算是類似的！

## 設定

假設原本有 data、isLoading 這兩個 state：

```jsx
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(true);
```

改為用 reducer 的方式管理後，這些 state 可以拉出來做成一個大的 state，  
通常也會在此賦予初始值，所以變數名稱習慣上命名成 initialState：

```jsx
const initialState = {
  data: [],
  isLoading: true,
};
```

原本用來改變那些狀態的 setAction 方法，一樣要拉出來存到 reducer 這個變數，  
並且改成用 switch 來判斷有哪些動作可以被觸發， 可以說 reducer 是定義動作的地方：

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
```

每個 case 做的事跟原本的 setAction 差不多，  
差別在於傳入的值要透過 `action.payload` 取得，  
return 之前也可以做其他運算。

---

## 用法

狀態跟方法都被分離出來了，這時就可以開始使用 useReducer，  
把剛剛定義好的 state 與 reducer 傳入：

```jsx
const MyComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state); // 會印出 initailState 裡面的東西

  return (
    <div>
      {state.data.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
};
```

原本要使用 setAction 觸發的狀態變更，這時要改用 dispatch 傳入對應格式，  
type 就是我們剛剛在 reducer 裡面定好的 case，payload 就是要傳入的資料：

```jsx
dispatch({ type: "SET_LOADING", payload: false });
```

---

## 優化

此篇示範的情境是元件初次渲染時要去打 API，接到回來的資料後，  
改變 isLoading 和 data 的內容，所以程式碼大致的結構會是這樣：

```jsx
const MyComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, data } = state;

  const fetchData = async () => {
    try {
      const response = await getData();
      dispatch({ type: "SET_LOADING", payload: false });
      dispatch({ type: "SET_DATA", payload: response.data });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading && <LoadingAnimation />}
      {data.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
};
```

可以把 state 裡面的狀態變數都解構出來。  
改變狀態的方式從 setAction 改為 dispatch 後，  
這樣的格式`{ type: "SET_LOADING", payload: false }` 讓語法看起來變長了，  
如果遇到有要把方法傳遞下去的狀況，最好再封裝成一個函式，  
所以原本直接寫 setXXX 直接傳下去的 props 也建議改為更語意化的 on 事件，  
否則掛在 component 上的 callback 會很長也不好閱讀：

```jsx
const handleChange = () => {
  dispatch({ type: "SET_LOADING", payload: false });
};

return <ChildComponent onChange={handleChange} />;
```

最後就是，action type 目前全部都是用字串傳下去的，  
如果字串有打錯的話第一時間沒報錯就很難抓到 bug，  
所以這些字串通常會拉出來變成變數名稱：

```jsx
const ACTION = {
  SET_LOADING: "SET_LOADING",
  SET_DATA: "SET_DATA",
};

// 改成變數後能降低出包率
dispatch({ type: ACTION.SET_LOADING, payload: false });
```

---

## 參考資料

- [既生 useState 何生 useReducer ?](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/react-hooks-usestate-vs-usereducer-b14966ad37dd)
- [Day6-React Hook 篇-useReducer](https://ithelp.ithome.com.tw/articles/10268258)
