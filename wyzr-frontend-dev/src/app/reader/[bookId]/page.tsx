"use client";
import { fetchContentDetails } from "@/lib/data-com/content";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { ReactReader } from "react-reader";
import { Contents, NavItem, Rendition } from "epubjs";
import { upperFirst } from "lodash";
import {
  LOCAL_STORAGE_KEYS,
  getDataFromLocalStorage,
  setJsonToLocalStorage,
} from "@/lib/utils/local-storage";

const ReaderPage = ({ params }: { params: { bookId: string } }) => {
  const [fileUrl, setFileUrl] = useState("");
  const [location, setLocation] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const rendition = useRef<Rendition | undefined>(undefined);
  const [largeText, setLargeText] = useState(false);
  //   const [chapter, setChapter] = useState<string>();
  const toc = useRef<NavItem[]>([]);
  const tocItem = useRef<NavItem>();
  const display = useRef<{
    page: number;
    total: number;
  }>();
  const [page, setPage] = useState("");

  useEffect(() => {
    const loc = getDataFromLocalStorage(LOCAL_STORAGE_KEYS.EPUB_LOC);
    if (loc) setLocation(loc.loc);
    const getBook = async () => {
      const contentDetails = await fetchContentDetails(params.bookId, true);
      if (!contentDetails) return;
      setFileUrl(contentDetails.files[0].fileUrl || "");
      setTitle(contentDetails.title || "");
    };
    getBook();
  }, [params.bookId, largeText, rendition, toc]);

  useEffect(() => {
    if (rendition.current && toc.current) {
      rendition.current?.themes.fontSize("100%");
      rendition.current?.themes.font("Segoe UI Emoji");
      const { displayed, href } = rendition.current.location.start;
      const chapter = toc.current.find((item) => item.href.includes(href));
      tocItem.current = chapter;
      display.current = displayed;
    }
  }, [rendition]);

  useEffect(() => {
    if (location)
      setJsonToLocalStorage(LOCAL_STORAGE_KEYS.EPUB_LOC, { loc: location });
  }, [location]);

  return (
    <div>
      <div style={{ height: "100vh" }}>
        {fileUrl && (
          <ReactReader
            url={fileUrl}
            title={upperFirst(tocItem.current?.label)}
            location={location}
            tocChanged={(_toc) => (toc.current = _toc)}
            epubOptions={{
              allowPopups: true, // Adds `allow-popups` to sandbox-attribute
              allowScriptedContent: true, // Adds `allow-scripts` to sandbox-attribute
            }}
            epubInitOptions={{
              openAs: "epub",
            }}
            getRendition={(_rendition: Rendition) => {
              rendition.current = _rendition;
            }}
            locationChanged={(loc: string) => {
              setLocation(loc);
              if (rendition.current && toc.current) {
                const { displayed, href } = rendition.current.location.start;
                const chapter = toc.current.find((item) =>
                  item.href.includes(href)
                );
                tocItem.current = chapter;
                display.current = displayed;
              }
            }}
          />
        )}
      </div>
      <div className="absolute bottom-0 right-0 z-50 flex justify-between w-screen p-2 px-6 text-xs text-center text-gray-500 font-neue-montreal">
        <div>{upperFirst(title)}</div>
        <div>
          {display.current?.page &&
            display.current?.total &&
            ((display.current?.page / display.current?.total) * 100).toFixed(0)}
          %
        </div>
      </div>
    </div>
  );
};

export default ReaderPage;
