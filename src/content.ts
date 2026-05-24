import type { FlowStep, MapPlace, QuestionTemplate } from "./types";

export const flowSteps: FlowStep[] = [
  {
    title: "挂号后",
    summary: "先确认候诊区、诊室或叫号屏信息。",
    detail: "请查看挂号凭证、叫号屏或诊室门口提示，确认自己是否在对应候诊区。",
  },
  {
    title: "候诊中",
    summary: "关注叫号屏，整理材料，不必反复跑动。",
    detail: "等待时可以先准备症状、用药、检查报告和想问医生的问题。",
  },
  {
    title: "叫号后",
    summary: "前往对应诊室或诊室门口等待。",
    detail: "如果错过叫号或不确定位置，请咨询现场服务台或医护人员。",
  },
  {
    title: "开检查后",
    summary: "根据指引前往缴费、检查或取报告。",
    detail: "不同医院流程可能不同，请以现场窗口、叫号屏和医护说明为准。",
  },
  {
    title: "取药与复诊",
    summary: "确认用药、复诊时间和异常情况处理方式。",
    detail: "离开诊室前可以向医生确认药物用法、复诊安排和需要及时就医的情况。",
  },
];

export const mapPlaces: MapPlace[] = [
  { id: "waiting", name: "候诊区", x: 22, y: 52, note: "等待叫号、整理诊前信息的主要区域。" },
  { id: "clinic", name: "诊室", x: 70, y: 34, note: "叫号后按屏幕或门口提示进入对应诊室。" },
  { id: "desk", name: "服务台", x: 48, y: 70, note: "流程不清楚、身体明显不适时，请联系现场人员。" },
  { id: "pay", name: "缴费处", x: 24, y: 22, note: "检查、药品等费用通常需按医院流程完成缴费。" },
  { id: "check", name: "检查处", x: 72, y: 66, note: "医生开具检查后，按指引前往对应检查区域。" },
  { id: "pharmacy", name: "药房", x: 46, y: 22, note: "完成缴费后，可按医院提示前往药房取药。" },
];

export const calmingCards = [
  "你现在需要做的不是立刻解决所有问题，而是先把要说的话准备好。",
  "如果身体明显不适，请及时联系现场医护或服务台。",
  "等待期间可以先整理症状、用药和想问医生的问题。",
  "不确定流程时，先确认候诊区和叫号屏，再决定下一步。",
];

export const worryOptions = ["不知道还要等多久", "怕错过叫号", "不知道怎么和医生说", "担心检查或费用", "身体不舒服", "不知道去哪一层"];

export const worryAdvice: Record<string, { title: string; actions: string[]; nextView?: string }> = {
  不知道还要等多久: {
    title: "先把等待变成准备时间",
    actions: ["查看叫号屏或诊区门口提示。", "先完成就诊小条，减少进诊室后的慌乱。", "做一轮 30 秒慢呼吸。"],
    nextView: "prep",
  },
  怕错过叫号: {
    title: "先确认叫号信息",
    actions: ["确认自己所在诊区是否正确。", "把手机调成正常音量，留意叫号屏。", "如已错过叫号，请咨询护士站或服务台。"],
    nextView: "flow",
  },
  不知道怎么和医生说: {
    title: "用小条帮你组织表达",
    actions: ["先写主要不适和开始时间。", "补充用过什么药、带了什么报告。", "从问题模板中选 2-3 个最想问的问题。"],
    nextView: "prep",
  },
  担心检查或费用: {
    title: "把担心变成可询问的问题",
    actions: ["可以问医生检查目的是什么。", "可以问检查前是否需要空腹或停药。", "缴费、报告和票据按医院现场指引办理。"],
    nextView: "questions",
  },
  身体不舒服: {
    title: "优先联系现场人员",
    actions: ["如果症状明显或加重，请及时联系现场医护。", "不要只依靠舒缓练习。", "可以让家属或志愿者协助说明情况。"],
    nextView: "feedback",
  },
  不知道去哪一层: {
    title: "先查楼层索引",
    actions: ["进入院内微地图。", "输入科室名称查询楼层。", "到院后以现场标识和服务台说明为准。"],
    nextView: "map",
  },
};

export const questionTemplates: QuestionTemplate[] = [
  { id: "cause", text: "我这个情况可能是什么原因？" },
  { id: "checks", text: "需要做哪些检查？" },
  { id: "before-check", text: "检查前需要注意什么？" },
  { id: "medicine", text: "这个药怎么吃？" },
  { id: "side-effect", text: "有什么副作用需要注意？" },
  { id: "return", text: "什么情况下需要复诊？" },
  { id: "urgent", text: "回家后哪些情况要及时就医？" },
  { id: "daily", text: "饮食、运动、休息需要注意什么？" },
];

export const volunteerBoundaries = [
  "可以协助扫码。",
  "可以说明页面怎么使用。",
  "可以帮助打印就诊小条。",
  "不解释病情。",
  "不判断是否需要加号。",
  "不承诺等待时间。",
  "不提供用药建议。",
];
