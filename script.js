const synth = window.speechSynthesis;
// dom elements
const inputForm = document.querySelector('form');
const inputText = document.querySelector('#input-text');
const voicSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('.rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('.pitch-value');
const spkButton = document.querySelector('button span');
const spkImage = document.querySelector('button img');
const submitBtn = document.querySelector('#submit-btn');
const main = document.querySelector('.container');
const overlay = document.querySelector('.overlay');
const faq = document.querySelector('section');

// Init voice array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  // Add voice options to the select dropdown
  voicSelect.innerHTML = ''; // Clear previous options
  voices.forEach((voice) => {
    let option = document.createElement('option');
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    option.innerText = `${voice.name} (${voice.lang})`;
    voicSelect.appendChild(option);
  });
};

// Load voices and update the UI when voices are available
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Trigger initial loading of voices
getVoices();

const speak = () => {
  // Prevent multiple speech actions
  if (synth.speaking) return;

  if (inputText.value !== '') {
    spkButton.innerText = 'Speaking..';
    spkImage.src = '/images/audio-wave-icon.svg';
    main.classList.add('flame');

    const speechText = new SpeechSynthesisUtterance(inputText.value);

    // When speech ends
    speechText.onend = () => {
      spkButton.innerText = 'Speak';
      spkImage.src = '/images/audio-icon.svg';
      main.classList.remove('flame');
      stopSpeech();
    };

    // If speech fails
    speechText.onerror = () => {
      console.error('Something went wrong -!-');
    };

    // Set the selected voice
    const selectedVoice = voicSelect.selectedOptions[0].getAttribute('data-name');
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speechText.voice = voice;
      }
    });

    // Set pitch and rate
    speechText.rate = rate.value;
    speechText.pitch = pitch.value;

    // Speak the text
    synth.speak(speechText);
  } else {
    alert('Text field cannot be empty!');
  }
};

// Event listeners
submitBtn.addEventListener('click', () => {
  if (inputText.value) {
    speak();
    inputText.blur();
  }
});

const stopSpeech = () => {
  if (synth.speaking) {
    synth.cancel();
    spkButton.innerText = 'Speak';
    spkImage.src = '/images/audio-icon.svg';
    main.classList.remove('flame');
  }
};

// Double-click event to stop speech
submitBtn.addEventListener('dblclick', stopSpeech);

// Rate change
rate.addEventListener('change', () => {
  rateValue.innerText = rate.value;
});

// Pitch change
pitch.addEventListener('change', () => {
  pitchValue.innerText = pitch.value;
});

// Voice selection change
voicSelect.addEventListener('change', () => {
  speak();
});

// Overlay interactions
overlay.addEventListener('dblclick', () => {
  overlay.style.display = 'none';
});

faq.addEventListener('click', () => {
  overlay.style.display = 'flex';
});
