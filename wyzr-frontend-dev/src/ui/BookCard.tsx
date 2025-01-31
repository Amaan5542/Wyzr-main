import Image from "next/image";
import BookIcon from "./Icons/BookIcon";
import HeadphoneIcon from "./Icons/HeadphoneIcon";
import StartIcon from "./Icons/StarIcon";
import ExpandableText from "./ExpendableText";
import Link from "next/link";
import { IContentQuickView } from "@/lib/interfaces/content-quick-view.interface";

export interface IBookCardProp {
  _id?: string;
  title: string;
  author: { _id: string; name: string };
  coverImageUrl: string;
  description?: string; // Optional property
  rating?: number; // Optional property
}

export const contentToBookCardProps = ({
  title,
  author,
  imgUrls,
  ebookRating,
  _id,
}: IContentQuickView) => ({
  title: title,
  rating: ebookRating,
  author: author,
  coverImageUrl: imgUrls?.[0], // Corrected access to the first item of img_urls
  _id,
});

const BookCard: React.FC<{ book: IBookCardProp }> = ({ book }) => {
  // console.log(book);
  return (
    <Link href={book._id ? `/content-details/${book._id}` : ""}>
      <div className="flex flex-col gap-2 p-2">
        <div className="relative w-24 h-32">
          <Image
            height={124}
            width={93}
            src={book.coverImageUrl}
            alt={book.title}
            className="absolute left-0 object-cover w-24 h-32 rounded-lg"
          />
        </div>
        <div className="flex gap-2">
          <BookIcon className="stroke-black-400 h-4 w-4 stroke-[1.5]" />
          <HeadphoneIcon className="stroke-black-400 h-4 w-4 stroke-[1.5] pb-[1px] self-center" />
        </div>
        <div className="flex flex-col gap-1 w-[11ch] text-wrap">
          <div
            className="text-base font-normal leading-4 font-satoshi"
            aria-label={book.title}
          >
            <ExpandableText
              className="text-base font-normal leading-4 font-satoshi"
              text={book.title}
              maxLength={12}
            ></ExpandableText>
          </div>
          <div className="text-sm font-normal leading-4 capitalize w-[15ch] ">
            <ExpandableText
              className="text-xs font-normal leading-4 font-satoshi"
              text={book.author?.name}
              maxLength={15}
            ></ExpandableText>
            {/* {book.author} */}
          </div>
        </div>
        <div className="flex gap-1">
          <StartIcon className="stroke-[1.5] h-[1rem] w-[1rem] stroke-gray-600" />{" "}
          <span className="text-[14px] self-center leading-[14px]">
            {book.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
