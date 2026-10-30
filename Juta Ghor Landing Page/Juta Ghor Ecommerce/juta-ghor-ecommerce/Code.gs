function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents || "{}");

    // Honeypot: silently ignore automated submissions.
    if (data.website) {
      return output({ ok: true, orderId: "IGNORED", total: 0 });
    }

    var products = {
      A: { name: "স্টাইলিশ স্পোর্টি স্নিকার্স – মডেল A", price: 999 },
      B: { name: "স্টাইলিশ স্পোর্টি স্নিকার্স – মডেল B", price: 999 }
    };

    var product = products[data.product];
    if (!product) {
      return output({ ok: false, error: "পণ্য সঠিক নয়" });
    }

    var name = String(data.name || "").trim();
    var phone = String(data.phone || "").trim();
    var address = String(data.address || "").trim();
    var size = String(data.size || "").trim();
    var qty = Math.max(1, Math.min(10, parseInt(data.qty, 10) || 1));

    if (name.length < 2 || phone.length < 10 || address.length < 10 || !size) {
      return output({ ok: false, error: "নাম, ফোন, ঠিকানা ও জুতার সাইজ সঠিকভাবে দিন" });
    }

    var area = data.area === "inside" ? "inside" : "outside";
    var delivery = area === "inside" ? 70 : 120;
    var total = product.price * qty + delivery;
    var orderId = "JGH-" + Date.now();

    // Keep exactly the 9 columns supplied by the store owner:
    // Date | Customer Name | Phone | Address | Product | Size | Quantity | Delivery Fee | Total
    sheet.appendRow([
      new Date(),
      name,
      phone,
      address,
      product.name,
      size,
      qty,
      delivery,
      total
    ]);

    return output({ ok: true, orderId: orderId, total: total });
  } catch (err) {
    return output({ ok: false, error: "অর্ডার সংরক্ষণ করা যায়নি। Apps Script ও Google Sheet-এর সংযোগ পরীক্ষা করুন।" });
  }
}

function output(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
