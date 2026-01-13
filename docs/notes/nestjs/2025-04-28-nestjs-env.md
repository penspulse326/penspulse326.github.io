---
title: '環境建置'
description: 'NestJS 的環境建置與預備知識'
date: 2025-04-28 17:55:00
keywords: [程式語言, 後端框架, 設計模式, 物件導向, 依賴注入, JavaScript, TypeScript, NestJS, OOP, DI]
tags: ['筆記', 'NestJS']
slug: nestjs-env
---

## 前言

在使用 Express 做了幾個簡單的小專案後，Express 還是稍嫌陽春，原因有：

1. 除了 middleware 之外幾乎沒有固定的範式：

   > 雖然其他語言也不太會直接從自帶 MVC 架構的環境開始練習，例如學 Java 通常不會一開始就學 Spring 框架，同樣是一步步學習怎麼把服務兜出來，了解語言特性、網路設定、後端流程。  
   > 但複雜一點的專案就很看開發者本身的架構經驗，所以有沒有範式我覺得還是差蠻多，至少學好範式的寫法後，可以防止自己寫出下限太低的程式碼 XD

2. 週邊套件整合：
   > 包含 TS 也要自行整合。雖然有別人做好的 template 可以拿來用。  
   > Fastify 和 NestJS 整合好許多常用的套件包，在調整框架本身的版本時，依賴套件的版本就會連帶更新，在 Express 就要自己一個一個調了。  
   > 更新經常要承擔壞掉的風險，是 JS 生態圈的通病，所以有一個整合好且定期維護的框架環境會省事很多。

我是透過線上課程學習 NestJS，因此這邊的練習多以課程內容為主。當然，NestJS 的中文資源，也就只有那位了 XD

所以筆記彙整的內容如有雷同，來源皆參考這位大大的 [NestJS 帶你飛](https://ithelp.ithome.com.tw/users/20119338/ironman/3880) 以及他於 HiSKIO 開立的線上課程。

---

## 專案架構

NestJS 採用大量的設計模式 (Design Pattern)，建立好專案後，`src/` 下預設有根模組 (root module) `AppModule` 的部分元件：

1. module：各功能的出入口管理
2. controller：原本 MVC 中的 controller
3. service：處理業務邏輯，不直接操作資料庫

再依據專案需求分出：

- entity：映射資料表的資料體
- repository：操作 entity 進行資料庫的 I/O 程序

將原本 model 層業務分得更細緻，元件的分工也比較單一，顆粒度更細。

---

## 進入點

應用程式會在 `main.ts` 會透過 `NestFactory` 傳入根模組來啟動應用程式：

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

NestJS 底層採用 Express/Fastify 這兩個 HTTP 框架，預設以 Express 啟動，要用 Fastify 的話可以傳入 [`NestFastifyApplication`](https://docs.nestjs.com/techniques/mvc#fastify) 這個泛型。

---

## 裝飾器

從根模組開始會看到一系列以 `@` 開頭的裝飾器 (decorator) 語法，如 `@Module`、`@Controller` 等，在 NestJS 裡面會大量使用。

裝飾器是 TS 的實驗性功能，是**一種函式**，用來改寫裝飾器後面的程式碼，例如類別 (class)、函式 (function) 等都可以被裝飾器修改。

---

## 依賴注入

任何被被 `@Injectable` 標記的類別都會變成依賴注入 (Dependency Injection) 的對象。

依賴注入是將實例化 (new) 的過程，改為在外部完成後才**做為某個類別的建構函式的參數**：

```ts
// 在 class 裡面實例化另外一個 class
class A {
  private readonly b: B = new B();
}

// 依賴注入：在建構函式的參數中傳入 class 實例
class A {
  constructor(private readonly b: B) {}
}
```

DI 主要用來：

- 減少反覆實例化的語法
- 降低類別之間的耦合度
- 更容易測試

實例化會在依賴注入容器 (DI Container) 裡面完成，確保每個被標記的類別都**只會被實例化一次**（單例模式 (Singleton)）。

應用程式啟動時會從根模組解析所有類別的依賴關係，進行一系列的實例化，後面會再討論實例化順序的問題。

:::info
在建構函式的參數通常會對實例標記 `private readonly`。  
`private` 會限制可以存取的作用域，`readonly` 可以防止實例的來源被修改或是被重新賦值。
:::

---

## 元件

NestJS 的架構主要圍繞在 9 大元件的交互：

- Controllers
- Providers
- Modules
- Middleware
- Exception filters
- Pipes
- Guards
- Interceptors
- Custom decorators

在官方文件的 **OVERVIEW** 也都單獨條列成頁籤，是必須優先知道的功能。

---

## 小結

- 裝飾器：一種用來修改參數、函式、類別等等的函式
- 依賴注入：實例化後才透過參數傳入，而不在一般函式或是建構函式中進行實例化
- DI 容器：在 NestJS 中用來存放有標記 `@Injectable` 類別的實例

要在 NestJS 的架構下開發，需要的預備知識也更多，光是元件就被分類成好幾種。但學習這種架構也會更了解 OOP 和設計模式的應用，很多語言也都提供這種架構的框架。

---

## 參考資料

- [NestJS 帶你飛](https://ithelp.ithome.com.tw/users/20119338/ironman/3880)
- [NestJS 框架實戰指南｜無痛打造易維護的後端應用](https://hiskio.com/courses/1141?srsltid=AfmBOoqmFWqc2-ar_Sa5lb7OuQWw1mpWvS-L2RSy_oVFRPr9J6n4Krbk)
- [[學習筆記] 依賴注入(DI)](https://ithelp.ithome.com.tw/articles/10211847)
- [單例模式](https://zh.wikipedia.org/zh-tw/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F)
