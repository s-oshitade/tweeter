/**
 * Function escape to guard against XSS. 
 * @param {string}
 * @returns {string};
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Hide the error container once Document is loaded
$(function() {
  $('#error-container').hide();
})

let tweetData =  {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of Giants!"
  },
  "created_at": 1461116232227
};

const createTweetElement = function(tweet) {
  const { user, content, created_at } = tweet;
  return `<article class="tweet">
  <header class="tweet-header">
    <div>
      <img id="isaac" src=${user.avatars} alt="image of tweeter account owner">
      <p>
        ${user.name}
      </p> 
    </div>
    <p>${user.handle}</p>
  </header>
  <p>${escape(content.text)}
  </p> 
  <footer>
    <p>
      ${timeago.format(created_at)}
    </p>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;
};

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
  const $container = $('.the-tweets');
  $container.empty();
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $container.prepend($tweet);
  }
};

renderTweets(data);

//Form submission using jQuery
$(function () {
  const $form = $("#new-tweet-form");
  $form.on("submit", function (event) {
    event.preventDefault();
    $('.error').slideUp();
    //Add form validation criteria
    const $textarea = $("#tweet-text");
    const $errorContainer = $("#error-container");
    const $errorMessage = $("#error-message");
    const errorMessage1 = "Empty tweet! Please say something.";
    const errorMessage2 = "Edit your tweet to 140 characters or less!";
    
    const displayErrors = function () {
      if (!$textarea.val().trim()) {
        //Rule out blank inputs with .trim()
        $errorMessage.empty();
        $errorMessage.text(errorMessage1);
        $errorContainer.show();
        // if ($textarea.val().length > 0 && $textarea.val().length < 140) {
        //   $errorContainer.hide();
        // }
        return false;
      }
      if ($textarea.val().length > 140) {
        $(".error").append(errorMessage2);
        $(".error").show();
        return false;
      }
      return true;
    };
    inputIsValid = displayErrors();
    console.log("inputIsValid?: ", inputIsValid);
    //Handle valid form data
    if (inputIsValid) {
      $errorContainer.hide();
      //Serialize user input data
      const str = $(this).serialize();
      console.log("Serialized data:", str);

      //Send ajax post request to the server with serialized input data
      $.post("/tweets", str).then((resp) => {
        loadTweets();
      });
    }

  });

  //Render serialized data from the server back to the browser without page roload
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (data) => {
        console.log(data);
        $("#tweet-text").val("");
        renderTweets(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
  loadTweets();
});