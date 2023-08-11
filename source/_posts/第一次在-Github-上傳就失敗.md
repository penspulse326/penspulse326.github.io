---
title: "[筆記] 第一次在 Github 上傳就失敗？！Password 又輸入錯誤了！"
date: 2023-08-11 16:47:47
tags:
  - Git
  - 程式語言
  - 學習心得
categories: 程式學習
---

這幾天在部署 Github Pages 時遇到了一些問題，
我覺得好像又可以從頭開始釐清流程了，希望對上傳 repo 時遇到問題的人有幫助。

<!-- more -->

1. repo 的建立：

   無論你在本機端已經有檔案（自己的電腦裡）或是在 Github 網站上要建立 repo，
   最後都會經過 **我電腦裡檔案 ==同步==> Github** 這一關。

第一步就是要在 Github 網站建立雲端 repo 空間，
登入 Github 後在右上角按 + 後選 New repository 建立。

![建立新專案](https://drive.google.com/uc?export=view&id=1lN4Kd94-lpvrUrpVNMF7qXoZWhAXTaw2)

2. 在操作終端機之前：

   在輸入好專案名稱跟一些內容概要之後，
   最下面可以選擇一些和專案初始化有關的設定，
   如果你在此時有勾選 **Add a README file** 會產生另一個做法。

   ![Add a README file](https://drive.google.com/uc?export=view&id=12TMy7lC-S5NLSPU6MkgplWp4jUeloL_Z)

3. 有勾選 **Add a README file** 的狀況：

Github 會直接給你 push 過一次的乾淨專案，
裡面只有你剛剛勾選要加入的 README.md 這個檔案，
按右上角的 Code 選 HTTPS ，將這個網址複製下來，

![複製 code](https://drive.google.com/uc?export=view&id=1vsbDJY6VvZXFSJ8W1atInB5rxbHIV1JL)

然後在終端機切換到任一資料夾（桌面新增一個資料夾就可以），
輸入 git clone 後面加上剛剛複製的網址，
這時這個資料夾已經與你剛剛新建的 repo 連動了，
把你本來要上傳的檔案通通丟到這個資料夾即可。

```
    git clone https:xxx...
```

4. 沒勾選 **Add a README file** 的狀況：

Github 會給你一串 git 指令要你在終端機輸入：

![密密麻麻的 git command](https://drive.google.com/uc?export=view&id=1NnBieHCh9xFGAvpENCG-OuIgN03h36Qw)

方法 1 的指令是建立一個乾淨的資料夾然後連動，
方法 2 的指令是直接切換到要上傳的資料夾進行連動，
無論是採用哪個方法都要確認終端機已經切換到你指定的資料夾，
否則等等會找不到要在哪裡執行上傳。

5. 上傳三部曲：

以上兩種狀況最後都會讓電腦裡的檔案和遠端的 repo 連動，
將新增或改動好的檔案丟到指定資料夾後，
終端機先輸入 git status，確認是否有包含修改過的檔案。

輸入 git add . 將檔案加入這次的提交。
然後輸入 git commit -m "這次提交的留言，這裡通常會寫大致修改了什麼，引號不要省略"
如果是懶人也可以把 -m 改為 -am，這個 a 就包含前面的 git add 了。
最後輸入 git push 就完成了，如果這裡系統提示 push 需要指向到 repo 的 origin 原始分支，
複製它建議給你的指令再 push 一次即可。

```
    git status
    git add .
    git commit -m "first commit"
    git push
```

---

# 所以 password 到底是什麼東西？？？

如果你在 repo 建立的初期或是 push 時一直因為 Github 的使用者認證卡關，
那麼這就是我寫此文的原因 XD

Github 已經不能再透過自己的帳號密碼去認證了，
因此如果電腦裡的認證已經到期，就會遇到要再輸入一次 username 和 password 的情況，
這時 password 要輸入的就不再是你帳號原本的 password 了！

這時要登入 Github 網站 > 右上角頭像 > Setting > 左邊選項的最下面選 **Developer Settings**

左邊的 Personal access tokens 選擇 Tokens(classic) 後，
右邊選 Generate new token(classic) 進到建立 token 的頁面。

下面可以選擇這個 token 要拿來通過什麼認證，
把 repo 打勾後到最下面就可以產生 token。

![repo 要打勾](https://drive.google.com/uc?export=view&id=1iBrodhA0pq-eKxgv2NZx-33HVSH52YVs)

這一串像亂碼的東西就是剛剛建立的 token，
也就是你在終端機被 Github 要求輸入 password 時要打的東西，
複製貼上送出後就完成 push 了！

![不用擔心這 token 我早就刪掉了](https://drive.google.com/uc?export=view&id=11uqWt_bewP3iNeJ7CF5t7DVdcNOeXzEE)

在我第一次遇到這個問題時，我以為這個 token 就是萬用的，
所以建立 token 的畫面沒有勾選 repo，
之後當然也 push 失敗，頓時對世界感到一片灰暗...只好回去默默地更新自己的 SSH 憑證
不過大概閱讀每個頁面的資訊就會發現問題了，不用自己嚇自己 XD
