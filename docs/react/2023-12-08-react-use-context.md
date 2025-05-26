---
title: "useContext"
description: "useContext 的用法"
date: 2023-12-02 15:21:00
keywords: [程式語言, JavaScript, React, JSX, Hooks, useContext]
tags: ["筆記", "React"]
slug: react-use-context
---

實作元件時經常會遇到資料需要向下傳遞的狀況，如：

```jsx
function ChildComponent({ count, onIncrease, onDecrease }) {
  return (
    <div>
      <div>這裡是 Child 的 count: {count}</div>
      <button type="button" onClick={onIncrease}>
        增加
      </button>
      <button type="button" onClick={onDecrease}>
        減少
      </button>
    </div>
  );
}

function ParentComponent({ count, setCount }) {
  function handleIncrease() {
    setCount(count + 1);
  }

  function handleDecrease() {
    setCount(count - 1);
  }

  return (
    <>
      <div>這裡是 Parent 的 count: {count}</div>
      <ChildComponent
        count={count}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
    </>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return <ParentComponent count={count} setCount={setCount} />;
}
```

目前只傳遞兩次，看起來還可以接受，  
但再往下傳更多層，或是有更多封裝 setter 的地方，  
就會造成過度傳遞的問題（props drilling），  
寫的時候麻煩，後續維護和追蹤也很痛苦，  
這時就可以考慮使用 `useContext` 來進行跨元件的資料管理。

## 用法

### createContext

使用 `createContext`  建立一個 context，  
呼叫時可以帶入初始值：

```jsx
const CounterContext = createContext(null);
```

### Context Provider

context 的用法是取出子元件 `Provider`，在 JSX 中把需要共享這個狀態的元件都包住：

```jsx
function App() {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      <ParentComponent />
    </CounterContext.Provider>
  );
}
```

`value` 是 `Provider` 的固定 props，可以傳入純值，  
或是像上面這樣把 getter 和 setter 等等包成物件傳下去。

### useContext

在 `ParentComponent` 中使用 `useContext` 取出剛剛在 `Provider` 的 `value` 傳入的東西，  
因為是包成物件，所以要存取時可以直接解構出來：

```jsx
function ParentComponent() {
	// 只取出 count
  const { count } = useContext(CounterContext);

  return (
    <>
      <div>這裡是 Parent 的 count: {count}</div>
      <ChildComponent />
    </>
  );
}
```

`ChildComponent` 也可以使用這個 hook 取出 `count` 和 `setCount`，  
這樣就能減少 props 的重複定義和向下傳遞。

但這個問題也和元件的設計方式有關，是否有遵守 `邏輯層/展示層` 的設計方式（[參考](https://www.patterns.dev/react/presentational-container-pattern/)），  
展示層盡可能維持在**單純接收 props 傳入的資料**的功能，  
因此純 UI 的元件裡通常不太會去操作 `useContext`。  

:::warning
比較早期的網路教學通常也會提到用 `<Context.Consumer>` 去取出 context 的內容，  
不過此方式已經被官方標註為不推薦。  
  
[參考來源](https://react.dev/reference/react/createContext#consumer)
:::

---

## 與 useReducer 搭配

接下來會示範 `useContext` + `useReducer` 經典的練習題：**登入狀態**。

首先可以定義出基本的 reducer 結構：

```jsx
export const AUTH_ACTION = {
  SET_SIGN_IN: 'SET_SIGN_IN',
  SET_SIGN_OUT: 'SET_SIGN_OUT',
  CHECK_AUTH: 'CHECK_AUTH',
};

function createInitialStates() {
  return {
    userId: null,
    token: null,
  };
}

function reducer(state, action) {
  const { type, payload } = action;
  const token = localStorage.getItem('token');

  switch (type) {
    case AUTH_ACTION.SET_SIGN_IN:
      localStorage.setItem('token', payload?.token);
      return { ...payload };

    case AUTH_ACTION.SET_SIGN_OUT:
      localStorage.removeItem('token');
      return createInitialStates();

    case AUTH_ACTION.CHECK_AUTH:


      if (token) {
        alert('已登入');
        return state;
      }

      alert('未登入');
      return createInitialStates();

    default:
      console.error('不存在的 action');
      return state;
  }
}
```

`Provider` 元件可以再封裝，裡面可以呼叫 `useReducer`，把狀態和方法宣告出來，  
並傳入 `Provider` 元件的 `value`：

```jsx
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 生成 reducer
  const [userInfo, dispatch] = useReducer(reducer, createInitialStates());

  return (
    {/* 傳入 reducer */}
    <AuthContext.Provider value={{ userInfo, dispatch }}>
      {children}
    </AuthContext.Provider>
  );  
}
```

引用封裝好的 `AuthProvider`，裡面有定義好 `children`，　　
所以子元件一樣能用 `useContext` 取得 `AuthContext.Provider` 的 `value`：

```jsx
function UserSignInPage() {
  const { userInfo, dispatch } = useContext(AuthContext);

  const isSignIn = userInfo.userId && userInfo.token;

  function handleSignIn() {
    const userInfo = {
      userId: 123,
      token: 'This is test token.',
    };

    dispatch({
      type: AUTH_ACTION.SET_SIGN_IN,
      payload: userInfo,
    });
  }

  function handleSignOut() {
    dispatch({
      type: AUTH_ACTION.SET_SIGN_OUT,
    });
  }

  function handleCheckAuth() {
    dispatch({
      type: AUTH_ACTION.CHECK_AUTH,
    });
  }

  return (
    <main>
      {isSignIn && 
        <div>
          使用者 ID: {userInfo.userId} 已登入
        </div>
      }
      <button type="button" onClick={handleSignIn}>
        登入
      </button>
      <button type="button" onClick={handleSignOut}>
        登出
      </button>
      <button type="button" onClick={handleCheckAuth}>
        檢查登入狀態
      </button>
    </main>
  );
}

function App() {
  return (
    <AuthProvider>
      <UserSignInPage />
    </AuthProvider>
  );
}
```

### 優化

getter 和 setter 建議拆成不同的 context：

```jsx
export const AuthStateContext = createContext();
export const AuthActionContext = createContext();

export function AuthProvider({ children }) {
  const [userInfo, dispatch] = useReducer(reducer, createInitialStates());

  return (
    //將 userInfo 和 dispatch 分別傳入
    <AuthStateContext.Provider value={{ userInfo }}>
      <AuthActionContext.Provider value={dispatch}>
        {children}
      </AuthActionContext.Provider>
    </AuthStateContext.Provider>
  );
}
```

使用拆分好的 context：

```jsx
function UserStatusPage() {
  // 透過 AuthStateContext 只取出 userInfo
  const { userInfo } = useContext(AuthStateContext);

  console.log('UserStatusPage render');

  return <div>UserStatusPage {userInfo.userId}</div>;
}

function UserSignInPage() {
  // 透過 AuthActionContext 只取出 dispatch
  const dispatch = useContext(AuthActionContext);

  function handleSignIn() {
    // 略
  }

  function handleSignOut() {
    // 略
  }

  function handleCheckAuth() {
    // 略
  }

  console.log('UserSignInPage render');

  return (
    <>
      <button type='button' onClick={handleSignIn}>
        登入
      </button>
      <button type='button' onClick={handleSignOut}>
        登出
      </button>
      <button type='button' onClick={handleCheckAuth}>
        檢查登入狀態
      </button>
    </>
  );
}

function App() {
  return (
    <>
      <AuthProvider>
        <UserSignInPage />
        <UserStatusPage />
      </AuthProvider>
    </>
  );
}
```

這時會發現不論 `UserSignInPage` 中操作登入或登出，  
只有 `console.log('UserStatusPage render');` 會被印出，  
得證 getter 和 setter 的 context 拆開後，  
存取 setter 的元件不會因為 getter 的狀態變化，導致一起被重新渲染。

:::info
setter 和資料計算可以進一步透過 `useCallback` 和  `useMemo` 進行 reference 的優化，  
這邊就先不深入探討。
:::

---

## 建議情境

`Provider` 的 `value` 也是一種 state，因此被 `Provider` 包住的元件中，  
只要有使用 `useContext` 存取 context，也會觸發機制重新渲染。  

因此**資料狀態經常變動**的狀態，就不太適合使用 context 來管理，  
而常用的情境有：

1. 登入狀態
2. i18n 切換
3. 主題色切換
4. UI 狀態切換，如 modal、側邊欄等
5. 表單各步驟的資料暫存

---

## 參考資料

- [Container/Presentational Pattern](https://www.patterns.dev/react/presentational-container-pattern/)
- [React Context, Provider and useContext](https://pjchender.dev/react/react-context-provider-api/#usecontext--usereducer)