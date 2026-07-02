// ============================================================
//  Between Stars · data/memory-stars.js
//  ดาวความทรงจำ — คลังคำ 7 archetype, บันไดวิวัฒน์ดาว, คำถามห้วงใจ
//  data ล้วน ไม่มี logic — ย้ายออกจาก solar-system.html (เฟส 1 แยกโมดูล)
// ============================================================

//   เรียงบวก→หนัก: ตอนคะแนนเสมอ archetype แรกชนะ (favor บวก)
export const INNER_POOLS={
  love:['รัก','รักษา','ห่วง','คิดถึง','ผูกพัน','ใกล้ชิด','อบอุ่น','อ้อมกอด','กอด','ซาบซึ้ง','ขอบคุณ','ขอบใจ','ครอบครัว','แม่','พ่อ','เพื่อน','คนรัก','หัวใจ','เพื่อนแท้','เพื่อนรัก','ลูก','พี่','น้อง','สายใย','เคียงข้าง','ไม่โดดเดี่ยว','มีคนรอ','มีคนคิดถึง'],
  growth:['เรียนรู้','เติบโต','เปลี่ยนแปลง','ก้าวหน้า','พัฒนา','ลองใหม่','ทดลอง','เข้าใจ','ค้นพบ','ตระหนัก','รู้สึกตัว','ยอมรับ','วางแผน','ตั้งใจ','ลงมือ','เริ่มต้น','ก้าวต่อไป','ไม่หยุด','สู้ต่อ','ท้าทาย','ฝึก','ฝึกฝน','ความกล้า','กล้า','ลุกขึ้น','ผ่านมาได้','ผ่านพ้น'],
  hope:['หวัง','ความหวัง','ฝัน','ความฝัน','อนาคต','วันข้างหน้า','เชื่อ','เชื่อมั่น','ศรัทธา','จะดีขึ้น','ดีขึ้น','แสงสว่าง','แสง','มีทาง','เป็นไปได้','รอคอย','ตั้งตารอ','ใกล้แล้ว','เกือบถึง','ไม่ไกล','สักวัน','วันนั้น','ยังมี','ยังมีเวลา','ไม่สิ้นหวัง','มีความหมาย','คุ้มค่า'],
  healing:['ให้อภัย','อภัย','รับได้','หายใจ','พัก','พักผ่อน','ฟื้น','ฟื้นตัว','เยียวยา','สงบ','เงียบ','สบายใจ','โอเค','ไม่เป็นไร','ต้องการเวลา','ค่อยๆ','ทีละนิด','แผลเป็น','แข็งแกร่ง','ดูแลตัวเอง','ดูแล','รักตัวเอง','เมตตาตัวเอง'],
  release:['ปล่อย','ปล่อยวาง','ปล่อยมือ','ปล่อยไป','วาง','ปลดปล่อย','ปลด','ทิ้ง','ละทิ้ง','จบ','จบแล้ว','พอแล้ว','ไม่ยึดติด','ไม่แบก','โล่ง','โล่งใจ','เบาขึ้น','ผ่านมาแล้ว','ก้าวข้าม','ยอมปล่อย','ปลดล็อก'],
  shadow:['เหนื่อย','ท้อ','ท้อแท้','หมดแรง','สิ้นหวัง','มืด','มืดมน','หม่น','เศร้า','เสียใจ','ร้องไห้','น้ำตา','เจ็บ','เจ็บปวด','แบก','หนัก','อ้างว้าง','ว่างเปล่า','โดดเดี่ยว','เดียวดาย','กลัว','กังวล','เครียด','ทรมาน','พัง','ผิดหวัง'],
  return:['กลับมา','หวนคืน','หวน','หวนกลับ','คืนสู่','กลับสู่','กลับคืน','กลับบ้าน','ระลึก','รำลึก','รำลึกถึง','ความทรงจำ','คิดถึงอดีต','อดีต','วันวาน','เหมือนเดิม','ที่เดิม','คุ้นเคย','รากเหง้า','วนกลับ']
};

//   cold = มีขั้วน้ำแข็ง · lift = ดัน tier บนบันได class (อารมณ์หนัก→ต่ำ, อารมณ์ฟื้น→สูง)
export const MEM_ARCH={
  love:   {base:'#a53f2b',accent:'#f0a36f',atmo:'#e68a62',cold:false,lift: 0.3,style:'mars'},    // iron oxide / warm regolith
  growth: {base:'#166a8f',accent:'#6fbb74',atmo:'#9ed6d5',cold:false,lift: 0.4,style:'earth'},   // ocean + land + cloud
  hope:   {base:'#1854c6',accent:'#81d8ff',atmo:'#75bbf0',cold:true ,lift: 0.5,style:'neptune'}, // methane-blue bands
  healing:{base:'#8fc4db',accent:'#f3fbff',atmo:'#d5eff7',cold:true ,lift: 0.2,style:'ice'},     // glacial blue-white
  release:{base:'#b8a978',accent:'#fff2bf',atmo:'#eadfbd',cold:false,lift:-0.2,style:'venus'},   // pale cloud deck
  shadow: {base:'#202436',accent:'#7f91b6',atmo:'#657392',cold:false,lift:-0.7,style:'basalt'},  // basalt / dark mare
  return: {base:'#b87839',accent:'#f0d08b',atmo:'#e9bf79',cold:false,lift: 0.6,style:'jupiter'}, // ochre gas giant
};

// คลาสดาว เรียงตามน้ำหนัก (เบา→หนัก) · size=ฐานรัศมี · lum=เปล่งแสง
export const MEM_CLASS={
  fragment:{size:0.95,rough:1.0 ,lum:false}, // เศษดาว — เล็ก หม่น
  rocky:   {size:1.5 ,rough:0.96,lum:false}, // ดาวหิน — หลุมอุกกาบาต
  ice:     {size:1.85,rough:0.8 ,lum:false}, // ดาวน้ำแข็ง — รอยแตก+ขั้ว
  gas:     {size:2.4 ,rough:0.85,lum:false}, // ดาวก๊าซ — แถบ+พายุ
  giant:   {size:3.4 ,rough:0.85,lum:false}, // ดาวยักษ์ — แถบใหญ่+วงแหวน
  luminous:{size:2.7 ,rough:0.5 ,lum:true }, // ดาวเปล่งแสง — เรืองรอง
};

// บันได class ของแต่ละ archetype — tier (จาก score) เลือกตำแหน่ง 0..5 บนบันได
export const MEM_LADDER={
  love:   ['fragment','rocky','rocky','gas','giant','luminous'],
  growth: ['fragment','rocky','rocky','rocky','gas','giant'],
  hope:   ['fragment','ice','ice','gas','giant','luminous'],
  healing:['fragment','ice','ice','rocky','gas','luminous'],
  release:['fragment','fragment','ice','ice','gas','luminous'],
  shadow: ['fragment','rocky','rocky','rocky','gas','giant'],
  return: ['rocky','rocky','gas','giant','giant','luminous'],
};

export const MEM_TEXTURE_ASSETS={
  love:'assets/memory-textures/memory-love.png',
  growth:'assets/memory-textures/memory-growth.png',
  hope:'assets/memory-textures/memory-hope.png',
  healing:'assets/memory-textures/memory-healing.png',
  release:'assets/memory-textures/memory-release.png',
  shadow:'assets/memory-textures/memory-shadow.png',
  return:'assets/memory-textures/memory-return.png',
};

// แนววงโคจรแบบระบบสุริยะ: ดาวหิน 4 วงในชิดกัน → ช่องว่าง (แถบดาวเคราะห์น้อย) → ดาวก๊าซ 5 วงนอก → แถบน้ำแข็ง
export const MEM_ORBIT_BASE=[54,71,93,118,151,181,216,252,292];

export const MOOD_QBANK={
  radiant:[
    'วันนี้อะไรที่ทำให้ใจคุณสว่างขึ้น?',
    'ช่วงเวลาที่ดีที่สุดของวันนี้คือตอนไหน?',
    'ถ้าจะเก็บความรู้สึกนี้ไว้ คุณอยากจดจำอะไรไว้มากที่สุด?',
    'มีใคร หรืออะไร ที่คุณอยากขอบคุณในวันนี้?',
    'แสงในตัวคุณวันนี้ อยากส่งต่อให้ใคร?',
  ],
  calm:[
    'ความสงบของวันนี้มาจากไหน?',
    'อะไรที่ช่วยให้ใจคุณนิ่งลงได้?',
    'ในความเงียบนี้ คุณได้ยินอะไรในใจตัวเอง?',
    'ถ้าจะรักษาความสงบนี้ไว้ คุณต้องวางอะไรลง?',
    'ตอนนี้ร่างกายและใจคุณได้พักผ่อนพอแล้วหรือยัง?',
  ],
  hopeful:[
    'ความหวังของคุณวันนี้ มีหน้าตาเป็นอย่างไร?',
    'พรุ่งนี้คุณอยากให้เป็นแบบไหน?',
    'ตอนนี้คุณกำลังเฝ้ารอคอยอะไรอยู่?',
    'ก้าวเล็ก ๆ อะไร ที่จะพาคุณเข้าใกล้สิ่งที่ฝันไว้?',
    'ถ้าได้บอกตัวเองในอนาคต คุณจะให้กำลังใจว่าอย่างไร?',
  ],
  faded:[
    'ความเหงานี้ กำลังบอกอะไรกับคุณ?',
    'มีใครที่คุณอยากให้อยู่ตรงนี้ด้วยไหม?',
    'ถ้าได้พูดกับใครสักคนตอนนี้ คุณอยากบอกอะไร?',
    'วันนี้คุณใจดีกับตัวเองมากพอแล้วหรือยัง?',
    'อะไรเล็ก ๆ ที่ยังพอเป็นที่ยึดเหนี่ยวใจคุณได้?',
  ],
  heavy:[
    'สิ่งที่หนักที่สุดในใจตอนนี้ คืออะไร?',
    'ถ้าได้วางมันลงสักครู่ คุณจะรู้สึกอย่างไร?',
    'มีความคิดไหนวนเวียนทั้งวัน — มันจริงแค่ไหน?',
    'ตอนนี้คุณต้องการอะไรมากที่สุด?',
    'วันนี้คุณได้หยุดหายใจลึก ๆ ให้ตัวเองบ้างไหม?',
  ],
  turbulent:[
    'อะไรกำลังปั่นป่วนอยู่ในใจคุณ?',
    'ความรู้สึกนี้ อยากบอกอะไรกับคุณ?',
    'ถ้าพายุนี้เป็นสภาพอากาศ เมื่อไหร่มันจะผ่านไป?',
    'อะไรที่อยู่นอกเหนือการควบคุมของคุณ และพอจะปล่อยมันได้ไหม?',
    'ตอนนี้สิ่งใด ที่จะช่วยให้คลื่นในใจสงบลง?',
  ],
};

//   ใช้เป็น (1) ตัวตัดสินตอนคำเสมอ · (2) fallback ตอนโน้ตไม่มีคำในคลัง — แทน default มั่ว
export const MOOD_TO_ARCH={radiant:'love',calm:'healing',hopeful:'hope',faded:'return',heavy:'shadow',turbulent:'growth'};

export const MEM_ARCH_TH={love:'ความรัก',growth:'การเติบโต',hope:'ความหวัง',healing:'การเยียวยา',release:'การปล่อยวาง',shadow:'เงาภายใน',return:'การหวนคืน'};

export const MOOD_QBANK_EN={
  radiant:[
    'What lit you up today?',
    'When did today feel its best?',
    'If you could keep this feeling, what would you hold onto?',
    'Who or what are you grateful for today?',
    'Your light today — who would you share it with?',
  ],
  calm:[
    "Where did today's calm come from?",
    'What helped your mind grow still?',
    'In this quiet, what do you hear in yourself?',
    'To keep this calm, what could you set down?',
    'Have your body and mind had enough rest?',
  ],
  hopeful:[
    'What does your hope look like today?',
    'What do you want tomorrow to feel like?',
    'What are you quietly waiting for right now?',
    'What small step would bring you closer to what you dream of?',
    'If you could reach your future self, what would you say to keep them going?',
  ],
  faded:[
    'What is this loneliness trying to tell you?',
    'Is there someone you wish were here with you?',
    'If you could speak to someone right now, what would you say?',
    'Have you been kind enough to yourself today?',
    'What small thing still holds your heart steady?',
  ],
  heavy:[
    'What feels heaviest in you right now?',
    'If you could set it down for a moment, how would that feel?',
    'What thought has circled all day — and how true is it really?',
    'What do you need most right now?',
    'Did you let yourself breathe deeply today?',
  ],
  turbulent:[
    "What's stirring inside you?",
    'This feeling — what is it trying to tell you?',
    'If this storm were weather, when would it pass?',
    "What's beyond your control — and could you let it go?",
    'What would help the waves in you settle?',
  ],
};
