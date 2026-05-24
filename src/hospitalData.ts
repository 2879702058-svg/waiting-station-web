import type { FloorDepartment, GuideCard, Hospital } from "./types";

export const hospitals: Hospital[] = [
  {
    id: "tmu2",
    name: "天津医科大学第二医院",
    shortName: "天津医大二院",
    address: "天津市河西区平江道23号",
    hotline: "022-88328832",
    outpatientHours: "周一至周日 上午08:00-12:00，下午13:30-17:00",
    assets: {
      guide: "/assets/tmu2-guide.jpg",
      campusMap: "/assets/tmu2-campus-map.jpg",
      floorIndex: "/assets/tmu2-floor-index.jpg",
    },
  },
];

export const guideCards: GuideCard[] = [
  {
    title: "预约挂号，节省时间",
    detail: "可通过手机 App、电话、自助机等方式预约挂号，减少现场等待。",
    tips: ["提前了解科室和医生出诊信息。", "预约后按提示时间到院取号或报到。", "不会操作手机的患者可请家属或志愿者协助。"],
  },
  {
    title: "按时就诊，注意无效爽约",
    detail: "就诊当日请按预约时段取号报到，避免错过就诊资格。",
    tips: ["建议提前到院，但不必过早聚集。", "注意叫号屏和诊区广播。", "如错过叫号，请咨询服务台或护士站。"],
  },
  {
    title: "常规取药，避开早高峰",
    detail: "如只是取常规用药，可尽量避开上午就诊高峰，减少排队时间。",
    tips: ["取药前确认是否已缴费。", "取药后核对姓名、药名、剂量和用法。", "药物用法不清楚时，应向医生或药师确认。"],
  },
  {
    title: "领取正式票据",
    detail: "如需正式医疗票据，可在有效期内按医院指引到自助设备或窗口办理。",
    tips: ["保留好缴费凭证。", "票据、清单和报告可分开保存。", "报销前确认单位或医保要求。"],
  },
  {
    title: "一码通与报告查询",
    detail: "检查检验结果可按医院指引通过服务号、自助机或窗口查询。",
    tips: ["部分检查需要等待报告生成。", "报告异常不等于诊断结论，应由医生解释。", "复诊时请带齐报告或截图。"],
  },
  {
    title: "24 小时服务热线",
    detail: "如有流程问题，可拨打医院 24 小时医疗服务热线咨询。",
    tips: ["天津医科大学第二医院服务热线：022-88328832。", "紧急或明显不适时，请直接联系现场医护。"],
  },
];

export const floorDepartments: FloorDepartment[] = [
  { floor: "1F", names: ["急诊部", "挂号收费", "西药房", "儿科门急诊", "门诊服务中心", "抽血室", "医保办公室", "医学影像科", "门急诊化验室", "住院处"] },
  { floor: "2F", names: ["口腔科", "内科系统", "血液科", "消化科", "肾内科", "风湿免疫科", "肿瘤科", "营养科", "针灸科", "康复医学科", "中医科", "中药房", "心脏科", "心内科", "心血管外科", "神经内科", "神经外科", "内分泌科", "伽马刀中心", "医学影像科", "男科门诊部", "盆底疾病诊疗中心", "超声科"] },
  { floor: "3F", names: ["皮肤科", "专家门诊", "临床心理科", "麻醉门诊", "全科医学科", "老年病科", "内镜", "血管功能检查室", "甲状腺门诊", "核医学科", "眼耳鼻喉科", "眼科", "耳鼻喉科", "呼吸与危重症医学科", "感染疾病科"] },
  { floor: "4F", names: ["妇产科", "计划生育科", "生殖助孕科", "新生儿科", "泌尿外科门诊部", "膀胱灌药室", "外科系统", "骨科", "胸外科", "换药室", "肛肠科", "抗栓门诊", "血管介入门诊", "血管外科", "胃肠外科", "疼痛治疗中心", "疝外科", "肝胆胰外科", "盆底疾病咨询检查室", "第二手术室"] },
];

export function findDepartments(query: string) {
  const text = query.trim();
  if (!text) return floorDepartments;
  return floorDepartments
    .map((group) => ({ ...group, names: group.names.filter((name) => name.includes(text)) }))
    .filter((group) => group.names.length > 0);
}
