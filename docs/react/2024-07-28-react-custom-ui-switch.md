---
title: "[React 元件挑戰] 02-Switch"
description: "設計 Switch 元件"
date: 2024-07-28 00:00:00
keywords:
  [
    程式語言,
    JavaScript,
    React,
    custom-component,
    component-design,
    storybook,
    switch,
  ]
tags: ["筆記", "React", "元件設計", "React 元件挑戰"]
slug: react-custom-ui-switch
---

屬性設計

```ts
interface ButtonProps {
  /**
   * 關閉狀態的文字
   */
  uncheckedText?: React.ReactNode;

  /**
   * 開啟狀態的文字
   */
  checkedText?: React.ReactNode;

  /**
   * 是否開啟
   */
  isChecked: boolean;

  /**
   * 是否禁用
   */
  isDisabled?: boolean;

  /**
   * 顏色
   */
  themeColor?: string;

  /**
   * 尺寸
   */
  size?: "sm" | "md";

  /**
   * 切換開關
   */
  onClick: () => void;
}
```

---

## 基本樣式

使用 styled 做出基本的樣式，因為在 `Button` 元件已經設計好 `useColor` 這個 hook 可以用了，  
所以這邊在做基本樣式時已經先把 `$themeColor` 傳入：

```tsx
export const SwitchButton = styled.button<StyledProps>`
  display: flex;
  align-items: center;

  padding: 0;
  width: 40px;
  height: 20px;
  border: none;
  border-radius: 20px;

  background-color: ${({ $isChecked, $themeColor, theme }) =>
    $isChecked ? $themeColor : theme.colors.disable};

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export const Thumb = styled.div<StyledProps>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: white;

  transform: translateX(${({ $isChecked }) => ($isChecked ? "20px" : "0px")});
  transition: 0.3s;
`;

export const Label = styled.label<StyledProps>`
  color: white;
  font-size: 14px;
  line-height: 1;
  white-space: nowrap;

  cursor: pointer;
`;

interface StyledProps {
  $isChecked: boolean;
  $themeColor?: string;
}
```

外層元件：

```tsx
function Switch({
  checkedText,
  uncheckedText,
  isChecked,
  themeColor = "primary",
  isDisabled = false,
  size = "md",
  onClick,
}: SwitchProps) {
  const { getColor } = useColor();
  const switchColor = getColor(themeColor, isDisabled);

  return (
    <SwitchButton
      $isChecked={isChecked}
      $themeColor={switchColor}
      disabled={isDisabled}
      onClick={onClick}
    >
      <Thumb $isChecked={isChecked} />
      <Label $isChecked={isChecked}>
        {/* {isChecked ? checkedText : uncheckedText} */}
      </Label>
    </SwitchButton>
  );
}
```

不管文字的話目前暫時已經完成 `Switch` 大致的流程了！

---

## 寬度變化

考慮文字之後就表示寬度是會隨著文字內容改變而變化的，  
所以需要用 `useRef` 綁定 `Label`，：

```tsx
useLayoutEffect(() => {
  // 這個寬度比較不一定，如果需要調這個值，要注意後續計算位移的量
  const minLabelWidth = thumbSize * 1.2;
  const currentLabelWidth = labelRef.current?.clientWidth ?? minLabelWidth;

  setLabelWidth(
    currentLabelWidth > minLabelWidth ? currentLabelWidth : minLabelWidth
  );
}, [labelRef?.current?.clientWidth, isChecked]);
```

只加入書中給的依賴項 `labelRef?.current?.clientWidth` 的話，  
我嘗試過後在搭配文字時會有問題，因此我加入 `isChecked`，我認為語意上也是通順的，
因為文字內容的變化必定發生在按下這個開關後。

現在可以取到動態變化的 `Label` 寬度後，原本在 styled 裡面寫死的寬高和位移量，  
都可以重新修改了。

---

## 加入間隔

目前是把 `padding` 清空，`Label` 和 `Thumb` 間也只計算了位移，  
整體的樣式是沒有間距的，所以這邊先補上 `SwitchButton` 的 `padding`：

```ts
export const SwitchButton = styled.button<StyledProps>`
  padding: 0 4px;
  width: ${({ $labelWidth, $thumbSize }) => $labelWidth! + $thumbSize}px;
  height: ${({ $thumbSize }) => $thumbSize * 1.5}px;

  box-sizing: content-box;

  // 其他略
`;

export const Thumb = styled.div<StyledProps>`
  flex-shrink: 0;

  width: ${({ $thumbSize }) => $thumbSize}px;
  height: ${({ $thumbSize }) => $thumbSize}px;

  transform: translateX(
    ${({ $isChecked, $labelWidth, $thumbSize }) =>
      $isChecked ? $labelWidth : 0}px
  );

  // 其他略
`;

export const Label = styled.label<StyledProps>`
  padding: 0 4px;

  transform: translateX(
    ${({ $isChecked, $thumbSize }) => ($isChecked ? -$thumbSize : 0)}px
  );

  // 其他略
`;
```

上面的程式碼可以發現，我在使用 `translateX` 做位移時，基本上沒有額外做計算，  
這是因為：

- `SwitchButton` 改為 `content-box`
- `Label` 用 `padding` 做間隔（用 `margin` 會需要額外多些計算）

一開始我使用 `border-box` 和 `margin` 來做間隔，  
只能說那程式碼不是普通醜，而且如果想配合 `size` 做整體大小的變化，  
那可說是慘烈，至少以我目前的能力沒辦法讓那程式碼變好看。

---

## 打包 props

如果發現給 styled 的 props 很多，我會嘗試用打包的方式，  
讓 JSX 看起來乾淨一點，這樣做也可以讓 styled 裡面的型別不用再考慮到底要不要必傳，  
下了問號又要考慮驚嘆號，我覺得 styled 裡面還是盡量減少這些型別判斷與額外計算，  
專注在 props 與樣式變化的關係就好：

```tsx
const styledProps = {
  $isChecked: isChecked,
  $themeColor: switchColor,
  $thumbSize: thumbSize,
  $labelWidth: labelWidth,
};

return (
  <SwitchButton
    {...styledProps}
    disabled={isDisabled}
    onClick={isDisabled ? () => {} : onClick}
  >
    <Thumb {...styledProps} />
    <Label ref={labelRef} {...styledProps}>
      {isChecked ? checkedText : uncheckedText}
    </Label>
  </SwitchButton>
);
```

---

## 展示設定

`Switch` 需要外部傳入 `isChecked` 與 `onClick`，本身並沒有 `state`（保證單向資料流），  
所以直接輸出 `Story`元件的話在 storybook 的展示裡面是沒有點擊效果的，  
要稍微改寫一下 `Story`：

```tsx
export const Normal: Story = {
  render: (args) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleClick = () => {
      setIsChecked(!isChecked);
    };

    return <Switch {...args} isChecked={isChecked} onClick={handleClick} />;
  },
};
```

改用 `render` 的方式設計一個外層元件後，這個 `Story` 的 `Switch` 就可以被點擊了！
