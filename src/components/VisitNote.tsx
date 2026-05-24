import { questionTemplates } from "../content";
import { getVisitRecommendations } from "../recommendations";
import { defaultPrepData } from "../storage";
import type { AppState, ViewId } from "../types";
import { Button, Card, Notice } from "./common";

function line(value: string) {
  return value.trim() || "未填写";
}

export function VisitNote({
  state,
  setState,
  onNavigate,
}: {
  state: AppState;
  setState: (state: AppState) => void;
  onNavigate: (view: ViewId) => void;
}) {
  const prep = state.prep;
  const selectedQuestions = questionTemplates
    .filter((item) => prep.selectedQuestionIds.includes(item.id))
    .map((item) => item.text);
  const allQuestions = [...selectedQuestions, ...prep.customQuestions];
  const recommendation = getVisitRecommendations(prep);
  const recommendedQuestions = recommendation.questions.filter((item) => !allQuestions.includes(item));

  function resetPrep() {
    setState({ ...state, prep: defaultPrepData });
    onNavigate("prep");
  }

  return (
    <>
      <Card className="visit-note">
        <p className="eyebrow">候诊安舒站</p>
        <h1>就诊准备小条</h1>
        <dl>
          <div>
            <dt>智能准备建议</dt>
            <dd>{recommendation.patientText}</dd>
          </div>
          <div>
            <dt>建议重点准备</dt>
            <dd>
              <ul>
                {recommendation.prepare.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>可参考咨询方向</dt>
            <dd>{recommendation.suggestedDepartments.join("、")}</dd>
          </div>
          <div>
            <dt>我的主要不适</dt>
            <dd>{line(prep.discomfort)}</dd>
          </div>
          <div>
            <dt>持续时间和变化</dt>
            <dd>{line([prep.startedAt, prep.change].filter(Boolean).join("；"))}</dd>
          </div>
          <div>
            <dt>已用药物或已做检查</dt>
            <dd>{line([prep.medication, prep.checks].filter(Boolean).join("；"))}</dd>
          </div>
          <div>
            <dt>过敏、病史或长期用药提醒</dt>
            <dd>{line([prep.allergy, prep.history, prep.longTermMeds, prep.specialNotes].filter(Boolean).join("；"))}</dd>
          </div>
          <div>
            <dt>我想问医生的问题</dt>
            <dd>
              {[...allQuestions, ...recommendedQuestions].length > 0 ? (
                <ol>
                  {[...allQuestions, ...recommendedQuestions].map((item, index) => (
                    <li key={`${item}-${index}`}>{item}</li>
                  ))}
                </ol>
              ) : (
                "未选择"
              )}
            </dd>
          </div>
          <div>
            <dt>需要及时联系现场医护的情况</dt>
            <dd>
              <ul>
                {recommendation.urgent.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
        <Notice>系统仅根据你填写的不适推荐就诊前可准备的信息和可向医生询问的问题，不提供诊断结论，也不替代医生判断。</Notice>
      </Card>
      <div className="button-grid no-print">
        <Button onClick={() => window.print()}>打印小条</Button>
        <Button variant="quiet" onClick={() => onNavigate("prep")}>
          返回修改
        </Button>
        <Button variant="secondary" onClick={resetPrep}>
          清空重填
        </Button>
      </div>
    </>
  );
}
