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

//Hide the error message element once Document is loaded
$(function() {
  $('.error').hide();
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

/**
 * createErrorMessages - Fxn creates html element fir rendering error messages
 * @param {string} errorMessage;
 * @returns {object} error element
 */
const createErrorElement = function(errorMessage){
  return `<div class="error"><p>${errorMessage}</p></div>`;
}

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
$(function() {
  const $form = $('#new-tweet-form');
  $form.on('submit', function(event) {
    event.preventDefault();
    //Add form validation criteria
    const $textarea = $('#tweet-text');
    const $errorContainer = $(".error")
    const errorMessage1 = "Empty tweet! Please say something.";
    let $customErrorMessage1 = createErrorElement(errorMessage1);
    const errorMessage2 = "Edit your tweet to 140 characters or less!";
    let $customErrorMessage2 = createErrorElement(errorMessage2);
    if (!$textarea.val().trim()) { //Rule out blank inputs with .trim()
      // alert("Empty tweet! Please say something.");
      $errorContainer.empty();
      $errorContainer.append($customErrorMessage1);
      return
    }
    if ($textarea.val().length > 140) {
      $errorContainer.empty();
      $errorContainer.append($customErrorMessage2);
      return;
    }
    //Serialize user input data
    // alert("Handler for submit event called!");
    const str = $(this).serialize();
    console.log("Serialized data:", str);
    // $.post('/tweets', str, function (response) {
    //loadTweets();
    //   console.log("response: ", response);
    // })
    $.post('/tweets', str)
      .then((resp) => {
        loadTweets();
      });
  });

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: "GET",
      dataType: "json",
      success: (data) => {
        console.log(data);
        renderTweets(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  };
  loadTweets();
});