import { useEffect, useState } from "react";
import { Calm } from "./components/Calm";
import { Feedback } from "./components/Feedback";
import { FlowGuide } from "./components/FlowGuide";
import { Guide } from "./components/Guide";
import { HospitalSelect } from "./components/HospitalSelect";
import { Home } from "./components/Home";
import { Layout } from "./components/Layout";
import { MicroMap } from "./components/MicroMap";
import { PrepForm } from "./components/PrepForm";
import { QuestionList } from "./components/QuestionList";
import { VisitNote } from "./components/VisitNote";
import { Card } from "./components/common";
import type { AppState, ViewId } from "./types";
import { defaultState, loadState, saveState } from "./storage";

export default function App() {
  const [view, setView] = useState<ViewId>("home");
  const [state, setState] = useState<AppState>(() => {
    if (typeof window === "undefined") return defaultState;
    return loadState();
  });
  const [prepStep, setPrepStep] = useState(0);

  useEffect(() => {
    saveState(state);
  }, [state]);

  function renderView() {
    if (view === "home") return <Home onNavigate={setView} />;
    if (view === "hospital") return <HospitalSelect onNavigate={setView} />;
    if (view === "guide") return <Guide onNavigate={setView} />;
    if (view === "flow") return <FlowGuide onNavigate={setView} />;
    if (view === "map") return <MicroMap />;
    if (view === "calm") return <Calm onNavigate={setView} />;
    if (view === "prep") {
      return <PrepForm state={state} setState={setState} step={prepStep} setStep={setPrepStep} onNavigate={setView} />;
    }
    if (view === "questions") return <QuestionList state={state} setState={setState} onNavigate={setView} />;
    if (view === "note") return <VisitNote state={state} setState={setState} onNavigate={setView} />;
    if (view === "feedback") return <Feedback state={state} setState={setState} />;

    return (
      <Card>
        <p className="eyebrow">建设中</p>
        <h1>{view}</h1>
        <p>这个模块将在后续任务中实现。</p>
      </Card>
    );
  }

  return (
    <Layout view={view} onNavigate={setView}>
      {renderView()}
    </Layout>
  );
}
