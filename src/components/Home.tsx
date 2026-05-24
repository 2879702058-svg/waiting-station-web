import { Building2, ClipboardList, HeartPulse, Map, MessageSquare, Route } from "lucide-react";
import type { ViewId } from "../types";
import { Button, Card, Notice } from "./common";

export function Home({ onNavigate }: { onNavigate: (view: ViewId) => void }) {
  return (
    <>
      <Card className="hero-card">
        <p className="eyebrow">我正在门诊候诊</p>
        <h1>候诊安舒站</h1>
        <p>扫码即用，帮你看清流程、缓解紧张、准备好见医生前要说的话。</p>
        <div className="button-grid">
          <Button variant="quiet" onClick={() => onNavigate("hospital")}>
            <Building2 size={18} /> 选择医院
          </Button>
          <Button onClick={() => onNavigate("flow")}>
            <Route size={18} /> 看候诊流程
          </Button>
          <Button variant="secondary" onClick={() => onNavigate("calm")}>
            <HeartPulse size={18} /> 放松一下
          </Button>
          <Button variant="quiet" onClick={() => onNavigate("prep")}>
            <ClipboardList size={18} /> 准备就诊小条
          </Button>
        </div>
      </Card>
      <Card>
        <h2>常用入口</h2>
        <div className="quick-grid">
          <button type="button" onClick={() => onNavigate("map")}>
            <Map size={20} />
            院内微地图
          </button>
          <button type="button" onClick={() => onNavigate("questions")}>
            <MessageSquare size={20} />
            问医生问题
          </button>
          <button type="button" onClick={() => onNavigate("guide")}>
            <Route size={20} />
            就医攻略
          </button>
        </div>
      </Card>
      <Notice>本工具不替代诊疗，不采集手机号、身份证号或病历号。身体明显不适时，请及时联系现场医护或服务台。</Notice>
    </>
  );
}
