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
      "text": "I am just testing this out!"
    },
  "created_at": 1461116232227
}

const createTweetElement = function ({ user, content, created_at }){
  return `<article class="tweet">
  <header class="tweet-header">
    <div>
      <img id="isaac" src=${user.avatars} alt="image of sir isaac newton">
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
      ${timeago.format(created_at)}
    </p>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;
}

const $tweet = createTweetElement(tweetData);
console.log($tweet);
$('.the-tweets').append($tweet)
