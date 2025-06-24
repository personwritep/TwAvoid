// ==UserScript==
// @name        TwAvoid
// @namespace        http://tampermonkey.net/
// @version        1.4
// @description        「X」サイトのFilter機能
// @author        Everyone
// @match        https://x.com/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// @updateURL        https://github.com/personwritep/TwAvoid/raw/main/TwAvoid.user.js
// @downloadURL        https://github.com/personwritep/TwAvoid/raw/main/TwAvoid.user.js
// ==/UserScript==


let mode; // フィルターの追加「1」削除「0」
let avoid=[]; // リンクフィルターの配列
let home_ua; // 開いているタイムラインのユーザーアカウント


let read_json=localStorage.getItem('TwAvoid_Link'); // ローカルストレージ保存名
avoid=JSON.parse(read_json);
if(avoid==null){
    avoid=[]; }



setTimeout(()=>{
    page_ck();

    let target=document.querySelector('head title');
    let monitor0=new MutationObserver(page_ck);
    monitor0.observe(target, { childList: true });
}, 200);


function page_ck(){
    home_ua='/'+ location.pathname.split('/')[1];

    let retry=0;
    let interval=setInterval(wait_target, 100);
    function wait_target(){
        retry++;
        if(retry>50){ // リトライ制限 5secまで
            clearInterval(interval); }
        let time_line=get_line(); // 監視 target
        if(time_line){
            clearInterval(interval);
            main();
            let monitor1=new MutationObserver(main);
            monitor1.observe(time_line, { childList: true }); }}

    function get_line(){
        let cell=document.querySelector('[data-testid="cellInnerDiv"]');
        if(cell){
            let container=cell.parentNode;
            return container; }}

} // page_ck()



let count=0; // 非表示にした件数
let un_count=0; // 非表示にしなかった件数
let fuse=0; // 0 : フィルター処理 ON　1 : フィルター処理 OFF

s_meter();

function s_meter(){
    count=0;
    un_count=0;

    setTimeout(()=>{
        if(fuse_value(count, un_count)>6){ // 70%以上が非表示の場合 🟦
            fuse=1;
            let ok=confirm(
                '💢 OVERLOAD 💢\n'+
                '不適当なフィルターの設定で、通信過剰に陥っています\n'+
                '以下のどちらかの方法でフィルター設定を変更してください\n\n'+
                '❶ 「OK」➔ フィルター設定を変更する\n'+
                '❷ 「キャンセル」➔ タイムラインの表示に戻る');
            if(ok){
                disp_panel();
                mode=0;
                set_link('');
                s_meter(); }
            else{
                s_meter(); }}
        else{
            fuse=0;
            s_meter(); }
    }, 3000); } // 3secごとの集計 🟦


function fuse_value(c, un_c){
    if(c+un_c>50){ // 3secの処理件数 上限 🟦
        let av=Math.round(10*c/(c+un_c));
        return av; }
    else{
        return 0; }}



function main(){
    if(fuse==0){

        let cell=document.querySelectorAll('[data-testid="cellInnerDiv"]');
        for(let k=0; k<cell.length; k++){
            if(cell[k].style.opacity!='2'){
                engine(cell[k]);
                cell[k].style.opacity='2' }}


        function engine(tweet){
            let hav=0;
            let all_link=tweet.querySelectorAll('a');
            let url=[];
            for(let i=0; i<all_link.length; i++){
                url.push(select_url(all_link[i])); }
            if(check_url(url)){
                hav=1; }

            if(hav==1){
                count+=1;
                tweet.style.display='none'; }
            else{
                un_count+=1; }
        } // engine()


        function select_url(get_url){
            let get=get_url.getAttribute('href');
            if(get!=home_ua){
                return get; }}

        function check_url(url){
            let result=url.filter(data=>avoid.includes(data));
            if(result.length>0){
                return true; }}

    } // fuse==0


    setTimeout(()=>{
        let layers=document.querySelector('#layers');
        let monitor2=new MutationObserver(card_ck);
        monitor2.observe(layers, { childList: true });
    }, 200);

} // main()



function link_pointer(event){
    let elem=document.elementFromPoint(event.clientX, event.clientY);
    if(elem){
        let link_a=elem.closest('a');
        if(link_a){
            event.preventDefault();
            event.stopImmediatePropagation();
            let link_url=link_a.getAttribute('href');
            disp_panel();
            mode=1;
            set_link(link_url);
        }}}


document.addEventListener('contextmenu', function(event){
    if(event.altKey){
        link_pointer(event); }});


document.addEventListener('click', function(event){
    if(event.altKey){
        event.preventDefault();
        link_pointer(event); }});


function card_ck(){
    let card=document.querySelector('[data-testid="hoverCardParent"]');
    if(card){
        card.addEventListener('contextmenu', function(event){
            if(event.altKey){
                link_pointer(event); }});

        card.addEventListener('click', function(event){
            if(event.altKey){
                event.preventDefault();
                link_pointer(event); }});
    }} // card_ck()



function disp_panel(){

    let help_url='https://ameblo.jp/personwritep/entry-12910978150.html';

    let panel=
        '<div id="twa_panel">'+
        '<div class="swich_box">'+
        '<div class="swich">'+
        '<input class="add_b" type="button" value="フィルター追加">'+
        '<input class="rem_b" type="button" value="フィルター削除">'+
        '</div>'+
        '<div class="twa_file">'+
        '<input class="memo_w" type="button" value="ファイル保存">'+
        '<input class="memo_r" type="button" value="ファイルを読込む">'+
        '<input class="twa_file_input" type="file">'+
        '</div>'+
        '<input class="twa_memo" type="button" value="M">'+
        '<a href="'+ help_url +'" rel="noopener noreferrer" target="_blank">'+
        '<p class="help_twa">?</p></a>'+
        '<input class="twa_close" type="button" value="✖">'+
        '</div>'+

        '<div class="main_panel">'+
        '<div>'+
        '<input class="set_box" type="text">'+
        '</div>'+
        '<div class="avoid_list">'+
        '<ul class="avoid_ul"></ul>'+
        '</div>'+
        '</div>'+

        '<style>'+
        '#twa_panel { position: fixed; top: 60px; right: 40px; width: 380px; padding: 15px; '+
        'font: 16px Meiryo; color: #000; background: #f4fbff; border: 1px solid #aaa; '+
        'border-radius: 6px; box-shadow: 10px 20px 30px 0 #00000040; overflow: hidden; } '+
        '.swich_box { display: flex; height: 30px; align-items: center; '+
        'justify-content: space-between; } '+
        '.swich_box input { font: 14px Meiryo; padding: 3px 6px 2px; border: 1px solid #aaa; '+
        'border-radius: 4px; height: 27px; } '+
        '.swich_box input.li_tx { font: normal 16px/23px Meiryo; } '+
        '.swich { display: flex; justify-content: space-between; width: 236px; } '+
        '.add_b { margin-right: 12px; } '+
        '.set_box { font: 16px Meiryo; padding: 4px 10px 3px; margin: 12px 0; '+
        'width: 100%; background: #fff; outline: none; border: 1px solid #aaa; } '+

        '.twa_file { position: absolute; top: 17px; left: 15px; z-index: 1; '+
        'background: #fff; box-shadow: 0 0 0 100vh #fff; display: none; } '+
        '.memo_w { background: #fff; margin-right: 12px; } '+
        '.memo_r { background: #fff; } '+
        '.memo_w:hover, .memo_r:hover { background: #e1f5fe; } '+
        '.twa_file_input { display: none; } '+
        '.twa_memo, .twa_close { z-index: 1; } '+

        '.set_box::placeholder { font-size: 14px; } '+
        '.avoid_list { padding: 4px 0; min-height: 30px; max-height: calc(100vh - 200px); '+
        'border: 1px solid #aaa; overflow-y: scroll; scrollbar-color: #5da2e8 #ecf6f8; } '+
        '.avoid_ul { list-style: none; padding: 0; margin: 0; } '+
        '.avoid_ul.rem { background: #fff; } '+
        '.avoid_ul.rem .avoid_li { cursor: pointer; } '+
        '.avoid_li { padding: 3px 10px 0; height: 26px; border-bottom: 1px solid #ddd; '+
        'white-space: nowrap; overflow-x: scroll; scrollbar-width: none; } '+
        '.avoid_li:first-child { border-top: 1px solid #ddd; } '+
        '.avoid_li::-webkit-scrollbar { display: none; } '+

        '.help_twa { position: relative; z-index: 1; font: 14px Meiryo; color: #000; '+
        'height: 16px; line-height: 10px; padding: 3px; margin: 6px -8px 0 0; '+
        'border: 1px solid #999; border-radius: 20px; } '+
        '</style></div>';

    if(!document.querySelector('#twa_panel')){
        document.body.insertAdjacentHTML('beforeend', panel); }


    file_menu();

} // disp_panel()



function set_link(str){
    let twa_panel=document.querySelector('#twa_panel');
    let set_box=document.querySelector('.set_box');
    if(set_box){
        set_box.value=str; }
    set_new_link();

    if(mode==1){
        add_link(); }
    else{
        rem_link(); }

    let twa_close=document.querySelector('.twa_close');
    if(twa_panel && twa_close){
        twa_close.onclick=()=>{
            twa_panel.remove(); }}

} // set_link()



function add_link(){
    let add_b=document.querySelector('.add_b');
    add_b.style.outline='2px solid #2196f3';
    add_b.style.background='#fff';
    let rem_b=document.querySelector('.rem_b');
    rem_b.style.outline='';
    rem_b.style.background='';

    let set_box=document.querySelector('.set_box');
    set_box.disabled=false;
    set_box.style.borderColor='';
    set_box.style.background='';
    set_box.setAttribute('placeholder', 'ページ上のリンクを「Alt+右Click」して採取');
    let avoid_ul=document.querySelector('.avoid_ul');
    avoid_ul.classList.remove('rem');


    add_b.onmouseover=()=>{
        if(set_box.value){
            add_b.style.background='#b2ebf2'; }}

    add_b.onmouseleave=()=>{
        if(mode==1){
            add_b.style.background='#fff'; }}


    add_b.onclick=()=>{
        let link_str=set_box.value;
        if(link_str!=''){
            if(space_check(link_str)){
                alert("⛔ 空白文字が含まれています"); }
            else if(avoid.includes(link_str)){
                alert("⛔ 既に登録済のリンクコードです"); }
            else{
                set_box.value='';
                avoid.push(link_str);
                set_new_link(); }}

        function space_check(str){
            let check=/\s+/g;
            if(check.test(str)){
                return true; }}}


    rem_b.onclick=()=>{
        mode=0;
        set_link(''); }

} // add_link()



function rem_link(){
    let add_b=document.querySelector('.add_b');
    add_b.style.outline='';
    add_b.style.background='';
    let rem_b=document.querySelector('.rem_b');
    rem_b.style.outline='2px solid #2196f3';
    rem_b.style.background='#fff';

    let set_box=document.querySelector('.set_box');
    set_box.setAttribute('placeholder', '下のフィルターリストを「左Click」して指定');
    set_box.disabled=true;
    set_box.style.borderColor='transparent';
    set_box.style.background='transparent';
    let avoid_ul=document.querySelector('.avoid_ul');
    avoid_ul.classList.add('rem');


    let avoid_li=document.querySelectorAll('.avoid_li');
    for(let k=0; k<avoid_li.length; k++){
        avoid_li[k].onclick=()=>{
            if(!avoid_li[k].style.background){
                clear();
                rem_b.style.outline='2px solid red';
                avoid_li[k].style.background='#cfd8dc'; }
            else{ // 既に選択している行をクリックした場合はチェックウインドウを開く
                let link_code=avoid_li[k].textContent;
                let link='https://x.com'+ link_code;
                window.open( link, null, 'top=20, left=0, width=720, height=800');
            }}}


    function clear(){
        let avoid_li=document.querySelectorAll('.avoid_li');
        for(let k=0; k<avoid_li.length; k++){
            avoid_li[k].style.background=''; }}


    rem_b.onmouseover=()=>{
        let selected=0;
        let avoid_li=document.querySelectorAll('.avoid_li');
        for(let k=0; k<avoid_li.length; k++){
            if(avoid_li[k].style.background){
                selected=1; }}
        if(selected==1){
            rem_b.style.background='#f5ddee'; }}

    rem_b.onmouseleave=()=>{
        if(mode==0){
            rem_b.style.background='#fff'; }}


    rem_b.onclick=(event)=>{
        if(!event.shiftKey){
            let avoid_li=document.querySelectorAll('.avoid_li');
            for(let k=0; k<avoid_li.length; k++){
                if(avoid_li[k].style.background){
                    let select_text=avoid_li[k].textContent;
                    avoid=avoid.filter(function(item){
                        return item!=select_text; });
                    set_new_link();
                    rem_link(); }}}
        else{
            let result=window.confirm(
                '💢　フィルターの全ての「リンク」を削除します\n'+
                '　　 　この操作をする前に、「ファイル保存」でフィルターのデータを\n'+
                '　　 　バックアップしておく事を勧めます\n\n'+
                '　　 全ての「リンク」を削除をする場合は「OK」をクリックしてください');
            if(result){
                avoid=[];
                set_new_link();
                rem_link(); }}}


    add_b.onclick=()=>{
        mode=1;
        set_link(''); }

} // rem_link()



function set_new_link(){
    let set=new Set(avoid);
    avoid=[...set]; // 追加分をチェックして配列を更新
    let write_json=JSON.stringify(avoid);
    localStorage.setItem('TwAvoid_Link', write_json); // ストレージ保存

    let avoid_ul=document.querySelector('.avoid_ul');
    if(avoid_ul){
        avoid_ul.innerHTML=''; // リスト表示をクリア

        for(let k=avoid.length-1; k>=0; k--){
            let link_li='<li class="avoid_li">'+ avoid[k] +'</li>';
            avoid_ul.insertAdjacentHTML('beforeend', link_li); }}

} // set_new_link()



function file_menu(){
    let act=0; // メニュー非表示

    let twa_memo=document.querySelector('.twa_memo');
    let twa_file=document.querySelector('.twa_file');
    let main_panel=document.querySelector('.main_panel');
    if(twa_memo && twa_file && main_panel){
        if(act==0){
            twa_file.style.display='none';
            main_panel.style.display='block'; }
        else{
            act=1;
            twa_file.style.display='block';
            main_panel.style.display='none';
            backup(); }

        twa_memo.onclick=()=>{
            if(act==0){
                act=1;
                twa_file.style.display='block';
                main_panel.style.display='none';
                backup(); }
            else{
                act=0;
                twa_file.style.display='none';
                main_panel.style.display='block'; }}}


    function file_menu_close(n){
        twa_file.style.background='#b0bec5';
        twa_file.style.boxShadow='0 0 0 100vh #b0bec5';
        setTimeout(()=>{
            act=0;
            twa_file.style.background='#fff';
            twa_file.style.boxShadow='';
            twa_file.style.display='none';
            main_panel.style.display='block';
            if(n==1){
                let avoid_ul=document.querySelector('.avoid_ul');
                if(avoid_ul){
                    avoid_ul.innerHTML=''; // リスト表示をクリア

                    for(let k=avoid.length-1; k>=0; k--){
                        let link_li='<li class="avoid_li">'+ avoid[k] +'</li>';
                        avoid_ul.insertAdjacentHTML('beforeend', link_li); }}

                set_link(''); }

        }, 500); }


    function backup(){
        let memo_w=document.querySelector('.memo_w');
        let memo_r=document.querySelector('.memo_r');
        let twa_file_input=document.querySelector('.twa_file_input');

        memo_w.onclick=function(){
            let write_json=JSON.stringify(avoid); // 配列 avoid を取得
            let blob=new Blob([write_json], {type: 'application/json'});

            let a_elem=document.createElement('a');
            a_elem.href=URL.createObjectURL(blob);
            a_elem.download='TwAvoid_L.json'; // 保存ファイル名
            a_elem.click();
            URL.revokeObjectURL(a_elem.href);

            file_menu_close(0); }


        memo_r.onclick=function(){
            twa_file_input.click(); }

        twa_file_input.addEventListener("change", function(){
            if(!(twa_file_input.value)) return; // ファイルが選択されない場合
            let file_list=twa_file_input.files;
            if(!file_list) return; // ファイルリストが選択されない場合
            let file=file_list[0];

            if(!file){
                return; } // ファイルが無い場合

            else if(file.name.includes('TwAvoid_L')){ // リンクの配列
                let file_reader=new FileReader();
                file_reader.readAsText(file);
                file_reader.onload=function(){
                    let data_in=JSON.parse(file_reader.result);
                    let new_arr=Array.from(new Set([...avoid, ...data_in])); // 差分を追加
                    avoid=new_arr;
                    let write_json=JSON.stringify(avoid);
                    localStorage.setItem('TwAvoid_Link', write_json); } // ストレージ保存
                file_menu_close(1);
                twa_file_input.value=''; } // input type="file"のリセット
        });

    } // backup()

} // file_menu()
