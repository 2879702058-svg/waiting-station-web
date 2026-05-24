import { useState } from "react";
import { findDepartments, hospitals } from "../hospitalData";
import { Card, Notice } from "./common";

export function MicroMap() {
  const hospital = hospitals[0];
  const [query, setQuery] = useState("");
  const matches = findDepartments(query);

  return (
    <>
      <Card>
        <p className="eyebrow">{hospital.shortName}</p>
        <h1>院内导览与楼层索引</h1>
        <p>已接入院区平面图和楼层索引图，可先查位置，再按现场标识前往。</p>
      </Card>
      <Card>
        <h2>院区平面图</h2>
        <img className="map-image" src={hospital.assets.campusMap} alt="天津医科大学第二医院院区平面图" />
      </Card>
      <Card>
        <h2>按科室找楼层</h2>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="输入科室，如 儿科、皮肤科、心内科" />
        <div className="floor-results">
          {matches.map((group) => (
            <section key={group.floor}>
              <strong>{group.floor}</strong>
              <p>{group.names.join("、")}</p>
            </section>
          ))}
          {matches.length === 0 && <p>暂未匹配到科室，可查看完整楼层索引图或咨询服务台。</p>}
        </div>
      </Card>
      <Card>
        <h2>完整楼层索引</h2>
        <img className="floor-image" src={hospital.assets.floorIndex} alt="天津医科大学第二医院楼层索引" />
      </Card>
      <Notice>图片来自现场导览资料。由于院内点位可能调整，请以医院现场标识、叫号屏和服务台说明为准。</Notice>
    </>
  );
}
