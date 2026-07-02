// ============================================================
//  Between Stars · data/bodies.js
//  สารานุกรมดวงดาว — ดวงอาทิตย์/ดาวเคราะห์ (phys/facts TH) + PLANET_EN + จักรราศี
//  data ล้วน ไม่มี logic — ย้ายออกจาก solar-system.html (เฟส 1 แยกโมดูล)
// ============================================================

export const SUN={ name:'ดวงอาทิตย์', en:'The Sun', size:8, color:'#ffcf57', type:'ดาวฤกษ์ · G2V', map:'sunmap.jpg',
  phys:[['เส้นผ่านศูนย์กลาง','1,392,700 กม.'],['มวล','99.86% ของระบบสุริยะ'],['อุณหภูมิผิว','~5,500 °C'],
    ['อุณหภูมิแกนกลาง','~15,000,000 °C'],['องค์ประกอบ','ไฮโดรเจน 73% · ฮีเลียม 25%'],['อายุ','~4.6 พันล้านปี']],
  facts:['ดวงอาทิตย์ใหญ่จนบรรจุโลกได้ราว <b>1.3 ล้านดวง</b> และแสงใช้เวลา <b>8 นาที 20 วินาที</b> กว่าจะถึงโลก',
    'ทุกวินาทีเปลี่ยนไฮโดรเจน <b>~600 ล้านตัน</b> เป็นพลังงานด้วยปฏิกิริยานิวเคลียร์ฟิวชัน'] };

export const PLANETS=[
  { name:'ดาวพุธ', en:'Mercury', orbit:19, size:0.9, spin:0.6, rotH:1407.6, color:'#b7b0a8', tilt:0.01, bands:false, map:'mercurymap.jpg',
    orbitData:[['ระยะจากดวงอาทิตย์','57.9 ล้าน กม.'],['คาบโคจร','88 วันโลก'],['คาบหมุนรอบตัว','176 วันโลก'],['ความเร็ววงโคจร','47.4 กม./วิ']],
    phys:[['เส้นผ่านศูนย์กลาง','4,879 กม.'],['แรงโน้มถ่วง','0.38 g'],['อุณหภูมิ','-180 ถึง 430 °C'],['ดวงจันทร์','ไม่มี'],['องค์ประกอบ','หินและเหล็ก'],['บรรยากาศ','แทบไม่มี']],
    facts:['ดาวที่เล็กและใกล้ดวงอาทิตย์ที่สุด — กลางวันร้อนจัด กลางคืนหนาวจัด เพราะแทบไม่มีบรรยากาศกักความร้อน',
      'พื้นผิวเต็มไปด้วยหลุมอุกกาบาตคล้ายดวงจันทร์ และมี <b>ช่วงอุณหภูมิต่างกันมากที่สุด</b>ในระบบสุริยะ'] },
  { name:'ดาวศุกร์', en:'Venus', orbit:28, size:1.5, spin:0.5, rotH:-5832.5, color:'#e8b96b', tilt:0.05, bands:true, atmo:'#ffd98a', map:'venusmap.jpg',
    orbitData:[['ระยะจากดวงอาทิตย์','108 ล้าน กม.'],['คาบโคจร','225 วันโลก'],['คาบหมุนรอบตัว','243 วัน (ถอยหลัง)'],['ความเร็ววงโคจร','35 กม./วิ']],
    phys:[['เส้นผ่านศูนย์กลาง','12,104 กม.'],['แรงโน้มถ่วง','0.90 g'],['อุณหภูมิ','~465 °C'],['ดวงจันทร์','ไม่มี'],['องค์ประกอบ','หิน · แกนเหล็ก'],['บรรยากาศ','CO₂ หนาแน่น · เมฆกรดกำมะถัน']],
    facts:['ดาวที่ร้อนที่สุดจากปรากฏการณ์เรือนกระจกรุนแรง และ <b>หมุนรอบตัวเองช้ากว่าโคจรรอบดวงอาทิตย์</b>',
      'หมุนสวนทางดาวอื่น — บนดาวศุกร์ดวงอาทิตย์จะ <b>ขึ้นทางทิศตะวันตก</b>'] },
  { name:'โลก', en:'Earth', orbit:34, size:1.6, spin:1.2, rotH:23.934, color:'#5b9bff', tilt:0.41, bands:true, atmo:'#6ab8ff', map:'earthmap1k.jpg', bump:'earthbump1k.jpg', clouds:'earthcloudmap.jpg', spec:'earthspec1k.jpg', lights:'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/planets/earth_lights_2048.png', moon:true,
    orbitData:[['ระยะจากดวงอาทิตย์','149.6 ล้าน กม.'],['คาบโคจร','365.25 วัน'],['คาบหมุนรอบตัว','23.9 ชม.'],['ความเร็ววงโคจร','29.8 กม./วิ']],
    phys:[['เส้นผ่านศูนย์กลาง','12,742 กม.'],['แรงโน้มถ่วง','1.00 g'],['อุณหภูมิเฉลี่ย','15 °C'],['ดวงจันทร์','1 ดวง'],['องค์ประกอบ','หิน · แกนเหล็ก-นิกเกิล'],['บรรยากาศ','N₂ 78% · O₂ 21%']],
    facts:['ดาวเคราะห์ดวงเดียวเท่าที่รู้ที่มี <b>สิ่งมีชีวิต</b> และมีน้ำของเหลวปกคลุมกว่า 70% ของพื้นผิว',
      'สนามแม่เหล็กโลกช่วย <b>ปกป้องจากลมสุริยะ</b> และทำให้เกิดแสงเหนือ–แสงใต้'] },
  { name:'ดาวอังคาร', en:'Mars', orbit:44, size:1.2, spin:1.1, rotH:24.623, color:'#e1623d', tilt:0.44, bands:false, atmo:'#e08a5a', map:'marsmap1k.jpg', bump:'marsbump1k.jpg',
    orbitData:[['ระยะจากดวงอาทิตย์','228 ล้าน กม.'],['คาบโคจร','687 วันโลก'],['คาบหมุนรอบตัว','24.6 ชม.'],['ความเร็ววงโคจร','24.1 กม./วิ']],
    phys:[['เส้นผ่านศูนย์กลาง','6,779 กม.'],['แรงโน้มถ่วง','0.38 g'],['อุณหภูมิ','-140 ถึง 20 °C'],['ดวงจันทร์','2 ดวง'],['องค์ประกอบ','หินภูเขาไฟ · เหล็กออกไซด์'],['บรรยากาศ','CO₂ เบาบาง']],
    facts:['"ดาวเคราะห์สีแดง" จากสนิมเหล็ก มีภูเขาไฟ <b>โอลิมปัส มอนส์</b> สูงที่สุดในระบบสุริยะ (~22 กม.)',
      'มีแคนยอน <b>วาลเลส มาริเนริส</b> ยาวกว่า 4,000 กม. และมีน้ำแข็งที่ขั้วทั้งสอง'] },
  { name:'ดาวพฤหัสบดี', en:'Jupiter', orbit:91, size:4.5, spin:2.4, rotH:9.925, color:'#d9a066', tilt:0.05, bands:true, atmo:'#e8c79a', map:'jupitermap.jpg',
    orbitData:[['ระยะจากดวงอาทิตย์','778 ล้าน กม.'],['คาบโคจร','11.9 ปีโลก'],['คาบหมุนรอบตัว','9.9 ชม.'],['ความเร็ววงโคจร','13.1 กม./วิ']],
    phys:[['เส้นผ่านศูนย์กลาง','139,820 กม.'],['แรงโน้มถ่วง','2.53 g'],['อุณหภูมิ','~-110 °C'],['ดวงจันทร์','95 ดวง'],['องค์ประกอบ','ดาวแก๊ส · ไฮโดรเจน-ฮีเลียม'],['บรรยากาศ','เมฆแอมโมเนียหลายชั้น']],
    facts:['ดาวเคราะห์ที่ใหญ่ที่สุด — <b>จุดแดงใหญ่</b> คือพายุที่ใหญ่กว่าโลก พัดต่อเนื่องหลายร้อยปี',
      'ดวงจันทร์ <b>แกนีมีด</b> ใหญ่ที่สุดในระบบสุริยะ — ใหญ่กว่าดาวพุธเสียอีก'] },
  { name:'ดาวเสาร์', en:'Saturn', orbit:132, size:3.9, spin:2.2, rotH:10.656, color:'#e3ca8c', tilt:0.47, bands:true, ring:true, atmo:'#efdcab', map:'saturnmap.jpg', ringMap:'saturnringcolor.jpg', ringAlpha:'saturnringpattern.gif',
    orbitData:[['ระยะจากดวงอาทิตย์','1,430 ล้าน กม.'],['คาบโคจร','29.5 ปีโลก'],['คาบหมุนรอบตัว','10.7 ชม.'],['ความเร็ววงโคจร','9.7 กม./วิ']],
    phys:[['เส้นผ่านศูนย์กลาง','116,460 กม.'],['แรงโน้มถ่วง','1.07 g'],['อุณหภูมิ','~-140 °C'],['ดวงจันทร์','146 ดวง'],['องค์ประกอบ','ดาวแก๊ส · ไฮโดรเจน-ฮีเลียม'],['ความหนาแน่น','น้อยกว่าน้ำ (ลอยน้ำได้)']],
    facts:['มี <b>วงแหวน</b> สวยที่สุด จากน้ำแข็งและหินนับล้านชิ้น กว้างหลายแสนกิโลเมตรแต่หนาเพียงไม่กี่สิบเมตร',
      'ดวงจันทร์ <b>ไททัน</b> มีบรรยากาศหนาและทะเลสาบมีเทนเหลว — เป้าหมายค้นหาสิ่งมีชีวิต'] },
  { name:'ดาวยูเรนัส', en:'Uranus', orbit:200, size:2.7, spin:1.4, rotH:-17.24, color:'#9fe3e0', tilt:1.7, bands:false, ring:true, atmo:'#b8f0ee', map:'uranusmap.jpg', ringMap:'uranusringcolour.jpg', ringAlpha:'uranusringtrans.gif',
    orbitData:[['ระยะจากดวงอาทิตย์','2,870 ล้าน กม.'],['คาบโคจร','84 ปีโลก'],['คาบหมุนรอบตัว','17 ชม. (ถอยหลัง)'],['ความเร็ววงโคจร','6.8 กม./วิ']],
    phys:[['เส้นผ่านศูนย์กลาง','50,724 กม.'],['แรงโน้มถ่วง','0.89 g'],['อุณหภูมิ','~-195 °C'],['ดวงจันทร์','28 ดวง'],['องค์ประกอบ','ดาวน้ำแข็ง · น้ำ-มีเทน-แอมโมเนีย'],['บรรยากาศ','ไฮโดรเจน · ฮีเลียม · มีเทน']],
    facts:['ดาวที่ <b>เอียงตะแคงข้าง</b> เกือบ 98° เหมือนกลิ้งไปตามวงโคจร ทำให้ฤดูกาลยาวนานสุดขั้ว',
      'มีเทนในบรรยากาศดูดกลืนแสงสีแดง ทำให้เห็นเป็น <b>สีฟ้าอมเขียว</b>'] },
  { name:'ดาวเนปจูน', en:'Neptune', orbit:262, size:2.6, spin:1.5, rotH:16.11, color:'#4f6bff', tilt:0.49, bands:true, atmo:'#6a82ff', map:'neptunemap.jpg',
    orbitData:[['ระยะจากดวงอาทิตย์','4,500 ล้าน กม.'],['คาบโคจร','165 ปีโลก'],['คาบหมุนรอบตัว','16 ชม.'],['ความเร็ววงโคจร','5.4 กม./วิ']],
    phys:[['เส้นผ่านศูนย์กลาง','49,244 กม.'],['แรงโน้มถ่วง','1.14 g'],['อุณหภูมิ','~-200 °C'],['ดวงจันทร์','16 ดวง'],['องค์ประกอบ','ดาวน้ำแข็ง · น้ำ-มีเทน-แอมโมเนีย'],['บรรยากาศ','ไฮโดรเจน · ฮีเลียม · มีเทน']],
    facts:['ดาวที่ไกลที่สุด มีลมแรงที่สุดในระบบสุริยะถึง <b>2,100 กม./ชม.</b>',
      'ดาวเคราะห์ดวงแรกที่ถูกค้นพบด้วย <b>การคำนวณทางคณิตศาสตร์</b> ก่อนส่องกล้องเห็นจริง (ปี 1846)'] },
  { name:'ดาวพลูโต', en:'Pluto', orbit:304, size:0.7, spin:0.4, rotH:-153.29, color:'#c9b6a0', tilt:0.3, bands:false, map:'plutomap1k.jpg', type:'ดาวเคราะห์แคระ · Dwarf planet',
    orbitData:[['ระยะจากดวงอาทิตย์','5,900 ล้าน กม.'],['คาบโคจร','248 ปีโลก'],['คาบหมุนรอบตัว','6.4 วันโลก'],['ความเร็ววงโคจร','4.7 กม./วิ']],
    phys:[['เส้นผ่านศูนย์กลาง','2,377 กม.'],['แรงโน้มถ่วง','0.063 g'],['อุณหภูมิ','~-230 °C'],['ดวงจันทร์','5 ดวง (คารอน ฯลฯ)'],['องค์ประกอบ','หิน + น้ำแข็งไนโตรเจน'],['สถานะ','ดาวเคราะห์แคระ (2006)']],
    facts:['ดาวเคราะห์แคระในแถบไคเปอร์ — เคยเป็นดาวเคราะห์ดวงที่ 9 จนถูกจัดประเภทใหม่ปี 2006',
      'มีหัวใจน้ำแข็งไนโตรเจนยักษ์ (Tombaugh Regio) และดวงจันทร์ <b>คารอน</b> ที่ใหญ่เกือบครึ่งของพลูโต'] },
];

// EN parallel for the planet encyclopedia (keyed by `en`). openInfo picks this when LANG==='en'; falls back to Thai if a body is missing. Original PLANETS/SUN untouched.
export const PLANET_EN={
 'The Sun':{type:'Star · G2V',
   phys:[['Diameter','1,392,700 km'],['Mass','99.86% of the Solar System'],['Surface temp','~5,500 °C'],['Core temp','~15,000,000 °C'],['Composition','Hydrogen 73% · Helium 25%'],['Age','~4.6 billion years']],
   facts:['The Sun is vast enough to hold about <b>1.3 million Earths</b>, and its light takes <b>8 min 20 sec</b> to reach us','Every second it turns <b>~600 million tonnes</b> of hydrogen into energy through nuclear fusion']},
 'Mercury':{
   orbitData:[['Distance from Sun','57.9 million km'],['Orbital period','88 Earth days'],['Rotation period','176 Earth days'],['Orbital speed','47.4 km/s']],
   phys:[['Diameter','4,879 km'],['Gravity','0.38 g'],['Temperature','-180 to 430 °C'],['Moons','None'],['Composition','Rock and iron'],['Atmosphere','Almost none']],
   facts:['The smallest planet and the closest to the Sun — blazing by day, freezing by night, with almost no atmosphere to hold heat','Its surface is cratered like the Moon, and it has the <b>greatest temperature range</b> in the Solar System']},
 'Venus':{
   orbitData:[['Distance from Sun','108 million km'],['Orbital period','225 Earth days'],['Rotation period','243 days (retrograde)'],['Orbital speed','35 km/s']],
   phys:[['Diameter','12,104 km'],['Gravity','0.90 g'],['Temperature','~465 °C'],['Moons','None'],['Composition','Rock · iron core'],['Atmosphere','Dense CO₂ · sulfuric-acid clouds']],
   facts:['The hottest planet, from a runaway greenhouse effect — and it <b>spins slower than it orbits the Sun</b>','It turns the opposite way to the others — on Venus the Sun <b>rises in the west</b>']},
 'Earth':{
   orbitData:[['Distance from Sun','149.6 million km'],['Orbital period','365.25 days'],['Rotation period','23.9 hr'],['Orbital speed','29.8 km/s']],
   phys:[['Diameter','12,742 km'],['Gravity','1.00 g'],['Avg temperature','15 °C'],['Moons','1'],['Composition','Rock · iron-nickel core'],['Atmosphere','N₂ 78% · O₂ 21%']],
   facts:['The only planet known to hold <b>life</b>, with liquid water covering over 70% of its surface','Earth’s magnetic field <b>shields us from the solar wind</b> and gives rise to the northern and southern lights']},
 'Mars':{
   orbitData:[['Distance from Sun','228 million km'],['Orbital period','687 Earth days'],['Rotation period','24.6 hr'],['Orbital speed','24.1 km/s']],
   phys:[['Diameter','6,779 km'],['Gravity','0.38 g'],['Temperature','-140 to 20 °C'],['Moons','2'],['Composition','Volcanic rock · iron oxide'],['Atmosphere','Thin CO₂']],
   facts:['The “Red Planet,” coloured by iron rust, home to <b>Olympus Mons</b> — the tallest volcano in the Solar System (~22 km)','Its canyon <b>Valles Marineris</b> stretches over 4,000 km, and ice caps sit at both poles']},
 'Jupiter':{
   orbitData:[['Distance from Sun','778 million km'],['Orbital period','11.9 Earth years'],['Rotation period','9.9 hr'],['Orbital speed','13.1 km/s']],
   phys:[['Diameter','139,820 km'],['Gravity','2.53 g'],['Temperature','~-110 °C'],['Moons','95'],['Composition','Gas giant · hydrogen-helium'],['Atmosphere','Layered ammonia clouds']],
   facts:['The largest planet — its <b>Great Red Spot</b> is a storm bigger than Earth that has raged for centuries','Its moon <b>Ganymede</b> is the largest in the Solar System — even bigger than Mercury']},
 'Saturn':{
   orbitData:[['Distance from Sun','1,430 million km'],['Orbital period','29.5 Earth years'],['Rotation period','10.7 hr'],['Orbital speed','9.7 km/s']],
   phys:[['Diameter','116,460 km'],['Gravity','1.07 g'],['Temperature','~-140 °C'],['Moons','146'],['Composition','Gas giant · hydrogen-helium'],['Density','Less than water (it would float)']],
   facts:['Wears the most beautiful <b>rings</b>, made of millions of ice and rock pieces — hundreds of thousands of km wide yet only tens of metres thick','Its moon <b>Titan</b> has a thick atmosphere and lakes of liquid methane — a target in the search for life']},
 'Uranus':{
   orbitData:[['Distance from Sun','2,870 million km'],['Orbital period','84 Earth years'],['Rotation period','17 hr (retrograde)'],['Orbital speed','6.8 km/s']],
   phys:[['Diameter','50,724 km'],['Gravity','0.89 g'],['Temperature','~-195 °C'],['Moons','28'],['Composition','Ice giant · water-methane-ammonia'],['Atmosphere','Hydrogen · helium · methane']],
   facts:['The planet that <b>tips on its side</b> at nearly 98°, rolling along its orbit — giving it extreme, long seasons','Methane in its atmosphere absorbs red light, making it look <b>blue-green</b>']},
 'Neptune':{
   orbitData:[['Distance from Sun','4,500 million km'],['Orbital period','165 Earth years'],['Rotation period','16 hr'],['Orbital speed','5.4 km/s']],
   phys:[['Diameter','49,244 km'],['Gravity','1.14 g'],['Temperature','~-200 °C'],['Moons','16'],['Composition','Ice giant · water-methane-ammonia'],['Atmosphere','Hydrogen · helium · methane']],
   facts:['The farthest planet, with the strongest winds in the Solar System — up to <b>2,100 km/h</b>','The first planet found by <b>mathematical prediction</b> before anyone saw it through a telescope (1846)']},
 'Pluto':{type:'Dwarf planet',
   orbitData:[['Distance from Sun','5,900 million km'],['Orbital period','248 Earth years'],['Rotation period','6.4 Earth days'],['Orbital speed','4.7 km/s']],
   phys:[['Diameter','2,377 km'],['Gravity','0.063 g'],['Temperature','~-230 °C'],['Moons','5 (Charon, etc.)'],['Composition','Rock + nitrogen ice'],['Status','Dwarf planet (2006)']],
   facts:['A dwarf planet in the Kuiper Belt — once the ninth planet, until it was reclassified in 2006','It has a giant nitrogen-ice heart (Tombaugh Regio) and a moon, <b>Charon</b>, nearly half its own size']},
};

export const ZODIAC=[
  {th:'ราศีเมษ',en:'Aries',lon:33,stars:[[27,9],[32,6],[36,3],[41,2]],lines:[[0,1],[1,2],[2,3]]},
  {th:'ราศีพฤษภ',en:'Taurus',lon:60,stars:[[52,4],[57,1],[60,-2],[65,5],[70,9]],lines:[[0,1],[1,2],[1,3],[3,4]]},
  {th:'ราศีเมถุน',en:'Gemini',lon:90,stars:[[83,7],[86,2],[92,1],[96,6],[88,-3],[94,-4]],lines:[[0,1],[1,4],[2,3],[3,5],[1,2]]},
  {th:'ราศีกรกฎ',en:'Cancer',lon:118,stars:[[114,5],[118,1],[121,-3],[122,6]],lines:[[0,1],[1,2],[1,3]]},
  {th:'ราศีสิงห์',en:'Leo',lon:150,stars:[[142,8],[147,4],[151,2],[156,1],[158,-4],[150,-3]],lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[2,5]]},
  {th:'ราศีกันย์',en:'Virgo',lon:188,stars:[[180,6],[185,2],[190,-1],[195,3],[198,-5]],lines:[[0,1],[1,2],[2,3],[2,4]]},
  {th:'ราศีตุลย์',en:'Libra',lon:222,stars:[[216,5],[221,1],[225,-2],[228,4]],lines:[[0,1],[1,2],[1,3]]},
  {th:'ราศีพิจิก',en:'Scorpio',lon:245,stars:[[238,3],[243,0],[247,-3],[251,-7],[255,-10],[240,5]],lines:[[5,0],[0,1],[1,2],[2,3],[3,4]]},
  {th:'ราศีธนู',en:'Sagittarius',lon:270,stars:[[263,5],[268,1],[272,-2],[276,3],[279,-5]],lines:[[0,1],[1,2],[2,3],[2,4]]},
  {th:'ราศีมังกร',en:'Capricorn',lon:300,stars:[[293,4],[298,0],[303,-3],[307,1],[301,5]],lines:[[0,4],[0,1],[1,2],[2,3],[3,4]]},
  {th:'ราศีกุมภ์',en:'Aquarius',lon:330,stars:[[323,6],[328,2],[332,-1],[337,4],[340,-3]],lines:[[0,1],[1,2],[2,3],[2,4]]},
  {th:'ราศีมีน',en:'Pisces',lon:2,stars:[[352,5],[357,2],[2,-1],[7,3],[12,7]],lines:[[0,1],[1,2],[2,3],[3,4]]},
];
