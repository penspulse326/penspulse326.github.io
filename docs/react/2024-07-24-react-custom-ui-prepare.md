---
title: "[React 元件挑戰] 00-事前準備"
description: "設計 UI 庫的事前準備"
date: 2024-07-24 00:00:00
keywords:
  [程式語言, JavaScript, React, custom-component, component-design, storybook]
tags: ["筆記", "React", "元件設計", "React 元件挑戰"]
slug: react-custom-ui-prepare
---

本次挑戰參考 **[30 天擁有一套自己手刻的 React UI 元件庫](https://ithelp.ithome.com.tw/articles/10263591)**
的出版叢書 `哎呀！不小心刻了一套 React UI 元件庫` 實作。

實作前需要安裝好：

1. styled-components
2. storybook
3. TypeScript（我想練習所以有加）

---

## 展示元件

因為書中不會示範怎麼設定 storybook，但是在實作第一個元件時又很想看效果，  
所以一開始花了一些時間搞懂怎麼設定 storybook。

以 Button 元件為例：

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Button from "../components/Button";

/**
 * Meta 會從 Button 裡面擷取泛型
 * args 表示 Button 的 props
 * argTypes 表示在 Storybook 上的操作形式
 */
const meta = {
  title: "Inputs/Button",

  component: Button,

  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"], // 使用 autodocs 自動產生文件的話要至少 export 一個 Story 物件
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["contained", "outlined", "text"],
    },
    themeColor: {
      control: "color",
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },

  args: {
    children: "Button",
    isDisabled: false,
    isLoading: false,
    themeColor: "black",
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  args: {
    variant: "contained",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
  },
};

export const Custom: Story = {
  args: {
    variant: "contained",
    style: {
      background: "linear-gradient(0deg, #16309b 30%, #16a8e2 90%)",
      borderRadius: 50,
    },
  },
};
```

---

## 引入主題色

如果使用 ThemeProvider 來管理主題色的話可能會遇到一些報錯，  
原因是 Storybook 沒辦法直接引用 ThemeProvider，  
官方給的解決方案：[# Integrate Styled Components with Storybook](https://storybook.js.org/recipes/styled-components)

報錯內容：

```
# ThemeProvider: Please make sure your useTheme hook is within a `<ThemeProvider>`
```

---

## 型別

styled-components 為了預防命名衝突，自定義的 props 前面都要加上 `$` 這個前綴，  
而在 styled 元件裡面要引用這些 props 的話必須加上泛型。

原本我想要外層的 `index.ts` 和內層的 `styled` 元件都共用同一個型別，  
但是 `$` 前綴就會影響到一般父層在使用元件時可能會頻繁看到 `$` 的可讀性，  
並且不是所有的 props 都會傳入內層做樣式變化的判斷，  
硬要引用同一個型別反而還需要考慮「是不是必傳」、`extends` 和 `Omit` 等：

```ts
// 外層 Button 的型別
interface ButtonProps {
  variant: 'contained' | 'outlined' | 'text';
  // ...其他一堆屬性
}

// styled 的型別
interface StyledProps extends ButtonProps Omit<ButtonProps, 'variant'> {
  $variant: 'contained' | 'outlined' | 'text';
}
```

看起來是不是很彆扭？為了符合 `$` 前綴的安全性還有是不是必傳的問題，  
大費周章地用 `Omit` 抽掉一樣的 props，然後再重新命名一次...
因此我覺得外層與內層的型別其實分開寫就可以了，  
內層需要什麼 props 就補什麼到型別裡面，寫起來比較直覺乾淨。

---

## 慣例

前面在介紹 React 基本概念時也有提到，屬性的設計與命名盡量不要違反直覺，  
那麼「直覺」的基準是什麼？其實在 JSX 裡面已經提示很多，如 `onChange`，`onClick` 等，  
如果是藉由使用者對 DOM 的互動所觸發的事件，通常以 on 開頭，  
如果屬性代表一個布林值的狀態，通常以 is 開頭...諸如此類的慣例有很多，  
多看一些 code 應該會很有印象的 XD

另外元件要不要做成單個閉合標籤，也是取決於到底需不需要傳入 `children` 以及使用慣例，  
例如我設計了一個 `Button` 元件的話，我會希望它像原生的 `button` 來做撰寫，  
因此文本內容應該當成 `children` 傳入：

```jsx
// 用 children 當作文本
<Button>
  我是一個按鈕
</Button>

// 用 props 當作文本
<Button
  text="我是一個按鈕"
/>
---

## 參考資料

- [30 天擁有一套自己手刻的 React UI 元件庫](https://ithelp.ithome.com.tw/articles/10263591)
- [Integrate Styled Components with Storybook](https://storybook.js.org/recipes/styled-components)
```
