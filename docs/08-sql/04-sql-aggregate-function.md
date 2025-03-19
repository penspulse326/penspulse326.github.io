---
title: 函數
date: 2024-12-14 21:08:13
description: "了解 SQL 的聚合函數"
keywords: [程式語言, SQL, 資料庫, database, 函數, aggregate-function]
slug: sql-aggregate-function
---

一些聚合函數（aggregate function）以及其他 PG 的功能

## NULL

建立 table 時可以指定欄位是否必填，  
如果設定了 `NOT NULL`，其他欄位建議也補上 `NULL`， 整體可讀性較一致。

```SQL
-- 建立員工資料表
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  team_name VARCHAR(50) NULL,
  salary INTEGER NULL
);
```

---

## COALESCE

可以使 NULL 的欄位輸出變成指定的值，  
如撈到 salary 為 NULL 的時候，就顯示 `'未設定'`：

```SQL
SELECT
   id,
   name,
   email,
   COALESCE(team_name, '未分配部門') as team_name,
   COALESCE(salary, 0) as salary
FROM users;
```

---

## DISTINCT

在撈取時可以去除重複資料，類似 Set 物件：

```SQL
SELECT
  DISTINCT team_name
FROM
  users;
```

---

## COUNT

```SQL
SELECT
  COUNT(*) as 員工總數
FROM
  users;
```

---

## AVG、SUM、MAX、MIN

```SQL
SELECT
  AVG(salary) AS 平均薪資,
  SUM(salary) AS 總薪資,
  MAX(salary) AS 最高薪資,
  MIN(salary) AS 最低薪資
FROM users;
```

---

## UUID

可以產生比純數字的 id 更具安全性的代號，代價是占用更多容量：

```SQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
);
```
