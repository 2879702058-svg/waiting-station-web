import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Ear, Eye, Hand, HeartPulse, Wind } from "lucide-react";
import { calmingCards, worryAdvice, worryOptions } from "../content";
import type { ViewId } from "../types";
import { Button, Card, Chip, Notice } from "./common";

type CalmTool = "breath" | "body" | "grounding" | "worry";

const phases = [
  { label: "吸气", seconds: 4, cue: "鼻子慢慢吸气", tone: "inhale" },
  { label: "停留", seconds: 2, cue: "肩膀放松，不要憋紧", tone: "hold" },
  { label: "呼气", seconds: 6, cue: "嘴巴慢慢呼气，比吸气更长", tone: "exhale" },
] as const;

const bodySteps = [
  "把双脚平放在地面，感受鞋底和地面的接触。",
  "轻轻放松肩膀，让肩膀向下沉一点。",
  "放松下颌，舌尖轻轻离开上颚。",
  "手掌自然放在腿上，感受手心温度。",
  "告诉自己：我现在只需要完成下一小步。",
];

const groundingSteps = [
  { icon: <Eye size={20} />, label: "看见 5 样东西", detail: "例如叫号屏、椅子、门牌、地面、自己的手。" },
  { icon: <Hand size={20} />, label: "感受 4 种触感", detail: "例如衣服、椅背、手机外壳、脚底。" },
  { icon: <Ear size={20} />, label: "听见 3 种声音", detail: "例如广播、人声、脚步声。" },
  { icon: <Wind size={20} />, label: "做 2 次慢呼吸", detail: "吸气 4 秒，呼气 6 秒。" },
  { icon: <CheckCircle2 size={20} />, label: "确认 1 个下一步", detail: "比如看流程、查楼层或准备小条。" },
];

const tools: { id: CalmTool; title: string; subtitle: string }[] = [
  { id: "breath", title: "跟屏幕呼吸", subtitle: "1 分钟，把节奏慢下来" },
  { id: "body", title: "身体放松", subtitle: "适合肩颈紧、坐立不安" },
  { id: "grounding", title: "注意力锚定", subtitle: "适合脑子停不下来" },
  { id: "worry", title: "担心转行动", subtitle: "把担心变成下一步" },
];

export function Calm({ onNavigate }: { onNavigate: (view: ViewId) => void }) {
  const [tool, setTool] = useState<CalmTool>("breath");
  const [running, setRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [remaining, setRemaining] = useState<number>(phases[0].seconds);
  const [round, setRound] = useState(1);
  const [bodyIndex, setBodyIndex] = useState(0);
  const [groundingDone, setGroundingDone] = useState<string[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [worry, setWorry] = useState("");

  const phase = phases[phaseIndex];
  const advice = worry ? worryAdvice[worry] : undefined;
  const progressLabel = useMemo(() => `第 ${round} / 5 轮`, [round]);
  const phaseTotal = phase.seconds;
  const phaseProgress = ((phaseTotal - remaining + 1) / phaseTotal) * 100;

  useEffect(() => {
    if (!running) return;

    const timer = window.setInterval(() => {
      setRemaining((current) => {
        if (current > 1) return current - 1;

        setPhaseIndex((index) => {
          const nextIndex = (index + 1) % phases.length;
          if (nextIndex === 0) {
            setRound((currentRound) => {
              if (currentRound >= 5) {
                setRunning(false);
                return 5;
              }
              return currentRound + 1;
            });
          }
          return nextIndex;
        });

        return phases[(phaseIndex + 1) % phases.length].seconds;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running, phaseIndex]);

  function resetBreath() {
    setRunning(false);
    setPhaseIndex(0);
    setRemaining(phases[0].seconds);
    setRound(1);
  }

  function toggleGrounding(label: string) {
    setGroundingDone((items) => (items.includes(label) ? items.filter((item) => item !== label) : [...items, label]));
  }

  return (
    <>
      <Card>
        <p className="eyebrow">放松一下</p>
        <h1>先选一个适合现在的方式</h1>
        <p>候诊时不一定要“完全不紧张”，只要把身体和注意力拉回可控的下一步。</p>
      </Card>

      <div className="calm-tool-grid">
        {tools.map((item) => (
          <button type="button" key={item.id} className={tool === item.id ? "calm-tool active" : "calm-tool"} onClick={() => setTool(item.id)}>
            <strong>{item.title}</strong>
            <span>{item.subtitle}</span>
          </button>
        ))}
      </div>

      {tool === "breath" && (
        <>
          <Card className={`breath-stage breath-${phase.tone}`}>
            <div className="breath-screen">
              <div className="breath-halo">
                <HeartPulse size={34} />
              </div>
              <strong>{phase.label}</strong>
              <span>{remaining}</span>
              <small>{phase.cue}</small>
            </div>
            <div className="phase-bar" aria-label="当前呼吸阶段进度">
              <span style={{ width: `${phaseProgress}%` }} />
            </div>
            <p className="phase-caption">{progressLabel} · 跟着颜色和数字变化做，不需要追求标准。</p>
            <div className="button-grid two-buttons">
              <Button onClick={() => setRunning((value) => !value)}>{running ? "暂停" : "开始"}</Button>
              <Button variant="quiet" onClick={resetBreath}>重来</Button>
            </div>
          </Card>
          <Notice>如果你正在明显胸痛、气短、头晕或身体不适，请不要只做放松练习，及时联系现场医护。</Notice>
        </>
      )}

      {tool === "body" && (
        <Card>
          <p className="eyebrow">身体放松扫描</p>
          <h2>{bodySteps[bodyIndex]}</h2>
          <p>每一步停留 10 秒左右。做不到也没关系，只要注意到身体正在紧绷，就已经开始放松了。</p>
          <div className="body-progress">
            {bodySteps.map((item, index) => (
              <span key={item} className={index <= bodyIndex ? "active" : ""} />
            ))}
          </div>
          <div className="button-grid two-buttons">
            <Button variant="quiet" onClick={() => setBodyIndex(Math.max(0, bodyIndex - 1))}>上一步</Button>
            <Button onClick={() => setBodyIndex(Math.min(bodySteps.length - 1, bodyIndex + 1))}>下一步</Button>
          </div>
        </Card>
      )}

      {tool === "grounding" && (
        <Card>
          <p className="eyebrow">注意力锚定</p>
          <h2>5-4-3-2-1 回到现场</h2>
          <p>当脑子一直想坏结果时，可以用这个方法把注意力拉回眼前。</p>
          <div className="grounding-list">
            {groundingSteps.map((item) => (
              <button
                type="button"
                key={item.label}
                className={groundingDone.includes(item.label) ? "done" : ""}
                onClick={() => toggleGrounding(item.label)}
              >
                {item.icon}
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.detail}</small>
                </span>
              </button>
            ))}
          </div>
        </Card>
      )}

      {tool === "worry" && (
        <>
          <Card>
            <h2>我现在最担心什么？</h2>
            <div className="chip-row">
              {worryOptions.map((item) => (
                <Chip key={item} selected={worry === item} onClick={() => setWorry(item)}>
                  {item}
                </Chip>
              ))}
            </div>
            {advice && (
              <div className="smart-calm">
                <strong>{advice.title}</strong>
                <ul>
                  {advice.actions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {advice.nextView && (
                  <Button variant="secondary" onClick={() => onNavigate(advice.nextView as ViewId)}>
                    按建议继续
                  </Button>
                )}
              </div>
            )}
          </Card>
          <Card>
            <h2>安抚卡片</h2>
            <p className="calm-card">{calmingCards[cardIndex]}</p>
            <Button variant="secondary" onClick={() => setCardIndex((cardIndex + 1) % calmingCards.length)}>换一张</Button>
          </Card>
        </>
      )}

      <Button onClick={() => onNavigate("prep")}>去准备就诊小条</Button>
    </>
  );
}
