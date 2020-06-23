const app = () => {
    const song = document.querySelector('.song')
    const play = document.querySelector('.play')
    const video = document.querySelector('.video-container video')

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button')
    //timer-picker
    const timeSelect = document.querySelectorAll('.time-select button')
    //time display
    const timeDisplay = document.querySelector('.time-display')

    let fakeduration = 600;

    //play songs
    play.addEventListener('click',function(){
        checkPlaying(song);
    });
    //select time
    timeSelect.forEach(option => {
        option.addEventListener('click',function(){
            fakeduration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeduration / 60)}:${Math.floor(fakeduration % 60)}`;
        });
    });

    sounds.forEach(option => {
        option.addEventListener('click',function(){
            song.src=this.getAttribute('data-sound');
            video.src=this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    const checkPlaying = song => {
        if(song.paused)
        {
            song.play();
            video.play();
            // play.src="https://www.pngitem.com/pimgs/m/117-1177266_pause-button-time-vector-icon-png-transparent-png.png";
            play.src="./svg/pause.svg";
        }
        else
        {
            song.pause();
            video.pause();
            // play.src="https://i.etsystatic.com/10919371/r/il/155a7d/1563938723/il_570xN.1563938723_1rmr.jpg";
            play.src="./svg/play.svg";
        }
    };


    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeduration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime>fakeduration)
        {
            minutes=0;
            seconds=0;
            timeDisplay.textContent = `${minutes}:${seconds}`;
            song.pause();
            video.pause();
        }


    };

};

app();  