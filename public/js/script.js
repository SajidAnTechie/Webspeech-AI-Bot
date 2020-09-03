const btn = document.querySelector("button");
const outputme = document.querySelector(".output-you");
const outputbot = document.querySelector(".output-bot");
const socket = io();

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.interimResults = false;

btn.addEventListener("click", () => {
  recognition.start();
});

recognition.onresult = function (event) {
  const last = event.results.length - 1;
  const text = event.results[last][0].transcript;
  console.log(text);

  outputme.textContent = text;

  socket.emit("chat message", text);
};

const botReply = (text) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.pitch = 1;
  utterance.volume = 1;
  synth.speak(utterance);
};

socket.on("bot reply", (text) => {
  outputbot.textContent = text;
  botReply(text);
});
