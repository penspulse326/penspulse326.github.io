---
title: "useContext"
description: "useContext 的用法"
date: 2025-05-14 16:17:44keywords: [程式語言, JavaScript, React, JSX, Hooks, useContext]
tags: ["筆記", "React"]
slug: react-use-context
---

實作元件的過程中難免會遇到有些變數要往下傳的，如：

```jsx
function ParentComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModalDisplay(state) {
    setIsModalOpen(state);
  }

  return (
    <>
      <Modal 
        isModalOpen={isModalOpen} 
        handleModalDisplay={handleModalDisplay}
      >
              
      </Modal>
    </>
  );
}
```
