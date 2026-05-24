import { Activity, Building2, ClipboardList, Home, Map, MessageSquare, Printer, Wind } from "lucide-react";
import type { ReactNode } from "react";
import type { ViewId } from "../types";

const navItems: { id: ViewId; label: string; icon: ReactNode }[] = [
  { id: "home", label: "首页", icon: <Home size={18} /> },
  { id: "hospital", label: "医院", icon: <Building2 size={18} /> },
  { id: "calm", label: "舒缓", icon: <Wind size={18} /> },
  { id: "prep", label: "准备", icon: <ClipboardList size={18} /> },
  { id: "note", label: "小条", icon: <Printer size={18} /> },
];

export function Layout({
  view,
  onNavigate,
  children,
}: {
  view: ViewId;
  onNavigate: (view: ViewId) => void;
  children: ReactNode;
}) {
  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" type="button" onClick={() => onNavigate("home")}>
          <span className="brand-mark">安</span>
          <span>
            <strong>候诊安舒站</strong>
            <small>门诊候诊微服务</small>
          </span>
        </button>
        <button className="icon-link" type="button" onClick={() => onNavigate("map")} aria-label="院内微地图">
          <Map size={20} />
        </button>
        <button className="icon-link" type="button" onClick={() => onNavigate("feedback")} aria-label="反馈说明">
          <MessageSquare size={20} />
        </button>
      </header>
      <div className="page-body">{children}</div>
      <nav className="bottom-nav" aria-label="主要导航">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.id}
            className={view === item.id ? "active" : ""}
            onClick={() => onNavigate(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </main>
  );
}
