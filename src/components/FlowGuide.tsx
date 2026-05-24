import { useState } from "react";
import { flowSteps } from "../content";
import type { ViewId } from "../types";
import { Button, Card } from "./common";

export function FlowGuide({ onNavigate }: { onNavigate: (view: ViewId) => void }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <Card>
        <p className="eyebrow">看候诊流程</p>
        <h1>下一步该做什么？</h1>
        <p>以下为通用门诊流程提示，具体以现场叫号屏、窗口和医护说明为准。</p>
      </Card>
      <div className="step-list">
        {flowSteps.map((step, index) => (
          <button
            type="button"
            className={`step-card ${openIndex === index ? "step-card-open" : ""}`}
            key={step.title}
            onClick={() => setOpenIndex(index)}
          >
            <span className="step-number">{index + 1}</span>
            <span>
              <strong>{step.title}</strong>
              <em>{step.summary}</em>
              {openIndex === index && <small>{step.detail}</small>}
            </span>
          </button>
        ))}
      </div>
      <div className="button-grid">
        <Button onClick={() => onNavigate("map")}>查看院内微地图</Button>
        <Button variant="quiet" onClick={() => onNavigate("prep")}>
          准备就诊小条
        </Button>
      </div>
    </>
  );
}
