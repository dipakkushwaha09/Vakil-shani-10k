(function(){
  /* Favicon (JS): ₹ + वकील शनि */
  try{
    var svg="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#3b2fc9'/><stop offset='.6' stop-color='#c2255c'/><stop offset='1' stop-color='#f08c00'/></linearGradient></defs><rect width='64' height='64' rx='14' fill='url(#g)'/><text x='32' y='42' font-size='38' font-weight='700' text-anchor='middle' fill='#fff' font-family='Arial,sans-serif'>₹</text><text x='32' y='58' font-size='11' font-weight='700' text-anchor='middle' fill='#ffe8a3'>वकील शनि</text></svg>";
    document.getElementById("fav").href="data:image/svg+xml,"+encodeURIComponent(svg);
  }catch(e){}

  var P=10000, MI=300, DI=10;
  var MN=["जनवरी","फ़रवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितंबर","अक्टूबर","नवंबर","दिसंबर"];
  var start=new Date(2026,10,6);
  var $=function(i){return document.getElementById(i)};
  var rs=function(n){return "₹"+n.toLocaleString("en-IN")};
  var addM=function(d,m){return new Date(d.getFullYear(),d.getMonth()+m,d.getDate())};
  var hd=function(d){return d.getDate()+" "+MN[d.getMonth()]+" "+d.getFullYear()};

  var t=new Date(), today=new Date(t.getFullYear(),t.getMonth(),t.getDate());
  var days=Math.max(0,Math.round((today-start)/864e5));
  var m=0;
  while(addM(start,m+1)<=today)m++;
  var extra=Math.min(30,Math.round((today-addM(start,m))/864e5));
  if(today<start){m=0;extra=0}
  var interest=m*MI+extra*DI, total=P+interest;

  $("asof").textContent=hd(today)+" तक कुल बकाया";
  $("total").textContent=rs(total);
  $("int").textContent=rs(interest);
  $("days").textContent=days;
  $("pbar").style.width=(P/total*100)+"%";
  $("ibar").style.width=(interest/total*100)+"%";

  var nk=m+1;
  $("nextv").textContent=hd(addM(start,nk))+" को "+rs(P+nk*MI);

  var h="";
  for(var k=1;k<=12;k++){
    var d=addM(start,k), done=d<=today, cls=done?"done":(k===nk?"now":"");
    h+='<li class="'+cls+'"><span class="n">'+k+'</span><span class="d">'+hd(d)+'<small>ब्याज '+rs(k*MI)+'</small></span><span class="t">'+rs(P+k*MI)+'<small>'+(done?"✓ बीत गया":"कुल रक़म")+'</small></span></li>';
  }
  $("sched").innerHTML=h;

  function calc(){
    var v=+$("rng").value;
    $("rv").textContent=v;
    $("o1").textContent=rs(v*MI);
    $("o2").textContent=rs(P+v*MI);
  }
  $("rng").oninput=calc;
  calc();
})();
