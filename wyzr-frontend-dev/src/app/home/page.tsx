import { FETCH_CONTENT_STRATEGY, fetchContent } from "@/lib/data-com/content";
import { IContentQuickView } from "@/lib/interfaces/content-quick-view.interface";
import { IDropDownValue } from "@/lib/interfaces/dropdown-values.interface";
import BookCard, { contentToBookCardProps } from "@/ui/BookCard";
import { HomeTopNav } from "@/ui/home/HomeTopNav";

const categories: IDropDownValue[] = [
  { id: 1, text: "web3" },
  { id: 2, text: "marketing" },
  { id: 3, text: "documentaries" },
  { id: 4, text: "Technology" },
];

const HomePage = async () => {
  let contentList = [];
  const userName = "om";
  const selectedCategory = 1;

  contentList =
    (await fetchContent({ strategy: FETCH_CONTENT_STRATEGY.STD }, true))?.map(
      contentToBookCardProps
    ) ?? [];
  let contentByCategory = await fetchContent(
    {
      strategy: FETCH_CONTENT_STRATEGY.STD,
      category: selectedCategory,
    },
    true
  );

  return (
    <div className="flex flex-col h-screen overflow-scroll">
      <div className="bg-white rounded-b-[2rem] fixed w-full z-50 backdrop-blur-sm">
        <HomeTopNav userName={userName} />
      </div>
      <div className="flex flex-col w-full gap-4 p-2 mt-56 mb-10 z-1">
        <div className="flex gap-3 mt-3 overflow-x-scroll h-fit">
          {contentList.map((_, index) => (
            <div key={index}>
              <BookCard book={_} />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 px-2">
          <p className="text-sm">Look for books via categories</p>
          {CategoryPills(categories)}
        </div>
        <div className="flex gap-3 overflow-x-scroll">
          {contentByCategory?.map(contentToBookCardProps).map((_, index) => (
            <div key={index}>
              <BookCard book={_} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  function CategoryPills(categories: { id: string | number; text: string }[]) {
    return (
      <div className="flex gap-2 overflow-y-scroll">
        {categories?.map(
          ({ id, text }: { id: string | number; text: string }) => (
            <div
              className={`p-2 px-2 leading-4 capitalize border-2 rounded-md border-primary-400 ${
                selectedCategory === id ? "bg-primary-500 text-primary-100" : ""
              }`}
              key={id}
            >
              {text}
            </div>
          )
        )}
      </div>
    );
  }
};

export default HomePage;
