---
title: "[React 元件挑戰] 01-Button"
description: "設計 Button 元件"
date: 2024-07-26 00:00:00
keywords:
  [
    程式語言,
    JavaScript,
    React,
    custom-component,
    component-design,
    storybook,
    button,
  ]
tags: ["筆記", "React", "元件設計", "React 元件挑戰"]
slug: react-custom-ui-button
---

## 屬性設計

```ts
interface ButtonProps {
  /**
   * 按鈕文字
   */
  children?: React.ReactNode;

  /**
   * 按鈕樣式
   */
  variant: "contained" | "outlined" | "text";

  /**
   * 按鈕顏色
   * 可以是色碼或是主題色關鍵字
   */
  themeColor: string;

  /**
   * 是否禁用
   */
  isDisabled?: boolean;

  /**
   * 是否讀取中
   */
  isLoading?: boolean;

  /**
   * 按鈕左側圖示
   */
  startIcon?: React.ReactNode;
  /**
   * 按鈕右側圖示
   */
  endIcon?: React.ReactNode;

  /**
   * inline style
   */
  style?: React.CSSProperties;

  /**
   * className
   */
  className?: string;

  /**
   * 點擊事件
   */
  onClick?: () => void;
}
```

:::info
使用 jsDoc 的註解格式，可以讓 storybook 的 Docs 直接讀取變成 Description：

![gh](https://raw.githubusercontent.com/penspulse326/penspulse326.github.io/images/2023/17219844390002e1mvo.png)
:::

---

## 基本樣式

使用 styled 做出基本的樣式：

```tsx
export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  padding: 4px 8px;
  height: 2em;

  border: none;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;

  background: white;

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.7;
  }
`;
```

接著就可以在外層引入這個有基本樣式的按鈕 `StyledButton` 了，  
我的習慣是用大寫名稱的資料夾 + `index.tsx` 來包裝元件，  
這樣做的好處是可以將 `styled.ts`、`types.ts`、文本等等都縮限在資料夾做管理：

```tsx
function Button({
  children,
  variant,
  themeColor = "primary",
  isDisabled = false,
  isLoading = false,
  startIcon,
  endIcon,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <StyledButton type="button">
      <span>{children}</span>
    </StyledButton>
  );
}
```

---

## 樣式變化

接下來就可以引用屬性和泛型來做樣式的變化了，  
按鈕的風格預計會有 `contained`、`outlined`、`text` 三種，  
所以個別設定出樣式後，再包裝成物件 `variantMap`，用傳入的 `$variant` 去做去索引，  
達到切換樣式的效果，程式碼也會簡潔很多，省去一堆 if、短路、三元運算的判斷：

```ts
const containedStyle = css`
  background: ${({ theme }) => theme.colors.primary};

  color: white;
`;

const outlinedStyle = css`
  border: 1px solid ${({ theme }) => theme.colors.primary};

  color: ${({ theme }) => theme.colors.primary};
`;

const textStyle = css`
  color: ${({ theme }) => theme.colors.primary};
`;

const variantMap = {
  contained: containedStyle,
  outlined: outlinedStyle,
  text: textStyle,
};

/**
 * 需要利用屬性作判斷的話都要引用泛型 ButtonProps
 */
export const StyledButton = styled.button<ButtonProps>`
  // 省略...

  // 用 $variant 去索引 variantMap
  ${({ $variant }) => variantMap[$variant]}
`;
```

這樣大致上已經能透過傳入的屬性切換大部分的樣式了！

---

## 自訂顏色

除了透過 ThemeProvider 自訂的顏色關鍵字之外，我還希望可以讓使用者傳入色碼，  
因此要設計一個 custom hook 來處理顏色的判斷：

```ts
import { useTheme } from "styled-components";

/**
 * 檢查是否為色碼
 */
const checkIsColor = (color: string): boolean => {
  const regex =
    /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/gi;
  return regex.test(color);
};

/**
 * useColor 會回傳 getColor 方法
 * getColor 傳入的 themeColor 及 isDisabled 狀態回傳色碼
 * 判斷的優先順序為： 檢查是否為禁用狀態 > 檢查是否為合法色碼 > 檢查是否為 theme.colors 的 key（不是則回傳 primary）
 */
export const useColor = () => {
  const theme = useTheme();

  const getColor = (themeColor: string, isDisabled: boolean) => {
    if (isDisabled) {
      return theme.colors.disable;
    }

    const isLegalColor = checkColor(themeColor);

    if (isLegalColor) {
      return themeColor;
    }

    return theme.colors[themeColor] || theme.colors.primary;
  };

  return { getColor };
};
```

然後在 Button 中使用 useColor，判斷最終要傳入什麼顏色給 `StyledButton`，  
因為 `isLoading` 和 `isDisabled` 都要啟用同一種樣式，所以就用 OR 運算，
也要記得把 `themeColor` 加上 $：

```tsx
const { getColor } = useColor();
const btnColor = getColor($themeColor, isLoading || isDisabled);

return (
  <StyledButton
    type="button"
    disabled={isDisabled || isLoading}
    $variant={$variant}
    $themeColor={btnColor}
    {...props}
  >
    {isLoading && <LoadingAnimation />}
    {startIcon}
    <span>{children}</span>
    {endIcon}
  </StyledButton>
);
```

這樣就可以將 styled 裡面目前固定使用的 `theme.colors.primary` 改為 `$themeColor`，  
記得一樣要引用泛型：

```ts
const containedStyle = css<ButtonProps>`
  background: ${({ $themeColor }) => $themeColor};

  color: white;
`;
```

:::info
到目前為止，不論是初期設定、custom hook 等等都設定完畢，也設計好第一個元件了！  
這些設定都可以沿用下去，不過在書中的教學一開始並不會加這麼多東西提升難度，  
我覺得單純練習設計元件的話甚至可以不設定 ThemeProvider 和 TypeScript。
:::
