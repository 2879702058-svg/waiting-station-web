import { useState } from "react";
import { questionTemplates } from "../content";
import { getVisitRecommendations } from "../recommendations";
import type { AppState, ViewId } from "../types";
import { Button, Card, Chip } from "./common";

export function QuestionList({
  state,
  setState,
  onNavigate,
}: {
  state: AppState;
  setState: (state: AppState) => void;
  onNavigate: (view: ViewId) => void;
}) {
  const [custom, setCustom] = useState("");
  const prep = state.prep;
  const recommendation = getVisitRecommendations(prep);

  function toggle(id: string) {
    const exists = prep.selectedQuestionIds.includes(id);
    setState({
      ...state,
      prep: {
        ...prep,
        selectedQuestionIds: exists
          ? prep.selectedQuestionIds.filter((item) => item !== id)
          : [...prep.selectedQuestionIds, id],
      },
    });
  }

  function addCustom() {
    const text = custom.trim();
    if (!text) return;
    setState({
      ...state,
      prep: { ...prep, customQuestions: [...prep.customQuestions, text] },
    });
    setCustom("");
  }

  function removeCustom(index: number) {
    setState({
      ...state,
      prep: { ...prep, customQuestions: prep.customQuestions.filter((_, itemIndex) => itemIndex !== index) },
    });
  }

  return (
    <>
      <Card>
        <p className="eyebrow">问医生问题清单</p>
        <h1>进诊室前先想好要问什么</h1>
        <p>勾选后会自动加入就诊准备小条。</p>
      </Card>
      <Card>
        <h2>常见问题模板</h2>
        <div className="chip-row">
          {questionTemplates.map((item) => (
            <Chip key={item.id} selected={prep.selectedQuestionIds.includes(item.id)} onClick={() => toggle(item.id)}>
              {item.text}
            </Chip>
          ))}
        </div>
      </Card>
      <Card>
        <h2>根据不适推荐</h2>
        <p>{recommendation.patientText}</p>
        <div className="recommend-box">
          <strong>建议咨询方向</strong>
          <p>{recommendation.suggestedDepartments.join("、")}</p>
        </div>
        <div className="chip-row">
          {recommendation.questions.map((item) => (
            <Chip key={item} selected={prep.customQuestions.includes(item)} onClick={() => {
              if (prep.customQuestions.includes(item)) {
                setState({ ...state, prep: { ...prep, customQuestions: prep.customQuestions.filter((question) => question !== item) } });
              } else {
                setState({ ...state, prep: { ...prep, customQuestions: [...prep.customQuestions, item] } });
              }
            }}>
              {item}
            </Chip>
          ))}
        </div>
      </Card>
      <Card>
        <h2>自己添加问题</h2>
        <div className="inline-form">
          <input value={custom} onChange={(event) => setCustom(event.target.value)} placeholder="例如：我需要复诊吗？" />
          <Button onClick={addCustom}>添加</Button>
        </div>
        <div className="custom-list">
          {prep.customQuestions.map((item, index) => (
            <button type="button" key={`${item}-${index}`} onClick={() => removeCustom(index)}>
              {item}
              <span>删除</span>
            </button>
          ))}
        </div>
      </Card>
      <Button onClick={() => onNavigate("note")}>生成就诊准备小条</Button>
    </>
  );
}
