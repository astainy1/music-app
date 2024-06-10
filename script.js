//Test connection
// alert("Connection established");

// Get all html elements
let author = document.querySelector('.author');
let title = document.querySelector('.title');
let musicCover = document.querySelector('.music_cover');
let previous = document.querySelector('.previous');
let play = document.querySelector('.play');
let next = document.querySelector('.next');
let startTime = document.querySelector('.start_time');
let endTime = document.querySelector('.end_time');
let soundRange = document.querySelector('.sound_range');
let volumeIncrease = document.querySelector('.volume_increase');
let volumeRange = document.querySelector('.volume_range');
let volumeDecrease = document.querySelector('.volume_decrease');

let soundIndex = 0
let isPlaying = false;
let updatePlayingTime;

//Create curent sound element
let active_music = document.createElement('audio');

//Create the list of all music

let musicList = [
    {
        name: '',
        author: '',
        cover: '',
        src: ''
    }
]
