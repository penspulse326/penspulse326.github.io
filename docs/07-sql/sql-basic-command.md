---
title: 基本指令
date: 2024-11-04 19:53:04
description: "了解 SQL 的基本指令"
keywords: [程式語言, SQL, 資料庫, database, 指令, sql command]
slug: sql-basic-command
---

SQL 的指令非常口語，學過就很難忘記了！

## table, column, row

- table 是一張資料表，類似 excel 的 sheet。
- column 是資料欄位，可以限定內容格式，比如必須是數字、不能超過 100 字等。
- row 是一列包含所有欄位的完整資料。

| 商品     | 庫存 | 售價  |
| -------- | ---- | ----- |
| 行動電源 | 12   | 799   |
| 充電線   | 45   | 200   |
| 手機     | 3    | 19999 |

以程式的觀點來看，資料表應該會像是一個物件陣列，  
column 代表物件的 key，row 則是一整個物件：

```javascript
const table = [
  {
    name: "行動電源",
    stock: 12,
    price: 799,
  },
  {
    name: "充電線",
    stock: 45,
    price: 200,
  },
  {
    name: "手機",
    stock: 3,
    price: 19999,
  },
];
```

---

## CREATE

```SQL
/*
  建立資料表
*/
CREATE TABLE products (
  name VARCHAR(100),
  price INTEGER,
  stock INTEGER,
);
```

## INSERT

```SQL
/*
  插入資料
*/
INSERT INTO
  products (name, price, stock)
VALUES
  ('手機殼', 1200, 50),
  ('耳機', 599, 82);
```

## SELECT

```SQL
/*
  查詢資料
  * 代表全部資料和全部欄位
  可以使 row 只呈現部分欄位
*/
SELECT
  name,
  stock
FROM
  products;
```

## AS

```SQL
/*
  AS 可以改變查詢結果的 column 名稱
*/
SELECT
  name AS 商 品 名 稱,
  stock AS 庫 存
FROM
  products;
```

## WHERE

```SQL
/*
  條件篩選資料
*/
SELECT
  *
FROM
  products
WHERE
  price < 1000;
```

## AND, OR

```SQL
/*
  多重條件篩選
*/
SELECT
  *
FROM
  products
WHERE
  price < 1000
  AND stock > 10;
```

```SQL
/*
  多重條件篩選
*/
SELECT
  *
FROM
  products
WHERE
  price < 1000
  OR stock > 10;
```

## IN, NOT IN, BETWEEN

```SQL
/*
  多重條件篩選
*/
SELECT
  *
FROM
  products
WHERE
  name IN ('手機殼', '耳機');
```

```SQL
/*
  多重條件篩選
*/
SELECT
  *
FROM
  products
WHERE
  name NOT IN ('手機');
```

```SQL
/*
  多重條件篩選
*/
SELECT
  *
FROM
  products
WHERE
  price BETWEEN 100
  AND 1000;
```

## UPDATE

```SQL
/*
  更新資料內容
*/
UPDATE
  products
SET
  price = price + 100;
```

## DELETE

```SQL
/*
  刪除資料
*/
DELETE FROM
  products
WHERE
  name = '手機';
```
