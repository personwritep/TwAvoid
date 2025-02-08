// ==UserScript==
// @name        TwAvoid
// @namespace        http://tampermonkey.net/
// @version        1.0
// @description        Twitter Filter
// @author        Everyone
// @match        https://twitter.com/*
// @match        https://x.com/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @updateURL        https://github.com/personwritep/TwAvoid/raw/main/TwAvoid.user.js
// @downloadURL        https://github.com/personwritep/TwAvoid/raw/main/TwAvoid.user.js
// ==/UserScript==


let mode; // フィルターの追加「1」削除「0」
let mode_lt; // Link「0」・Text「1」 の処理選択
let avoid=[]; // リンクフィルターの配列
let avoid_tx=[]; // テキストフィルターの配列
let avoid_regexp; // 正規表現オブジェクト
let home_ua; // 開いているタイムラインのユーザーアカウント


let read_json=localStorage.getItem('TwAvoid_Link'); // ローカルストレージ保存名
avoid=JSON.parse(read_json);
if(avoid==null){
    avoid=['temporary-link']; }

read_json=localStorage.getItem('TwAvoid_Text'); // ローカルストレージ保存名
avoid_tx=JSON.parse(read_json);
if(avoid_tx==null){
    avoid_tx=[]; }
new_reg();

function new_reg(){
    if(avoid_tx.length==0){
        avoid_regexp=0; } // 配列の子要素が0の場合は特別処理
    if(avoid_tx.length>0){
        let tmp_ex=avoid_tx.join('|');
        avoid_regexp=new RegExp(tmp_ex); }}



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
                mode_lt=0;
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
            if(check_url(url)){ // check1
                hav=1; }
            else{
                if(avoid_regexp!=0){ // 0の時は処理しない
                    let tweet_text=tweet.textContent;
                    if(avoid_regexp.test(tweet_text)){ // check2
                        hav=1; }}}

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
    }


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
            mode_lt=0;
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
    let panel=
        '<div id="twa_panel">'+
        '<div class="swich_box">'+
        '<div class="swich">'+
        '<input class="li_tx" type="button" value="Link">'+
        '<input class="add_b" type="button" value="フィルター追加">'+
        '<input class="rem_b" type="button" value="フィルター削除">'+
        '</div>'+
        '<div class="twa_file">'+
        '<input class="memo_w" type="button" value="ファイルに保存する">'+
        '<input class="memo_r" type="button" value="ファイルから読込む">'+
        '<input class="twa_file_input" type="file">'+
        '</div>'+
        '<input class="twa_memo" type="button" value="M">'+
        '<input class="twa_close" type="button" value="✖">'+
        '</div>'+
        '<div>'+
        '<input class="set_box" type="text">'+
        '</div>'+
        '<div class="avoid_list">'+
        '<ul class="avoid_ul"></ul>'+
        '</div>'+

        '<style>#twa_panel { position: fixed; top: 60px; right: 40px; width: 360px; '+
        'font: 16px Meiryo; color: #000; background: #f4fbff; padding: 15px; overflow: hidden; '+
        'border: 1px solid #aaa; border-radius: 6px; box-shadow: 10px 20px 30px 0 #ccc; } '+
        '.swich_box { display: flex; height: 30px; align-items: center; '+
        'justify-content: space-between; } '+
        '.swich_box input { padding: 3px 7px 2px; border: 1px solid #aaa; '+
        'border-radius: 4px; height: 27px; } '+
        '.swich_box input.li_tx { font: normal 16px/23px Meiryo; } '+
        '.swich { display: flex; justify-content: space-between; width: 280px; } '+
        '.set_box { font: 16px Meiryo; padding: 4px 10px 3px; margin: 10px 0; '+
        'width: calc(100% - 23px); } '+

        '.twa_file { position: absolute; top: 17px; left: 15px; z-index: 1; '+
        'background: #fff; box-shadow: 0 0 0 100vh #fff; display: none; } '+
        '.memo_w { margin-right: 10px; } '+
        '.twa_file_input { display: none; } '+
        '.twa_memo, .twa_close { z-index: 1; } '+

        '.set_box::placeholder { font-size: 14px; } '+
        '.avoid_list { margin: 10px 0 0; padding: 4px 0; min-height: 30px; '+
        'max-height: 240px; border: 1px solid #aaa; overflow-y: scroll; } '+
        '.avoid_ul { list-style: none; padding: 0; margin: 0; } '+
        '.avoid_ul.rem { background: #fff; } '+
        '.avoid_ul.rem .avoid_li { cursor: pointer; } '+
        '.avoid_li { padding: 3px 10px 0; height: 26px; border-bottom: 1px solid #ddd; '+
        'white-space: nowrap; overflow-x: scroll; scrollbar-width: none; } '+
        '.avoid_li:first-child { border-top: 1px solid #ddd; } '+
        '.avoid_li::-webkit-scrollbar { display: none; } '+
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


    let li_tx=document.querySelector('.li_tx');
    if(li_tx && twa_panel){
        if(mode_lt==0){
            li_tx.value='Link';
            twa_panel.style.background='#f4fbff'; }
        else{
            li_tx.value='Text';
            twa_panel.style.background='#fff7e4'; }

        li_tx.onclick=()=>{
            if(mode_lt==0){
                mode_lt=1;
                li_tx.value='Text';
                twa_panel.style.background='#fff7e4';
                set_link(''); }
            else{
                mode_lt=0;
                li_tx.value='Link';
                twa_panel.style.background='#f4fbff';
                set_link(''); }}}


    let twa_close=document.querySelector('.twa_close');
    if(twa_panel && twa_close){
        twa_close.onclick=()=>{
            twa_panel.remove(); }}

} // set_link()



function add_link(){
    let add_b=document.querySelector('.add_b');
    add_b.style.outline='2px solid #2196f3';
    let rem_b=document.querySelector('.rem_b');
    rem_b.style.outline='';
    let set_box=document.querySelector('.set_box');
    set_box.disabled=false;
    set_box.style.borderColor='';
    set_box.style.background='';
    if(mode_lt==0){
        set_box.setAttribute('placeholder', 'ページ上のリンクを「Alt+右Click」して採取'); }
    else{
        set_box.setAttribute('placeholder', 'テキストを記入するかコピーして貼付けます'); }
    let avoid_ul=document.querySelector('.avoid_ul');
    avoid_ul.classList.remove('rem');


    add_b.onclick=()=>{
        let link_str=set_box.value;
        if(link_str!=''){
            if(space_check(link_str)){
                alert("⛔ 空白文字が含まれています"); }
            else if(mode_lt==0 && avoid.includes(link_str)){
                alert("⛔ 既に登録済のリンクコードです"); }
            else if(mode_lt==1 && avoid_tx.includes(link_str)){
                alert("⛔ 既に登録済のテキストです"); }
            else{
                set_box.value='';
                if(mode_lt==0 ){
                    avoid.push(link_str); }
                else{
                    avoid_tx.push(link_str); }
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
    let rem_b=document.querySelector('.rem_b');
    rem_b.style.outline='2px solid #2196f3';
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
            clear();
            rem_b.style.outline='2px solid red';
            avoid_li[k].style.background='#cfd8dc'; }}

    function clear(){
        let avoid_li=document.querySelectorAll('.avoid_li');
        for(let k=0; k<avoid_li.length; k++){
            avoid_li[k].style.background=''; }}


    rem_b.onclick=()=>{
        let avoid_li=document.querySelectorAll('.avoid_li');
        for(let k=0; k<avoid_li.length; k++){
            if(avoid_li[k].style.background){
                let select_text=avoid_li[k].textContent;
                if(mode_lt==0){
                    avoid=avoid.filter(function(item){
                        return item!=select_text; }); }
                else{
                    avoid_tx=avoid_tx.filter(function(item){
                        return item!=select_text; }); }
                set_new_link();
                rem_link(); }}}


    add_b.onclick=()=>{
        mode=1;
        set_link(''); }

} // rem_link()



function set_new_link(){
    if(mode_lt==0){
        let set=new Set(avoid);
        avoid=[...set]; // 追加分をチェックして配列を更新
        let write_json=JSON.stringify(avoid);
        localStorage.setItem('TwAvoid_Link', write_json); } // ストレージ保存
    else{
        let set_tx=new Set(avoid_tx);
        avoid_tx=[...set_tx]; // 追加分をチェックして配列を更新
        let write_json=JSON.stringify(avoid_tx);
        localStorage.setItem('TwAvoid_Text', write_json); } // ストレージ保存

    new_reg(); // テキスト検索設定を更新

    let avoid_ul=document.querySelector('.avoid_ul');
    if(avoid_ul){
        avoid_ul.innerHTML=''; // リスト表示をクリア

        if(mode_lt==0){
            for(let k=avoid.length-1; k>=0; k--){
                let link_li='<li class="avoid_li">'+ avoid[k] +'</li>';
                avoid_ul.insertAdjacentHTML('beforeend', link_li); }}
        else{
            for(let k=avoid_tx.length-1; k>=0; k--){
                let link_li='<li class="avoid_li">'+ avoid_tx[k] +'</li>';
                avoid_ul.insertAdjacentHTML('beforeend', link_li); }}}

} // set_new_link()



function file_menu(){
    let act=0; // メニュー非表示

    let twa_memo=document.querySelector('.twa_memo');
    let twa_file=document.querySelector('.twa_file');
    if(twa_memo && twa_file){
        if(act==0){
            twa_file.style.display='none' }
        else{
            act=1;
            twa_file.style.display='block';
            backup(); }

        twa_memo.onclick=()=>{
            if(act==0){
                act=1;
                twa_file.style.display='block';
                backup(); }
            else{
                act=0;
                twa_file.style.display='none'; }}}


    function file_menu_close(n){
        twa_file.style.boxShadow='0 0 0 100vh #b0bec5';
        setTimeout(()=>{
            act=0;
            twa_file.style.display='none';
            twa_file.style.boxShadow='0 0 0 100vh #fff';
            if(n==1){
                let twa_panel=document.querySelector('#twa_panel');
                if(twa_panel){
                    twa_panel.remove(); }}
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

            write_json=JSON.stringify(avoid_tx); // 配列 avoid_tx を取得
            blob=new Blob([write_json], {type: 'application/json'});
            let b_elem=document.createElement('a');
            b_elem.href=URL.createObjectURL(blob);
            b_elem.download='TwAvoid_T.json'; // 保存ファイル名
            b_elem.click();
            URL.revokeObjectURL(b_elem.href);

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
                file_menu_close(1); }

            else if(file.name.includes('TwAvoid_T')){ // テキストの配列
                let file_reader=new FileReader();
                file_reader.readAsText(file);
                file_reader.onload=function(){
                    let data_in=JSON.parse(file_reader.result);
                    let new_arr=Array.from(new Set([...avoid_tx, ...data_in])); // 差分を追加
                    avoid_tx=new_arr;
                    let write_json=JSON.stringify(avoid_tx);
                    localStorage.setItem('TwAvoid_Text', write_json); // ストレージ保存
                    new_reg(); }
                file_menu_close(1); }

        });
    } // backup()

} // file_menu()

