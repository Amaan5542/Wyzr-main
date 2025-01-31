import { fetchProfile, syncObParams } from "@/lib/data-com/user-profile";
import { UserLibrary, UserProfile } from "@/lib/types";
import { create } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";

export type State = {
    profile: UserProfile
    userLibrary: UserLibrary
}

export type Actions = {
    setUser: (userData: UserProfile) => void
    updateProfile: (userData: Partial<UserProfile>) => void,
    syncUser: (cb: (profile: UserProfile) => void) => Promise<void>; // Corrected syntax for async method in interface
    syncObParams(payload: any): Promise<void>; // Corrected syntax for async method in interface
}

// Initial state
const initialState: State = {
    profile: {
        firstName: "",
        lastName: "",
        email: "",
        _id: "",
        photos: [],
        src: "std",
        pkgId: 1,
        obParams: null,
        isVerified: false,
        status: "active",
        timestamp: 0,
    },
    userLibrary: {
        contentList: [],
        purchaseList: [],
        _id: "",
        status: "active",
        timestamp: 0
    }
};

const options = { name: 'user-profile', storage: createJSONStorage(() => sessionStorage) }

export const useUserProfileStore = create<State & Actions>()(persist((set) => ({
    ...initialState,
    setUser: (profile: UserProfile) =>
        set(state => ({
            profile
        })),
    updateProfile: (profile: Partial<UserProfile>) => set(state => ({
        profile: { ...state.profile, ...profile }
    })),
    syncUser: async (cb) => {
        const updatedProfileData = (await fetchProfile());
        set(state => ({ profile: { ...state.profile, ...updatedProfileData?.userProfile, }, userLibrary: { ...state.userLibrary, ...updatedProfileData?.userLibrary } }));
        if (typeof cb === 'function') await cb(updatedProfileData?.userProfile as UserProfile)
    },
    syncObParams: async (payload: any) => {
        const updatedProfileData = (await syncObParams(payload, false));
        set(state => ({ profile: { ...state.profile, ...updatedProfileData?.user, }, userLibrary: { ...state.userLibrary } }))

    }

}), options))