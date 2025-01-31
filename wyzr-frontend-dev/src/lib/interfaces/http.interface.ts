export interface IHttpOptions { headers: Record<string, string | undefined> }
export type ResponseError = {
    msg: string,
    code: number
}
export interface IBaseResponse<T> {
    data: T | null;
    status: 'success' | 'error'; // Adjust based on the possible values of status in your application
    error: null | ResponseError; // Use null for no error, or the error message if an error occurred
}
export interface IBaseBody<T> {
    data: T
}
export interface IHttpService {
    get: <T> (url: string, options: IHttpOptions) => Promise<IBaseResponse<T>>,
    put: <P, R> (url: string, payload: IBaseBody<P>, options: IHttpOptions) => Promise<IBaseResponse<R>>
    post: <P, R> (url: string, payload: IBaseBody<P>, options: IHttpOptions) => Promise<IBaseResponse<R>>
    patch: <P, R> (url: string, payload: IBaseBody<P>, options: IHttpOptions) => Promise<IBaseResponse<R>>
}