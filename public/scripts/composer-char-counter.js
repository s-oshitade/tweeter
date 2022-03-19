$(document).ready(function (){
  $('#tweet-text').on('input', function(e){
    console.log('New input!');
    console.log(e);
  })
});