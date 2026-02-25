import crypto from "crypto";

const bytes = crypto.randomBytes(20);

console.log(bytes);
console.log(bytes.toString());
console.log(bytes.toString("hex"));

const token = bytes.toString("hex");
const restToken = crypto.createHash("sha256").update(token).digest("hex");
console.log(restToken);

console.log(Date.now() + 30 * 60 * 1000);
