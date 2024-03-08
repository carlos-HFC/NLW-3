import { randomBytes } from "node:crypto";

export function randomString(size: number = 50) {
  return randomBytes(size).toString('hex').split('').sort(() => Math.random() - .5).join("");
}