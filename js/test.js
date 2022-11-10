// ローカルストレージへ保存
// $("#save").on('click',function(){
//   let aa = $('#a').val();
//   let bb = $('#b').val();
//   console.log(aa);
//   console.log(bb);

//   localStorage.setItem(aa,bb);

// })



let start_time = 0;
let key ='';

$("#start").on("click",function(){
  let start_st = 'はじめ';
  start_time = new Date().getTime() / 1000;

  console.log(start_st);
  console.log(start_time);
  key = $('#item').val();
  console.log(key);
})

$("#end").on("click",function(){
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

      //canvasをつかって円グラフを作成
    var options = {
      title: {
        // text: "1日の過ごし方を見てみよう！"
      },
      data: [{
          type: "pie",
          startAngle: 45,
          showInLegend: "true",
          legendText: "{label}",
          indexLabel: "{label} ({y})",
          yValueFormatString:"#,##0.#"%"",
          dataPoints: [
            { label: "すいみん", y: localStorage.getItem("睡眠")/total*100},
            { label: "しごと", y:localStorage.getItem("仕事")/total*100 },
            { label: "ジーズのかだい", y: localStorage.getItem("ジーズの課題")/total*100 },
            { label: "しょくじ", y: localStorage.getItem("家族との食事")/total*100 },
            { label: "おふろ", y: localStorage.getItem("入浴")/total*100 },
            { label: "どくしょ", y: localStorage.getItem("読書")/total*100 },

          ]
      }]
    };
    $("#chartContainer").CanvasJSChart(options);

    }

    





// $(document).ready(function(){
//   var data = [
//     ['Heavy Industry', 12],['Retail', 9], ['Light Industry', 14],
//     ['Out of home', 16],['Commuting', 7], ['Orientation', 9]
//   ];
//   var plot1 = jQuery.jqplot ('chart1', [data],
//     {
//       seriesDefaults: {
//         // Make this a pie chart.
//         renderer: jQuery.jqplot.PieRenderer,
//         rendererOptions: {
//           // Put data labels on the pie slices.
//           // By default, labels show the percentage of the slice.
//           showDataLabels: true
//         }
//       },
//       legend: { show:true, location: 'e' }
//     }
//   );
// });












// if (seconds < a){
//     alert("true");
// } else{
//     alert("false");
// }

// if (seconds < b){
//     alert("true");
// } else{
//     alert("false");
// }

// if (seconds < c){
//     alert("true");
// } else{
//     alert("false");
// }




// var object = {value: "value", timestamp: new Date().getTime()}
// localStorage.setItem("key", JSON.stringify(object));


// var object = JSON.parse(localStorage.getItem("key")),
//     dateString = object.timestamp,
//     now = new Date().getTime().toString();

// compareTime(dateString, now); //to implement
