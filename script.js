//Test connection
// alert("Connection established");

// Get reference all html elements
let audio = document.getElementById('audio');
let musicArtist = document.querySelector('.author');
let musicTitle = document.querySelector('.music_title');
let musicCover = document.querySelector('.music_cover');
let previousBtn = document.querySelector('.previous');
let playBtn = document.querySelector('.play');
let nextBtn = document.querySelector('.next');
let time = document.querySelector('.start_time');
let fullTime = document.querySelector('.end_time');
let soundRangeControl = document.querySelector('.sound_range');
let volumeRangeControl = document.querySelector('.volume_range');
let volumeControl = document.querySelector('.volume');
let rotateAudioCover = document.querySelector('.img_container');
let audioRepeat = document.querySelector('.repeat');

//Global variables
/* Which audio is currently loaded (based on the numberical value)*/
let audioIndex = 0
//Is the audio playing
let isPlaying = false;
//Is the volume muted
let isSoundMuted = false;

//Repeat mode
let isRepeating = false;

//Create curent sound element
let active_music = document.createElement('audio');

//Create the list of all music and their followiing details

let musicList = [
    'Enough',
    'Get Through',
    'Immortal',
    'Lofi Mallet',
    'No Talk',
    'Skylines',
    'Winning'
];

let musicArtistList = [
    'Daniel Ayee',
    'Astiany Harris',
    'Thomas Voya',
    'Gabriel Kun',
    'Praise Wiles',
    'Pruh Sheriff',
    'Blessboy Gmore',
];

let musicCoverList = [
    'img-1',
    'img-2',
    'img-3',
    'img-4',
    'img-5',
    'img-6',
    'img-7',
]

//add click event on the play button
playBtn.addEventListener('click', playAudio);

//Play audio function
function playAudio(){
    //If the audio is not playing 
    if(isPlaying === false){

        audio.play(); /*invoke JavaScipt inbuilt 
                        play function to 
                        HTML audio element. */

        //Change the play icon to pause icon
        playBtn.innerHTML = `
            <div class="play">
                <i class="fa fa-pause-circle fa-3x">
                </i>
            </div>
        `;

        //Rotate audio cover
        rotateCover();

        /* Now set isPLaying to true
        because the audio is now playing */
        isPlaying = true;
    }
    /*Else set the is playing to false
       because the audio is not playing */
    else{

        audio.pause(); /*invoke JavaScipt inbuilt 
                        pause function to 
                        HTML audio element. */

        //Change the pause icon to play icon
        playBtn.innerHTML = `
        <div class="play">
                <i class="fa fa-play-circle fa-3x">
                </i>
            </div>
        `;

        //Stop autio cover from rotating
        stopRotateCover();

        //Set isPlaying to false
        isPlaying = false;
    };
}

//Switching audio play
function switchAudio() {
    
    //Check if audio is playing
    if(isPlaying === true){
        
        //Continue playing the audio
        audio.play(); /*invoke JavaScipt inbuilt 
                        play function to 
                        HTML audio element. */
    }
}

//Create const variable to hold the audio path
const audioPath = '../assets/music' + musicArtistList[audioIndex] + 'mp3';

//Load audio function

function loadAudio() {

    //change audio src according to the index
    audio.src = './assets/music/' + musicList[audioIndex] + '.mp3';

    audio.load(); /*invoke JavaScipt inbuilt 
                    load function to 
                    HTML audio element. */
    
    //Change music title
    musicTitle.innerHTML = musicList[audioIndex];

    //Change music artist
    musicArtist.innerHTML = musicArtistList[audioIndex];

    //Change music cover
    musicCover.src = './assets/img/' + musicCoverList[audioIndex] + '.jpg';

    //Reset the audio start and end time
    time.innerHTML = '00:00';
    fullTime.innerHTML = '0.00';

    //Reset the audio progress
    soundRangeControl.value = '1';

    //EvenListener that waits for audio to load and update the audio duration
    audio.addEventListener('loadedmetadata', () =>{
        //Show the duration for the loaded audio(data)
        fullTime.innerHTML = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () =>{
        //Display audio current time
        time.innerHTML = formatTime(audio.currentTime);
        //convert audio current and set it as the value of the input range
        let convertAudioCurrentTime = Math.floor(audio.currentTime);
        soundRangeControl.value = convertAudioCurrentTime;
    })
};

//Initially load audio
loadAudio();

previousBtn.addEventListener('click', () => {
    //Decrement audioIndex
    audioIndex--;

    //check if audio id less than 0;
    if(audioIndex < 0){
        audioIndex = musicList.length - 1;
    }

    //Now invoke the loadAudio function
    loadAudio();

    //Also invoke the switchAudio function
    switchAudio();

});

//Next audio function
function nextAudio(){
    //Increment audio Id
    audioIndex++

    if(audioIndex > musicList.length -1){
        audioIndex = 0;
    };

    //Invoke the audio load function
    loadAudio();

    //Also invoke the audio switch function
    switchAudio();
}

//togger next audio function when the next button is clicked
nextBtn.addEventListener('click', nextAudio);

//event to trigger when audio end
audio.addEventListener('ended', () => {

    if (isRepeating) {
        
        audio.play();
        audio.currentTime = 0;

    }else{

        nextAudio();

    }
});


//Rotate audio cover function
function rotateCover() {

    rotateAudioCover.style.animation = 'imgAnimation 3s linear infinite';
}

//Stop audio cover function
function stopRotateCover(){
    rotateAudioCover.style.animation = 'none';
};

//Function to set time in minutes and seconds
function formatTime(seconds) {
    //calculate minute from input
    const minutes = Math.floor(seconds / 60);
    //console.log(minutes);
    //Calculate seconds from input
    const remainingSeconds = Math.floor(seconds % 60);
    /*Check if the seconds are under 10 add zero before the first number 
    otherwise remove the zero and maintain the two digit number than return the function*/
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

//When the time changes on the audio 
audio.addEventListener('timeupdate', () => {
    //Get the current audio time
    const currentAudioTime = Math.floor(audio.currentTime);
    // console.log(currentAudioTime)
    
    //Output the currnet audio time
    formatTime(time, currentAudioTime);
    soundRangeControl.value = currentAudioTime;

}); 

//Customer slider function
function customSlider(){
    //Get the percentage
    const val = (soundRangeControl.value / audio.duration) * 100;
    //set the thumb and progress to the current value
    soundRangeControl.style.width = val;
    //Output the audio current time
    formatTime(time, soundRangeControl.value);
    //set audio current time to slider value
    audio.currentTime = soundRangeControl.value;
}

//invoke customSlider function
customSlider();

//repeat the function when the slider is selected or drag
soundRangeControl.addEventListener('click', customSlider);

//volume slider function
function customVolumeSlider(){
    //divide audio volume by 100
    let changeVolume = (volumeRangeControl / 100);
    console.log(changeVolume)

    let updateAudioVolume = Math.floor(audio.volume * 100);
    // let updateVolume = audio.volume;

    console.log(audio.volume)
    //Set the audio volume to current value
    // audio.volume = volumeRangeControl.value / 100;
    audio.volume = volumeRangeControl.value / 100;

    //Change volume icon based on volume range
    if(audio.volume === 0.0){
        // alert("Volume is less than or equal to 0.5")
        volumeControl.innerHTML = `<div class="volume_increase"> <i class="fa fa-volume-off"></i></div>`;
    }else if(audio.volume < 0.6 && audio.volume !== 0.0 ){
        volumeControl.innerHTML = `<div class="volume_increase"> <i class="fa fa-volume-down"></i></div>`;
    }
    else if(audio.volume > 0.6) {
        volumeControl.innerHTML = `<div class="volume_increase"> <i class="fa fa-volume-up"></i></div>`;
    }

}

//invoke customVollumeSlider function
customVolumeSlider();

//add eventlistener to volume control
volumeRangeControl.addEventListener('input', customVolumeSlider);

//Repeat function
function repeatAudio(){

    //Toggle repeat state
    isRepeating = !isRepeating;

    //check if it's repeating or not
    if (isRepeating) {
        
        //Change repeat botton appearance
        audioRepeat.style.color = 'orange'
        console.log('is repeating')

    }else{
        //turn repeat off
        isRepeating = false;
        //change repeat button appearance
        audioRepeat.style.color = '#fff';

        console.log('not repeating')
    }
}

//add event listener to repeat button invoking the repeat function
audioRepeat.addEventListener('click', repeatAudio);
