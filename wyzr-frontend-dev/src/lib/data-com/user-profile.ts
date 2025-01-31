import { UserData, UserProfile } from '@/lib/types';
import { generateCookieHeader } from "../utils/generate-cookie-header";
import { FetchHttpService } from "../utils/http-service";
import { isServer } from "../utils/is-server";
import { IBaseBody } from '../interfaces/http.interface';
const http = new FetchHttpService();

export const fetchProfile = async (
    systemCall: boolean = false
): Promise<UserData | null> => {
    const url = `${process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`;

    // Define the options object
    const options: { credentials?: string, headers: { Cookie?: string, systemCall?: string } } = {
        headers: { systemCall: systemCall ? 'true' : "" },
    };

    if (isServer()) {
        // Dynamically import 'cookies' from "next/headers" if running server-side
        const { cookies } = await import("next/headers");
        options.headers['Cookie'] = await generateCookieHeader(cookies());
    }

    const response = await http.get<UserData>(url, options)
    if (response.error) throw new Error(`HTTP error! status: ${response.error.msg}`);

    return response.data;
};


export const syncObParams = async (
    payload: any,
    systemCall: boolean = false
): Promise<{ user: UserProfile } | null> => {
    const url = `${process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile:syncObParams`;

    // Define the options object
    const options: { credentials?: string, headers: { Cookie?: string, systemCall?: string, "Content-Type": string } } = {
        headers: { systemCall: systemCall ? 'true' : "", "Content-Type": "application/json", },
    };

    if (isServer()) {
        // Dynamically import 'cookies' from "next/headers" if running server-side
        const { cookies } = await import("next/headers");
        options.headers['Cookie'] = await generateCookieHeader(cookies());
    }

    const response = await http.patch<any, { user: UserProfile }>(url, { data: { obParams: payload } }, options);
    if (response.error) throw new Error(`HTTP error! status: ${response.error.msg}`);

    return response.data;
};
