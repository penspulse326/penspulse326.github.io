---
title: "驗證機制"
description: "網路請求中的驗證機制"
date: 2023-10-11 10:43:08
keywords: [JavaScript, 程式語言, 驗證機制, session, cookie, JWT, 驗證機制]
tags: ["筆記", "JavaScript"]
slug: js-authentication-of-ajax
---

許多網路請求是需要通過驗證機制的， 就像進到管制的社區大樓一樣，  
必須出示身份證、通行卡、名冊對照等等通過基本的驗證才能通行。

## cookie

網路請求（HTTP 協議）本身沒有狀態保留的效果。  
cookie 就是一種讓請求產生類似「**狀態**」的技術，  
確保不會因為瀏覽器關掉就丟失網站的資訊，可以維持一定的時效性，  
常見的有「會員保持登入」、「購物車清單」等等需要維持狀態的功能。

在發出請求給伺服器後，如果請求中不包含任何 cookie，  
伺服器就會丟出資料加上到期時間存到瀏覽器的 cookie 區，  
之後對**同一個網站**發出請求時都會帶上這個 cookie 內的資料，直到它過期。  
cookie 的內容可以在瀏覽器端被改寫，所以不會儲存一些機敏資訊。

所以可以歸納出 cookie 的特性：

- 保留狀態
- 有時效性
- 只能在特定網域使用
- 可以在前端被存取修改

---

## session

session 改善了 cookie 的安全問題，  
初次請求時伺服器會產生一組 session ID 而不會帶有其他資料。  
伺服器本身則會記錄這組識別碼是從哪個瀏覽器的請求產生的，  
後續只會驗證這個瀏覽器來的請求。

這組識別碼一樣會存在 cookie，在後續的請求帶上，讓伺服器來驗證，  
因為裡面沒有其他資料，所以就不會有竄改 cookie 內容的問題。

---

## JWT(JSON Web Token)

JWT 是透過對原始資料加密算出的一組識別碼。

一般會請前端發送請求時也帶到 headers 上，  
這樣只要解析 headers 裡面的識別碼是否合法就好，  
識別碼的內容大多也會寫在 headers 的 Authorization 這個屬性裡面：

![headers 裡面可以看到 token](https://drive.google.com/uc?export=view&id=1jneF4VFOqBxMl8n7RRe3fHtOXFm9t5Ho)

JWT 會把到期時間和部分資料內容一起寫進去加密生成，  
所以伺服器只需要驗證合不合法即可，算是非常方便也很流行的驗證機制！

---

## 參考資料

- [傻傻分不清之 Cookie、Session、Token、JWT](https://juejin.cn/post/6844904034181070861)
- [Session 與 Cookie 差別](https://medium.com/tsungs-blog/day14-session%E8%88%87cookie%E5%B7%AE%E5%88%A5-eb7b4035a382)
