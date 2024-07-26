"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2756],{5436:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>i,contentTitle:()=>l,default:()=>h,frontMatter:()=>a,metadata:()=>c,toc:()=>d});var r=s(4848),t=s(8453);const a={title:"[\u5716\u8868] C3",description:"\u4f7f\u7528 C3.js \u7e6a\u88fd\u7c21\u55ae\u5716\u8868",date:new Date("2023-09-27T11:42:34.000Z"),keywords:["JavaScript","\u7a0b\u5f0f\u8a9e\u8a00","API","C3.js"],slug:"c3js-chart"},l=void 0,c={id:"plugins/2023-09-27-c3js",title:"[\u5716\u8868] C3",description:"\u4f7f\u7528 C3.js \u7e6a\u88fd\u7c21\u55ae\u5716\u8868",source:"@site/docs/plugins/2023-09-27-c3js.md",sourceDirName:"plugins",slug:"/plugins/c3js-chart",permalink:"/en/plugins/c3js-chart",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"[\u5716\u8868] C3",description:"\u4f7f\u7528 C3.js \u7e6a\u88fd\u7c21\u55ae\u5716\u8868",date:"2023-09-27T11:42:34.000Z",keywords:["JavaScript","\u7a0b\u5f0f\u8a9e\u8a00","API","C3.js"],slug:"c3js-chart"},sidebar:"tutorialSidebar",previous:{title:"\u5404\u985e\u5957\u4ef6\u6574\u5408",permalink:"/en/category/\u5404\u985e\u5957\u4ef6\u6574\u5408"},next:{title:"[\u7279\u6548] GSAP",permalink:"/en/plugins/gsap"}},i={},d=[{value:"\u52a0\u5165\u5957\u4ef6",id:"\u52a0\u5165\u5957\u4ef6",level:2},{value:"\u751f\u6210\u5716\u8868",id:"\u751f\u6210\u5716\u8868",level:2},{value:"\u8cc7\u6599\u653e\u5728\u54ea",id:"\u8cc7\u6599\u653e\u5728\u54ea",level:2},{value:"\u8c50\u5bcc\u5716\u8868\u7684\u8a2d\u5b9a",id:"\u8c50\u5bcc\u5716\u8868\u7684\u8a2d\u5b9a",level:2},{value:"data \u88e1\u9762\u7684\u5c6c\u6027",id:"data-\u88e1\u9762\u7684\u5c6c\u6027",level:3},{value:"data \u5916\u9762\u7684\u5c6c\u6027",id:"data-\u5916\u9762\u7684\u5c6c\u6027",level:3},{value:"\u5713\u9905\u5716\u8207\u751c\u751c\u5708\u5716",id:"\u5713\u9905\u5716\u8207\u751c\u751c\u5708\u5716",level:2},{value:"\u8207 API \u7684\u4e32\u63a5",id:"\u8207-api-\u7684\u4e32\u63a5",level:2},{value:"\u53c3\u8003\u8cc7\u6599",id:"\u53c3\u8003\u8cc7\u6599",level:2}];function j(n){const e={a:"a",br:"br",code:"code",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(e.p,{children:["C3.js \u662f\u57fa\u65bc D3.js \u7684\u5716\u8868\u7e6a\u88fd\u5957\u4ef6\uff0c\u7c21\u5316\u4e86\u5f88\u591a\u8a2d\u5b9a\uff0c",(0,r.jsx)(e.br,{}),"\n","\u56e0\u6b64\u6211\u5011\u53ea\u8981\u628a\u6574\u7406\u597d\u7684\u8cc7\u6599\u4ecd\u9032\u53bb C3 \u7684\u51fd\u5f0f\u5c31\u6c92\u554f\u984c\u4e86\uff5e",(0,r.jsx)(e.br,{}),"\n","\u4e5f\u56e0\u70ba\u5716\u8868\u751f\u6210\u7684\u65b9\u5f0f\u88ab\u7c21\u5316\u4e86\uff0c\u6a23\u5f0f\u4e0a\u80fd\u4fee\u6539\u7684\u6771\u897f\u5c31\u6c92\u6709\u90a3\u9ebc\u591a\uff0c",(0,r.jsx)(e.br,{}),"\n","\u4f46\u5982\u679c\u53ea\u662f\u8981\u5448\u73fe\u7c21\u6613\u7684\u793a\u610f\u8cc7\u6599\u4e5f\u5df2\u7d93\u8db3\u5920\u4e86\uff01"]}),"\n",(0,r.jsx)(e.h2,{id:"\u52a0\u5165\u5957\u4ef6",children:"\u52a0\u5165\u5957\u4ef6"}),"\n",(0,r.jsx)(e.p,{children:"\u6700\u61f6\u4eba\u7684\u65b9\u5f0f\u662f\u76f4\u63a5\u5f15\u5165 CDN \u5373\u53ef\uff1a"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-HTML",children:'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.18/c3.css">\n<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.16.0/d3.js"><\/script>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.18/c3.js"><\/script>\n'})}),"\n",(0,r.jsx)(e.p,{children:"\u5b98\u65b9\u63d0\u4f9b\u7684\u65b9\u5f0f\u662f\u5c07\u51fd\u5f0f\u5eab\u76f4\u63a5\u4e0b\u8f09\u5230\u96fb\u8166\u88e1\uff0c\u518d\u900f\u904e HTML \u7684 script \u6a19\u7c64\u5f15\u7528\u3002"}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.a,{href:"https://c3js.org/gettingstarted.html#setup",children:"\u5b98\u65b9\u6307\u5f15\u7684\u65b9\u5f0f"})}),"\n",(0,r.jsxs)(e.p,{children:["\u9084\u6709\u4e00\u7a2e\u662f npm \u7684\u65b9\u5f0f...\u4e5f\u662f\u6211\u6700\u4e0d\u63a8\u85a6\u7684\u65b9\u5f0f\uff08\uff1f\uff09",(0,r.jsx)(e.br,{}),"\n","\u5047\u56e0\u70ba\u5f9e node_modules \u62ff\u51fa\u4f86\u7684\u5957\u4ef6\uff0c\u6709\u6642\u5019\u662f\u900f\u904e Node.js \u7684\u898f\u5247 CommonJS \u5beb\u7684\uff0c",(0,r.jsx)(e.br,{}),"\n","\u4f46\u662f\u700f\u89bd\u5668\u8981\u8b80\u53d6\u7684 js \u6a94\u662f\u4f9d\u7167 ES6 module \u898f\u5247\u5beb\u7684\uff0c\u6240\u4ee5\u5b83\u4e0d\u80fd\u5c07 CommonJS \u8a9e\u6cd5\u6253\u5305\u7684\u6771\u897f\u62ff\u904e\u4f86\u7528\u3002",(0,r.jsx)(e.br,{}),"\n","\u9700\u8981\u53e6\u5916\u900f\u904e webpack \u7de8\u8b6f\u597d\u898f\u5247\u7684\u8f49\u63db\u3002\u6240\u4ee5\u9019\u908a\u5c31\u4e0d\u8a73\u7d30\u8b1b\u600e\u9ebc\u4f7f\u7528\u4e86\uff0c\u6539\u5929\u518d\u53e6\u5beb\u7b46\u8a18\u7d71\u6574\uff08\u9003\uff09"]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsx)(e.h2,{id:"\u751f\u6210\u5716\u8868",children:"\u751f\u6210\u5716\u8868"}),"\n",(0,r.jsx)(e.p,{children:"\u4ee5\u4e0b\u662f\u4e00\u500b\u7c21\u55ae\u7684\u5716\u8868\u751f\u6210\u7a0b\u5f0f\u78bc\uff1a"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:'let chart = c3.generate({\n  bindto: "#chart",\n  data: {\n    columns: [\n      ["data1", 50, 15, 40, 20, 70, 30],\n      ["data2", 1, 7, 2, 3, 6, 7],\n    ],\n  },\n});\n'})}),"\n",(0,r.jsxs)(e.p,{children:["\u547c\u53eb c3.generate \u4e4b\u5f8c\u5c31\u53ef\u4ee5\u9032\u884c\u751f\u6210\u4e86\uff0c\u53c3\u6578\u662f\u4e00\u500b\u7269\u4ef6\u7684\u8cc7\u6599\u683c\u5f0f\uff0c",(0,r.jsx)(e.br,{}),"\n","\u88e1\u9762\u53ef\u4ee5\u5beb\u5165 C3 \u898f\u7bc4\u7684\u4e00\u4e9b\u5c6c\u6027\uff0c\u4f86\u6539\u8b8a\u5716\u8868\u6700\u5f8c\u751f\u6210\u7684\u6a23\u5b50\u3002"]}),"\n",(0,r.jsxs)(e.p,{children:["\u5176\u4e2d bindto \u985e\u4f3c querySelector \u548c CSS \u9078\u64c7\u5668\uff0c",(0,r.jsx)(e.br,{}),"\n","\u76f4\u63a5\u900f\u904e\u5b57\u4e32\u9078\u53d6 HTML \u5143\u7d20\u5c31\u597d\uff0c\u5716\u8868\u6700\u5f8c\u4e5f\u6703\u751f\u6210\u5728\u9019\u500b\u5143\u7d20\u88e1\u9762\uff0c",(0,r.jsx)(e.br,{}),"\n","\u8a31\u591a\u7b2c\u4e09\u65b9\u5957\u4ef6\u5982 gsap \u4e5f\u90fd\u63d0\u4f9b\u9019\u7a2e\u65b9\u5f0f\u7d81\u5b9a\u5143\u7d20\u3002"]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsx)(e.h2,{id:"\u8cc7\u6599\u653e\u5728\u54ea",children:"\u8cc7\u6599\u653e\u5728\u54ea"}),"\n",(0,r.jsxs)(e.p,{children:["\u89c0\u5bdf\u525b\u525b\u547c\u53eb c3 \u51fd\u5f0f\u6642\u53c3\u6578\u7269\u4ef6\u7684\u7d50\u69cb\uff0c\u61c9\u8a72\u53ef\u4ee5\u5f88\u660e\u78ba\u5730\u770b\u51fa\u4f86\uff0c",(0,r.jsx)(e.br,{}),"\n","\u5716\u8868\u7684\u8cc7\u6599\u662f\u5f9e data \u9019\u500b\u5c6c\u6027\u7684 columns \u88e1\u9762\u7684\u6578\u64da\u751f\u6210\u7684\uff0c",(0,r.jsx)(e.br,{}),"\n","\u6bcf\u500b column \u4ee3\u8868\u4e00\u500b\u8cc7\u6599\u7a2e\u985e\uff0c\u9019\u500b\u8cc7\u6599\u7a2e\u985e\u4e5f\u7528\u9663\u5217\u8868\u793a\uff0c",(0,r.jsx)(e.br,{}),"\n","\u9663\u5217\u7684\u7b2c\u4e00\u500b\u5143\u7d20\u662f\u8cc7\u6599\u7684\u6a19\u984c\uff0c\u5f8c\u9762\u90fd\u662f\u6578\u64da\uff0c",(0,r.jsx)(e.br,{}),"\n","\u6240\u4ee5\u9019\u500b\u6a19\u984c\u6700\u5f8c\u4e5f\u6703\u88ab\u751f\u6210\u5230\u5716\u8868\u4e0a\uff1a"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:'["\u8cc7\u65991", 30, 200, 100, 400, 150, 250], ["\u8cc7\u65992", 50, 20, 10, 40, 15, 25];\n// "\u8cc7\u65991" \u8207 "\u8cc7\u65992" \u9019\u5169\u500b\u5b57\u4e32\u4e5f\u6703\u751f\u6210\u5230\u5716\u8868\u4e0a\n'})}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsx)(e.h2,{id:"\u8c50\u5bcc\u5716\u8868\u7684\u8a2d\u5b9a",children:"\u8c50\u5bcc\u5716\u8868\u7684\u8a2d\u5b9a"}),"\n",(0,r.jsxs)(e.p,{children:["C3 \u9810\u8a2d\u6703\u751f\u6210\u6298\u7dda\u5716\uff0c\u4e0d\u904e\u5927\u5bb6\u4e00\u5b9a\u4e5f\u770b\u904e\u4e00\u4e9b\u8207\u9577\u689d\u5716\u5408\u4f75\u986f\u793a\u7684\u7d71\u8a08\u6578\u64da\uff0c",(0,r.jsx)(e.br,{}),"\n","\u6240\u4ee5\u6211\u5011\u4e5f\u80fd\u5728\u7269\u4ef6\u88e1\u9762\u4e00\u4e00\u5ba2\u88fd\u9019\u4e9b\u5167\u5bb9\uff01"]}),"\n",(0,r.jsxs)(e.p,{children:["C3 \u7684\u6587\u4ef6\u53ef\u80fd\u4e00\u6642\u4e4b\u9593\u6703\u6709\u770b\u6c92\u6709\u61c2\uff0c\u70ba\u4ec0\u9ebc colors \u6709\u6642\u5019\u8ddf data \u540c\u4e00\u5c64\uff0c",(0,r.jsx)(e.br,{}),"\n","\u6709\u6642\u5019\u53c8\u5beb\u5728 data \u88e1\u9762\uff1f\u4e0d\u904e\u53ea\u8981\u8a18\u4f4f\u4e00\u500b\u539f\u5247\uff1a",(0,r.jsx)(e.br,{}),"\n",(0,r.jsx)(e.strong,{children:"\u5982\u679c\u662f\u91dd\u5c0d\u500b\u5225\u8cc7\u6599\u7684\u8a2d\u5b9a\u901a\u5e38\u662f\u5beb\u5728 data \u88e1\u9762\uff0c\u7528 key-value \u7684\u65b9\u5f0f\u6307\u5b9a\u8cc7\u6599\u5448\u73fe\u7684\u65b9\u5f0f"}),(0,r.jsx)(e.br,{}),"\n","\u4e0b\u9762\u53ef\u4ee5\u8ddf\u8457\u7bc4\u4f8b\u4f86\u770b\uff1a"]}),"\n",(0,r.jsx)("iframe",{height:"300",width:"100%",scrolling:"no",title:"C3 Practice",src:"https://codepen.io/shin9626/embed/mdaLxyB?default-tab=html%2Cresult",frameborder:"no",loading:"lazy",allowtransparency:"true",allowfullscreen:"true",children:(0,r.jsxs)(e.p,{children:["See the Pen ",(0,r.jsx)("a",{href:"https://codepen.io/shin9626/pen/mdaLxyB",children:"\nC3 Practice"})," by SHIN (",(0,r.jsx)("a",{href:"https://codepen.io/shin9626",children:"@shin9626"}),")\non ",(0,r.jsx)("a",{href:"https://codepen.io",children:"CodePen"}),"."]})}),"\n",(0,r.jsx)(e.h3,{id:"data-\u88e1\u9762\u7684\u5c6c\u6027",children:"data \u88e1\u9762\u7684\u5c6c\u6027"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["colors \u6307\u5b9a\u500b\u5225\u8cc7\u6599\u7684\u984f\u8272\uff08",(0,r.jsx)(e.a,{href:"https://c3js.org/samples/options_color.html",children:"\u5beb\u5728 data \u5916\u9762\u7684\u5beb\u6cd5"}),"\uff09"]}),"\n",(0,r.jsx)(e.li,{children:"axes \u6307\u5b9a\u8cc7\u6599\u8981\u5448\u73fe\u7684\u8ef8\u5340\uff08\u6700\u591a\u5c31\u662f y2 \u4e86\u6c92\u6709 y3 \u6216 x2\uff09"}),"\n",(0,r.jsx)(e.li,{children:"types \u6307\u5b9a\u8cc7\u6599\u7684\u5448\u73fe\u65b9\u5f0f"}),"\n"]}),"\n",(0,r.jsx)(e.h3,{id:"data-\u5916\u9762\u7684\u5c6c\u6027",children:"data \u5916\u9762\u7684\u5c6c\u6027"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"aixs \u53ef\u4ee5\u70ba\u6bcf\u500b\u8ef8\u7dda\u505a\u5ba2\u88fd\u5316"}),"\n",(0,r.jsx)(e.li,{children:"x \u8ef8\u7684\u901a\u5e38\u662f\u96e2\u6563\u7684\u6a19\u7c64\uff0c\u6240\u4ee5\u6211\u5011\u53ef\u4ee5\u8a2d\u6210 type category\uff0c\ncategory \u5247\u901a\u5e38\u6703\u653e\u6642\u9593\u4e4b\u985e\u7684\u6578\u5b57\uff1a"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:' axis: {\n  x: {\n    type: "category",\n    categories: ["t1", "t2", "t3", "t4", "t5", "t6"],\n    label: {\n      text: "X\u8ef8\u540d\u7a31",\n      position: "outer-left" //\u540d\u7a31\u4f4d\u7f6e\n    }\n  }\n}\n'})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"lable \u53ef\u4ee5\u8a2d\u5b9a\u8ef8\u7dda\u7684\u540d\u7a31\u8207\u540d\u7a31\u986f\u793a\u4f4d\u7f6e"}),"\n",(0,r.jsx)(e.li,{children:"\u8981\u6ce8\u610f y2 \u8ef8\u901a\u5e38\u4e0d\u6703\u986f\u793a\u51fa\u4f86\uff0c\u6211\u5011\u5fc5\u9808\u624b\u52d5\u8a2d\u5b9a show: true"}),"\n",(0,r.jsx)(e.li,{children:"\u53ef\u4ee5\u5c0d\u6298\u7dda\u5716\u7684\u8ef8\u7dda\u8a2d min \u4f86\u8868\u793a\u6700\u5c0f\u5340\u9593\uff0c\u8b93\u6298\u7dda\u5716\u4e0d\u8981\u7dca\u8cbc\u5230 x \u8ef8"}),"\n"]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsx)(e.h2,{id:"\u5713\u9905\u5716\u8207\u751c\u751c\u5708\u5716",children:"\u5713\u9905\u5716\u8207\u751c\u751c\u5708\u5716"}),"\n",(0,r.jsxs)(e.p,{children:["\u525b\u525b\u5728 data \u88e1\u9762\u6709\u5beb\u5165 types \u5206\u5225\u6307\u5b9a\u6bcf\u7a2e\u8cc7\u6599\u7684\u986f\u793a\u65b9\u5f0f\uff0c",(0,r.jsx)(e.br,{}),"\n","\u5982\u679c\u60f3\u505a\u51fa\u5713\u9905\u5716\u6216\u751c\u751c\u5708\u5716\uff0c\u5247\u8981\u628a types \u6539\u6210 type\uff0c",(0,r.jsx)(e.br,{}),"\n",'\u5167\u5bb9\u4e5f\u4e0d\u518d\u9700\u8981\u500b\u5225\u6307\u5b9a\uff0c\u5beb\u4e0a "pie"\u3001"donut" \u5c31\u53ef\u4ee5\u6539\u8b8a\u5448\u73fe\u65b9\u5f0f\u3002']}),"\n",(0,r.jsxs)(e.p,{children:["\u6b64\u6642\u5982\u679c colums \u88e1\u9762\u662f ['data', 1, 2, 3] \u9019\u7a2e\u591a\u500b\u6578\u64da\u7684\u8cc7\u6599\uff0c",(0,r.jsx)(e.br,{}),"\n","\u5713\u9905\u5716\u8207\u751c\u751c\u5708\u5716\u90fd\u6703\u5448\u73fe\u5b83\u5011\u52a0\u7e3d\u5f8c\u7684\u7d50\u679c\uff5e"]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsx)(e.h2,{id:"\u8207-api-\u7684\u4e32\u63a5",children:"\u8207 API \u7684\u4e32\u63a5"}),"\n",(0,r.jsx)(e.p,{children:"\u5047\u8a2d\u6211\u5011\u62ff\u5230\u7684\u8cc7\u6599\u662f\u9019\u6a23\uff0c\u73fe\u5728\u8981\u7d71\u8a08\u5404\u5730\u5340\u7684\u6bd4\u4f8b\uff1a"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:'const apiData = {\n  data: [\n    { area: "\u5317\u90e8" },\n    { area: "\u5357\u90e8" },\n    { area: "\u6771\u90e8" },\n    { area: "\u4e2d\u90e8" },\n    { area: "\u5317\u90e8" },\n    { area: "\u4e2d\u90e8" },\n    { area: "\u4e2d\u90e8" },\n  ],\n};\n'})}),"\n",(0,r.jsxs)(e.p,{children:["\u6211\u5011\u5c31\u53ef\u4ee5\u81ea\u884c\u6574\u7406\u6210 c3 \u7684 columns \u53ef\u4ee5\u5403\u5230\u7684\u683c\u5f0f\uff0c\u65b9\u6cd5\u6709\u5f88\u591a\uff0c",(0,r.jsx)(e.br,{}),"\n","\u9019\u908a\u793a\u7bc4\u628a API \u8cc7\u6599\u7684\u9663\u5217\u6839\u64da\u5167\u5bb9\u65b0\u589e\u5230\u4e00\u500b\u7269\u4ef6\uff0c\u7269\u4ef6\u7684 key-value \u4ee3\u8868\u6bcf\u500b\u5730\u5340\u5c0d\u61c9\u7684\u7e3d\u6578\uff0c",(0,r.jsx)(e.br,{}),"\n","\u6700\u5f8c\u518d\u7528\u7269\u4ef6\u65b9\u6cd5\u8f49\u6210 c3 column \u7684\u9663\u5217\u683c\u5f0f\uff1a"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:'const dataObj = {};\n\napiData.data.forEach((item) => {\n  // \u5982\u679c\u5b58\u5728\u8a72\u5730\u5340\u7684\u5c6c\u6027\uff0c\u5c31 +1\n  if (dataObj[item.area]) {\n    dataObj[item.area]++;\n  } else {\n    dataObj[item.area] = 1;\n  }\n});\n\nconst columns = Object.entries(dataObj);\nconsole.log(columns);\n// [\n//  ["\u5317\u90e8", 2]\n//  ["\u5357\u90e8", 1]\n//  ["\u6771\u90e8", 1]\n//  ["\u4e2d\u90e8", 2]\n// ]\n'})}),"\n",(0,r.jsx)(e.p,{children:"C3 \u53ef\u4ee5\u5448\u73fe\u7c21\u55ae\u7684\u5716\u8868\u8cc7\u6599\uff0c\u4e0d\u904e\u8981\u600e\u9ebc\u6574\u7406\u8cc7\u6599\u518d\u9935\u9032\u53bb\u5c31\u5404\u81ea\u767c\u63ee\u56c9\uff08\uff1f\uff09"}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsx)(e.h2,{id:"\u53c3\u8003\u8cc7\u6599",children:"\u53c3\u8003\u8cc7\u6599"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://c3js.org/examples.html",children:"C3.js Examples"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.tpisoftware.com/tpu/articleDetails/2589",children:"\u597d\u7528\u7684\u8f15\u91cf\u7d71\u8a08\u5716\u8868 C3.js"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://hackmd.io/@ericacadu/H1k5d1Xew",children:"C3.js \u8cc7\u6599\u5716\u8868"})}),"\n"]})]})}function h(n={}){const{wrapper:e}={...(0,t.R)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(j,{...n})}):j(n)}},8453:(n,e,s)=>{s.d(e,{R:()=>l,x:()=>c});var r=s(6540);const t={},a=r.createContext(t);function l(n){const e=r.useContext(a);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:l(n.components),r.createElement(a.Provider,{value:e},n.children)}}}]);