import { guideCards, hospitals } from "../hospitalData";
import type { ViewId } from "../types";
import { Button, Card, Notice } from "./common";

export function Guide({ onNavigate }: { onNavigate: (view: ViewId) => void }) {
  const hospital = hospitals[0];

  return (
    <>
      <Card>
        <p className="eyebrow">{hospital.shortName}</p>
        <h1>门诊就诊攻略</h1>
        <p>把常见可解决问题提前整理成卡片，帮助患者减少反复询问和无效等待。</p>
      </Card>
      <Card>
        <img className="guide-poster" src={hospital.assets.guide} alt="天津医科大学第二医院门诊就诊攻略" />
      </Card>
      <div className="guide-list">
        {guideCards.map((card) => (
          <Card key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.detail}</p>
            <ul>
              {card.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <Notice>攻略内容用于就医流程辅助，具体以医院现场通知、窗口说明和医护人员解释为准。</Notice>
      <Button onClick={() => onNavigate("flow")}>查看候诊流程</Button>
    </>
  );
}
