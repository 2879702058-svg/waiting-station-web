import type { PrepData } from "./types";

type Recommendation = {
  id: string;
  title: string;
  patientText: string;
  prepare: string[];
  questions: string[];
  urgent: string[];
  suggestedDepartments: string[];
  hiddenClinicalHints: string[];
};

type Scenario = Recommendation & {
  keywords: string[];
};

const scenarios: Scenario[] = [
  {
    id: "respiratory",
    title: "发热、咳嗽、咽痛相关准备",
    keywords: ["发热", "发烧", "咳", "咽", "嗓子", "流涕", "鼻塞", "胸闷", "气短"],
    patientText: "根据你填写的不适，建议重点整理体温变化、咳嗽持续时间、是否胸闷气短、是否接触过发热人员，以及是否使用过退热或止咳药。",
    prepare: ["最高体温、发热开始时间和退热药使用情况。", "咳嗽、咽痛、鼻塞、流涕、胸闷气短等伴随表现。", "近期是否接触发热人员，是否做过抗原、血常规或影像检查。"],
    questions: ["是否需要做血常规、病原学检测或影像检查？", "什么情况下需要复诊或尽快就医？", "药物怎么服用，是否会影响已有用药？"],
    urgent: ["呼吸困难、胸痛明显、意识不清或持续高热时，请及时联系现场医护。"],
    suggestedDepartments: ["呼吸与危重症医学科", "感染疾病科", "发热门诊", "儿科门急诊"],
    hiddenClinicalHints: ["呼吸道感染", "肺炎", "流感", "支气管炎"],
  },
  {
    id: "digestive",
    title: "腹痛、腹泻、呕吐相关准备",
    keywords: ["腹痛", "肚子痛", "腹泻", "拉肚子", "呕吐", "恶心", "胃痛", "便血"],
    patientText: "建议先整理疼痛部位、排便次数、呕吐情况、饮食诱因，以及是否出现脱水或便血等情况。",
    prepare: ["疼痛位置、开始时间、是否越来越重。", "腹泻或呕吐次数，是否有发热、便血、黑便。", "近期饮食、饮酒、用药和既往胃肠疾病情况。"],
    questions: ["是否需要验血、便检、腹部超声或内镜检查？", "饮食和补液需要注意什么？", "哪些情况需要急诊处理？"],
    urgent: ["剧烈腹痛、便血、持续呕吐、明显脱水或意识差时，请及时联系现场医护。"],
    suggestedDepartments: ["消化科", "胃肠外科", "急诊部", "儿科门急诊"],
    hiddenClinicalHints: ["胃肠炎", "阑尾炎", "胆胰疾病"],
  },
  {
    id: "cardio",
    title: "胸痛、心悸、胸闷相关准备",
    keywords: ["胸痛", "胸闷", "心悸", "心慌", "气短", "憋气", "心口"],
    patientText: "建议重点记录不适出现时间、持续多久、活动后是否加重、是否伴随出汗或气短。",
    prepare: ["胸痛或胸闷的部位、持续时间、诱因和缓解方式。", "是否伴随心悸、出汗、气短、头晕或放射痛。", "既往心血管病史、血压、长期用药和近期检查。"],
    questions: ["是否需要心电图、心肌酶或超声检查？", "目前症状是否需要急诊评估？", "日常活动和用药需要注意什么？"],
    urgent: ["胸痛明显、持续不缓解、伴大汗或呼吸困难时，请立即联系现场医护。"],
    suggestedDepartments: ["心脏科", "心内科", "心血管外科", "急诊部"],
    hiddenClinicalHints: ["冠心病", "心律失常", "心衰"],
  },
  {
    id: "neuro",
    title: "头痛、头晕、肢体麻木相关准备",
    keywords: ["头痛", "头晕", "眩晕", "麻木", "无力", "说话不清", "抽搐"],
    patientText: "建议记录症状突然出现还是逐渐出现，是否伴随肢体无力、说话不清、视物不清或呕吐。",
    prepare: ["开始时间、持续时间、是否反复发作。", "是否伴随肢体麻木无力、言语不清、视物不清、呕吐。", "血压、血糖、既往神经系统疾病和近期用药。"],
    questions: ["是否需要神经系统查体或影像检查？", "哪些表现需要立刻急诊处理？", "是否需要调整既往慢病用药？"],
    urgent: ["突然一侧无力、口角歪斜、说话不清、剧烈头痛或意识异常时，请立即联系现场医护。"],
    suggestedDepartments: ["神经内科", "神经外科", "急诊部"],
    hiddenClinicalHints: ["脑卒中", "偏头痛", "眩晕综合征"],
  },
  {
    id: "skin",
    title: "皮疹、瘙痒、过敏相关准备",
    keywords: ["皮疹", "红疹", "瘙痒", "过敏", "荨麻疹", "起包", "脱皮"],
    patientText: "建议整理皮疹出现时间、位置、是否扩散，以及近期饮食、药物、接触物变化。",
    prepare: ["皮疹部位、颜色、是否瘙痒疼痛、是否扩散。", "近期新吃的药、食物、护肤品或接触物。", "是否有发热、呼吸不适、眼唇肿胀等表现。"],
    questions: ["是否需要做过敏相关检查？", "外用药或口服药如何使用？", "哪些情况需要尽快复诊或急诊？"],
    urgent: ["皮疹伴呼吸困难、喉头不适、眼唇明显肿胀时，请及时联系现场医护。"],
    suggestedDepartments: ["皮肤科", "急诊部", "儿科门急诊"],
    hiddenClinicalHints: ["过敏反应", "湿疹", "荨麻疹"],
  },
  {
    id: "urinary",
    title: "尿频、尿痛、腰痛相关准备",
    keywords: ["尿频", "尿急", "尿痛", "血尿", "腰痛", "排尿", "尿不尽"],
    patientText: "建议记录排尿不适、尿色变化、是否发热腰痛，以及既往泌尿系统情况。",
    prepare: ["尿频、尿急、尿痛、血尿出现时间。", "是否伴随发热、腰痛、下腹痛。", "饮水情况、既往结石或泌尿系统病史。"],
    questions: ["是否需要尿常规、泌尿系超声或其他检查？", "饮水和用药需要注意什么？", "什么情况下需要尽快复诊？"],
    urgent: ["高热、剧烈腰痛、血尿明显或排尿困难时，请及时联系现场医护。"],
    suggestedDepartments: ["泌尿外科门诊部", "肾内科", "急诊部"],
    hiddenClinicalHints: ["尿路感染", "泌尿系结石"],
  },
  {
    id: "injury",
    title: "外伤、扭伤、疼痛相关准备",
    keywords: ["外伤", "摔", "扭伤", "骨折", "疼痛", "肿", "关节", "出血"],
    patientText: "建议整理受伤时间、受伤方式、疼痛部位、是否能活动，以及是否有伤口或明显肿胀。",
    prepare: ["受伤时间、地点、原因和疼痛部位。", "是否能活动或负重，是否肿胀、畸形、出血。", "是否已冰敷、包扎或服用止痛药。"],
    questions: ["是否需要拍片或进一步检查？", "是否需要固定、换药或复查？", "回家后活动和护理需要注意什么？"],
    urgent: ["明显畸形、大量出血、不能活动或疼痛剧烈时，请及时联系现场医护。"],
    suggestedDepartments: ["骨科", "换药室", "急诊部"],
    hiddenClinicalHints: ["骨折", "软组织损伤", "关节损伤"],
  },
  {
    id: "pregnancy",
    title: "孕产相关不适准备",
    keywords: ["怀孕", "孕", "产", "胎", "阴道出血", "腹痛", "妇科"],
    patientText: "建议整理孕周、产检情况、是否腹痛或出血，以及既往孕产史和检查报告。",
    prepare: ["孕周、末次月经、产检记录和既往孕产史。", "是否腹痛、阴道出血、胎动异常或发热。", "近期检查报告、用药和过敏史。"],
    questions: ["目前是否需要进一步检查或观察？", "哪些情况需要立即就医？", "用药和日常活动需要注意什么？"],
    urgent: ["孕期腹痛明显、阴道出血、胎动异常或头晕乏力时，请及时联系现场医护。"],
    suggestedDepartments: ["妇产科", "急诊部"],
    hiddenClinicalHints: ["先兆流产", "妊娠相关并发症"],
  },
];

const general: Recommendation = {
  id: "general",
  title: "通用诊前准备",
  patientText: "根据你填写的信息，建议先把主要不适、持续时间、变化过程、已用药物和最想问医生的问题整理清楚。",
  prepare: ["主要不适出现的时间、变化过程和最影响生活的表现。", "已经吃过的药、做过的检查和带来的报告。", "过敏史、既往病史、长期用药和特殊情况。"],
  questions: ["我现在最需要先解决的问题是什么？", "是否需要进一步检查？", "药物怎么使用，什么情况下需要复诊？"],
  urgent: ["如果身体明显不适、症状快速加重或自己无法判断，请及时联系现场医护或服务台。"],
  suggestedDepartments: ["门诊服务中心", "全科医学科", "急诊部"],
  hiddenClinicalHints: [],
};

export function getVisitRecommendations(prep: PrepData): Recommendation {
  const text = [
    prep.discomfort,
    prep.startedAt,
    prep.change,
    prep.medication,
    prep.checks,
    prep.allergy,
    prep.history,
    prep.longTermMeds,
    prep.specialNotes,
    ...prep.customQuestions,
  ].join(" ");

  const matched = scenarios
    .map((scenario) => ({
      scenario,
      score: scenario.keywords.reduce((sum, keyword) => sum + (text.includes(keyword) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score)[0];

  return matched && matched.score > 0 ? matched.scenario : general;
}
