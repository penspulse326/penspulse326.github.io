---
title: 'Exception filter'
description: 'NestJS 的 Exception filter 概念'
date: 2025-05-02 17:55:00
keywords: [程式語言, 後端框架, 設計模式, 物件導向, 依賴注入, JavaScript, TypeScript, NestJS, OOP, DI]
tags: ['筆記', 'NestJS']
slug: nestjs-exception-filter
---

例外處理器 (Exception filter) 用來捕捉程序中發生的錯誤，也就是一般常見的 catch error 方法。

NestJS 的全域錯誤處理層只會捕捉透過 `HttpException` 建立或繼承出來的實例，其他類型的 error 則需要自己設計 filter 元件，否則只會回傳 `Internal server error`：

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

## 標準 exception

`throw` 一個 `HttpException` 實例，建構函式要帶入自訂訊息和狀態碼：

```ts
@Get('test-standard-exception')
getStandardException() {
  throw new HttpException('這是標準的 exception', HttpStatus.BAD_REQUEST);
}
```

得到：

```json
{
  "statusCode": 400,
  "message": "這是標準的 exception"
}
```

自訂訊息也可以改為傳入物件，來蓋掉預設的格式：

```ts
@Get('test-standard-exception')
getStandardException() {
  const customExceptionObj = {
    code: HttpStatus.BAD_REQUEST,
    msg: '這是自訂格式的標準 exception',
  };

  throw new HttpException(customExceptionObj, HttpStatus.BAD_REQUEST);
}
```

得到：

```json
{
  "code": 400,
  "msg": "這是自訂格式的標準 exception"
}
```

:::info
建構函式帶入的代號也會作為 HTTP 回應物件的狀態碼，與自動產生 body 時的 `statusCode` 會是一致的，除非在自訂訊息中故意複寫一個不同的代碼。
:::

---

## 內建 exception

NestJS 有根據狀態碼的語意封裝好的 exception，例如可以實例化 `UnauthorizedException`，這樣產生的回應就會自動帶入這個 `401` 狀態碼 ：

```ts
@Get('test-built-in-exception')
getBuiltInException() {
  throw new UnauthorizedException('這是內建的 unauthorized exception');
}
```

自動產生的回應物件多了 `error` 這個欄位描述這個 exception：

```json
{
  "message": "這是內建的 unauthorized exception",
  "error": "Unauthorized",
  "statusCode": 401
}
```

一樣可以自訂格式：

```ts
@Get('test-built-in-exception')
getBuiltInException() {
  const customBody = {
    code: HttpStatus.UNAUTHORIZED,
    msg: '這是自訂格式的 unauthorized exception',
  };

  throw new UnauthorizedException(customBody);
}
```

```json
{
  "code": 401,
  "msg": "這是自訂格式的 unauthorized exception"
}
```

---

## 自訂 exception

需要統一格式時也可以自定義一個繼承某個 exception 的類別：

```ts
export class CustomException extends HttpException {
  constructor() {
    super('自訂 exception 的錯誤', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
```

```ts
@Get('test-custom-exception')
getCustomException() {
  throw new CustomException();
}
```

---

## filter

錯誤處理器也可以自己生成：

```
nest g filter filter/http
```

CLI 會生成一個帶有 `@Catch` 裝飾器的類別，泛型 `T` 再改寫成想要捕捉的類型：

```ts
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class MyHttpFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
```

假設要做一個捕捉 HttpException 的 filter，就會在 `@Catch` 傳入 `HttpException`，並拓展泛型 T，確保 `exception: T` 能夠存取 `HttpException` 的屬性和方法：

```ts
@Catch(HttpException)
export class MyHttpFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
```

`@Catch()` 用來指定要捕捉的錯誤類別，本質上是 `try&catch` 語法，所以大部分的錯誤都可以填入裝飾器：

```ts
// 同時處理多個 HttpException 類型的 exception
@Catch(
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException
)

// JS 標準錯誤
@Catch(ReferenceError)

// 全部的錯誤都捕捉，此時 exception: unknown
@Catch()
```

### ArgumentsHost

`host` 定義了一些方法來處理不同網路架構的介面 (interface)，HTTP、RPC、WebSocket，這些架構的參數內容不同：

```ts
catch(exception: T, host: ArgumentsHost) {
  // getType 可以知道是什麼架構，並根據對應架構撰寫邏輯
  console.log(host.getType()); // 'http' | 'rpc' | 'ws'

  // 使用 switchToHttp 轉換架構內容，並指定型別為 HttpArgumentsHost
  const httpCtx: HttpArgumentsHost = host.switchToHttp();

  // 取出 response 並指定為 Express 的 Response
  const response = httpCtx.getResponse<Response>();
  const message = exception.getResponse();
  const statusCode = exception.getStatus();

  const responseBody = {
    code: statusCode,
    message: message,
    timestamp: new Date().toISOString(),
  };

  // 同 Express 的 router，接上 .json 直接拋出回應
  response.status(statusCode).json(responseBody);
}
```

`ArgumentsHost` 的定義檔裡面包含各架構的參數，像 `HttpArgumentsHost` 就是很標準的 HTTP 物件與函式：

```ts
export interface HttpArgumentsHost {
  /**
   * Returns the in-flight `request` object.
   */
  getRequest<T = any>(): T;
  /**
   * Returns the in-flight `response` object.
   */
  getResponse<T = any>(): T;
  getNext<T = any>(): T;
}
```

:::warning
`ctx.getResponse` 是取得 HTTP 物件，`exception.getResponse` 是取得 exception 的回應內容，也就是上面在 `throw` 各種 exception 實例時傳入建構函式的訊息 。
:::

---

### 部分套用

使用 `@UseFilter` 標注在 controller 的方法上就可以套用指定的 filter：

```ts
@UseFilters(MyHttpFilter)
@Get('test-my-http-filter')
getHttpFilterException() {
  throw new UnprocessableEntityException('這是自訂 filter 的 422 錯誤');
}
```

也可以標注在 `@Controller` 上，讓整個 controller 都套用：

```ts
@UseFilters(MyHttpFilter)
@Controller()
export class AppController {
  //...
}
```

---

### 全域套用

在根模組進行注入，有多個自訂 filter 需要套用時仍然共用 `APP_FILTER` 這個 token，如果多個 filter 都可以捕捉到同類型的錯誤，會依照這裡的陣列順序套用：

```ts
import { APP_FILTER } from '@nest/core';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MyHttpFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestFilter,
    },
  ],
})
export class AppModule {}
```

或是在啟動程序裡面呼叫 `useGlobalFilters` 並傳入一個 filter 的實例：

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 建立實例
  app.useGlobalFilters(new MyHttpFilter());
  await app.listen(process.env.PORT ?? 3000);
}
```

---

### 格式修正

目前的套用方式會得到這樣的回應：

```json
{
  "code": 422,
  "message": {
    "message": "這是自訂 filter 的 422 錯誤",
    "error": "Unprocessable Entity",
    "statusCode": 422
  },
  "timestamp": "2025-05-05T04:05:51.714Z"
}
```

外層的 `message` 被塞入的是內建 exception 回應物件，需要調整 `exception.getResponse()` 輸出的內容：

```ts
const message = (() => {
  const res = exception.getResponse();

  if (typeof res === 'string') {
    return res;
  }

  // 暫時斷言型別
  return (res as { message: string }).message;
})();
```

這樣 `throw` 時傳入建構函式的字串會進行上面的判斷，字串會作為 `message` 的值輸出，傳入物件就取出物件裡面的 `message`：

```ts
@Get('test-http-filter')
getHttpFilterException() {
  // 傳入字串
  throw new UnprocessableEntityException('這是自訂格式的 422 錯誤');
}
```

```json
{
  "code": 422,
  "message": "這是自訂格式的 422 錯誤",
  "timestamp": "2025-05-05T07:05:36.365Z"
}
```

不傳任何東西時會自動帶入內建 exception 回應物件，所以也適用上面的斷言：

```ts
@Get('test-http-filter')
getHttpFilterException() {
  // 不傳任何東西
  throw new UnprocessableEntityException();
}
```

此時就會帶出內建 422 exception 的 `message`：

```json
{
  "code": 422,
  "message": "Unprocessable Entity",
  "timestamp": "2025-05-05T07:00:13.501Z"
}
```

---

## 小結

內建 exception 只要訂好回應格式，已經能應付大多情境。

接入外部服務或是 `ValidationPipe` 產生的報錯，也需要自訂統一格式的話，就會需要自己實作 filter。

---

## 參考資料

- [Exception filters](https://docs.nestjs.com/exception-filters)
