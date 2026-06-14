
function shuffle(a){return [...a].sort(()=>Math.random()-0.5)}
let quiz=shuffle(QUESTIONS).slice(0,30);
const app=document.getElementById('app');
app.innerHTML='<form id=q></form><button onclick="check()">Vyhodnotit</button><button onclick="location.reload()">Nový test</button><div id=r></div>';
const f=document.getElementById('q');
quiz.forEach((q,i)=>{
 let h=`<div><h3>${i+1}. ${q.question}</h3>`;
 for(const [k,v] of Object.entries(q.options)){
  h+=`<label><input type=radio name=q${i} value=${k}> ${k}) ${v}</label><br>`;
 }
 h+='</div><hr>';
 f.insertAdjacentHTML('beforeend',h);
});
window.check=()=>{
 let score=0;
 quiz.forEach((q,i)=>{
  let sel=document.querySelector(`input[name=q${i}]:checked`);
  document.querySelectorAll(`input[name=q${i}]`).forEach(el=>{
   let p=el.parentElement;
   if(el.value===q.correct)p.style.background='#b7ffb7';
   if(sel && el===sel && el.value!==q.correct)p.style.background='#ffb7b7';
  });
  if(sel && sel.value===q.correct)score++;
 });
 document.getElementById('r').innerHTML=`<h2>Výsledek: ${score}/30 (${Math.round(score/30*100)}%)</h2>`;
}
