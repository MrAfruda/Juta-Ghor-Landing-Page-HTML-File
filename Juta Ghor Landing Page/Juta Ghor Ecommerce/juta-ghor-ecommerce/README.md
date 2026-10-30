# জুতা ঘর — Google Sheets Order Website

## Netlify-তে প্রকাশ
1. ZIP ফাইল Extract করুন।
2. Netlify-তে `public` ফোল্ডারটি deploy করুন (এই ফোল্ডারের `index.html` হলো ওয়েবসাইটের মূল পেজ)।
3. HTML-এ Google Apps Script Web App URL আগে থেকেই যুক্ত আছে।

## Google Sheets সংযোগ
1. `Code.gs` ফাইলের কোড Google Apps Script প্রজেক্টে বসিয়ে Save করুন।
2. `Deploy → Manage deployments → Edit → New version → Deploy` করুন।
3. Web App access এমনভাবে সেট করুন যেন কাস্টমাররা লগইন ছাড়াই অর্ডার পাঠাতে পারে।
4. স্ক্রিপ্টটি সঠিক Google Spreadsheet-এর সঙ্গে যুক্ত আছে নিশ্চিত করুন।
5. Netlify সাইট থেকে একটি পরীক্ষামূলক অর্ডার দিয়ে শিটে ৯টি কলামে তথ্য এসেছে কি না যাচাই করুন।

## Google Sheet-এর কলাম
Date | Customer Name | Phone | Address | Product | Size | Quantity | Delivery Fee | Total

## স্থানীয় প্রিভিউ (ঐচ্ছিক)
Node.js 18+ ইনস্টল করে এই ফোল্ডারে `npm start` চালান। তারপর `http://localhost:3000` খুলুন।
`server.js` শুধু static preview server; অর্ডার Google Apps Script-এ পাঠানো হয়।

## গুরুত্বপূর্ণ
- `Code.gs` Netlify-তে চালানোর ফাইল নয়; এটি Google Apps Script-এ deploy করতে হবে।
- এই প্যাকেজ তৈরির সময় Google Sheet-এ live order submit পরীক্ষা করা হয়নি। প্রকাশের পর একটি test order দিয়ে নিশ্চিত করুন।
- `config.json`-এ থাকা ব্যবসায়িক ফোন, পেমেন্ট নম্বর, মূল্য, সাইজ ও ডেলিভারি চার্জ লাইভ করার আগে যাচাই করুন।
