import{W as y,$ as R,aD as K,g as Q,s as Y,a as tt,b as et,q as at,p as rt,_ as u,l as W,c as nt,E as it,H as st,M as ot,e as lt,y as ct,F as pt}from"./mermaid.core-BNfQbfbd.js";import{p as ut}from"./chunk-4BX2VUAB-BgDn1-mI.js";import{p as dt}from"./wardley-RL74JXVD-Z6Bh-a25.js";import{d as I}from"./arc-DlnJOjFQ.js";import{o as gt}from"./ordinal-Cboi1Yqb.js";import"./index-CiTq75Ny.js";import"./_id_-oZxHnoYt.js";import"./blogs-DcFHbcFL.js";import"./route-block-B_A1xBdJ.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./min-DNBZVGiC.js";import"./_baseUniq-mU0tPZXS.js";import"./init-Gi6I4Gst.js";function ft(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function ht(t){return t}function mt(){var t=ht,a=ft,f=null,S=y(0),s=y(R),d=y(0);function o(e){var n,l=(e=K(e)).length,g,h,v=0,c=new Array(l),i=new Array(l),x=+S.apply(this,arguments),w=Math.min(R,Math.max(-R,s.apply(this,arguments)-x)),m,C=Math.min(Math.abs(w)/l,d.apply(this,arguments)),$=C*(w<0?-1:1),p;for(n=0;n<l;++n)(p=i[c[n]=n]=+t(e[n],n,e))>0&&(v+=p);for(a!=null?c.sort(function(A,D){return a(i[A],i[D])}):f!=null&&c.sort(function(A,D){return f(e[A],e[D])}),n=0,h=v?(w-l*$)/v:0;n<l;++n,x=m)g=c[n],p=i[g],m=x+(p>0?p*h:0)+$,i[g]={data:e[g],index:n,value:p,startAngle:x,endAngle:m,padAngle:C};return i}return o.value=function(e){return arguments.length?(t=typeof e=="function"?e:y(+e),o):t},o.sortValues=function(e){return arguments.length?(a=e,f=null,o):a},o.sort=function(e){return arguments.length?(f=e,a=null,o):f},o.startAngle=function(e){return arguments.length?(S=typeof e=="function"?e:y(+e),o):S},o.endAngle=function(e){return arguments.length?(s=typeof e=="function"?e:y(+e),o):s},o.padAngle=function(e){return arguments.length?(d=typeof e=="function"?e:y(+e),o):d},o}var vt=pt.pie,F={sections:new Map,showData:!1},T=F.sections,z=F.showData,xt=structuredClone(vt),yt=u(()=>structuredClone(xt),"getConfig"),St=u(()=>{T=new Map,z=F.showData,ct()},"clear"),wt=u(({label:t,value:a})=>{if(a<0)throw new Error(`"${t}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);T.has(t)||(T.set(t,a),W.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),At=u(()=>T,"getSections"),Dt=u(t=>{z=t},"setShowData"),Ct=u(()=>z,"getShowData"),_={getConfig:yt,clear:St,setDiagramTitle:rt,getDiagramTitle:at,setAccTitle:et,getAccTitle:tt,setAccDescription:Y,getAccDescription:Q,addSection:wt,getSections:At,setShowData:Dt,getShowData:Ct},$t=u((t,a)=>{ut(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),Tt={parse:u(async t=>{const a=await dt("pie",t);W.debug(a),$t(a,_)},"parse")},Et=u(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),Mt=Et,bt=u(t=>{const a=[...t.values()].reduce((s,d)=>s+d,0),f=[...t.entries()].map(([s,d])=>({label:s,value:d})).filter(s=>s.value/a*100>=1);return mt().value(s=>s.value).sort(null)(f)},"createPieArcs"),kt=u((t,a,f,S)=>{W.debug(`rendering pie chart
`+t);const s=S.db,d=nt(),o=it(s.getConfig(),d.pie),e=40,n=18,l=4,g=450,h=g,v=st(a),c=v.append("g");c.attr("transform","translate("+h/2+","+g/2+")");const{themeVariables:i}=d;let[x]=ot(i.pieOuterStrokeWidth);x??=2;const w=o.textPosition,m=Math.min(h,g)/2-e,C=I().innerRadius(0).outerRadius(m),$=I().innerRadius(m*w).outerRadius(m*w);c.append("circle").attr("cx",0).attr("cy",0).attr("r",m+x/2).attr("class","pieOuterCircle");const p=s.getSections(),A=bt(p),D=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let E=0;p.forEach(r=>{E+=r});const G=A.filter(r=>(r.data.value/E*100).toFixed(0)!=="0"),M=gt(D).domain([...p.keys()]);c.selectAll("mySlices").data(G).enter().append("path").attr("d",C).attr("fill",r=>M(r.data.label)).attr("class","pieCircle"),c.selectAll("mySlices").data(G).enter().append("text").text(r=>(r.data.value/E*100).toFixed(0)+"%").attr("transform",r=>"translate("+$.centroid(r)+")").style("text-anchor","middle").attr("class","slice");const V=c.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText"),L=[...p.entries()].map(([r,k])=>({label:r,value:k})),b=c.selectAll(".legend").data(L).enter().append("g").attr("class","legend").attr("transform",(r,k)=>{const P=n+l,X=P*L.length/2,Z=12*n,J=k*P-X;return"translate("+Z+","+J+")"});b.append("rect").attr("width",n).attr("height",n).style("fill",r=>M(r.label)).style("stroke",r=>M(r.label)),b.append("text").attr("x",n+l).attr("y",n-l).text(r=>s.getShowData()?`${r.label} [${r.value}]`:r.label);const U=Math.max(...b.selectAll("text").nodes().map(r=>r?.getBoundingClientRect().width??0)),j=h+e+n+l+U,N=V.node()?.getBoundingClientRect().width??0,q=h/2-N/2,H=h/2+N/2,B=Math.min(0,q),O=Math.max(j,H)-B;v.attr("viewBox",`${B} 0 ${O} ${g}`),lt(v,g,O,o.useMaxWidth)},"draw"),Rt={draw:kt},qt={parser:Tt,db:_,renderer:Rt,styles:Mt};export{qt as diagram};
