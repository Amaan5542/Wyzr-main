export enum OnboardingOptionType {
    TINDER_SWIPE = "tinder-swipe",
    AVATAR_SELECT = "avatar-select",
    TIME_SLIDE = "time-slide",
    PILL_SELECT = "pill-select",
}

export enum OnboardingStepId {
    TITLE_INTEREST = "titleInterest",
    TOPIC_INTEREST = "topicInterest",
    AUTHOR_INTEREST = "authorInterest",
    REMINDER_TIME = "reminderTime",
}
export const onboardingSteps = [
    {
        heading: `Is this Title interesting to you?`,
        subHeading:
            "Swipe right if you find it interesting, left if you want to pass it",
        type: OnboardingOptionType.TINDER_SWIPE,
        stepId: OnboardingStepId.TITLE_INTEREST,
        options: [
            {
                image: "/images/onboarding/can-you-keep-a-secret.png",
                id: "2343asd3",
                text: "",
            },
            {
                image: "/images/onboarding/evvie-drake-starts-over.png",
                id: "23ad3asd3",
                text: "",
            },
            {
                image: "/images/onboarding/well-met.png",
                id: "23342asd3",
                text: "",
            },
            {
                image: "/images/onboarding/zero-to-viral.png",
                id: "11242asd3",
                text: "",
            },
        ],
    },
    {
        heading: `What topics are of your interest?`,
        subHeading: `Tap and select any 5`,
        stepId: OnboardingStepId.TOPIC_INTEREST,
        type: OnboardingOptionType.PILL_SELECT,
        options: [
            {
                image: "",
                id: "art1",
                text: "Art",
            },
            {
                image: "",
                id: "sci-fi2",
                text: "Sci-Fi",
            },
            {
                image: "",
                id: "docs3",
                text: "Documentaries",
            },
            {
                image: "",
                id: "finance4",
                text: "Finance",
            },
            {
                image: "",
                id: "tech5",
                text: "Technology",
            },
            {
                image: "",
                id: "web36",
                text: "Web3",
            },
            {
                image: "",
                id: "block7",
                text: "Blockchain",
            },
            {
                image: "",
                id: "market8",
                text: "Marketing",
            },
            {
                image: "",
                id: "tech9",
                text: "Technology",
            },
            {
                image: "",
                id: "web310",
                text: "Web3",
            },
            {
                image: "",
                id: "block11",
                text: "Blockchain",
            },
            {
                image: "",
                id: "market12",
                text: "Marketing",
            },
            {
                image: "",
                id: "tech13",
                text: "Technology",
            },
            {
                image: "",
                id: "web314",
                text: "Web3",
            },
            {
                image: "",
                id: "block15",
                text: "Blockchain",
            },
            {
                image: "",
                id: "market16",
                text: "Marketing",
            },
            {
                image: "",
                id: "tech17",
                text: "Technology",
            },
            {
                image: "",
                id: "web318",
                text: "Web3",
            },
            {
                image: "",
                id: "block19",
                text: "Blockchain",
            },
            {
                image: "",
                id: "market20",
                text: "Marketing",
            },
        ],
    },
    {
        heading: `Any authors that Interest you here?`,
        subHeading: `Tap and select any 5`,
        type: OnboardingOptionType.AVATAR_SELECT,
        stepId: OnboardingStepId.AUTHOR_INTEREST,
        options: [
            {
                image: "/images/onboarding/can-you-keep-a-secret.png",
                id: "2343asd3",
                text: `Kathryn Murphy`,
            },
            {
                image: "/images/onboarding/evvie-drake-starts-over.png",
                id: "23ad3asd3",
                text: `Ray Dalio`,
            },
            {
                image: "/images/onboarding/can-you-keep-a-secret.png",
                id: "2343sdasd3",
                text: `Alexander
                McQueen`,
            },
            {
                image: "/images/onboarding/evvie-drake-starts-over.png",
                id: "23ad3sdfasd3",
                text: `Ray Dalio`,
            },
            {
                image: "/images/onboarding/well-met.png",
                id: "23342asd3",
                text: `Alexander
                McQueen`,
            },
            {
                image: "/images/onboarding/evvie-drake-starts-over.png",
                id: "23ad3sdjhhfasd3",
                text: `Kathryn Murphy`,
            },
            {
                image: "/images/onboarding/well-met.png",
                id: "233kjk42asd3",
                text: `Kathryn Murphy`,
            },
            {
                image: "/images/onboarding/zero-to-viral.png",
                id: "11242asd3",
                text: `Alexander
                McQueen`,
            },
            {
                image: "/images/onboarding/evvie-drake-starts-over.png",
                id: "23ad3sasddfasd3",
                text: `Ray Dalio`,
            },
        ],
    },
    {
        heading: `What time of the day should we remind you?`,
        subHeading: `We don’t want to bug you, just let us know when are you usually free?`,
        stepId: OnboardingStepId.REMINDER_TIME,
        type: OnboardingOptionType.TIME_SLIDE,
        options: [],
    },
];
