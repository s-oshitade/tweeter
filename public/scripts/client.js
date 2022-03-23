/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
}

const createTweetElement = function (tweet){
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
  <p>${content.text}
  </p> 
  <footer>
    <p>
      ${created_at}
    </p>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;
}
// ${timeago.format(created_at)} Replace created at.

// const $tweet = createTweetElement(tweetData);
// console.log($tweet);
// $('.the-tweets').append($tweet)

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
]

const renderTweets = function(tweets) {
  for(const tweet of tweets){
    let $tweet = createTweetElement(tweet);
    console.log($tweet);
    $('.the-tweets').append($tweet)
  }
}

renderTweets(data);

//Form submission using jQuery
$(function() {
  const $form = $('#new-tweet-form');
  $form.on('submit', function(event){
    alert("Handler for .submit() called!");
    event.preventDefault();
  })
})