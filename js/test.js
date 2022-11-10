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
  display_time = postProcess(elapseTime, key)
})

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

$("#time_show").html(display_time);

$("#save").on("click",function(){
  localStorage.setItem(key,time)
})

}
    window.onload = function() {
    // ローカルストレージ内から呼び込み

    key_array = [];
    value_array = [];

    for(let i = 0; i < localStorage.length; i++){
      let taken_key = localStorage.key(i);
      let value = localStorage.getItem(taken_key);
      
      key_array.push(taken_key);
      value_array.push(parseFloat(value));
    }
    let result = value_array;
    let total = result.reduce(function(sum, element){
        return sum + element;
      }, 0);

      console.log("test");

      console.log(total);

      console.log("test");

      for (let i = 0; i < value_array.length; i++){
        // console.log(value_array[i]/total);
        value_array[i] = value_array[i]/total;
        console.log(value_array[i]);

      }

      // 各割合の場所に上の割合を入れる

    var options = {
      title: {
        text: "Website Traffic Source"
      },
      data: [{
          type: "pie",
          startAngle: 45,
          showInLegend: "true",
          // legendText: "{label}",
          indexLabel: "{label} ({y})",
          yValueFormatString:"#,##0.#"%"",
          dataPoints: [
            { label: "すいみん", y: localStorage.getItem("睡眠") },
            { label: "しごと", y: 31 },
            { label: "ジーズのかだい", y: 7 },
            { label: "しょくじ", y: 7 },
            { label: "おふろ", y: 6 },
            { label: "どくしょ", y: 10 },
            
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
