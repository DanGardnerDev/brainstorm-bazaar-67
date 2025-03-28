
import { Post } from "@/components/PostCard";
import { CommentType } from "@/components/Comment";

export const mockPosts: Post[] = [
  {
    id: "post-1",
    title: "Subscription-Based Platform for Home-Cooked Meals",
    content: "What if we created a platform that connects talented home cooks with local customers? The platform would handle subscriptions, payments, and delivery logistics, while cooks focus on creating delicious, authentic meals. This could create flexible income opportunities for people who love cooking and provide customers with affordable alternatives to restaurant takeout and meal kits.",
    author: {
      id: "user-1",
      username: "FoodieEntrepreneur"
    },
    createdAt: "2023-05-15T12:30:00Z",
    upvotes: 24,
    downvotes: 2,
    commentCount: 5,
    userVote: null
  },
  {
    id: "post-2",
    title: "AI-Powered Personal Growth Coach",
    content: "I'm thinking about developing an AI coach that helps people build better habits and achieve their personal development goals. It would combine insights from psychology, neuroscience, and behavioral economics to create personalized growth plans. The app would adapt its approach based on user responses and progress, offering accountability, education, and nudges at the right moments. Thoughts?",
    author: {
      id: "user-2",
      username: "MindfulTech"
    },
    createdAt: "2023-05-18T15:45:00Z",
    upvotes: 42,
    downvotes: 5,
    commentCount: 12,
    userVote: null
  },
  {
    id: "post-3",
    title: "Sustainable Fashion Marketplace",
    content: "I'm working on a concept for a marketplace that connects eco-conscious consumers with sustainable fashion brands and secondhand retailers. The platform would verify sustainability claims, provide transparency about manufacturing practices, and make it easy to find ethically-made clothing that matches your style. Would also include features for trading or upcycling clothing you no longer wear.",
    author: {
      id: "current-user",
      username: "Current User"
    },
    createdAt: "2023-05-20T09:15:00Z",
    upvotes: 37,
    downvotes: 3,
    commentCount: 8,
    userVote: null
  },
  {
    id: "post-4",
    title: "Neighborhood Tool Library",
    content: "I'm exploring the idea of creating a community-based tool and equipment library. Many people only use power tools, lawn equipment, and kitchen appliances occasionally, yet we all buy our own. What if neighborhoods shared a communal inventory of high-quality tools managed through a simple app? Members would pay a small monthly fee, and could reserve items when needed. Could save money, reduce waste, and build community connections.",
    author: {
      id: "user-3",
      username: "SharingEconomy"
    },
    createdAt: "2023-05-22T14:00:00Z",
    upvotes: 19,
    downvotes: 1,
    commentCount: 7,
    userVote: null
  },
  {
    id: "post-5",
    title: "Virtual Reality Language Learning",
    content: "What if we combined VR technology with language learning? Imagine practicing a new language by virtually visiting countries where it's spoken, interacting with AI characters, and completing real-world tasks. This immersive approach could dramatically improve retention and speaking confidence compared to traditional methods. Would require partnership with VR hardware companies and language experts.",
    author: {
      id: "current-user",
      username: "Current User"
    },
    createdAt: "2023-05-25T10:30:00Z",
    upvotes: 28,
    downvotes: 4,
    commentCount: 9,
    userVote: null
  }
];

export const mockComments: (CommentType & { postId: string })[] = [
  {
    id: "comment-1",
    postId: "post-1",
    text: "This is such a great idea! I know many people who would love to earn money cooking from home. Have you looked into the health regulations that might apply?",
    author: {
      id: "user-4",
      username: "FoodRegulationExpert"
    },
    createdAt: "2023-05-15T14:20:00Z"
  },
  {
    id: "comment-2",
    postId: "post-1",
    text: "I'd definitely use this service as a customer. Restaurant takeout is getting so expensive, and meal kits still require cooking. This seems like the best of both worlds.",
    author: {
      id: "user-5",
      username: "BusyParent"
    },
    createdAt: "2023-05-15T18:45:00Z"
  },
  {
    id: "comment-3",
    postId: "post-1",
    text: "Have you considered how you'd handle dietary restrictions and allergies? That could be a major challenge but also an opportunity to differentiate.",
    author: {
      id: "user-6",
      username: "AllergyAwareness"
    },
    createdAt: "2023-05-16T09:10:00Z"
  },
  {
    id: "comment-4",
    postId: "post-2",
    text: "I think there's huge potential here. The self-improvement market is massive, but a lot of content isn't personalized enough to be truly effective.",
    author: {
      id: "user-7",
      username: "PsychResearcher"
    },
    createdAt: "2023-05-18T16:30:00Z"
  },
  {
    id: "comment-5",
    postId: "post-2",
    text: "Interesting! Would this be using GPT-4 or similar LLM technology? The key would be making it feel genuinely helpful rather than just a chatbot.",
    author: {
      id: "user-8",
      username: "AIEnthusiast"
    },
    createdAt: "2023-05-19T10:15:00Z"
  },
  {
    id: "comment-6",
    postId: "post-3",
    text: "Love this concept! Verification of sustainability claims is so important - there's so much greenwashing in the fashion industry.",
    author: {
      id: "user-9",
      username: "EthicalFashion"
    },
    createdAt: "2023-05-20T11:20:00Z"
  },
  {
    id: "comment-7",
    postId: "post-4",
    text: "We actually have something similar in our neighborhood using a spreadsheet and group chat. An app would make it so much more scalable!",
    author: {
      id: "user-10",
      username: "CommunityBuilder"
    },
    createdAt: "2023-05-22T16:40:00Z"
  },
  {
    id: "comment-8",
    postId: "post-5",
    text: "As a language teacher, I'm excited about this! Immersion is proven to be one of the most effective methods. Have you thought about incorporating speech recognition to give feedback on pronunciation?",
    author: {
      id: "user-11",
      username: "LanguageTeacher"
    },
    createdAt: "2023-05-25T13:15:00Z"
  }
];
