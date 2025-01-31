import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function generateCookieHeader(cookies: ReadonlyRequestCookies) {
    const cookieArray = cookies.getAll().map(({ name, value }) => `${name}=${value}`);
    // Join all cookie strings to form the Cookie header value
    const cookieHeader = cookieArray.join("; ");
    console.log("🚀 ~ generateCookieHeader ~ cookieHeader:", cookieHeader)
    return cookieHeader;
}