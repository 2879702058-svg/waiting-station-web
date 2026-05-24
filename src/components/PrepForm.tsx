import type { AppState, PrepData, ViewId } from "../types";
import { Button, Card, Notice } from "./common";

const steps = ["主要不适", "已做处理", "重要提醒", "想问医生"];

export function PrepForm({
  state,
  setState,
  step,
  setStep,
  onNavigate,
}: {
  state: AppState;
  setState: (state: AppState) => void;
  step: number;
  setStep: (step: number) => void;
  onNavigate: (view: ViewId) => void;
}) {
  const prep = state.prep;

  function update(field: keyof PrepData, value: string) {
    setState({ ...state, prep: { ...prep, [field]: value } });
  }

  function next() {
    if (step >= steps.length - 1) {
      onNavigate("questions");
      return;
    }
    setStep(step + 1);
  }

  function previous() {
    setStep(Math.max(0, step - 1));
  }

  return (
    <>
      <Card>
        <p className="eyebrow">诊前准备</p>
        <h1>把要说的话先整理好</h1>
        <div className="progress-row">
          {steps.map((item, index) => (
            <span key={item} className={index <= step ? "progress-on" : ""}>
              {index + 1}
            </span>
          ))}
        </div>
        <p>{steps[step]}</p>
      </Card>
      <Card>
        {step === 0 && (
          <div className="form-grid">
            <label>
              主要哪里不舒服？
              <textarea value={prep.discomfort} onChange={(event) => update("discomfort", event.target.value)} placeholder="例如：咳嗽、头痛、腹痛..." />
            </label>
            <label>
              大概从什么时候开始？
              <input value={prep.startedAt} onChange={(event) => update("startedAt", event.target.value)} placeholder="例如：昨晚、三天前、一个月前" />
            </label>
            <label>
              有没有加重或反复？
              <input value={prep.change} onChange={(event) => update("change", event.target.value)} placeholder="例如：今天更明显，夜间更重" />
            </label>
          </div>
        )}
        {step === 1 && (
          <div className="form-grid">
            <label>
              是否吃过药？
              <textarea value={prep.medication} onChange={(event) => update("medication", event.target.value)} placeholder="写药名或大致描述，不确定可写不清楚" />
            </label>
            <label>
              是否做过检查或带了报告？
              <textarea value={prep.checks} onChange={(event) => update("checks", event.target.value)} placeholder="例如：带了血常规报告、做过CT" />
            </label>
          </div>
        )}
        {step === 2 && (
          <div className="form-grid">
            <label>
              过敏史
              <input value={prep.allergy} onChange={(event) => update("allergy", event.target.value)} placeholder="例如：青霉素过敏；没有可留空" />
            </label>
            <label>
              既往病史
              <input value={prep.history} onChange={(event) => update("history", event.target.value)} placeholder="例如：高血压、糖尿病、哮喘" />
            </label>
            <label>
              正在长期服用的药
              <input value={prep.longTermMeds} onChange={(event) => update("longTermMeds", event.target.value)} placeholder="例如：降压药、降糖药" />
            </label>
            <label>
              特殊情况
              <input value={prep.specialNotes} onChange={(event) => update("specialNotes", event.target.value)} placeholder="例如：孕期、老人、儿童、慢病" />
            </label>
          </div>
        )}
        {step === 3 && (
          <div>
            <p>下一步可以选择常见问题，也可以自己添加想问医生的话。</p>
            <Notice>问题清单会自动进入就诊准备小条。</Notice>
          </div>
        )}
      </Card>
      <div className="button-grid two-buttons">
        <Button variant="quiet" onClick={previous}>
          上一步
        </Button>
        <Button onClick={next}>{step >= steps.length - 1 ? "选择问题" : "下一步"}</Button>
      </div>
      <Button variant="secondary" onClick={() => onNavigate("note")}>
        直接生成小条
      </Button>
    </>
  );
}
