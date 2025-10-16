---
title: 'useRef'
description: 'useRef 的用法'
date: 2023-11-13 14:11:00
keywords: [程式語言, JavaScript, React, JSX, Hooks, useRef]
tags: ['筆記', 'React']
slug: react-use-ref
---

`useRef` 可以保留資料狀態，並且資料內容的變更不會觸發重新渲染。  
有些資料我們不希望它像 `useState` 會觸發重新渲染，  
或是重新渲染之後導致一些變數內容又被初始化。

## 用法

和 `useState` 一樣，宣告時可以指定初始值，  
但後續存取要用 `current` 屬性取出：

```jsx
function App() {
  const [value, setValue] = setValue(0);
  const valueRef = useRef(0);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return (
    <div>
      <div>
        last value:
        {valueRef.current}
      </div>

      <div>
        current value:
        {value}
      </div>
    </div>
  );
}
```

ref 的變更並不會讓元件重新渲染，所以如範例用 `useEffect` 改變 `valueRef` 後，  
雖然內容的確被更新了，但在畫面上顯示的 `valueRef` 還是上一個週期的內容。

---

## 存取 DOM

用來存取 DOM 時初始值會指定為 `null`，並在目標元素上加入屬性 `ref={boxRef}`來綁定。

```jsx
function App() {
  const boxRef = useRef(null);

  useEffect(() => {
    // 在第一次渲染後會成功綁定到 DOM
    console.log(boxRef.current);
  }, []);

  return (
    <div>
      <div ref={boxRef} class="box">
        box
      </div>
    </div>
  );
}
```

常見的案例是要捕捉元素的屬性或方法，  
例如長寬大小、scorll bar 的高度，或是操作 `<video>` 的暫停、播放等。

像 scorll bar 有可能在重新渲染後，因為 DOM 被重新創造，  
原本停留在某個高度被刷新回到 `top: 0` 的位置，  
導致使用者必須再滾動一次，這時就需要透過 `useRef` 搭配 `useEffect`，  
讓它在重新渲染後仍然能回到正確的位置。

---

## 第三方套件

許多套件的功能是用類別（class）來實現的，如果不使用 `useRef` 存起來，  
會造成每次渲染時都產生新的實例（instance），上一個週期的實例物件內容也都被重置了：

```jsx
class Foo {
  time = null;

  constructor(time) {
    this.time = time;
  }

  sayHelloCreatedTime() {
    console.log(`Hello, this object is created at ${this.time}`);
  }
}

function App() {
  const [value, setValue] = useState(0);
  const fooObj = new Foo(new Date());
  const fooObjRef = useRef(new Foo(new Date()));

  useEffect(() => {
    fooObj.sayHelloCreatedTime();
    fooObjRef.current.sayHelloCreatedTime();
  }, [value]);

  return (/* 元件內容 */);
}
```

如上面範例，只要狀態改變，元件內部除了 hook，  
在重新渲染時其他程式碼都會重新執行一次，  
所以 `fooObj` 每次在 `useEffect` 中印出來的 `time` 都不一樣。  
當實例有被 `useRef` 保留下來後，再操作類別的屬性或方法時，  
就不會發生狀態被重置的問題。

---

## 參考資料

- [走歪的工程師 James：一個範例讓你搞懂 useState, useRef, useEffect](https://www.youtube.com/watch?v=q0C5g4WIrKU)
