#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

// 取得檔名參數
const filename = process.argv[2];

if (!filename) {
  console.error("Please provide a filename!");
  console.error("Usage: npm run post <filename>");
  process.exit(1);
}

// 生成當前日期時間
const now = new Date();
const dateString = now.toISOString().replace(/T/, " ").replace(/\..+/, "");

// 建立 frontmatter 內容
const frontmatter = `---
title: 
date: ${dateString}
description:
tags: 
keywords:
slug: ${filename}
---
`;

// 確保 draft 目錄存在
const draftDir = path.join(process.cwd(), "drafts");
if (!fs.existsSync(draftDir)) {
  fs.mkdirSync(draftDir);
}

// 建立完整的檔案路徑
const filePath = path.join(draftDir, `${filename}.md`);

// 檢查檔案是否已存在
if (fs.existsSync(filePath)) {
  console.error(`File ${filename}.md already exists!`);
  process.exit(1);
}

// 寫入檔案
try {
  fs.writeFileSync(filePath, frontmatter);
  console.log(`Successfully created ${filename}.md in draft directory!`);
} catch (error) {
  console.error("Error creating file:", error);
  process.exit(1);
}
