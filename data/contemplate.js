// ============================================================
//  Between Stars · data/contemplate.js
//  โหมดใคร่ครวญ — คำคม/ปรัชญาดาว/seed คำฝาก/สัญญาณ Golden Record (TH+EN)
//  data ล้วน ไม่มี logic — ย้ายออกจาก solar-system.html (เฟส 1 แยกโมดูล)
// ============================================================

export const QUOTES=[
  'เรากำลังมองดูบ้านของตัวเอง ในมหาสมุทรอันไร้ขอบเขต',
  'ทุกสิ่งที่คุณรัก ทุกคนที่คุณรู้จัก อยู่บนจุดเล็ก ๆ จุดเดียวนี้',
  'ถ้าจักรวาลกว้างใหญ่ขนาดนี้ ทำไมเราถึงยังทะเลาะกันเรื่องเล็ก ๆ?',
  'หนึ่งชั่วชีวิตบนโลก เป็นเพียงพริบตาเดียวของดวงดาว',
  'เราคือวิธีที่จักรวาลใช้ทำความรู้จักตัวเอง',
  'ดาวทุกดวงที่คุณเห็น คือแสงจากอดีต — บางดวงอาจดับไปแล้ว',
  'ความเงียบของอวกาศ แปลว่าเราโดดเดี่ยว หรือเรายังหาไม่เจอ?',
  'ถ้าคืนนี้คือคืนสุดท้าย คุณจะมองท้องฟ้าต่างออกไปไหม?',
  'เราตัวเล็กนิดเดียว แต่เราคือสิ่งเดียวที่รู้ว่าตัวเองตัวเล็ก',
  'ทุกอะตอมในตัวคุณ เคยอยู่ในใจกลางของดาวฤกษ์',
];

export const QUOTES_EN=[
  'We are looking at our own home, in a shoreless ocean of space.',
  'Everything you love, everyone you know, is on this one small point.',
  'If the universe is this vast, why do we still quarrel over such small things?',
  'A whole human life is just one blink to the stars.',
  'We are the universe’s way of knowing itself.',
  'Every star you see is light from the past — some may already be gone.',
  'Does the silence of space mean we are alone, or that we just haven’t found each other yet?',
  'If tonight were the last night, would you look at the sky any differently?',
  'We are tiny — yet we are the only thing that knows it is tiny.',
  'Every atom in you was once inside the heart of a star.',
];

export const BADWORDS=['เหี้ย','สัส','ควย','หี','เย็ด','แม่ง','ระยำ','ชิบหาย','สถุล','อีดอก','fuck','shit','bitch','asshole','dick','cunt'];

// มุมมองเชิงปรัชญาของแต่ละดวง (โชว์ใน sidebar เฉพาะโหมดใคร่ครวญ)
export const PHILO={
 'The Sun':{c:'อพอลโล · ศูนย์กลางและแสงสว่าง',t:['เกือบทุกอารยธรรมยกให้ดวงอาทิตย์เป็นสัญลักษณ์ของความจริงและการเริ่มต้น เพลโตเปรียบมันเป็นต้นกำเนิดของปัญญา — สิ่งที่ทำให้เรา "มองเห็น" ความจริงได้','ทุกสิ่งในระบบนี้โคจรรอบมัน เตือนว่าเราต่างมีบางอย่างเป็นศูนย์กลางที่ยึดชีวิตไว้เสมอ'],q:'อะไรคือ "ดวงอาทิตย์" ที่ทุกอย่างในชีวิตคุณโคจรรอบ?'},
 'Mercury':{c:'เฮอร์มีส · ผู้ส่งสาร',t:['ดาวที่เร็วที่สุด ตั้งชื่อตามเทพแห่งการสื่อสารและการเดินทาง เป็นตัวแทนของความคิดที่ว่องไวและการเชื่อมต่อ','มันเร็วแต่ร้อน-หนาวสุดขั้ว เหมือนความคิดที่ไวเกินไปจนไม่ทันได้รู้สึก'],q:'วันนี้คุณรีบจนลืมรู้สึกอะไรไปบ้าง?'},
 'Venus':{c:'อโฟรไดที · ความงามที่ลวงตา',t:['ดาวที่สว่างงามที่สุดบนฟ้ายามเช้า-ค่ำ ตั้งชื่อตามเทพีแห่งความรักและความงาม','แต่ใต้เมฆสวยคือไอกรดและความร้อนเผาผลาญ — สิ่งที่งดงามที่สุดอาจไม่ใช่สิ่งที่ปลอดภัยที่สุด'],q:'ความงามแบบไหนที่คุณยอมเข้าใกล้แม้รู้ว่าร้อน?'},
 'Earth':{c:'บ้าน · จุดสีฟ้าจาง',t:['ดาวเดียวเท่าที่รู้ว่ามีชีวิต เม็ดฝุ่นสีฟ้าในความมืดไร้ขอบเขต','ทุกความรัก ทุกสงคราม ทุกคนที่เคยมีชีวิต อยู่บนจุดนี้จุดเดียว — เรายังไม่มีที่อื่นให้ไป'],q:'ถ้านี่คือบ้านหลังเดียวของเราทุกคน เราน่าจะดูแลกันอย่างไร?'},
 'Mars':{c:'อาเรส · พรมแดนถัดไป',t:['ดาวสีเลือดของเทพสงคราม แต่ยุคนี้กลายเป็นสัญลักษณ์ของความหวังและความทะเยอทะยานของมนุษย์','ความอยากก้าวข้ามขอบเขตไปตั้งถิ่นฐานที่ใหม่ คือธรรมชาติของเรา'],q:'พรมแดนถัดไปในชีวิตคุณคืออะไร?'},
 'Jupiter':{c:'ซุส · ผู้คุ้มครอง',t:['ราชาแห่งดาวเคราะห์ ตั้งชื่อตามเทพสูงสุด แรงโน้มถ่วงมหาศาลของมันดูดอุกกาบาตหลายดวงแทนโลก','ความยิ่งใหญ่ที่บางครั้งคอยปกป้องเราอยู่เงียบ ๆ โดยเราไม่รู้ตัว'],q:'ใครคือ "พฤหัส" ที่คอยปกป้องคุณโดยไม่เอ่ยปาก?'},
 'Saturn':{c:'โครนอส · กาลเวลา',t:['เทพแห่งเวลาผู้กลืนกินทุกสิ่ง วงแหวนงดงามของมันแท้จริงคือเศษซากที่แตกสลาย','ความงามและความไม่จีรังอยู่ด้วยกัน — ทุกสิ่งมีวันเริ่มและวันจบ'],q:'ถ้าเวลามีจำกัด วันนี้คุณอยากใช้มันกับอะไร?'},
 'Uranus':{c:'ยูเรนัส · การพลิกมุม',t:['ดาวที่เอียงตะแคงเกือบ 90° หมุนคนละแบบกับใคร ตั้งชื่อตามเทพท้องฟ้า','บางครั้งการมองโลกจากมุมที่ต่างสุดขั้ว ก็เผยสิ่งที่คนอื่นมองไม่เห็น'],q:'มีเรื่องไหนที่ถ้าลองพลิกมุมมอง อาจเปลี่ยนไปเลย?'},
 'Neptune':{c:'โพไซดอน · สิ่งที่อยู่ลึก',t:['ดาวสีน้ำเงินไกลโพ้น ตั้งชื่อตามเทพสมุทร ถูกค้นพบด้วยการคำนวณก่อนจะมีใครเห็นจริง','บางสิ่งเรารู้ว่ามีอยู่ก่อนจะมองเห็น เหมือนความรู้สึกลึก ๆ ที่อธิบายไม่ได้แต่จริง'],q:'มีอะไรที่ใจคุณรู้อยู่แล้ว แม้ตายังไม่เห็น?'},
 'Pluto':{c:'ฮาเดส · สิ่งที่ถูกนิยามใหม่',t:['เคยเป็นดาวเคราะห์ดวงที่เก้า จนถูกปลดเป็น "ดาวเคราะห์แคระ" ในปี 2006','คุณค่าของมันไม่ได้เปลี่ยน เปลี่ยนแค่ชื่อที่เราตั้งให้ — คำนิยามของคนอื่นไม่ใช่ความจริงของเราเสมอไป'],q:'มีอะไรที่ถูกคนอื่นตีค่า แต่คุณรู้ว่ามันมีความหมาย?'},
};

// EN contemplative essays — transcreated for feeling (myth + philosophy + a reflective question), not machine-translated. openInfo picks this when LANG==='en'.
export const PHILO_EN={
 'The Sun':{c:'Apollo · the centre and the light',t:['Almost every civilization made the Sun a symbol of truth and beginnings. Plato likened it to the source of wisdom — the thing that lets us truly “see”.','Everything here orbits it — a reminder that each of us keeps some centre that holds a life in place.'],q:'What is the “sun” that everything in your life orbits around?'},
 'Mercury':{c:'Hermes · the messenger',t:['The fastest planet, named for the god of messages and travel — a figure of quick thought and connection.','Yet it swings from scorching to freezing, like a mind so fast it outruns its own feelings.'],q:'What did you rush past today without letting yourself feel?'},
 'Venus':{c:'Aphrodite · beauty that deceives',t:['The brightest, loveliest light in the morning and evening sky, named for the goddess of love and beauty.','But beneath the beautiful clouds lie acid vapour and searing heat — what is most beautiful is not always what is safest.'],q:'What kind of beauty do you draw close to, even knowing it burns?'},
 'Earth':{c:'Home · the pale blue dot',t:['The only world we know that holds life — a blue mote of dust in boundless dark.','Every love, every war, everyone who ever lived — all on this single point. We have nowhere else to go.'],q:'If this is the only home we all share, how might we care for one another?'},
 'Mars':{c:'Ares · the next frontier',t:['The blood-red star of the god of war — yet in our age it has become a symbol of human hope and ambition.','The longing to cross our own limits and settle somewhere new is part of our nature.'],q:'What is the next frontier in your life?'},
 'Jupiter':{c:'Zeus · the protector',t:['King of the planets, named for the highest god; its immense gravity pulls in many comets that might otherwise have struck Earth.','A greatness that sometimes shields us quietly, without our ever knowing.'],q:'Who is the “Jupiter” that protects you without ever saying so?'},
 'Saturn':{c:'Cronus · time',t:['The god of time who devours all things; its gorgeous rings are, in truth, the debris of what has shattered.','Beauty and impermanence live side by side — everything has its beginning and its end.'],q:'If time is limited, what would you spend today on?'},
 'Uranus':{c:'Uranus · a shift in perspective',t:['Tilted almost 90°, turning unlike any other, named for the god of the sky.','Sometimes seeing the world from a radically different angle reveals what no one else can.'],q:'Is there something that, seen from another angle, might change completely?'},
 'Neptune':{c:'Poseidon · what lies deep',t:['A blue world far out, named for the god of the sea — found by calculation before anyone laid eyes on it.','Some things we know are there before we can see them, like a deep feeling that defies explanation yet is true.'],q:'What does your heart already know, even before your eyes can see it?'},
 'Pluto':{c:'Hades · what gets redefined',t:['Once the ninth planet, until it was reclassified as a “dwarf planet” in 2006.','Its worth never changed — only the name we gave it. Other people’s definitions are not always your truth.'],q:'What has been dismissed by others that you know still holds meaning?'},
};

export const SEED_LETTERS=[
  'ถึงใครก็ตามที่อ่านอยู่ — ขอให้วันนี้ของคุณเบาสบายกว่าเมื่อวาน',
  'ฉันไม่รู้ว่าเธอเป็นใคร แต่ดีใจที่เธอมาเจอจดหมายฉบับนี้',
  'บางครั้งแค่รู้ว่ามีคนอื่นมองดาวดวงเดียวกัน ก็พอแล้ว',
  'ถ้าเหนื่อยอยู่ พักก่อนก็ได้ จักรวาลไม่ได้รีบไปไหน',
  'เก็บความฝันที่เคยทิ้งไว้ กลับมาดูบ้างนะ',
  'ขอบคุณที่ยังอยู่มาจนถึงวันนี้',
  'ความคิดถึงของฉัน ฝากลอยมากับแสงดาว',
  'ไม่เป็นไรหรอกถ้ายังหาคำตอบไม่เจอ เราทุกคนก็กำลังหา',
  'สักวันเราอาจได้เจอกันที่ไหนสักแห่งในจักรวาลนี้',
  'ถึงตัวฉันในอนาคต — หวังว่าเธอจะภูมิใจในสิ่งที่เราเลือกวันนี้',
  'โลกใบเล็กนี้สวยงามเสมอ แม้ในวันที่มันยากเย็น',
  'ขอให้คนที่อ่านบรรทัดนี้ ได้รับสิ่งดี ๆ โดยไม่ทันตั้งตัว',
  'แสงที่เราเห็นจากดาวนั้น เดินทางมาหลายพันปี เพื่อมาถึงดวงตาของเราวันนี้',
  'เราคือฝุ่นของดาวฤกษ์ที่ตั้งคำถามถึงต้นกำเนิดของตัวเอง',
  'ในความมืดของอวกาศ แม้แสงเล็กน้อยก็มองเห็นได้จากระยะไกลมาก',
  'ทุกอะตอมในร่างกายเราเคยเป็นส่วนหนึ่งของดาวฤกษ์ดวงใดดวงหนึ่ง',
  'โลกหมุนรอบดวงอาทิตย์ทุกวัน แต่เรามักลืมรู้สึกมหัศจรรย์กับมัน',
  'บางคืนแค่มองดาว ก็รู้สึกว่าปัญหาทุกอย่างเล็กลง',
  'ดวงดาวไม่ตาย มันแค่เปลี่ยนรูปแบบ กลายเป็นสิ่งใหม่',
  'จักรวาลขยายตัวอยู่ทุกขณะ ความเป็นไปได้จึงไม่มีวันหมด',
  'แสงอาทิตย์ที่แตะผิวหนังเราวันนี้ เดินทางมา 8 นาทีเพื่อสัมผัสเรา',
  'ความว่างเปล่าในอวกาศเต็มไปด้วยสิ่งที่เรายังไม่เข้าใจ',
  'จักรวาลอยู่มา 13,800 ล้านปี แล้วเลือกช่วงเวลานี้ให้เราได้มีชีวิต',
  'แรงโน้มถ่วงเชื่อมทุกสิ่งไว้ด้วยกัน แม้ดาวที่ห่างกันล้านปีแสง',
  'ความเงียบของอวกาศไม่ใช่ความเปล่าเปลี่ยว มันคือสันติภาพแบบหนึ่ง',
  'เราไม่รู้ว่ายังมีอะไรอีกมากในจักรวาล แต่เราก็กล้าเปิดตามองมัน',
  'ดาวทุกดวงมีวันเกิดและวันดับ เหมือนกับเราทุกคน',
  'ห้วงอวกาศไม่มีเสียง แต่ถ้ามีคงเต็มไปด้วยบทเพลงที่เราไม่รู้จัก',
  'บางทีการหลงทางก็คือการเริ่มต้นค้นพบสิ่งใหม่ — เหมือนยานที่ออกจากระบบสุริยะ',
  'แม้อยู่คนละมุมโลก เราก็มองดาวดวงเดิมกัน',
];

export const SEED_LETTERS_EN=[
  'To whoever is reading — may today feel a little lighter than yesterday.',
  'I don’t know who you are, but I’m glad you found this letter.',
  'Sometimes just knowing someone else is looking at the same star is enough.',
  'If you’re tired, rest first — the universe is in no hurry.',
  'That dream you set aside — come back and look at it sometime.',
  'Thank you for making it all the way to today.',
  'I send my longing drifting to you on starlight.',
  'It’s okay if you haven’t found the answer yet — we’re all still looking.',
  'Maybe one day we’ll meet somewhere out in this universe.',
  'To my future self — I hope you’re proud of what we chose today.',
  'This small world is always beautiful, even on the hard days.',
  'May whoever reads this line receive something good, when they least expect it.',
  'The light from that star traveled thousands of years to reach our eyes today.',
  'We are stardust, asking after its own origin.',
  'In the dark of space, even a small light can be seen from very far away.',
  'Every atom in our bodies was once part of some star.',
  'The Earth circles the Sun every day, yet we so often forget to feel the wonder of it.',
  'Some nights, just looking at the stars makes every problem feel smaller.',
  'Stars don’t die — they only change form, and become something new.',
  'The universe expands every moment, so the possibilities never run out.',
  'The sunlight touching your skin today traveled 8 minutes to reach you.',
  'The emptiness of space is full of things we don’t yet understand.',
  'The universe is 13.8 billion years old, and it chose this moment to give us life.',
  'Gravity binds everything together, even stars a million light-years apart.',
  'The silence of space isn’t loneliness — it’s a kind of peace.',
  'We don’t know how much more is out there, yet we dare to open our eyes and look.',
  'Every star has a birth and a death, just like all of us.',
  'Space has no sound — but if it did, it would be full of songs we’ve never heard.',
  'Maybe getting lost is the start of finding something new — like a craft leaving the Solar System.',
  'Even on opposite sides of the world, we look up at the same stars.',
];

export const GR_SEEDS=[
  // จากแผ่นเสียงจริง — คำทักทายและข้อความ
  '"Hello from the children of planet Earth." — คำทักทายภาษาอังกฤษที่บันทึกจริงใน Golden Record',
  '"สวัสดี ท่านผู้ฟังทั้งหลาย ฉันดีใจมากที่ได้ส่งความปรารถนาดีมาให้ท่าน" — คำทักทายภาษาไทยที่อยู่ในแผ่นเสียง',
  '"This is a present from a small, distant world — a token of our sounds, our science, our images, our music, our thoughts, and our feelings." — Jimmy Carter, 1977',
  '"We are attempting to survive our time so we may live into yours." — ข้อความจาก Jimmy Carter ที่ส่งไปกับยาน',
  // เสียงธรรมชาติที่บันทึกจริง
  'เสียงคลื่นทะเลที่บันทึกไว้ในแผ่นนี้ เกิดขึ้นที่โลกเมื่อปี 1977 — ตอนนี้กำลังเดินทางออกจากกาแล็กซี',
  'เสียงฝนที่ตกลงมาที่โลก เสียงลมที่พัดผ่าน เสียงฟ้าร้อง — ทั้งหมดบันทึกอยู่ในแผ่นทองคำที่กำลังเดินทางผ่านห้วงอวกาศระหว่างดาว',
  'เสียงวาฬที่ร้องใต้มหาสมุทร บันทึกอยู่ใน Golden Record — สิ่งมีชีวิตที่ใหญ่ที่สุดบนโลกส่งเสียงออกไปถึงจักรวาล',
  'เสียงหัวใจเต้น เสียงเด็กทารกร้อง เสียงเสียงหัวเราะ — สิ่งที่เป็นมนุษย์ที่สุดถูกส่งออกไปในความว่างเปล่า',
  // ดนตรีที่บันทึกจริง
  'Bach, Beethoven, Chuck Berry, Louis Armstrong, และดนตรีไทย — ทั้งหมดอยู่ในแผ่นเดียวกันที่กำลังเดินทางออกนอกระบบสุริยะ',
  '"Johnny B. Goode" ของ Chuck Berry เป็นหนึ่งใน 27 เพลงใน Golden Record — John Lennon กล่าวว่า "ควรส่งแค่ Blues เท่านั้น"',
  // ข้อเท็จจริงเชิงกวี
  'ณ จุดนี้ ไม่มีใครได้ยินคุณ — และนั่นคือสิ่งที่งดงามที่สุด',
  'ความมืดระหว่างดาวไม่ว่างเปล่า — เต็มไปด้วยอนุภาคของดาวที่ตายแล้วนานพันล้านปี',
  'Voyager ส่งสัญญาณด้วยพลังงาน 22 วัตต์ — น้อยกว่าหลอดไฟตู้เย็น — ข้ามระยะทาง 24,000,000,000 กิโลเมตร',
  'มนุษย์อยู่บนโลกมา 300,000 ปี ใช้เวลา 46 ปีจึงส่งสิ่งแรกออกไปจากระบบสุริยะ',
  'Ann Druyan บันทึกคลื่นสมองขณะคิดถึงความรัก — ความรู้สึกนั้นพ้นระบบสุริยะไปแล้ว',
  'ดาวที่ Voyager 1 จะเข้าใกล้มากที่สุดในอีก 40,000 ปี ชื่อ Gliese 445 — ดาวที่ยังไม่มีใครรู้ว่ามีอะไรรออยู่',
  'สัญญาณวิทยุจากยานจะอ่อนลงเรื่อยๆ แต่ไม่มีวันหายไปจริงๆ — มันแค่เบาลงจนเราฟังไม่ได้ยิน',
  'แผ่นทองคำสามารถอยู่รอดได้นานกว่าพันล้านปี — นานกว่าดวงอาทิตย์จะยังคงส่องแสง',
];

export const GR_SEEDS_EN=[
  '“Hello from the children of planet Earth.” — an English greeting recorded on the real Golden Record',
  '“Hello to everyone. I am very glad to send my good wishes to you.” — the Thai greeting carried on the record',
  '“This is a present from a small, distant world — a token of our sounds, our science, our images, our music, our thoughts, and our feelings.” — Jimmy Carter, 1977',
  '“We are attempting to survive our time so we may live into yours.” — a message from Jimmy Carter sent with the craft',
  'The sound of ocean waves on this disc was captured on Earth in 1977 — now traveling out of the galaxy.',
  'Rain falling on Earth, wind passing through, rolling thunder — all recorded on the golden disc now crossing interstellar space.',
  'The song of whales beneath the ocean is on the Golden Record — Earth’s largest creatures, calling out to the cosmos.',
  'A beating heart, a baby’s cry, the sound of laughter — the most human things, sent out into the void.',
  'Bach, Beethoven, Chuck Berry, Louis Armstrong, and Thai music — all on one disc now traveling beyond the Solar System.',
  'Chuck Berry’s “Johnny B. Goode” is one of 27 tracks on the Golden Record — John Lennon joked, “We should have sent only the blues.”',
  'Out here, no one can hear you — and that is the most beautiful thing of all.',
  'The dark between the stars isn’t empty — it’s full of particles from stars that died billions of years ago.',
  'Voyager transmits on 22 watts — less than a refrigerator bulb — across 24,000,000,000 kilometres.',
  'Humans have been on Earth for 300,000 years; it took 46 of them to send the first thing beyond the Solar System.',
  'Ann Druyan recorded her brainwaves while thinking of love — that feeling has already left the Solar System.',
  'The star Voyager 1 will pass closest to in 40,000 years is Gliese 445 — a star whose secrets no one yet knows.',
  'The craft’s radio signal grows fainter and fainter, but never truly vanishes — it only fades below what we can hear.',
  'The golden record can survive more than a billion years — longer than the Sun will keep shining.',
];
