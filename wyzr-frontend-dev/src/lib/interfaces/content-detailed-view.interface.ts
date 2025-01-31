export interface IContentDetailedView {
    title: string;
    description: string;
    isbn: string;
    _id: string;
    genre: number;
    imgUrls: string[];
    editors: IEditor[];
    publications: any[]; // Assuming publications data structure is not yet defined
    language: string;
    publishYear: number;
    category: number;
    version: string;
    purchaseLink: string;
    ebookRating: number;
    audiobookRating: number;
    timestamp: string;
    files: IContentFile[];
    author: IAuthor;
}

interface IEditor {
    _id: string;
    name: string;
}

interface IContentFile {
    _id: string;
    contentId: string;
    pageCount: number;
    audioLength: number;
    type: string; // "audio" or potentially other types in the future
    chapters: IChapter[];
    narratorId: string;
    accessType: string;
    narrator: IAuthor;
    fileUrl?: string
}

interface IChapter {
    title: string;
    seq: number;
}

interface IAuthor {
    _id: string;
    name: string;
}
