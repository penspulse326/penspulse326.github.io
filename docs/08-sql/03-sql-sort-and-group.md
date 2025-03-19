---
title: 分組與排序
date: 2024-12-13 22:21:48
description: "了解 SQL 的分組與排序功能"
keywords: [程式語言, SQL, 資料庫, database, 分組, group, 排序, sort]
slug: sql-sort-and-group
---

## ORDER BY

- ACS 升冪
- DESC 降冪

```sql
SELECT
  name AS 姓名,
  salary AS 薪資,
  team_id AS 部門
FROM employees
ORDER BY team_id ASC, salary DESC;
```

---

## LIMIT, OFFSET

- LIMIT 單次查詢的最多筆數上限
- OFFSET 跳過 N 筆資料，需連在 LIMIT 後面

```sql
SELECT
  name AS 姓名,
  team_id AS 部門
FROM
  employees
LIMIT 5 OFFSET 2; -- 跳過兩筆，所以從第三筆開始顯示
```

搭配子查詢可以做出簡單的分頁功能，先用 COUNT 函數計算符合條件的資料筆數，  
在除以「LIMIT 的值 **乘以** 第 K - 1 頁」，假設 LIMIT 5 而全部資料有 16 筆，語法為：

- 顯示第 1 頁，語法為 `LIMIT 5 OFFSET 0`，`OFFSET 0` 可以是預設值所以可忽略不寫
- 顯示第 2 頁，語法為 `LIMIT 5 OFFSET 5`，
- 顯示第 3 頁，語法為 `LIMIT 5 OFFSET 10`

```sql
SELECT
  name AS 姓名,
  team_id AS 部門
FROM
  employees
LIMIT 5 OFFSET ((SELECT COUNT(*) FROM employees) / N);
```

實際上在製作時，還要計算總共會有幾頁來限制 OFFSET 最多可以跑到多少，  
以上面範例，OFFSET 大於 16 之後會完全撈不出資料。

---

## GROUP BY

針對指定條件做分組，搭配聚合函數可以計算不同組之間的資料，  
搭配 JOIN 組合出完整的資料：

```sql
SELECT
    teams.name AS 部門名稱,
    COUNT(*) AS 人數 -- 用 COUNT 算出各部門人數
FROM employees
INNER JOIN teams ON users.team_id = teams.id -- 用 JOIN 接入部門的名稱
GROUP BY teams.name;
```

---

## 子查詢

用小括號獨立出一個 SELECT 的查詢集合，例如可以在小括號完成平均薪資的計算，  
然後在最外層的 SELECT（主查詢）撈出大於平均薪資的員工：

```sql
SELECT name, salary
FROM users
WHERE salary > (SELECT AVG(salary) FROM users);
```

或是在新增資料時，透過子查詢的方式取得特定的鍵值，  
如在新增員工時，用 SELECT + WHERE 可以利用部門名稱去索引部門 id：

```sql
INSERT INTO users (name, email, salary, team_id) VALUES
(
    '新同事',
    'new@gmail.com',
    50000,
    (SELECT id FROM teams WHERE name = '開發部')
);
```

---

## 查詢順序

注意 SQL 指令是有執行順序的權重的：

1. FROM, JOIN
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. DISTINCT
7. ORDER BY
8. LIMIT, OFFSET
