(() => {
'use strict';
const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
let lang='en';try{lang=localStorage.getItem('770-language')==='he'?'he':'en'}catch{}
const t=(en,he)=>lang==='he'?he:en;
const state={type:'',stage:'',budget:'',timeline:'',idea:'',name:'',email:''};
let step=0,opener=null,sending=false;
const form=$('#brief-form');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function updateWhatsAppLinks(){
  const msg=t(
    'Hi 770labs 👋 I visited your website and would love to talk about a new project!',
    'היי 770labs 👋 הגעתי אליכם דרך האתר, אשמח לדבר על פרויקט חדש!'
  );
  const url='https://wa.me/972538203770?text='+encodeURIComponent(msg);
  const floatBtn=$('#whatsapp-float');
  if(floatBtn){
    floatBtn.href=url;
    floatBtn.setAttribute('aria-label',t('Send us a message on WhatsApp','שליחת הודעה בוואטסאפ'));
    floatBtn.setAttribute('title',t('WhatsApp','וואטסאפ'));
  }
  const footerWa=$('#footer-wa');
  if(footerWa)footerWa.href=url;
}
function language(){
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='he'?'rtl':'ltr';
  $$('[data-en]').forEach(el=>el.textContent=el.dataset[lang]);
  $('#language').textContent=lang==='en'?'HE':'EN';
  $('#language').setAttribute('aria-label',t('Switch to Hebrew','החלפה לאנגלית'));
  document.title=t('770labs — From what if. To what’s next.','770labs — מהרעיון בראש. למוצר שעובד.');
  $$('[data-close]').forEach(el=>el.setAttribute('aria-label',t('Close dialog','סגירת חלון')));
  $('.menu-toggle').setAttribute('aria-label',t('Toggle navigation','פתיחה וסגירת תפריט'));
  $('.next-project .round-button').setAttribute('aria-label',t('Start a project','מתחילים פרויקט'));
  $('.project-visual').setAttribute('aria-label',t('Visit Chabad Calendar (opens in a new tab)','לפתיחת לוח חב״ד בלשונית חדשה'));
  $$('img[src="assets/chabad-calendar.png"]').forEach(el=>el.alt=t('Chabad Calendar interface showing the Hebrew calendar and daily events','ממשק לוח חב״ד המציג לוח שנה עברי־לועזי וזמני היום'));
  updateWhatsAppLinks();
  if($('#project-dialog').open)renderStep();
}
$('#language').addEventListener('click',()=>{lang=lang==='en'?'he':'en';try{localStorage.setItem('770-language',lang)}catch{}language()});
language();$('#year').textContent=new Date().getFullYear();
$('.menu-toggle').addEventListener('click',()=>{const nav=$('.mobile-nav');nav.hidden=!nav.hidden;$('.menu-toggle').setAttribute('aria-expanded',String(!nav.hidden))});$$('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>{$('.mobile-nav').hidden=true;$('.menu-toggle').setAttribute('aria-expanded','false')}));
function openDialog(id,el){opener=el;$(id).showModal();document.body.classList.add('dialog-open')}
$$('dialog').forEach(d=>{d.addEventListener('close',()=>{document.body.classList.remove('dialog-open');opener?.focus()});$('[data-close]',d).addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
$$('[data-start]').forEach(b=>b.addEventListener('click',()=>{step=0;sending=false;renderStep();openDialog('#project-dialog',b)}));
$('#case-open').addEventListener('click',e=>openDialog('#case-dialog',e.currentTarget));$('#privacy-open').addEventListener('click',e=>openDialog('#privacy-dialog',e.currentTarget));
const choices={
  type:[['website','Website','אתר אינטרנט / מותג'],['app','Application','אפליקציה / מערכת'],['redesign','Redesign','שדרוג מוצר קיים'],['explore','Let’s explore','עדיין מתלבטים — נחשוב יחד']],
  stage:[['idea','An early idea','רעיון ראשוני'],['plan','A defined plan','יש אפיון או כיוון מוגדר'],['existing','An existing product','מוצר חי שרוצים לשדרג']],
  budget:[['discuss','Let’s discuss','נשמח להתייעץ'],['under10','Under ₪10,000','עד 10,000 ₪'],['10to30','₪10,000–30,000','10,000–30,000 ₪'],['30to70','₪30,000–70,000','30,000–70,000 ₪'],['70plus','₪70,000+','מעל 70,000 ₪']],
  timeline:[['flexible','Flexible','גמיש'],['soon','As soon as possible','כמה שיותר מהר'],['1to3','In 1–3 months','בחודשיים־שלושה הקרובים'],['3plus','In 3+ months','בעוד 3 חודשים ומעלה']]
};
const label=(key)=>{const v=choices[key]?.find(c=>c[0]===state[key]);return v?t(v[1],v[2]):t('Not specified','לא צוין')};
function radios(key){return '<div class="choice-grid">'+choices[key].map(c=>`<label class="choice"><input type="radio" name="${key}" value="${c[0]}" ${state[key]===c[0]?'checked':''}>${escape(t(c[1],c[2]))}</label>`).join('')+'</div>'}
function select(key,title){return `<label class="field">${title}<select name="${key}">${choices[key].map(c=>`<option value="${c[0]}" ${state[key]===c[0]?'selected':''}>${escape(t(c[1],c[2]))}</option>`).join('')}</select></label>`}
function brief(){return t('New project enquiry — 770labs','פנייה חדשה לפרויקט — 770labs')+'\n\n'+t('Name: ','שם: ')+state.name+'\n'+t('Email: ','אימייל: ')+state.email+'\n'+t('Project: ','סוג פרויקט: ')+label('type')+'\n'+t('Stage: ','שלב נוכחי: ')+label('stage')+'\n'+t('Budget: ','תקציב משוער: ')+label('budget')+'\n'+t('Timeline: ','לוח זמנים: ')+label('timeline')+'\n\n'+state.idea}
async function sendBriefEmail(){
  try{
    await fetch('https://formsubmit.co/ajax/770labs@gmail.com',{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({
        _subject:t(`New project enquiry — 770labs (${state.name})`,`פנייה חדשה מהאתר — 770labs (${state.name})`),
        _template:'table',
        _captcha:'false',
        name:state.name,
        email:state.email,
        _replyto:state.email,
        project:label('type'),
        stage:label('stage'),
        budget:label('budget'),
        timeline:label('timeline'),
        message:state.idea
      })
    });
  }catch{}
}
function renderStep(){
  const title=[
    t('What are we building?','מה בונים יחד?'),
    t('Tell us a little more.','ספרו לנו קצת על הפרויקט.'),
    t('Who’s behind the idea?','נעים להכיר, איך חוזרים אליכם?'),
    t('Your enquiry has been sent!','הפנייה נשלחה בהצלחה!')
  ];
  $('#step-label').textContent=step<3?t(`STEP 0${step+1} / 03`,`שלב 0${step+1} / 03`):t('COMPLETED ✓','נשלח בהצלחה ✓');
  $('#step-bar').style.width=step<3?(((step+1)/3)*100)+'%':'100%';
  $('#back-step').textContent=t('← Back','חזרה →');
  $('#back-step').hidden=step===0||step===3;
  $('#next-step').disabled=sending;
  $('#next-step').textContent=sending?t('Sending...','שולח...'):(step===2?t('Send ↗','שלח ↖'):t('Continue ↗','המשך ↖'));
  $('#next-step').hidden=step===3;
  $('#form-error').textContent='';
  let html=`<h3 tabindex="-1">${title[step]}</h3>`;
  if(step===0)html+=`<p class="form-hint">${t('Pick the direction that feels right.','בחרו את הכיוון שהכי מתאים לכם כרגע.')}</p>${radios('type')}<label class="field">${t('Where are you now?','באיזה שלב אתם נמצאים?')}<select name="stage">${choices.stage.map(c=>`<option value="${c[0]}" ${state.stage===c[0]?'selected':''}>${t(c[1],c[2])}</option>`).join('')}</select></label>`;
  if(step===1)html+=`<p class="form-hint">${t('A few lines are enough to get started.','כמה משפטים קצרים יספיקו כדי שנבין את התמונה.')}</p><label class="field">${t('The idea or challenge *','ספרו לנו על הרעיון או המטרה *')}<textarea name="idea" required minlength="10" maxlength="1500" placeholder="${t('What would you love to create, and who is it for?','מה תרצו לבנות, למי זה מיועד ומה חשוב לכם להשיג?')}">${escape(state.idea)}</textarea></label>${select('budget',t('Estimated budget (ILS)','תקציב משוער (ש״ח)'))}${select('timeline',t('Ideal timing','מתי תרצו להתחיל?'))}`;
  if(step===2)html+=`<p class="form-hint">${t('Fill in your details and press Send.','מלאו את הפרטים שלכם ולחצו על שלח.')}</p><label class="field">${t('Your name *','השם שלכם *')}<input name="name" autocomplete="name" required maxlength="100" value="${escape(state.name)}"></label><label class="field">${t('Email address *','כתובת אימייל *')}<input type="email" name="email" autocomplete="email" dir="ltr" required maxlength="150" value="${escape(state.email)}"></label>`;
  if(step===3)html+=`<div class="sent-box"><span class="sent-icon">✓</span><span>${t('We received your details and will get back to you soon.','קיבלנו את הפרטים שלכם במייל ונחזור אליכם בהקדם.')}</span></div><div class="review">${escape(brief())}</div><div class="send-options"><button type="button" class="pill primary" id="done-close">${t('Close','סגירה')}</button></div>`;
  $('#form-step').innerHTML=html;
  $('#done-close')?.addEventListener('click',()=>$('#project-dialog').close());
}
function saveStep(){new FormData(form).forEach((v,k)=>{if(k in state)state[k]=String(v).trim()})}
form.addEventListener('input',saveStep);form.addEventListener('change',saveStep);
form.addEventListener('submit',async e=>{
  e.preventDefault();
  if(sending)return;
  saveStep();
  if(step===0&&!state.type){$('#form-error').textContent=t('Choose a project type to continue.','בחרו סוג פרויקט כדי להמשיך.');return}
  if(step===1&&state.idea.trim().length<10){$('#form-error').textContent=t('Tell us a little more (at least 10 characters).','כתבו לנו עוד כמה מילים (לפחות 10 תווים).');return}
  if(step===2){
    if(!state.name.trim()){$('#form-error').textContent=t('Please enter your name.','אנא הזינו את שמכם.');return}
    if(!state.email.trim()||!state.email.includes('@')){$('#form-error').textContent=t('Please enter a valid email address.','אנא הזינו כתובת אימייל תקינה.');return}
    sending=true;
    renderStep();
    await sendBriefEmail();
    sending=false;
    step=3;
    renderStep();
    $('#form-step h3').focus();
    return;
  }
  if(step<2){
    step++;
    renderStep();
    $('#form-step h3').focus();
  }
});
$('#back-step').addEventListener('click',()=>{if(sending)return;saveStep();step=Math.max(0,step-1);renderStep();$('#form-step h3').focus()});
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window&&!reduced.matches){document.body.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});$$('.reveal').forEach(el=>observer.observe(el))}
let ticking=false;function scrollUpdate(){const max=document.documentElement.scrollHeight-innerHeight;$('.scroll-progress').style.width=(max>0?scrollY/max*100:0)+'%';ticking=false}addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(scrollUpdate);ticking=true}},{passive:true});scrollUpdate();
if(!reduced.matches&&matchMedia('(pointer:fine)').matches){$('.hero').addEventListener('pointermove',e=>{$('.hero-art').style.setProperty('--tilt',((e.clientX/innerWidth-.5)*4)+'deg')});$('.hero').addEventListener('pointerleave',()=>$('.hero-art').style.setProperty('--tilt','0deg'))}
$$('.services details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)$$('.services details').forEach(other=>{if(other!==detail)other.open=false})}));
})();
