type SignInSource = 'std' | 'google' | 'fb';
type Status = 'active' | 'deleted';
export type UserProfile = {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
    photos: any[]; // Specify the type inside the array if known, e.g., string[] for URLs
    src: SignInSource;
    pkgId: number;
    obParams: null | any; // Specify a more specific type instead of any if possible
    isVerified: boolean;
    status: Status;
    timestamp: number;
};

export type UserLibrary = {
    contentList: any[]; // Specify the type of content inside the array if known
    purchaseList: any[]; // Same as above, specify a more detailed type if possible
    _id: string;
    status: Status;
    timestamp: number;
};

export type UserData = {
    userProfile: UserProfile;
    userLibrary: UserLibrary;
};
