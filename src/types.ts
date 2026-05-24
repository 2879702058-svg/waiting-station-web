export type ViewId =
  | "home"
  | "hospital"
  | "flow"
  | "map"
  | "guide"
  | "calm"
  | "prep"
  | "questions"
  | "note"
  | "feedback";

export type PrepData = {
  discomfort: string;
  startedAt: string;
  change: string;
  medication: string;
  checks: string;
  allergy: string;
  history: string;
  longTermMeds: string;
  specialNotes: string;
  customQuestions: string[];
  selectedQuestionIds: string[];
};

export type FeedbackData = {
  unclearTopic: string;
  helpfulness: string;
  suggestion: string;
};

export type AppState = {
  prep: PrepData;
  feedback: FeedbackData;
};

export type FlowStep = {
  title: string;
  summary: string;
  detail: string;
};

export type MapPlace = {
  id: string;
  name: string;
  x: number;
  y: number;
  note: string;
};

export type QuestionTemplate = {
  id: string;
  text: string;
};

export type Hospital = {
  id: string;
  name: string;
  shortName: string;
  address: string;
  hotline: string;
  outpatientHours: string;
  assets: {
    guide: string;
    campusMap: string;
    floorIndex: string;
  };
};

export type GuideCard = {
  title: string;
  detail: string;
  tips: string[];
};

export type FloorDepartment = {
  floor: string;
  names: string[];
};
