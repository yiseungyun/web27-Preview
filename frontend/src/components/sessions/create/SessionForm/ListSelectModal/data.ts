interface Question {
  id: number;
  question: string;
}

interface ListItem {
  id: number;
  user_name: string;
  categoryNames: string[];
  title: string;
  questionCount: number;
  questions: Question[];
  usage: number;
}

interface Data {
  myList: ListItem[];
  savedList: ListItem[];
}

export const data: Data = {
  myList: [
    {
      id: 1,
      user_name: "네모정",
      categoryNames: ["프론트엔드"],
      title: "프론트엔드 면접 질문이심1",
      questionCount: 2,
      usage: 10,
      questions: [
        {
          id: 3,
          question: "클로저에 대해 설명해주세요.",
        },
        {
          id: 4,
          question: "클로저에 대해 설명해주세요. 22",
        },
      ],
    },
    {
      id: 2,
      user_name: "승윤최고",
      categoryNames: ["프론트엔드"],
      title: "프론트엔드 면접 질문이심2",
      questionCount: 10,
      usage: 2,
      questions: [
        {
          id: 5,
          question: "클로저에 대해 설명해주세요.",
        },
        {
          id: 6,
          question: "클로저에 대해 설명해주세요. 22",
        },
      ],
    },
    {
      id: 3,
      user_name: "사용자",
      categoryNames: ["프론트엔드"],
      title: "프론트엔드 면접 질문이심3",
      questionCount: 10,
      usage: 2,
      questions: [
        {
          id: 7,
          question: "클로저에 대해 설명해주세요.",
        },
        {
          id: 8,
          question: "클로저에 대해 설명해주세요. 22",
        },
      ],
    },
    {
      id: 4,
      user_name: "사용자",
      categoryNames: ["프론트엔드"],
      title: "프론트엔드 면접 질문이심3",
      questionCount: 10,
      usage: 10,
      questions: [
        {
          id: 123,
          question: "클로저에 대해 설명해주세요.",
        },
        {
          id: 1231,
          question: "클로저에 대해 설명해주세요. 22",
        },
      ],
    },
  ],
  savedList: [
    {
      id: 4,
      user_name: "사용자",
      categoryNames: ["프론트엔드"],
      title: "백엔드 면접 질문이심1",
      questionCount: 10,
      usage: 2,
      questions: [
        {
          id: 9,
          question: "클로저에 대해 설명해주세요.",
        },
        {
          id: 10,
          question: "클로저에 대해 설명해주세요. 22",
        },
      ],
    },
    {
      id: 5,
      user_name: "사용자",
      categoryNames: ["프론트엔드"],
      title: "백엔드 면접 질문이심2",
      usage: 10,
      questionCount: 3,
      questions: [
        {
          id: 11,
          question: "클로저에 대해 설명해주세요.",
        },
        {
          id: 12,
          question: "클로저에 대해 설명해주세요. 22",
        },
        {
          id: 13,
          question: "클로저에 대해 설명해주세요. 33",
        },
      ],
    },
  ],
};
