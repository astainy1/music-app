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
let volumeIncreaseControl = document.querySelector('.volume_increase');
let volumeRangeControl = document.querySelector('.volume_range');
let volumeDecreaseControl = document.querySelector('.volume_decrease');
let rotateAudioCover = document.querySelector('.img_container');

//Global variables
/* Which audio is currently loaded (based on the numberical value)*/
let audioIndex = 0
//Is the audio playing
let isPlaying = false;
//Is the volume muted
let isSoundMuted = false;

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

    //Reset the audio progress
    soundRangeControl.value = '1';

    //eventListener that will wait for audio to load
    audio.addEventListener('loadeddata', () =>{
        //Show the duration of the loaded data
        setTimeout(fullTime, audio.duration);

        //Set max value to slider
        soundRangeControl.setAttribute('max', audio.duration);
        // console.log(something)
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
document.addEventListener('ended', nextAudio);


//Rotate audio cover function
function rotateCover() {

    rotateAudioCover.style.animation = 'imgAnimation 3s linear infinite';
}

//Stop audio cover function
function stopRotateCover(){
    rotateAudioCover.style.animation = 'none';
};

//SetTime function
function setTime(output, input){
    //Caculate minute from input
    const minutes = Math.floor(input / 60);
    // console.log('Minutes:' + minutes);
    //calculate seconds from input
    const seconds = Math.floor(input % 60);
    // console.log('Seconds:' + seconds);
    //if the seconds are under 10
    if(seconds < 10){
        //add zero before the first number
        time.innerHTML = minutes + ':0' + seconds;
        // console.log(input);
        //If it is over 10
    }else{
        time.innerHTML = minutes + ':' + seconds;
    }
}

//Output the audio track duration
setTime(fullTime, audio.duration);

//Where the time changes on the audio 
audio.addEventListener('timeupdate', () => {
    //Get the current audio time
    const currentAudioTime = Math.floor(audio.currentTime);
    // console.log(currentAudioTime)
    //Get the percentage
    const timePercentage = (currentAudioTime / audio.duration) * 100 + '%';
    // console.log(timePercentage)
    //Output the currnet audio time
    setTime(time, currentAudioTime);
    //Set the soundControl progress to the percentage
    // soundRangeControl.style.width = timePercentage;
    soundRangeControl.value = currentAudioTime;

});

//Customer slider function
function customSlider(){
    //Get the percentage
    const val = (soundRangeControl.value / audio.duration) * 100;
    //set the thumb and progress to the current value
    soundRangeControl.style.width = val;
    //Output the audio current time
    setTime(time, soundRangeControl.value);
    //set audio current time to slider value
    audio.currentTime = soundRangeControl.value;
}

customSlider();

//repeat the function when the slider is selected
soundRangeControl.addEventListener('click', customSlider);

//volume slider current value
let val;

//volume slider function
function customVolumeSlider(){
    //get the max attribute value from slider
    const maxVal = volumeRangeControl.getAttribute('max');
    //Get the percentage
    val = (volumeRangeControl.value / maxVal) + 100 + "%";
    //Set the volume progress to the current value
    volumeRangeControl.value = val;
    //Set the audio volume to current value
    audio.volume = volumeRangeControl.value / 100;

}

customVolumeSlider();

volumeIncreaseControl.addEventListener('input', customVolumeSlider);
