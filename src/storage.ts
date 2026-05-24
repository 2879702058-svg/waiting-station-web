import type { AppState, FeedbackData, PrepData } from "./types";

const STORAGE_KEY = "waiting-station-state-v1";

export const defaultPrepData: PrepData = {
  discomfort: "",
  startedAt: "",
  change: "",
  medication: "",
  checks: "",
  allergy: "",
  history: "",
  longTermMeds: "",
  specialNotes: "",
  customQuestions: [],
  selectedQuestionIds: [],
};

export const defaultFeedbackData: FeedbackData = {
  unclearTopic: "",
  helpfulness: "",
  suggestion: "",
};

export const defaultState: AppState = {
  prep: defaultPrepData,
  feedback: defaultFeedbackData,
};

export function loadState(): AppState {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState;

  try {
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      prep: { ...defaultPrepData, ...parsed.prep },
      feedback: { ...defaultFeedbackData, ...parsed.feedback },
    };
  } catch {
    return defaultState;
  }
}

export function saveState(state: AppState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearState() {
  window.localStorage.removeItem(STORAGE_KEY);
}
