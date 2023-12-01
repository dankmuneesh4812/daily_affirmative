const quoteText = document.querySelector(".quote"),
  quoteBtn = document.querySelector("button"),
  authorName = document.querySelector(".name"),
  speechBtn = document.querySelector(".speech"),
  copyBtn = document.querySelector(".copy"),
  twitterBtn = document.querySelector(".twitter"),
  synth = speechSynthesis;

const taskText = document.getElementById('task-text');

function toggleLoadingState(isLoading) {
  quoteBtn.classList.toggle("loading", isLoading);
  quoteBtn.innerText = isLoading ? "Loading Quote..." : "New Quote";
}

function speakQuote() {
  if (!quoteBtn.classList.contains("loading")) {
    const utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    synth.speak(utterance);

    function updateSpeechBtn() {
      speechBtn.classList.toggle("active", !synth.speaking);
      if (synth.speaking) {
        setTimeout(updateSpeechBtn, 10);
      }
    }

    updateSpeechBtn();
  }
}

function copyToClipboard() {
  navigator.clipboard.writeText(quoteText.innerText);
}

function shareOnTwitter() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} by ${authorName.innerText}`;
  window.open(tweetUrl, "_blank");
}

function fetchRandomQuote() {
  toggleLoadingState(true);
  fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(result => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      toggleLoadingState(false);
    })
    .catch(error => {
      console.error('Error fetching random quote:', error);
      toggleLoadingState(false);
    });
}

function getRandomTask() {
  const tasks = [
    "Take a 10-minute walk outside",
    "Write down three things you're grateful for",
    "Drink a glass of water",
    "Walk 7500 steps",
    "Eat balanced diet with no junk food",
    // ... other tasks ...
    "Write a letter to your future self",
  ];

  const randomIndex = Math.floor(Math.random() * tasks.length);
  return tasks[randomIndex];
}

document.getElementById('task-button').addEventListener('click', () => {
  taskText.innerText = getRandomTask();
});

speechBtn.addEventListener("click", speakQuote);
copyBtn.addEventListener("click", copyToClipboard);
twitterBtn.addEventListener("click", shareOnTwitter);
quoteBtn.addEventListener("click", fetchRandomQuote);
