export interface IContentQuickView {
    title: string;
    description: string;
    isbn: string;
    _id: string;
    genre: number;
    imgUrls: string[];
    editors: any[]; // Assuming this could be expanded with a specific structure
    publications: any[]; // Assuming this could be expanded with a specific structure
    language: string;
    publishYear: number;
    category: number;
    version: string;
    purchaseLink: string;
    ebookRating: number;
    audiobookRating: number;
    timestamp: string;
    files: IContentFile[];
    author: { _id: string; name: string };
};

interface IContentFile {
    _id: string;
    contentId: string;
    pageCount: number;
    audioLength: number;
    type: string;
    narratorId: string;
    accessType: string;
};
