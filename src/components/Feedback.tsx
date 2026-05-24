import { volunteerBoundaries } from "../content";
import type { AppState, FeedbackData } from "../types";
import { Button, Card, Chip, Notice } from "./common";

const unclearTopics = ["流程", "位置", "等待时间", "检查、缴费或取药", "不知道怎么和医生说"];
const helpfulness = ["有帮助", "一般", "没有帮助"];

export function Feedback({ state, setState }: { state: AppState; setState: (state: AppState) => void }) {
  const feedback = state.feedback;

  function update(field: keyof FeedbackData, value: string) {
    setState({ ...state, feedback: { ...feedback, [field]: value } });
  }

  return (
    <>
      <Card>
        <p className="eyebrow">反馈与志愿者说明</p>
        <h1>哪里还不清楚？</h1>
        <p>第一版仅做本机模拟反馈，用于展示服务闭环。</p>
      </Card>
      <Card>
        <h2>今天最不清楚的是</h2>
        <div className="chip-row">
          {unclearTopics.map((item) => (
            <Chip key={item} selected={feedback.unclearTopic === item} onClick={() => update("unclearTopic", item)}>
              {item}
            </Chip>
          ))}
        </div>
      </Card>
      <Card>
        <h2>这个工具是否有帮助？</h2>
        <div className="chip-row">
          {helpfulness.map((item) => (
            <Chip key={item} selected={feedback.helpfulness === item} onClick={() => update("helpfulness", item)}>
              {item}
            </Chip>
          ))}
        </div>
        <label className="feedback-text">
          一句话建议
          <textarea value={feedback.suggestion} onChange={(event) => update("suggestion", event.target.value)} placeholder="例如：希望地图再清楚一点" />
        </label>
        <Button onClick={() => window.alert("已记录在本机演示数据中。")}>提交反馈</Button>
      </Card>
      <Card>
        <h2>志愿者协助边界</h2>
        <ul className="boundary-list">
          {volunteerBoundaries.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
      <Notice>志愿者协助页面使用，不进行诊断、病情解释或用药建议。</Notice>
    </>
  );
}
