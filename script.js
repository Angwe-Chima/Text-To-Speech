const synth = speechSynthesis;
// dom elements
const inputForm = document.querySelector('form');
const inputText = document.querySelector('#input-text');
const voicSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('.rate-value')
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('.pitch-value')
const spkButton = document.querySelector('button span')
const spkImage = document.querySelector('button img')
const submitBtn = document.querySelector('#submit-btn')
const main = document.querySelector('main')
const overlay = document.querySelector('.overlay')
const faq = document.querySelector('section')

// init voice array using the api
let voices = [];

const getVoices = async ()=>{
  voices = await synth.getVoices(); 
  // Add voice as options of select
  voices.forEach((voice)=>{
    let option = document.createElement('option')
    option.setAttribute('data-lang', voice.lang)
    option.setAttribute('data-name', voice.name)
    option.innerText =  voice.name + ' (' + voice.lang + ')'
    voicSelect.append(option)
  })
}
getVoices()

const speak = ()=>{
  // check if speaking 
  if(synth.speaking) return;

  spkButton.innerText = 'Speaking..'
  spkImage.src = '/images/audio-wave-icon.svg'
  main.classList.add('flame')

  // check if speaking ends
  let spechText = null;
  if(inputText.value){
    spechText = new SpeechSynthesisUtterance(inputText.value)

    spechText.onend = e =>{
      spkButton.innerText = 'Speak'
      spkImage.src = '/images/audio-icon.svg'
      main.classList.remove('flame')
      stopSpeech()
    }
    // check for speaking error
    spechText.onerror = e =>{
      console.error('something went wrong -!-')
    }
    // select option
    const selectedVoice = voicSelect.selectedOptions[0].getAttribute('data-name')
    // loop through voices
    voices.forEach((voice)=>{
      if(voice.name === selectedVoice){
        spechText.voice = voice
      }
    })
    // set pitch an rate
    spechText.rate = rate.value
    spechText.pitch = pitch.value
    // speak !!
    synth.speak(spechText)
  }
  else{
    alert('field cannot be empty!!')
  }
}



// event listeners
submitBtn.addEventListener('click', ()=>{
  speak();
  inputText.blur();
})

// Function to stop speech
const stopSpeech = () => {
  if (synth.speaking) {
    synth.cancel();
    spkButton.innerText = 'Speak';
    spkImage.src = '/images/audio-icon.svg';
    main.classList.remove('flame');
  }
};

// Double-click event listener on submitBtn
submitBtn.addEventListener('dblclick', stopSpeech);


// rate value change 
rate.addEventListener('change', ()=>{
  rateValue.innerText = rate.value
})

// pitch value change 
pitch.addEventListener('change', ()=>{
  pitchValue.innerText = pitch.value
})

// voice select change 
voicSelect.addEventListener('change', ()=>{
  speak()
})

overlay.addEventListener('dblclick', ()=>{
  overlay.style.display = 'none'
})


faq.addEventListener('click', ()=>{
  overlay.style.display = 'flex'
})





// I see, you're looking for an API that can help you keep track of insulting words. One option is to use the "HateSonar" API, which provides a comprehensive list of hate speech and offensive language. It offers endpoints for detecting, analyzing, and monitoring such content. Here's how you can use it:

// 1. Sign up for a free API key on the [HateSonar website](https://hate.sonar.digital/).

// 2. Once you have your API key, you can use it to authenticate your requests. Here's an example using JavaScript fetch:

//    ```javascript
//    const apiKey = 'YOUR_API_KEY';
//    const text = 'This is a sentence with an offensive word.';
   
//    fetch(`https://api.sonar.digital/v1/hatespeech?token=${apiKey}&text=${text}`)
//      .then(response => response.json())
//      .then(data => {
//        const offensiveWords = data.result.offensive_words;
//        console.log("Offensive words:", offensiveWords);
//      })
//      .catch(error => console.error("Error:", error));
//    ```

// Replace `'YOUR_API_KEY'` with your actual API key. This example sends a request to the HateSonar API to analyze the text and detect any offensive words. The API will return a list of offensive words found in the text.