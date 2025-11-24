import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// 獲取命令行參數（文章名稱）
const articleName = process.argv[2];

if (!articleName) {
  console.error('錯誤：請提供文章名稱');
  console.error('使用方法：node create-md.js <文章名稱>');
  process.exit(1);
}

// 獲取當前日期時間
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

// 檔名使用日期（YYYY-MM-DD）
const dateStr = `${year}-${month}-${day}`;
// frontmatter 使用完整日期時間（YYYY-MM-DD HH:mm:ss）
const dateTimeStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

// 讀取模板檔案
const templatePath = join(process.cwd(), 'docs', 'template.md');
const template = readFileSync(templatePath, 'utf-8');

// 填充 frontmatter
const content = template
  .replace("title: ''", `title: '${articleName}'`)
  .replace(/date:\s*\r?\n/g, `date: ${dateTimeStr}\n`)
  .replace(/slug:\s*\r?\n/g, `slug: ${articleName}\n`);

// 生成檔名
const fileName = `${dateStr}_${articleName}.md`;
const filePath = join(process.cwd(), 'docs', fileName);

// 寫入檔案
writeFileSync(filePath, content, 'utf-8');

console.log(`✓ 已成功建立檔案：${filePath}`);
