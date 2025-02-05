import "ol/ol.css";
import { useState } from "react";
import { useRecoilState } from "recoil";

import { popFlowAnalysisConditionState } from "@src/stores/AnalysisCondition";
import { MONTH, TEMP_EMD, TEMP_SGG, YEAR } from "@src/utils/analysis-constant";

/**
 * 유동인구현황 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */
export const PopFlow = () => {
  // 분석조건 상태
  const [popFlowAnalysisCondition, setPopFlowAnalysisCondition] = useRecoilState(popFlowAnalysisConditionState);
  const { inputWkt, sgg, emd, year, month } = popFlowAnalysisCondition;

  const setInputWkt = (value: string) => setPopFlowAnalysisCondition({...popFlowAnalysisCondition, inputWkt: value});
  const setSgg = (value: string) => setPopFlowAnalysisCondition({...popFlowAnalysisCondition, sgg: value});
  const setEmd = (value: string) => setPopFlowAnalysisCondition({...popFlowAnalysisCondition, emd: value});
  const setYear = (value: number) => setPopFlowAnalysisCondition({...popFlowAnalysisCondition, year: value});
  const setMonth = (value: number) => setPopFlowAnalysisCondition({...popFlowAnalysisCondition, month: value});

  const [areaType, setAreaType] = useState<string>('admin');

  // 이벤트 핸들러
  const handleAreaTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setAreaType(e.target.value); 

  return (
    <div>
      <div className="information">
        <div className="title info-icon">유동인구현황</div>
        <div className="explanation">유동인구 현황 조회 및 데이터 시각화를 수행하는 서비스 입니다.</div>
      </div>

      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">영역 설정</div>
        <div className="analysis-content">
          <label className="custom-radio">  
            <input type="radio" name="option" value="admin" checked={areaType === 'admin'} onChange={handleAreaTypeChange}/>
            <span className="radio-mark"></span> 행정구역
          </label>
          <label className="custom-radio">
            <input type="radio" name="option" value="user" checked={areaType === 'user'} onChange={handleAreaTypeChange}/>
            <span className="radio-mark"></span> 사용자영역
          </label>                                                   
        </div>
        {areaType === 'admin' && (  
          <div id="admin-area-select" className="clear-both search-condition mar-top-10">
            <div className="condition-list mar-left-13">                            
              <label>시군구</label>
              <select className="custom-select" value={sgg || ''} onChange={e => setSgg(e.target.value)}>
                {Object.entries(TEMP_SGG).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>    
            <div className="condition-list mar-left-13">                            
              <label>읍면동</label>
              <select className="custom-select" value={emd || ''} onChange={e => setEmd(e.target.value)}>
                {Object.entries(TEMP_EMD).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>                                  
          </div> 
        )}
        {areaType === 'user' && (
          <div id="user-area-select" className="clear-both condition-area mar-top-10">
            <div className="list-wrapper">      
              <button type="button" className="circle"></button>  
              <button type="button" className="square"></button> 
              <button type="button" className="pentagon"></button>  
            </div> 
            <div className="button-wrapper">
              <button type="button" className="normal-button apply">초기화</button>
            </div>                        
          </div>
        )}
      </div>
    
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">분석조건 설정 </div>
        <div className="search-condition">
          <div className="condition-list mar-left-13">
            <label>기간 선택</label>
            <select className="custom-select" value={year || ''} onChange={e => setYear(Number(e.target.value))}>
              {YEAR.map(value => (
                <option key={value} value={value}>{value + '년'}</option>
              ))}
            </select>
            <select className="custom-select" value={month || ''} onChange={e => setMonth(Number(e.target.value))}>
              {MONTH.map((value) => (
                <option key={value} value={value}>{value + '월'}</option>
              ))}
            </select>
          </div>
        </div>
      </div>  

      <div className="button-large-wrapper">
        <button type="button" className="large-button apply">
          <span className="txt">조회</span>
        </button>
      </div>
    </div>
  );
}
