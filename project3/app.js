window.addEventListener("load",()=>{
    let lat;
    let long;
    let temperature_degree=document.querySelector(".temperature-degree");
    let temp_description = document.querySelector(".temp-description");
    let location_timezone = document.querySelector(".location-timezone");
    let temp_section = document.querySelector(".temperature");
    let temp_span = document.querySelector(".temperature span");

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=322494094b248a3615fa50713ba91358`;
            fetch(api)
                .then(response => {
                    return response.json();
                    //console.log(response);
                })
                .then(dataq => {
                    console.log(dataq);
                    const temp=dataq.main.temp;
                    const summary = dataq.weather[0].description;
                    const name = dataq.name;
                    let celcius = (temp - 32)*(5/9);

                    temperature_degree.textContent = temp;
                    temp_description.textContent = summary;
                    location_timezone.textContent = name;

                    temp_section.addEventListener('click',()=>{
                        if(temp_span.textContent == 'F')
                        {
                            temp_span.textContent = 'C';
                            temperature_degree.textContent = Math.round(celcius);
                        }
                        else
                        {
                            temp_span.textContent = 'F';
                            temperature_degree.textContent = temp;
                        }
                    });
                    const proxy = "https://cors-anywhere.herokuapp.com/";
                    var icon = ("<img src='https://cors-anywhere.herokuapp.com/http://openweathermap.org/img/w/" + dataq.weather[0].icon + ".png'>");
                    console.log(icon);
                    // $('.display').append( icon );

                    // var x = new XMLHttpRequest();
                    // x.open('GET', 'https://cors-anywhere.herokuapp.com/http://openweathermap.org/img/w/' + dataq.weather[0].icon + ".png'>");
                    // // I put "XMLHttpRequest" here, but you can use anything you want.
                    // x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    // x.onload = function() {
                    //     alert(x.responseText);
                    //     $('.display').append(icon);
                    // };
                    // x.send();
                });

            // req = $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=322494094b248a3615fa50713ba91358');
            // req.then(function(resp) {
            //     var prefix = 'wi wi-';
            //     var code = resp.weather[0].id;
            //     var icon = weatherIcons[code].icon;
              
            //     // If we are not in the ranges mentioned above, add a day/night prefix.
            //     if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
            //       icon = 'day-' + icon;
            //     }
              
            //     // Finally tack on the prefix.
            //     icon = prefix + icon;
            //   });

        });
    }

   
});