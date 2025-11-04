export interface Riddle {
  id: number;
  text: string;
  answer: string;
}

export const riddles: Riddle[] = [
  // Aman's Riddles
  { id: 1, text: "That momo guy who doesn’t look like a momo.", answer: "seek" },
  { id: 2, text: "The abandoned gate.", answer: "the" },
  { id: 3, text: "I quench your thirst when you’re dying of thirst.", answer: "secrets" },
  { id: 4, text: "Horse resting zone for your two-wheeled friend.", answer: "within" },
  { id: 5, text: "The bed that’s been abandoned for so long.", answer: "our" },

  // Common Riddle
  { id: 6, text: "One step closer to death.", answer: "treasure" },

  // Hrishikesh's Riddles
  { id: 7, text: "I have 75% less visibility area than you.", answer: "only" },
  { id: 8, text: "The scholarship one.", answer: "the" },
  { id: 9, text: "Charging station.", answer: "brave" },
  { id: 10, text: "The privately non-private shitty place.", answer: "will" },
  { id: 11, text: "The fan-favourite bathroom.", answer: "find" },

  // Partha's Riddles
  { id: 12, text: "The gateway to heaven.", answer: "clues" },
  { id: 13, text: "The coat hanger.", answer: "hide" },
  { id: 14, text: "The store room.", answer: "deep" },
  { id: 15, text: "Baaghi 4 himself.", answer: "awaiting" },
  { id: 16, text: "Black, white, and red — the trio of the table.", answer: "the" },

  // Roshan's Riddles
  { id: 17, text: "Ciggi-catching spot for keen eyes.", answer: "shiva" },
  { id: 18, text: "The shade of the mango tree.", answer: "spirits" },
  { id: 19, text: "The one with the mysterious number 600103.00.", answer: "guide" },
  { id: 20, text: "The senior who terrifies everyone the most.", answer: "you" },
  { id: 21, text: "The sweet tooth.", answer: "to" },

  // Salman's Riddles
  { id: 22, text: "The one who’s never touched any nasha.", answer: "the" },
  { id: 23, text: "Vasuli bhai.", answer: "hostel" },
  { id: 24, text: "The western komod that’s never used for pooping.", answer: "legends" },
  { id: 25, text: "The bed that’s always stays abandoned.", answer: "guard" },
  { id: 26, text: "The washing centre.", answer: "the" },
];
