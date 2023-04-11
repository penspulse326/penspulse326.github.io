---
title: '[筆記] 初學者眼中的 React(2)：基本架構'
date: 2022-10-1 10:43:40
tags:
- React
- 程式語言
- 學習心得
categories: 程式學習
---
接下來的教學也是秉持著我寫筆記的風格，不寫得密密麻麻，
能夠簡短說明的地方就盡量簡短，但 React 中經常要使用 ES6 的語法，
不熟悉的話會很星爆哦！

這篇會先在 [Codepen](https://codepen.io/) 環境上使用 React
<!-- more -->
### 建立 Codepen 環境

開啟一個新的 Pen 之後，在 Setting 裡面點選 **JS**，將 JavaScript Preprocessor 改為 Bable，
並在 Add External Scripts/Pens 搜尋到 **react** 與 **react-dom**，並**依序**加入，
（一定要先加入 react 才能加入 react-dom，否則 codepen 會編譯不過），
或是在最下面的 Add Packages 找到這兩個套件，以 import 的方式引入也沒問題。 

### 基本執行流程

範例程式：
{% iframe https://codepen.io/shin9626/embed/XWYKprY?default-tab=html%2Cresult&editable=true %}
---
1. 在用 getElementById 之類的選取函式，抓到指定的 DOM 元素，以該元素當作起點 (root) 來產生畫面
   
```JS
// 抓到 id = "root" 的元素
const root = createRoot(document.getElementById("root"));
root.render("要產生的東西");
```
2. render 雖然可以放進任何值，不過大多是放元件(Component)
3. React 元件以 function 的方式宣告(開頭要大寫)，在 return 裡面放入設計好的 html 標籤結構，這些標籤都可以像一般的 html 程式碼一樣被產生在畫面上。
4. return 的內容必須是一個區塊(block)，而不能是多個並列的元素：
   
```JS
return (
    <div>
      要產生的內容
    </div>
)// 回傳一個 div

return (
    <div>要產生的內容</div>
    <div>要產生的內容</div>
)// 這樣是不行的 會直接報錯

return (
    <>
      <div>要產生的內容</div>
      <div>要產生的內容</div>
    </>
)// 用空的標籤包住元素也可以
```

5. JSX 允許使用標籤化的方式撰寫 JS，這時 render 的內容就可以用標籤的寫法，
將 Component 傳進去，最後在 root 裡面 render 出來。

```JS
root.render(<Component />);
```

6. 當然 Component 也可以一般標籤一樣自定義屬性，並且能夠當作參數傳送。
這時用大括號包住屬性的內容，就可以把一些變數內容打包傳進去。
   
```JS
const element = <h1>這就是 JSX！</h1>;
const text = "這就是一段字串！";
// 用大括號包住變數 就能夠在 Component 的 function 裡面抓到
root.render(<Component element={element} text={text}/>);
```

7. 元件的 function 預設會有一個參數去抓取我們在標籤裡寫入的屬性，
像物件屬性一樣抓出來使用就可以了。

```JS
function Component(props) {
  // props 後面接上對應的屬性名稱就能直接抓出來使用
  const text = props.text; // text 的內容是 "這就是一段字串！"
  return (
    <div>
      <!--加上大括號就可以在標籤內容裡面使用變數--> 
      {props.element}
      {text}
    </div>
  );
}

// 用解構的寫法直接取出屬性也是可以的
function Component({element, text}) {}
```

以上就完成了一個使用了 React 的簡單網頁！

### 補充說明：
參數名稱、標籤屬性這些都是可以自由命名的，
但有些命名慣例和語意化命名最好要遵守，比如說元件的參數會命名成 props，
某個事件觸發的對應行為，就會將函式命名為 handleClick 等等...諸如此類，
之前在讀書會裡面有看過其他初學者好像很容易因為這樣想破頭，無法往下了解整個流程，
如果試著去改改看的話會發現程式其實還是能動的，命名只是為了更好讀懂！

### 　參考資料
[(必看)React 官方教學](https://zh-hant.reactjs.org/docs/hello-world.html)
