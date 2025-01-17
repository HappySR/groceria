import { getRandomValues } from "node:crypto";

export function isValidUsername(email: unknown): email is string {
  return (
    typeof email === "string" &&
    email.length >= 3 &&
    email.length <= 32 &&
    /^[a-z0-9_-]+$/.test(email)
  );
}

export function isValidPassword(password: unknown): password is string {
  return typeof password === "string" && password.length >= 8 && password.length <= 32;
}

/**
Copyright 2017 Andrey Sitnik <andrey@sitnik.ru>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
export function nanoid(e = 64) {
  let t = "";
  const r = getRandomValues(new Uint8Array(e));
  for (let n = 0; n < e; n++)
    t += "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63 & r[n]];
  return t;
}
