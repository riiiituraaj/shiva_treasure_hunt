export interface UserProgress {
  currentRiddle: number;
  completedRiddles: number[];
  isComplete: boolean;
}

const STORAGE_PREFIX = "shiva_hunt_";

export const saveProgress = (username: string, progress: UserProgress) => {
  localStorage.setItem(`${STORAGE_PREFIX}${username}`, JSON.stringify(progress));
};

export const loadProgress = (username: string): UserProgress => {
  const saved = localStorage.getItem(`${STORAGE_PREFIX}${username}`);
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    currentRiddle: 0,
    completedRiddles: [],
    isComplete: false,
  };
};

export const resetProgress = (username: string) => {
  localStorage.removeItem(`${STORAGE_PREFIX}${username}`);
};

export const resetAllProgress = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(STORAGE_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
};

export const getAllProgress = () => {
  const progress: Record<string, UserProgress> = {};
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(STORAGE_PREFIX)) {
      const username = key.replace(STORAGE_PREFIX, "");
      const data = localStorage.getItem(key);
      if (data) {
        progress[username] = JSON.parse(data);
      }
    }
  });
  return progress;
};
