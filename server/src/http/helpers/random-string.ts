import { randomBytes } from "node:crypto";

type RandomStringParams = ({
  size?: number;
  encoding?: BufferEncoding;
}) | undefined;

export function randomString(params?: RandomStringParams) {
  return randomBytes(params?.size ?? 50).toString(params?.encoding ?? 'hex').split('').sort(() => Math.random() - .5).join("");
}