export interface User {
  id: string;
  name: string;
  username: string;
  password?: string;
  riddles: number[];
  solvedRiddles: number;
  collectedWords: string[];
  finalSentence: string;
}

export const users: User[] = [
  {
    id: "aman",
    name: "Aman",
    username: "aman",
    password: "aman123",
    riddles: [1, 2, 3, 4, 5, 6],
    solvedRiddles: 0,
    collectedWords: [],
    finalSentence: "Seek the secrets within our treasure.",
  },
  {
    id: "hrishikesh",
    name: "Hrishikesh",
    username: "hrishikesh",
    password: "hrishi123",
    riddles: [7, 8, 9, 10, 11, 6],
    solvedRiddles: 0,
    collectedWords: [],
    finalSentence: "Only the brave will find treasure.",
  },
  {
    id: "partha",
    name: "Partha",
    username: "partha",
    password: "partha123",
    riddles: [12, 13, 14, 15, 16, 6],
    solvedRiddles: 0,
    collectedWords: [],
    finalSentence: "Clues hide deep, awaiting the treasure.",
  },
  {
    id: "roshan",
    name: "Roshan",
    username: "roshan",
    password: "roshan123",
    riddles: [17, 18, 19, 20, 21, 6],
    solvedRiddles: 0,
    collectedWords: [],
    finalSentence: "Shiva spirits guide you to treasure.",
  },
  {
    id: "salman",
    name: "Salman",
    username: "salman",
    password: "salman123",
    riddles: [22, 23, 24, 25, 26, 6],
    solvedRiddles: 0,
    collectedWords: [],
    finalSentence: "The hostel legends guard the treasure.",
  },
  {
    id: "admin",
    name: "Admin",
    username: "admin",
    password: "admin123",
    riddles: [],
    solvedRiddles: 0,
    collectedWords: [],
    finalSentence: "",
  },
];