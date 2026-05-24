import { hospitals } from "../hospitalData";
import type { ViewId } from "../types";
import { Button, Card, Notice } from "./common";

export function HospitalSelect({ onNavigate }: { onNavigate: (view: ViewId) => void }) {
  const hospital = hospitals[0];

  return (
    <>
      <Card>
        <p className="eyebrow">选择医院</p>
        <h1>当前示例医院</h1>
        <p>第一版先以天津医科大学第二医院为示例，后续可扩展更多医院。</p>
      </Card>
      <Card className="hospital-card">
        <strong>{hospital.name}</strong>
        <p>{hospital.address}</p>
        <p>门诊时间：{hospital.outpatientHours}</p>
        <p>服务热线：{hospital.hotline}</p>
        <span>已选择</span>
      </Card>
      <div className="button-grid">
        <Button onClick={() => onNavigate("guide")}>查看就医攻略</Button>
        <Button variant="quiet" onClick={() => onNavigate("map")}>查看院内导览</Button>
      </div>
      <Notice>当前版本仅提供一个医院选项，用于比赛演示和原型验证。</Notice>
    </>
  );
}
