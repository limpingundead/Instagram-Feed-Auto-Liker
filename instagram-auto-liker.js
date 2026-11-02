(() => {
  if(window.IGAutoLiker){console.warn("IGAutoLiker already loaded. Stop it before reloading.");return;}
  const MAX_LIKES=100,MIN_DELAY=3000,SCROLL_INTERVAL=500;
  let running=false,likes=0,delay=3000,timer=null,lastScroll=0,nextLikeAt=0;
  const attempted=new WeakSet();
  function visible(el){
    if(!el||!el.isConnected)return false;
    const r=el.getBoundingClientRect(),s=getComputedStyle(el);
    return r.width>0&&r.height>0&&s.display!=="none"&&s.visibility!=="hidden"&&r.bottom>0&&r.top<innerHeight;
  }
  function restricted(){
    const t=(document.body?.innerText||"").toLowerCase();
    return ["try again later","we restrict certain activity","action blocked","you are temporarily blocked","please wait a few minutes"].some(x=>t.includes(x));
  }
  function findLike(){
    for(const svg of document.querySelectorAll('svg[aria-label="Like"]')){
      const c=svg.closest('[role="button"]');
      if(!c||!visible(svg)||!visible(c)||attempted.has(c))continue;
      const r=c.getBoundingClientRect();if(r.left<innerWidth*.25||r.right>innerWidth*.9)continue;
      return c;
    }return null;
  }
  function scrollFeed(){
    if(Date.now()-lastScroll<SCROLL_INTERVAL)return;
    lastScroll=Date.now();
    const sc=document.scrollingElement||document.documentElement,before=sc.scrollTop;
    sc.scrollBy({top:Math.max(450,Math.round(innerHeight*.7)),behavior:"smooth"});
    setTimeout(()=>{
      if(sc.scrollTop===before){
        const candidates=[...document.querySelectorAll("main,div")].filter(el=>{
          const r=el.getBoundingClientRect(),s=getComputedStyle(el);
          return r.width>innerWidth*.25&&r.left<innerWidth*.8&&r.right>innerWidth*.2&&
            el.scrollHeight>el.clientHeight+100&&/(auto|scroll)/.test(s.overflowY);
        }).sort((a,b)=>(b.clientHeight*b.clientWidth)-(a.clientHeight*a.clientWidth));
        candidates[0]?.scrollBy({top:Math.max(450,Math.round(candidates[0].clientHeight*.7)),behavior:"smooth"});
      }
      console.log("[IG Feed Helper v1.2] Auto-scroll attempted.");
    },500);
  }
  function stop(msg="Stopped."){
    running=false;if(timer)clearTimeout(timer);timer=null;console.log("[IG Feed Helper v1.2]",msg);
  }
  function tick(){
    if(!running)return;
    if(restricted()){stop("Instagram warning/restriction detected. Do not restart now.");return;}
    if(likes>=MAX_LIKES){stop(`Session limit reached: ${likes}/${MAX_LIKES}.`);return;}
    const now=Date.now(),c=findLike();
    if(c&&now>=nextLikeAt){
      attempted.add(c);c.click();likes++;nextLikeAt=now+delay;
      console.log(`[IG Feed Helper v1.2] Like action ${likes}/${MAX_LIKES}.`);
    }else if(!c){scrollFeed();}
    timer=setTimeout(tick,1000);
  }
  window.IGAutoLiker={
    start(ms=3000){
      if(running)return "Already running.";
      delay=Math.max(MIN_DELAY,Math.min(30000,Number(ms)||3000));
      likes=0;lastScroll=0;nextLikeAt=0;running=true;
      console.log(`[IG Feed Helper v1.2] Started. Max ${MAX_LIKES}; like interval ${delay/1000}s; auto-scroll check ${SCROLL_INTERVAL/1000}s.`);
      tick();return "Started.";
    },
    stop:()=>stop("Stopped by user."),
    status:()=>({running,likes,maxLikes:MAX_LIKES,likeIntervalSeconds:delay/1000,autoScrollCheckSeconds:SCROLL_INTERVAL/1000})
  };
  console.log("v1.2 loaded. Commands: IGAutoLiker.start(3000), IGAutoLiker.status(), IGAutoLiker.stop()");
})();