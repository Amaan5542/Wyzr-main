import { fetchContentDetails } from "@/lib/data-com/content";
import { IContentDetailedView } from "@/lib/interfaces/content-detailed-view.interface";
import ExpandableText from "@/ui/ExpendableText";
import BookIcon from "@/ui/Icons/BookIcon";
import HeadphoneIcon from "@/ui/Icons/HeadphoneIcon";
import HeartIcon from "@/ui/Icons/HeartIcon";
import LeftArrowIcon from "@/ui/Icons/LeftArrowIcon";
import StartIcon from "@/ui/Icons/StarIcon";
import ThreeDotIcon from "@/ui/Icons/ThreeDotIcon";
import { upperFirst } from "lodash";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: { contentId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch content details
  const contentDetails = await fetchContentDetails(params.contentId, true);

  // Validate and format content details (optional)
  const validatedContent = contentDetails; // Assuming a separate validation/formatting function

  // Construct meaningful message from content details for OG description
  const description =
    (validatedContent && createMeaningfulMessage(validatedContent)) || "";

  // Return comprehensive metadata with structured OG data
  return {
    title: upperFirst(validatedContent?.title) || "A book from Wyzr",
    description,
    openGraph: {
      url: "https://wyzr.in", // Include UTM source from search params
      title: upperFirst(validatedContent?.title) || "",
      description,
      images: [
        ...(validatedContent?.imgUrls.map((url) => encodeURI(url)) || []), // Ensure proper URI encoding for image URLs
      ],
      // Add other relevant OG properties based on contentDetails:
      ...(validatedContent?.author && {
        author: validatedContent.author.name,
      }),
      ...(validatedContent?.publishYear && {
        published_time: validatedContent.publishYear,
      }),
      ...(validatedContent?.ebookRating && {
        "ebook:rating_score": validatedContent.ebookRating,
      }),
      ...(validatedContent?.audiobookRating && {
        "audiobook:rating_score": validatedContent.audiobookRating,
      }),
      // ... Add more properties as needed
    },
  };
}

// Optional function to create a meaningful message for OG description (implementation details omitted)
function createMeaningfulMessage(contentDetails: IContentDetailedView): string {
  const title = contentDetails.title?.trim();
  const author = contentDetails.author?.name;
  const publishYear = contentDetails.publishYear;
  const description = contentDetails.description?.trim().slice(0, 250) + "..."; // Truncate long descriptions

  let message = title;

  if (author) {
    message += ` by ${author}`;
  }

  if (publishYear) {
    message += ` (${publishYear})`;
  }

  message += `\n${description}`;

  return message;
}

const ContentDetails = async ({ params }: Props) => {
  const contentDetails = await fetchContentDetails(params.contentId, true);
  if (!contentDetails) return;
  return (
    <div className="w-screen flex flex-col">
      <DetailPageTOpNav />

      <div className="flex flex-col p-4 px-6 gap-6">
        <div className="flex justify-center">
          <div className="relative w-[9.4rem] h-52 rounded-md overflow-clip shadow-md">
            <Image
              src={contentDetails?.imgUrls[0] || ""}
              alt={contentDetails?.title || ""}
              fill
            />
          </div>
        </div>
        <div className="justify-center ">
          <div className="flex divide-x-1 rounded-md leading-5 text-base capitalize p-1 py-1.25 font-neue-montreal bg-primary-400 text-primary-100 shadow-sm ">
            <Link
              href={`/reader/${contentDetails._id}`}
              className="flex items-center justify-center  basis-1/2 gap-2  w-auto flex-grow-0 "
            >
              <BookIcon className="stroke-primary-100 w-6 h-6" />{" "}
              <span>start reading</span>
            </Link>
            <div className="h-8 w-[1pt] bg-primary-300"></div>
            <div className="flex items-center justify-center basis-1/2  gap-2">
              <HeadphoneIcon className="stroke-primary-100 w-6 h-6" />{" "}
              <span>start Listening</span>
            </div>
          </div>
        </div>
        <div className="overflow-y-scroll h-[60vh]">
          <Details contentDetails={contentDetails} />
        </div>
      </div>
    </div>
  );
};
type contentDetailsProps = {
  contentDetails: IContentDetailedView;
};
const Details = ({
  contentDetails: {
    title,
    author,
    description,
    files,
    ebookRating,
    audiobookRating,
  },
}: contentDetailsProps) => (
  <div className="flex flex-col gap-2 overflow-scroll ">
    <div className="">
      <ExpandableText
        text={title}
        maxLength={305}
        className="font-neue-montreal text-[32px] leading-10 font-semibold  tracking-tight"
      />
    </div>
    <div className="font-satoshi font-normal text-gray-400 flex gap-2 flex-col">
      <p>{author.name}</p>
    </div>
    <div className="flex items-center gap-3 border-t-2 border-b-2 p-3 ">
      <StartIcon className="stroke-primary-500 stroke-1 h-6 w-6" />{" "}
      <span className="font-satoshi leading-6">
        {((ebookRating + audiobookRating) / 2).toFixed(1)}
      </span>
    </div>

    <div className="font-satoshi font-normal flex gap-2 flex-col ">
      <p className="font-neue-montreal leading-8 text-2xl font-medium py-2">
        What’s it about?
      </p>
      <p>
        <ExpandableText
          text={description}
          maxLength={150}
          className="font-neue-montreal  text-gray-400 whitespace-normal tracking-normal "
        />
      </p>
    </div>
  </div>
);

const DetailPageTOpNav = () => (
  <div className="justify-between flex p-3 ">
    <button>
      <Link href="/home">
        <LeftArrowIcon className="stroke-primary-500 h-6 w-6 stroke-2" />
      </Link>
    </button>
    <div className="flex gap-4">
      <button>
        <HeartIcon className="stroke-primary-500 h-6 w-6 stroke-[1.25]" />
      </button>
      <button>
        <ThreeDotIcon className="stroke-primary-500 h-6 w-6 stroke-2" />
      </button>
    </div>
  </div>
);

export default ContentDetails;
