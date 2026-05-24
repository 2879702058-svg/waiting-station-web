import { describe, expect, it } from "vitest";
import { getVisitRecommendations } from "./recommendations";

describe("getVisitRecommendations", () => {
  it("recommends respiratory preparation without exposing disease names", () => {
    const result = getVisitRecommendations({
      discomfort: "发热、咳嗽、咽痛两天",
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
    });

    expect(result.title).toContain("发热");
    expect(result.questions).toContain("是否需要做血常规、病原学检测或影像检查？");
    expect(result.hiddenClinicalHints.join(" ")).toContain("呼吸道");
    expect(result.patientText).not.toMatch(/肺炎|感染|流感|支气管炎/);
  });

  it("falls back to general preparation for unknown symptoms", () => {
    const result = getVisitRecommendations({
      discomfort: "说不清哪里不舒服",
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
    });

    expect(result.id).toBe("general");
    expect(result.prepare).toContain("主要不适出现的时间、变化过程和最影响生活的表现。");
  });
});
