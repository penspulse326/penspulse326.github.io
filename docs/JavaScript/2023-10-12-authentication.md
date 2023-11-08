---
title: "驗證機制"
description: "網路請求中的驗證機制"
date: 2023-10-11 10:43:08
keywords: [JavaScript, 程式語言, 驗證機制, session, cookie, JWT, 驗證機制]
slug: authentication-of-ajax
---

大部分的網路請求其實是不公開的，也就是說需要通過一些驗證機制，  
例如：如果不是該社區大樓的住戶就無法進入，住戶進入時也需要身份驗證，  
此時驗證的方式就有很多種，比如出示身份證、大樓通行卡、名冊對照等等，
網路請求也有幾種驗證方式可以使用。

## cookie 不是拿來吃的那個

cookie 是拿來給伺服器看的～
HTTP 網路請求是沒有狀態保留的功能的，單純只有一來一往的資料交換。  
所以 cookie 就是一種讓請求產生「狀態」的技術，確保不會因為瀏覽器關掉就失去狀態，  
常見的有「會員保持登入」、「購物車清單」等等需要維持狀態的功能。

在我們發出請求給伺服器後，如果我們的請求裡面不包含任何 cookie，  
伺服器就會丟出 cookie 資料存到我們的瀏覽器裡面佔用一小塊記憶體，  
之後對同一個網站發出請求時都會帶上這個 cookie 內的資料，直到它過期。

所以可以歸納出 cookie 的特性：

- 可以保留狀態
- 有時效性
- 只能在同個網域使用

但 cookie 裡面的資料都可以在瀏覽器端被篡改，所以現今 cookie 也不會儲存一些機敏資訊了，  
頂多就是進到網站時被要求存取 cookie，讓商家研究我們的使用習慣，透過演算法推薦商品或文章。

---

## session

session 改善了部分 cookie 的安全問題，  
對伺服器初次請求時只會回傳一組識別碼 session ID 給瀏覽器，而不會產生其他機敏資訊。  
伺服器本身則會記錄這組識別碼是從哪個瀏覽器的請求產生的，後續只會驗證這個瀏覽器來的請求。  
這組識別碼一樣會存在 cookie，在後續的請求帶上，讓伺服器來驗證這個。  
因為裡面沒有其他資料，所以就不會有竄改 cookie 內容後看到不該看的網站內部資料的問題。

---

## JWT(JSON Web Token)

JWT 是一組在伺服器端隨機生成的識別碼，可以透過變數、cookie、session、localStorage 儲存，  
因為 JWT 的亂碼包含了 UID、有效時間、伺服器端的簽名，所以經常成為一種身分驗證的方式。  

JWT 一般會請前端邏輯存到 headers 上帶過來，這樣只要解析 headers 裡面的識別碼是否合法就好，  
識別碼的內容大多也會寫在 headers 的 Authoriation 這個屬性裡面：  

![headers 裡面可以看到 token](https://drive.google.com/uc?export=view&id=1jneF4VFOqBxMl8n7RRe3fHtOXFm9t5Ho)

因為對前端來說只要想辦法寫進 headers 就好了，  
只要不涉及太多資安設定的話是很簡單的驗證工具，  
算是非常方便也很流行的驗證機制！  

---

## 參考資料

- [傻傻分不清之 Cookie、Session、Token、JWT](https://juejin.cn/post/6844904034181070861)
- [Session 與 Cookie 差別](https://medium.com/tsungs-blog/day14-session%E8%88%87cookie%E5%B7%AE%E5%88%A5-eb7b4035a382)
- [JWT 是什麼？跟 Cookie 差別在哪裡？兩個常用使用者驗證機制的比較](https://devindeving.blogspot.com/2022/01/jwt-concept-vs-cookie.html)