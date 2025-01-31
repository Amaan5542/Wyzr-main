import { IBaseBody, IBaseResponse, IHttpOptions, IHttpService, ResponseError } from "../interfaces/http.interface";
import { isServer } from "./is-server";

type HttpMethods = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';

interface IFetchOptions { method: HttpMethods, credentials?: string, headers: { Cookie?: string, 'auth-token'?: string, systemCall?: boolean }, body: string | undefined };

export class FetchHttpService implements IHttpService {
    private async fetchWithMethod<P, R = P>(url: string, method: HttpMethods, payload: IBaseBody<P> | null, options: IHttpOptions): Promise<IBaseResponse<R>> {
        const { systemCall, ...otherHeader } = options.headers;
        try {
            const isServerCtx = isServer();
            const optn: IFetchOptions = {
                method,
                headers: { ...otherHeader },
                credentials: isServerCtx ? undefined : 'include',
                body: method !== 'GET' ? JSON.stringify(payload) : undefined,

            };

            if (isServerCtx) {
                // const { cookies } = await import("next/headers");
                optn.headers['Cookie'] = options.headers.Cookie;
                // console.log("🚀 ~ FetchHttpService ~ options:", options);
                if (systemCall === 'true') {
                    optn.headers["auth-token"] = process.env.SYSTEM_TOKEN || process.env.NEXT_PUBLIC_SYSTEM_TOKEN;
                    // console.log(optn.headers["auth-token"])
                }

            }
            // console.log("🚀 ~ FetchHttpService ~ optn:", optn)

            const response = await fetch(url, { ...optn, ...(method == 'GET' ? { next: { revalidate: 3 } } : {}) } as RequestInit);
            if (!response.ok) {
                throw { msg: `HTTP error! status: ${response.status}`, code: response.status };
            }

            const data = await response.json();
            return data as IBaseResponse<R>;
        } catch (error) {
            return { data: null, status: 'error', error: error as ResponseError };
        }
    }

    async get<T>(url: string, options: IHttpOptions): Promise<IBaseResponse<T>> {
        return this.fetchWithMethod<T>(url, 'GET', null, options);
    }

    async put<P, R>(url: string, payload: IBaseBody<P>, options: IHttpOptions): Promise<IBaseResponse<R>> {
        return this.fetchWithMethod<P, R>(url, 'PUT', payload, options);
    }

    async post<P, R>(url: string, payload: IBaseBody<P>, options: IHttpOptions): Promise<IBaseResponse<R>> {
        return this.fetchWithMethod<P, R>(url, 'POST', payload, options);
    }
    async patch<P, R>(url: string, payload: IBaseBody<P>, options: IHttpOptions): Promise<IBaseResponse<R>> {
        return this.fetchWithMethod<P, R>(url, 'PATCH', payload, options);
    }
}
