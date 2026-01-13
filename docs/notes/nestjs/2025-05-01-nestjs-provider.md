---
title: '[元件] Provider'
description: 'NestJS 的 Provider 概念'
date: 2025-05-01 17:55:00
keywords: [程式語言, 後端框架, 設計模式, 物件導向, 依賴注入, JavaScript, TypeScript, NestJS, OOP, DI]
tags: ['筆記', 'NestJS']
slug: nestjs-provider
---

## Token

provider 會**在 module 載入時先實例化並註冊到 IoC Container**，最後 controller 再透過 token 取得 provider 的實例後， controller 才進行實例化。

下面是宣告 token 的幾種方式：

### useClass

在 module 元數據寫好的 providers 預設的 token 寫法是 `useClass`，例如 `TodoService` 這個類別定義會直接當成 token 名稱。大多會直接縮寫：

```ts
@Module({
  //...
  // 預設的 token 寫法就是 useClass，可以縮寫成這樣
  providers: [TodoService],
})
export class TodoModule {}

@Module({
  //...
  // 完整的格式
  providers: [
    {
      provide: TodoService, // token 名稱
      useClass: TodoService, // token 回傳值
    },
  ],
})
export class TodoModule {}
```

---

### useValue

用字串設定 token 名稱並指定一個任意型別的回傳值：

```ts
{
  provide: 'TEST_USE_VALUE',
  useValue: '這是用 useValue 註冊的 provider',
}
```

自訂 provider 需要在注入時前綴裝飾器 `@Inject` 並傳入 token 名稱：

```ts
@Controller()
export class AppController {
  constructor(
    // 在裝飾器傳入 token 名稱
    @Inject('TEST_USE_VALUE') private readonly testUseValue: string,
  ) {}

  @Get('test-use-value')
  getTestUseValue() {
    return this.testUseValue;
  }
}
```

---

### useFactory

用 callback 的方式產生回傳值，並且提供 `inject` 這個選項，可以直接先存取到別的實例，然後在 callback 中呼叫其方法：

```ts
{
  provide: 'TEST_USE_FACTORY',
  inject: [AppService],
  useFactory: (appService: AppService) => {
    const result = appService.getHello();

    return `這是用 useFactory 註冊的 provider，這是從 AppService 拿到的資料 ${result}`;
  },
},
```

同樣加入 `@Inject` 標記就可以使用：

```ts
@Controller()
export class AppController {
  constructor(@Inject('TEST_USE_FACTORY') private readonly testUseFactory: string) {}

  @Get('test-use-factory')
  getTestUseFactory() {
    return this.testUseFactory;
  }
}
```

也支援非同步 callback：

```ts
{
  provide: 'TEST_ASYNC_USE_FACTORY',
  inject: [AppService],
  useFactory: async (appService: AppService) => {
    const timeLimit = 1000;
    const result: string = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(appService.getHello());
      }, timeLimit);
    });

    return `這是用 async useFactory 註冊的 provider，這是從 AppService 拿到的資料 ${result}，耗時 ${timeLimit} 毫秒`;
  },
},
```

---

### useExisting

自訂一個 token 名稱來存取已經存在的 provider 實例：

```ts
{
  provide: 'TEST_USE_EXISTING',
  useExisting: AppService,
},
```

```ts
@Controller()
export class AppController {
  constructor(
    // 實際上這個 provider 就是 AppService
    @Inject('TEST_USE_EXISTING') private readonly testUseExisting: AppService,
  ) {}

  @Get('test-use-existing')
  getTestUseExisting() {
    return this.testUseExisting.getHello();
  }
}
```

---

## 管理變數

自訂 provider 都是固定的 `key-value` 格式，所以可以直接宣告成型別為 `Provider` 的變數，填入 module 的 `exports`：

```ts
const testUseValueProvider: Provider = {
  provide: 'TEST_USE_VALUE',
  useValue: '這是用 useValue 註冊的 provider',
};

@Module({
  providers: [testUseValueProvider],
  exports: [testUseValueProvider],
})
export class CustomModule {}
```

---

## 可選注入

依賴注入是在建構函式裡面**以參數的方式傳入實例**，那麼參數就有**可帶可不帶**的問題。

因此可以使用 `@Optional` 表示該依賴是可選的，這樣注入時如果找不到相關的 provider 實例，也還是能順利啟動，但是和標記 `?` 的參數一樣，沒有傳入就會變 `undefined`，所以要記得在存取實例的地方加上防呆：

```ts
@Controller()
export class AppController {
  constructor(
    @Optional()
    @Inject('TEST_USE_EXISTING')
    private readonly testUseExisting: AppService,
  ) {}

  @Get('test-use-existing')
  getTestUseExisting() {
    if (!testUseExisting) {
      return '實例不存在';
    }

    return this.testUseExisting.getHello();
  }
}
```

---

## 總結

除了 controller 以外，大部分的邏輯元件都可以被歸類為 provider，只要留意匯入匯出、實例化順序的問題。

到 provider 之後我才開始對 NestJS 基本的運作流程大致了解，一開始就搞 Vibe Coding 的話，爬文過程很難馬上明白這些裝飾器、元數據的定義與機制QQ

---

## 參考資料

- [Custom providers](https://docs.nestjs.com/fundamentals/custom-providers#custom-providers-1)
