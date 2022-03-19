$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    const input = $(this).parent().find("#tweet-text").val(); //Traverse the DOM
    const charCount = input.length;
    const maxCount = 140;
    const charRemaining = maxCount - charCount;
    $(".counter").text(`${charRemaining}`);
    if (charCount > maxCount) {
      $(".counter").css("color", "red");
    }
  });
});

