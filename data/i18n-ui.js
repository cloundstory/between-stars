// ============================================================
//  Between Stars · data/i18n-ui.js
//  EN strings for static UI chrome + eclipse labels (TH อยู่ใน HTML)
//  data ล้วน ไม่มี logic — ย้ายออกจาก solar-system.html (เฟส 1 แยกโมดูล)
// ============================================================

// EN overrides for static UI chrome. Keys map to [data-i18n] (text) / [data-i18n-ph] (placeholder) / [data-i18n-title] (title).
export const UI_EN={
 'dock.sound':'Ambient sound','dock.play':'Play / pause time','dock.prev':'Back 1 month','dock.next':'Forward 1 month',
 'dock.rate':'Time rate','dock.now':'Today','dock.layers':'Layers ▾',
 'views.orbits':'Orbits','views.labels':'Names','views.belt':'Asteroid / Kuiper belt','views.zodiac':'Zodiac',
 'views.missions':'Mission paths','views.scale':'True scale','views.hideui':'Hide UI','views.reset':'Reset view','views.replay':'✦ Replay guide',
 'ui.restore':'⤢ Show UI',
 'philo.hint':'✦ Write an “Inner Space” note and watch your star slowly glow',
 'philo.mood':'◐ Inner Space','philo.echo':'✧ Star Echo','philo.bh':'◌ Let go','philo.write':'✦ Leave a message','philo.reset':'⊙ Reset view',
 'info.focus':'Zoom camera to this body',
 'mode.contemplate':'✦ Contemplate',
 'mood.pre':'INNER SPACE','mood.reroll':'↻ Another question',
 'mood.note':'Anything on your mind? You can leave it here — there’s always space for you.',
 'bh.label':'Black hole · tap to let go','bh.title':'Black Hole',
 'bh.poem':'What crosses the event horizon never returns — not even light<br><span>this is the place for letting go</span>',
 'bh.ph':'Is there something you want to let disappear…','bh.release':'Release into the dark',
 'msg.ph':'Write a message, up to 200 characters…','msg.send':'✦ Leave it with the stars',
 'msg.replyToggle':'✉ Write back','msg.replyPh':'Write back… your reply will drift toward whoever left this',
 'msg.replySend':'✦ Send your reply','msg.report':'⚐ Report as inappropriate',
 'res.ph':'Leave your resonance…','res.submit':'Post resonance',
 'intro.over':'An interactive model','intro.title':'The Solar System','intro.sub':'the real sky, alive and in motion','intro.enter':'TAP ANYWHERE TO BEGIN',
 'pbd.earth':'Earth','pbd.stripe':'Sunlight scattered in the camera’s lens — not a ring',
 'pbd.l1':'Look again at that dot.','pbd.l2':'That’s here. That’s home. That’s us.',
 'pbd.l3':'On it everyone you love, everyone you know,','pbd.l4':'everyone who ever was, lived out their lives.',
 'pbd.l5':'Every hero and coward, every creator','pbd.l6':'and destroyer of civilization, every saint and sinner —',
 'pbd.l7':'lived there, on a mote of dust suspended in a sunbeam.','pbd.l8':'The Earth is a very small stage in a vast cosmic arena.',
 'pbd.endQuote':'That’s us. All of us.','pbd.endSub':'In a single pixel · a 640×480 photo · 6 billion km from Earth','pbd.return':'← Back to the cosmos',
 'mem.vaultPre':'Star vault · <span id="vaultCount">0/9</span>','mem.mcPre':'Inner Space · <span id="mcDate"></span>',
 'mem.candTitle':'A new star is forming','mem.candModalTitle':'A new star','mem.candPreview':'See this star',
 'mem.archive':'Keep in vault','mem.dismiss':'Let it scatter','mem.slotTitle':'Choose an orbit for this star to take',
 'mem.starBorn':'✦ A new star is born','mem.snHint':'Leave it blank — the universe will name it from the words in your heart',
 'mem.nameSave':'Name this star','mem.nameSkip':'Let the universe name it',
 'mem.vaultLabel':'Star vault','mem.vaultSlotTitle':'Choose an orbit for the star to take',
 'mem.bringBack':'Bring back into orbit','mem.release':'Release the star','mem.cancel':'Cancel',
 'star.label':'Your star','star.growth':'Growth level','star.addBtn':'✦ Write today’s Inner Space','star.stageUp':'STAGE UP',
 'star.poem':'A star that floats free, orbiting no one — turning around your own heart<br><span>its colour and light are born from the Inner Space you write</span>',
 'gr.sub':'A golden record holding the sounds and images of humankind, sent out aboard Voyager 1<br>in case someone, somewhere in the universe, ever finds it',
 'gr.contextTitle':'What is already recorded',
 'gr.contextRow':'<span>115 images</span> — Earth, humankind, life, science<br><span>27 pieces of music</span> — Bach · Beethoven · Chuck Berry · Thai music<br><span>55 languages</span> — greetings from every corner of the world<br><span>Sounds of nature</span> — waves, rain, wind, whales, a beating heart<br><span>Ann Druyan’s brainwaves</span> — recorded while thinking of love',
 'gr.voiceLabel':'A voice from Earth','gr.you':'— your voice is in there too',
 'gr.note':'1 Signal, recorded once · it won’t appear when you click the craft — but someone else might receive it',
 'gr.already':'<span class="gr-check">✦</span>Sealed<br><span style="font-size:10px;color:rgba(255,200,80,.35)" id="grAlreadyDate"></span>',
 'gr.ph':'Write in case someone in this universe receives it…','gr.submit':'✦ Seal it onto the record',
 'cm.pre':'A signal from the deep','cm.close':'Acknowledged',
 'ds.sub':'Deep-space probes · real-time distance from the Sun',
 'bnav.home':'← Between Stars','bnav.credits':'Credits','bnav.privacy':'Privacy','guide.label':'✦ Guide',
 'lang.toggle':'ไทย'
};

// EN parallel for mission badge/timeline/facts/philo (keyed by id). openMissionInfo picks this when LANG==='en'.
export const MISSION_EN={
 voyager1:{badge:'Interstellar probe · 1977',
   timeline:[['Launch','5 Sep 1977'],['Jupiter flyby','5 Mar 1979'],['Saturn flyby','12 Nov 1980'],['Entered interstellar space','25 Aug 2012']],
   facts:['<b>The most distant human-made object</b> — now in interstellar space, beyond the reach of the Sun’s wind.','Carries the <b>Golden Record</b>, holding Earth’s sounds and images, in case another civilization finds it.'],
   philo:{quote:'24,000,000,000 kilometres from home — and still sending signals back',
     facts:['Its remaining RTG power is under 5 watts — less than a fridge bulb — yet it still crosses the void.','Humanity recorded waves, rain, whale song, a heartbeat, and music from 27 cultures onto the golden disc — in case someone finds it.','Ann Druyan recorded her own brainwaves while thinking of love — that feeling has already left the Solar System.','The sunlight it receives is 900× fainter than on Earth — still just enough to send word home.']}},
 voyager2:{badge:'Grand Tour · 1977',
   timeline:[['Launch','20 Aug 1977'],['Jupiter','9 Jul 1979'],['Saturn','25 Aug 1981'],['Uranus','24 Jan 1986'],['Neptune','25 Aug 1989']],
   facts:['The only craft in history to visit <b>both Uranus and Neptune</b> — the “Grand Tour” rode a planetary alignment that recurs only every ~175 years.','Entered interstellar space in 2018, the second to do so after Voyager 1.'],
   philo:{quote:'The only craft to touch all four giant planets — a chance that comes once every 175 years',
     facts:['The alignment that made the Grand Tour possible last occurred in Thomas Jefferson’s era, and returns in 2153.','Voyager 2 launched sixteen days before Voyager 1 — they’re now in different directions, over 40 AU apart.','Its images revealed a storm on Neptune larger than Earth, over 4,500,000,000 kilometres away.','Its returning signal is weaker than a wristwatch bulb, yet we built 70-metre antennas to catch it.']}},
 newhorizons:{badge:'Mission to Pluto · 2006',
   timeline:[['Launch','19 Jan 2006'],['Jupiter gravity assist','28 Feb 2007'],['Pluto flyby','14 Jul 2015'],['Kuiper object Arrokoth flyby','1 Jan 2019']],
   facts:['The first craft to explore <b>Pluto</b> up close, revealing its famous nitrogen-ice “heart.”','Left Earth at the highest launch speed ever, ~16 km/s — passing the Moon’s orbit in just 9 hours.'],
   philo:{quote:'It carries the ashes of Clyde Tombaugh — he got to visit the world he discovered',
     facts:['Clyde Tombaugh discovered Pluto in 1930, died in 1997, and in 2006 part of him set off to visit it.','Pluto’s “heart” — Tombaugh Regio — is a nitrogen-ice plain the size of Texas, found by this craft.','New Horizons took 9.5 years to reach Pluto, but only 22 minutes to fly past it.','All the data from the Pluto flyby took 16 months to fully return to Earth.']}},
};

export const SOLAR_EN={total:'Total solar eclipse',annular:'Annular solar eclipse',partial:'Partial solar eclipse',hybrid:'Hybrid solar eclipse'};

export const LUNAR_EN={total:'Total lunar eclipse',partial:'Partial lunar eclipse',penumbral:'Penumbral lunar eclipse'};
