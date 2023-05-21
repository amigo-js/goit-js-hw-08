import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Vimeo(document.querySelector('#vimeo-player'));

// Check if there is a saved playback time in the local storage
const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
// Set the saved playback time
player.setCurrentTime(parseFloat(savedTime));
console.log(savedTime)
}

// Define a function using lodash.throttle, with a limit of 1 second
const saveTimeToStorage = throttle(function (currentTime) {
// Save the current playback time to the local storage
localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);

// Listen for the timeupdate event to save the current playback time
player.on('timeupdate', function (data) {
const currentTime = data.seconds;
// Call the function to save the playback time using the throttle
saveTimeToStorage(currentTime);
});