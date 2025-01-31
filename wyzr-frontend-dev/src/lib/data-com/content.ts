import { IContentQuickView } from "../../lib/interfaces/content-quick-view.interface";
import { generateCookieHeader } from "../utils/generate-cookie-header";
import { isServer } from "../utils/is-server";
import { FetchHttpService } from "../utils/http-service";
import { IContentDetailedView } from './../interfaces/content-detailed-view.interface';
export interface IFetchContentParams {
    category?: number;
    strategy: FETCH_CONTENT_STRATEGY,
    title?: undefined | string
}
export enum FETCH_CONTENT_STRATEGY {
    DYNAMIC = 'dynamic',
    STD = 'std',
    POPULAR = 'pop',
};
const http = new FetchHttpService();
export const fetchContent = async (
    params: IFetchContentParams,
    systemCall: boolean = false
): Promise<IContentQuickView[] | null> => {
    const url = `${process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL}/content/?${new URLSearchParams(params as Record<string, any>).toString()}`;

    // Define the options object
    const options: { credentials?: string, headers: { Cookie?: string, systemCall?: string } } = {
        headers: { systemCall: systemCall ? 'true' : "" },
    };

    if (isServer()) {
        // Dynamically import 'cookies' from "next/headers" if running server-side
        const { cookies } = await import("next/headers");
        options.headers['Cookie'] = await generateCookieHeader(cookies());

    }


    const response = await http.get<IContentQuickView[]>(url, options)
    if (response.error) throw new Error(`HTTP error! status: ${response.error.msg}`);

    console.log(options);

    return response.data;
};
export const fetchContentDetails = async (
    id: string,
    systemCall: boolean = false
): Promise<IContentDetailedView | null> => {
    const url = `${process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL}/content/${id}`;

    // Define the options object
    const options: { credentials?: string, headers: { Cookie?: string, systemCall?: string } } = {
        headers: { systemCall: systemCall ? 'true' : "" },
    };

    if (isServer()) {
        // Dynamically import 'cookies' from "next/headers" if running server-side
        const { cookies } = await import("next/headers");
        options.headers['Cookie'] = await generateCookieHeader(cookies());

    }
    // console.log("🚀 fetchContentDetails ~ options:", options)


    const response = await http.get<IContentDetailedView>(url, options)
    if (response.error) throw new Error(`HTTP error! status: ${response.error.msg}`);

    // console.log(options);

    return response.data;
};


export const dummyContentList = [
    {
        title: "Book title",
        rating: 4.2,
        author: { _id: Date.now().toString(), name: "Book author" },
        coverImageUrl: "/images/onboarding/can-you-keep-a-secret.png",
    },
    {
        title: "Book title",
        rating: 4.2,
        author: { _id: Date.now().toString(), name: "Book author" },
        coverImageUrl: "/images/onboarding/evvie-drake-starts-over.png",
    },
    {
        title: "Book title",
        rating: 4.2,
        author: { _id: Date.now().toString(), name: "Book author" },
        coverImageUrl: "/images/onboarding/zero-to-viral.png",
    },
    {
        title: "Book title",
        rating: 4.2,
        author: { _id: Date.now().toString(), name: "Book author" },
        coverImageUrl: "/images/onboarding/evvie-drake-starts-over.png",
    },
]