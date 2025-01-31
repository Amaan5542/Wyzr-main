"use client";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { FETCH_CONTENT_STRATEGY, fetchContent } from "@/lib/data-com/content";
import { IContentQuickView } from "@/lib/interfaces/content-quick-view.interface";
import BookCard, { IBookCardProp, contentToBookCardProps } from "../BookCard";

export function SearchResults({ title }: { title: string }) {
  const [contentList, setContentList] = useState<Partial<IContentQuickView>[]>(
    []
  );

  // Wrap fetch logic in useCallback to memoize the function
  // ensuring it doesn't get recreated on every render.
  const fetchData = useCallback(
    debounce(async (title: string) => {
      if (!title) return;
      try {
        const fetchedContentList =
          (
            await fetchContent({ strategy: FETCH_CONTENT_STRATEGY.STD, title })
          )?.map(contentToBookCardProps) ?? [];
        setContentList(fetchedContentList);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    }, 300), // 300ms debounce delay
    []
  );

  useEffect(() => {
    // Call the debounced fetchData function
    fetchData(title);
    // Cleanup function to cancel the debounce if the component unmounts
    // or the title changes.
    return () => fetchData.cancel();
  }, [title, fetchData]); // Ensure fetchData is in the dependency array

  if (!title) return null;

  return (
    <div className="h-screen px-2">
      <div className="flex  flex-wrap py-4  gap-2 py-5- w-[100vw] h-screen- justify-start ">
        {contentList.map((book, index) => (
          <BookCard
            book={book as IBookCardProp}
            // alignment="h"
            key={`result-${index}`}
          />
          // <div>{book.title}</div>
        ))}
      </div>
    </div>
  );
}
