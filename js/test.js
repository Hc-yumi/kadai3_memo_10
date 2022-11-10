// 今回やりたいこと！//
//localstorageの使用（must）
//携帯で見れる大きさ
//配列、for文、if文の取り入れ
//swich case関数の取り入れ
//非同期処理の取り入れ
//6種の時間カウント
//色を選んでlocalstorageする
//上記の選んだ色をそのまま最後の円グラフの色へ反映させる
//1日の終わりにかかった時間の割合を出す
//かかった時間の割合を円グラフで出す
// 画面遷移はスクロールではなく、同じ場所からシュッと変わる
//locastorageに画像を保存する
//最後に並べる
//一週間分記録できるようにする



setInterval(function(){
  setInterval(function(){
    let now = new Date();
    let y = now.getFullYear();
    let m = now.getMonth() + 1;
    let d = now.getDate();
    let w = now.getDay();
    let wd = ['日', '月', '火', '水', '木', '金', '土'];
    let h = now.getHours();
    let mi = now.getMinutes();
    let s = now.getSeconds();
    // 逆から数える sliceで指定した順番の要素だけ取得する。下から2番目まで
    let mm = ('0' + m).slice(-2);
    let dd = ('0' + d).slice(-2);
    let hh = ('0' + h).slice(-2);
    let mmi = ('0' + mi).slice(-2);
    let ss = ('0' + s).slice(-2);
    $('#today').text(y + '年' + mm + '月' + dd + '日' + '(' + wd[w] + ')' +'  ' + hh + '時' + mmi + '分' + ss + '秒' );
    }, 1000);
    });



let start_time = 0;
let key ='';

$("#start").on("click",function(){
  let start_st = 'はじめ';
  start_time = new Date().getTime() / 1000;

  //ストップウォッチ機能 今回は諦め・・
  // runTimer();

  console.log(start_st);
  console.log(start_time);
  key = $('#item').val();
  console.log(key);

  //アニメーションスタート
  $("#show_ela").addClass('show_elaspe');

  $("#keisoku").text('時間計測中・・・終わったらSTOPをクリック！');


})

$("#end").on("click",function(){
  //アニメーション終了と開始
  $("#show_ela").removeClass('show_elaspe');
  $("#keisoku").text('');
  $("#save_btn").addClass('save_btn');
  $("#save_btn").text('時間が確定したらSAVEボタンを押してね！');


  let end_st = 'おわり';
  let end_time = new Date().getTime() / 1000;
  let elapseTime = end_time - start_time;
  console.log(end_st);
  console.log(end_time);
  // reset
  start_time = 0;
  display_time = postProcess(elapseTime, key) //下の関数をここへ渡す
})

// 引数を使った関数を使用 keyはグローバル変数にしたので使用可能 timeは以下の関数で使用するための引数
function postProcess(time, key){

  let hour = Math.floor(time /3600);
  $("#hour").text(hour);

  let minutes = Math.floor((time-hour*3600) /60
  );
  $("#minutes").text(minutes);

  let seconds = Math.floor(time-hour*3600-minutes*60
  );
  $("#seconds").text(seconds);

  const display_time = `${minutes}時間${minutes}分${seconds}秒`

  //時間を表記する
$("#time_show").html(display_time);

$("#save").on("click",function(){
  localStorage.setItem(key,time)

})

$("#save").on("click",function(){
  let show_list = `
          <tr>
              <th>${key}</th>
              <td>${minutes}時間${minutes}分${seconds}秒</td>
          </tr>
        `;
        $("#list").append(show_list);
  // リロードのおまじない
          location.reload() //リロードしないとグラフが上手く反映されない・・

})

}

    window.onload = function() {
    // ローカルストレージ内から呼び込み

     //localstorage内に保存してあるデータを配列の中に入れる
    key_array = [];
    value_array = [];

    for(let i = 0; i < localStorage.length; i++){
      let taken_key = localStorage.key(i);
      let value = localStorage.getItem(taken_key);
      //上でつくった配列に入れる
      key_array.push(taken_key);
      value_array.push(parseFloat(value)); //文字列で保存されてる値を数値として認識させる
    }


    let result = value_array;
    // .reduceは配列の全ての要素の和を出す！ value_arrayに入っている中身を合計
    let total = result.reduce(function(sum, element){
        return sum + element; //サイトにはこの記載あり。
      }, 0);

      console.log("下で合計値取れてるか確認"); //確認用
      console.log(total);  // total取れていることを確認
      console.log("上で合計値取れてるか確認"); // 確認用


      for (let i = 0; i < value_array.length; i++){
        // console.log(value_array[i]/total);
        value_array[i] = value_array[i]/total; //例）寝た時間／total時間＝割合出したい 配列に上書き
        console.log(value_array[i]*100); //各項目の割合を出した これをそのままグラフに読み込ませたいけど・・どれがどの割合なのか紐づける方法が分からない。。
      }

      $("#remove").on("click",function(){
        localStorage.clear();
      
        // これだけだとhtmlが残ってしまうのでそれも削除！
        $("#list").empty();
      });


      // 各割合の場所に上の割合を入れる 書き方合ってるか分からないけど、計算できた

    var chart = new CanvasJS.Chart("chartContainer", {
      theme: "theme4",
      animationEnabled: true,
      startAngle: 270,
      data: [
        {
      // type: "doughnut",
      type: "pie",
      startAngle: 270,
      legendText: "{label}",
      indexLabel: "{label} ({y}%)",
      yValueFormatString:"#,##0.#"%"",
      dataPoints: [
          // { label: "初期値", y: 100},
          { label: "睡眠", y:Math.round( localStorage.getItem("睡眠")/total*100)},
          { label: "仕事",   y:Math.round( localStorage.getItem("仕事")/total*100)},
          { label: "ジーズの課題",   y: Math.round(localStorage.getItem("ジーズの課題")/total*100)},
          { label: "家族との食事",   y: Math.round(localStorage.getItem("家族との食事")/total*100)},
          { label: "入浴",   y: Math.round(localStorage.getItem("入浴")/total*100)},
          { label: "読書",   y: Math.round(localStorage.getItem("読書")/total*100)},
      ]
      }
        ]
      });
      chart.render();

    }

  //   window.onload = function () {
  //     var chart = new CanvasJS.Chart("chartContainer", {
  //     theme: "theme4",
  //     animationEnabled: true,
  //     startAngle: 270,
  //     data: [
  //       {
  //     type: "doughnut",
  //     startAngle: 270,
  //     dataPoints: [
  //         { label: "男性", y: 80,},
  //         { label: "女性", y: 13},
  //     ]
  //     }
  //       ]
  //     });
  //     chart.render();
  // }


