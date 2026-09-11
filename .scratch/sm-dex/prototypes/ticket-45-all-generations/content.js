// Content comes from src/data/me.json and the resume-backed portions of SPEC.md.
// Unconfirmed power ratings, personal trivia and project URLs are deliberately omitted.
export const sections = [
  {name:'PROFILE',items:[
    {name:'SHIVAM MAHAJAN',tag:'SOFTWARE DEVELOPER',copy:'Builds reliable systems. Refuses to drop a single row.',facts:['DRAGON / STEEL','HUMANOID POKÉMON','STATUS · RELEASED'],links:[['GitHub','https://github.com/smresponsibilities'],['LinkedIn','https://www.linkedin.com/in/mahajanshivam/']]},
    {name:'BY THE NUMBERS',tag:'COUNTS FROM HIS RESUME',copy:'1,150-day coding streak. 425 test suites. 5 million events. 2,600 algorithmic problems solved.',facts:['1,150-DAY STREAK','5M+ EVENTS','2,600 DSA PROBLEMS']}
  ]},
  {name:'MOVES',items:[
    {name:'PRODUCTIVITY CALLER',tag:'KOTLIN / JETPACK COMPOSE',copy:'Replaces push notifications with native phone calls. NLP pipeline of 80+ patterns cuts manual entry 75%.',facts:['25,000+ LINES','425+ TEST SUITES','+35% TASK COMPLETION']},
    {name:'CHAINCODE',tag:'SOLIDITY / MERN / PYTHON',copy:'Validates code originality with Gemini AI at 95%+ accuracy and mints it as NFTs.',facts:['15+ REST APIS','3 SOLIDITY CONTRACTS','3RD / 200+ TEAMS']},
    {name:'QUIZDECK',tag:'REACT / WEBSOCKETS',copy:'Runs live multiplayer quizzes with 500 concurrent users.',facts:['500 CONCURRENT USERS','31 MS AVG RESPONSE','ARCHIVED · DEC 2024']},
    {name:'CIAM WAREHOUSE',tag:'MORGAN STANLEY / TM01',copy:'Moves Kafka events through PySpark into Snowflake. Accepts zero row-count tolerance.',facts:['5M+ KAFKA EVENTS','4 PYSPARK WORKFLOWS','135 AUTOMATED ROLE GRANTS']}
  ]},
  {name:'ENCOUNTERS',items:[
    {name:'MORGAN STANLEY',tag:'TECHNOLOGY APPRENTICE',copy:'Built data pipelines and backend infrastructure. Completed his apprenticeship in August 2026.',facts:['AUG 2025 – AUG 2026','NEST BALL · ON-CAMPUS','KAFKA / PYSPARK / SNOWFLAKE']},
    {name:'CHITKARA UNIVERSITY',tag:'COMPUTER SCIENCE & ENGINEERING',copy:'Studied computer science from 2022 to 2026. Graduated with a 9.35 CGPA.',facts:['BE · 2022–2026','CGPA · 9.35 / 10','DEAN’S LIST']}
  ]},
  {name:'RIBBONS',items:[
    {name:'CORE CONTRIBUTOR',tag:'WIKIMEDIA',copy:'Merged a change into MediaWiki core. Selected from over 260 applicants.',facts:['ROAD TO WIKI','COHORT 1','CORE MEDIAWIKI PR']},
    {name:'ENDURANCE',tag:'1001 DAYS OF CODE',copy:'Co-founded a coding community that reached 2,002 days. Kept a 1,150-day coding streak.',facts:['CO-FOUNDER','2,002 COMMUNITY DAYS','1,150+ DAY STREAK']},
    {name:'TOURNAMENT',tag:'HACKINDIA REGIONALS',copy:'Led a team of four. Placed third among more than 200 teams.',facts:['CHAINCODE','TEAM OF 4','3RD PLACE']},
    {name:'PROBLEM SOLVER',tag:'LEETCODE + CODEFORCES',copy:'Solved over 2,600 algorithmic problems. LeetCode 1,900+ and Codeforces 700+.',facts:['2,600+ PROBLEMS','LEETCODE 1,900+','CODEFORCES 700+']},
    {name:"DEAN'S LIST",tag:'CHITKARA UNIVERSITY',copy:"Named to the Dean's List every year from 2022 to 2026. Graduated with a 9.35 CGPA.",facts:['2022–2026','CGPA · 9.35 / 10','4 CONSECUTIVE YEARS']}
  ]},
  {name:'DEX',items:[
    {name:'001 · SHIVAM',tag:'OWNER ENTRY',copy:'The first entry belongs to Shivam Mahajan. His work fills this device.',facts:['SMRESPONSIBILITIES','DRAGON / STEEL','SOFTWARE DEVELOPER']},
    {name:'PUBLIC ROSTER',tag:'PLANNED',copy:'Other developers will join through a GitHub issue. Submissions are not connected in this study.',facts:['LOCAL DEVICE STUDY','SUBMISSIONS NOT CONNECTED']}
  ]}
];
export const initial = () => ({section:0,item:0,mode:'menu',page:0,power:true});
export function reduce(state,action){
  if(action==='power')return {...state,power:!state.power};
  if(!state.power)return state;
  const s={...state};
  if(action.startsWith('section-')){s.section=Number(action.slice(8));s.item=0;s.mode='list';s.page=0;}
  else if(action==='menu'){s.mode='menu';s.page=0;}
  else if(action==='confirm'){s.mode=s.mode==='menu'?'list':'detail';s.page=0;}
  else if(action==='back'){s.mode=s.mode==='detail'?'list':'menu';s.page=0;}
  else if(action==='up'||action==='down'){
    const delta=action==='up'?-1:1;
    if(s.mode==='menu'){s.section=(s.section+delta+sections.length)%sections.length;s.item=0;}
    else s.item=(s.item+delta+sections[s.section].items.length)%sections[s.section].items.length;
  }else if(action==='left'||action==='right'||action==='page'){
    if(s.mode==='detail')s.page=1-s.page;
    else{s.section=(s.section+(action==='left'?-1:1)+sections.length)%sections.length;s.item=0;}
  }
  return s;
}
