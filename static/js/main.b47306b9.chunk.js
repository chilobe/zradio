(this.webpackJsonpzradio=this.webpackJsonpzradio||[]).push([[0],{19:function(n,t,e){},23:function(n,t,e){},24:function(n,t,e){"use strict";e.r(t);var i=e(1),a=e.n(i),o=e(13),r=e.n(o),c=(e(19),e(2)),s=e(4),d=e(26),u=e(27),m=e(28),l=e.p+"static/media/hot_fm.572a6cfd.png",p=e.p+"static/media/iwave_fm.73d51dfc.png",f=e.p+"static/media/radio_phoenix.7376b7f6.png",h=e.p+"static/media/sun_fm.c74fe35a.png",v=e.p+"static/media/breeze_fm.2baf4b59.png",b=e.p+"static/media/radio_chikuni.40a8f6a1.png",j=e.p+"static/media/rock_fm.75c73c07.png",w=e.p+"static/media/christian_voice.c4d118c8.png",g=e.p+"static/media/metro_fm.e5f0531d.png",O=e.p+"static/media/zed_stage.4dab9508.png",y=e.p+"static/media/5fm_radio.89d530c1.png",x=(e.p,e.p,[{name:"IWave FM Radio",urls:["https://s47.myradiostream.com/:9934/listen.mp3"],icon:p,id:0,fiveFmIcon:y},{name:"HOT FM",urls:["http://s2.yesstreaming.net:7091/stream"],icon:l,id:1},{name:"Radio Phoenix 89.5",urls:["https://23553.live.streamtheworld.com/RADIO_PHOENIXAAC_SC"],icon:f,id:2},{name:"Sun FM",urls:["http://11233.cloudrad.io:9102/live"],icon:h,id:3},{name:"Breeze FM Chipata",urls:["https://s47.myradiostream.com/9934/listen.mp3"],icon:v,id:4},{name:"Radio Chikuni",urls:["http://centauri.shoutca.st:8102/stream"],icon:b,id:5},{name:"965 Rock FM",urls:["http://99.198.118.250:8238/stream"],icon:j,id:6},{name:"Radio Christian Voice",urls:["http://zas2.ndx.co.za/proxy/cvglobal?mp=/stream"],icon:w,id:7},{name:"Metro FM",urls:["https://s24.myradiostream.com/:15422/listen.mp3"],icon:g,id:8},{name:"Zed Stage Radio",urls:["https://node-03.zeno.fm/49836bqkpd0uv"],icon:O,id:9},{name:"5fm Radio",urls:["http://ca9.rcast.net:8014/;stream.mp3"],icon:y,id:10}]),E=e(8),S=e.n(E),k=e(12),L=e(9),A=e.p+"static/media/error.a6806e62.mp3",M=e.p+"static/media/calmAlarm.c1088cde.mp3",P="MUTED",N="UMUTED",C="PLAYING",F="PAUSED",R="STOPPED",_="LOAD_ERROR",z="STATION_CHANGED",I="APP_LOADED";function D(n){var t="LOAD ERROR",e=null,i=null,a=!1,o=0,r=new L.Howl({src:[M],loop:!0,preload:!0}),c=function(){r.playing()&&r.stop()};window.onload=function(){window.dispatchEvent(new Event(I))};var d=function(n,t){try{return n()}catch(A){console.error(t+": "+A)}return!1},u=function(){return d((function(){return i&&i.playing()}),"Error in isPlaying()")};this.isPlaying=u;this.isMuted=function(){return d((function(){return i&&i.mute()}),"Error in isMuted()")};this.mute=function(){return d((function(){if(i)return i.mute(!0),!0}),"Error in mute()")};this.unMute=function(){return d((function(){if(i)return i.mute(!1),!0}),"Error in unMute()")};this.getCurrentStation=function(){return n[o]};var m=function(n){d((function(){n.on("pause",(function(){window.dispatchEvent(new Event(F)),navigator.mediaSession.playbackState="paused"})),n.on("stop",(function(){window.dispatchEvent(new Event(R)),navigator.mediaSession.playbackState="paused"})),n.on("play",(function(){r&&c(),window.dispatchEvent(new Event(C)),navigator.mediaSession.playbackState="playing"})),n.on("mute",(function(){i.mute()?window.dispatchEvent(new Event(P)):window.dispatchEvent(new Event(N)),navigator.mediaSession.playbackState=i.mute()?"paused":"playing"})),n.on("loaderror",(function(){window.dispatchEvent(new Event(_)),c(),g()})),n.on("load",(function(){console.debug("cwm load event!")})),n.on("rate",(function(){console.debug("cwm unlock event!")})),n.on("playerror",(function(){g()}))}),"Error in setupSoundEventListeners()")},l=function(){var n=Object(k.a)(S.a.mark((function n(e){return S.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.debug("in playsound!-",u()),u()||r.playing()||r.play(),m(e),n.abrupt("return",d((function(){return e.play(),new Promise((function(n,i){e.once("play",(function(){navigator.mediaSession.setPositionState({duration:999999,playbackRate:1,position:80}),e.mute(!1),navigator.mediaSession.playbackState="playing",n(!0)})),e.once("loaderror",(function(n,e){i(t,e)}))}))}),"Error in playSound()"));case 3:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}(),p=function(){d((function(){i&&(i.mute()?i.mute(!1):i.mute(!0))}),"Error in play()")};this.play=p;this.pause=function(){d((function(){i&&i.mute(!0)}),"Error in pause()")};this.stop=function(){d((function(){i&&i.stop()}),"Error in stop()")};var f=function(){d((function(){i&&(i.mute()?i.mute(!1):i.mute(!0))}),"Error in handlePauseAction()")};this.handlePauseAction=f;var h=function(){p()};this.handlePlayAction=h;var v=function(){var t;t=o>=n.length-1?0:o+1,O(n[t]),window.dispatchEvent(new Event(z))};this.handleNextAction=v;var b=function(){var t;t=o<=0?n.length-1:o-1,O(n[t]),window.dispatchEvent(new Event(z))};this.handlePrevAction=b;var j=function(){if(!a){for(var n=0,t=[["play",function(){return h()}],["pause",function(){return f()}],["previoustrack",function(){return b()}],["nexttrack",function(){return v()}],["stop",function(){return console.debug("cwm stop")}]];n<t.length;n++){var e=Object(s.a)(t[n],2),i=e[0],o=e[1];try{navigator.mediaSession.setActionHandler(i,o)}catch(A){console.log('The media session action "'.concat(i,'" is not supported yet.'))}}a=!0}},w=new L.Howl({src:[A],preload:!0}),g=function(){w.playing()||w.play()},O=function(){var t=Object(k.a)(S.a.mark((function t(a){return S.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",d((function(){return i&&i.unload(),e!==a.id?(e=a.id,o=n.findIndex((function(n){return n.id===a.id})),document.title=document.title+" "+a.name,navigator.mediaSession.metadata=new window.MediaMetadata({title:a.name,album:"ZRadio 2",artwork:[{src:a.icon,sizes:"384x384",type:"image/png"}]}),i=new L.Howl({src:[a.urls],html5:!0,preload:!1}),j(),l(i)):u()?void 0:l(i)}),"Error in playStation()"));case 1:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}();this.playStation=O}var T=e(7),H=e.p+"static/media/5-seconds-of-silence.be2bc6f4.mp3",B=e(0),U=function(){var n=Object(i.useState)(null),t=Object(s.a)(n,2),e=t[0],a=t[1],o=Object(i.useState)(!1),r=Object(s.a)(o,2),l=r[0],p=r[1],f=Object(i.useState)(!1),h=Object(s.a)(f,2),v=h[0],b=h[1],j=Object(i.useState)(null),w=Object(s.a)(j,2),g=w[0],O=w[1],y=Object(i.useState)(!1),E=Object(s.a)(y,2),S=E[0],k=E[1],L=Object(i.useState)(!0),A=Object(s.a)(L,2),M=A[0],F=A[1],R=Object(i.useCallback)((function(){b(!1),p(!1),O(Object(c.a)(Object(c.a)({},g),{},{error:!0}))}),[g]),U=Object(i.useCallback)((function(){p(!1),b(!0),O(e.getCurrentStation())}),[e]);Object(i.useLayoutEffect)((function(){var n=document.querySelector(".current-station");n&&n.scrollIntoView({behavior:"smooth"})}),[g]),Object(i.useEffect)((function(){O(x[0]),a(new D(x));var n=function(){p(!1)},t=function(){b(!1),p(!0)},e=function(){b(!1),p(!0)},i=function(){F(!1)};return window.addEventListener(P,n),window.addEventListener(N,t),window.addEventListener(C,e),window.addEventListener(I,i),function(){window.removeEventListener(P,n),window.removeEventListener(N,t),window.removeEventListener(C,e),window.removeEventListener(I,i)}}),[]),Object(i.useEffect)((function(){return window.addEventListener(_,R),function(){return window.removeEventListener(_,R)}}),[R]),Object(i.useEffect)((function(){return window.addEventListener(z,U),function(){return window.removeEventListener(z,U)}}),[U]);var W=function(){!S&&g&&(navigator.mediaSession.metadata=new window.MediaMetadata({title:g.name,album:"ZRadio",artwork:[{src:"https://dummyimage.com/96x96",sizes:"96x96",type:"image/png"},{src:"https://dummyimage.com/128x128",sizes:"128x128",type:"image/png"},{src:"https://dummyimage.com/192x192",sizes:"192x192",type:"image/png"},{src:"https://dummyimage.com/256x256",sizes:"256x256",type:"image/png"},{src:"https://dummyimage.com/384x384",sizes:"384x384",type:"image/png"},{src:"https://dummyimage.com/512x512",sizes:"512x512",type:"image/png"}]}),document.getElementById("silentSound").play(),document.getElementById("silentSound").pause(),navigator.mediaSession.playbackState="paused",k(!0))},Z=function(n){var t="shadow ";return g&&n.id===g.id&&(t+="current-station ",g.error&&(t+="station-error")),t};return Object(B.jsx)(B.Fragment,{children:Object(B.jsxs)("div",{className:"media-player-container",children:[Object(B.jsxs)("div",{className:"media-header",children:[v&&Object(B.jsxs)(B.Fragment,{children:["  ",Object(B.jsx)(d.a,{animation:"border",role:"status"}),"\xa0 "]}),Object(B.jsx)("span",{children:M?"Loading...":g&&g.name})]}),Object(B.jsx)("div",{className:"media-content",children:x.map((function(n,t){return Object(B.jsxs)(u.a,{className:Z(n),onClick:function(){return function(n){O(n),W(),e&&(b(!0),p(!1),e.playStation(n))}(n)},children:[Object(B.jsxs)(u.a.Header,{className:"text-center",children:[Object(B.jsx)("span",{children:n.name}),g&&n.id===g.id&&l&&Object(B.jsxs)(B.Fragment,{children:["\xa0",Object(B.jsx)(T.b,{})," "]}),g&&n.id===g.id&&v&&Object(B.jsxs)(B.Fragment,{children:["\xa0",Object(B.jsx)(d.a,{animation:"border",role:"status"})," "]}),g&&n.id===g.id&&g.error&&Object(B.jsxs)(B.Fragment,{children:["\xa0",Object(B.jsx)(T.a,{})," "]})]}),Object(B.jsx)(u.a.Body,{children:Object(B.jsx)(u.a.Img,{src:n.icon})})]},t)}))}),Object(B.jsxs)("div",{className:"media-controls-container",children:[Object(B.jsx)("audio",{src:H,id:"silentSound",loop:!0,children:"audio unspported"}),Object(B.jsx)(m.a,{className:"media-control",variant:"dark",onClick:function(){return e.handlePrevAction()},children:Object(B.jsx)(T.f,{})}),Object(B.jsx)(i.Fragment,{children:v?Object(B.jsx)(d.a,{animation:"border",role:"status",className:"media-control",children:Object(B.jsx)("span",{className:"visually-hidden",children:"Loading..."})}):Object(B.jsxs)(m.a,{className:"media-control",variant:"dark",onClick:function(){W(),e&&(e.isPlaying()?e.isMuted()?e.unMute():e.mute():(b(!0),p(!1),e.playStation(g)))},children:[l&&Object(B.jsx)(T.c,{}),!l&&Object(B.jsx)(T.d,{})]})}),Object(B.jsx)(m.a,{className:"media-control",variant:"dark",onClick:function(){return e.handleNextAction()},children:Object(B.jsx)(T.e,{})})]}),M&&Object(B.jsx)("div",{className:"loading-overlay",children:Object(B.jsx)(d.a,{animation:"border",role:"status"})})]})})};e(23);var W=function(){return Object(B.jsx)(U,{})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Z=function(n){n&&n instanceof Function&&e.e(3).then(e.bind(null,29)).then((function(t){var e=t.getCLS,i=t.getFID,a=t.getFCP,o=t.getLCP,r=t.getTTFB;e(n),i(n),a(n),o(n),r(n)}))};r.a.render(Object(B.jsx)(a.a.StrictMode,{children:Object(B.jsx)(W,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()})).catch((function(n){console.error(n.message)})),Z()}},[[24,1,2]]]);
//# sourceMappingURL=main.b47306b9.chunk.js.map