let input_btn=document.querySelector(".input-btn");
let search_city=document.querySelector("#search-city");
let displayTemp=document.getElementById("current-weather-temp");
let showCity=document.querySelector(".display-city");
let showHumidity=document.querySelector(".display-humidity-percent");
let showWindSpeed=document.querySelector(".display-wind-percent");
// let main_body=document.querySelector('.main-body');
let display_img=document.querySelector(".img-today");
//api key
const apiKey=CONFIG.WEATHER_API_KEY;
//displaying temp
input_btn.addEventListener("click",()=>{
    let city=search_city.value;
    showTemp(city);
});
window.addEventListener("keydown",(e)=>{
    
  if(e.key=="Enter"){let city=search_city.value;
    showTemp(city);}
});
//declaring functions
//show temp
  async function showTemp(city){
    let report1, response1;
    let encodedCity = encodeURIComponent(city);
    const apiURL="https://api.openweathermap.org/data/2.5/weather?units=metric&q="; 
    try{
    response1=await fetch(apiURL+encodedCity+`&appid=${apiKey}`);
     if(!response1.ok){throw new Error("City Not Found")}
  }catch(err){
    console.log("not haha",err);
    document.getElementById("search").style.display="block";
    document.getElementById("container2").style.display="none";
    document.getElementById("search-city-container").innerText=" Not Found";
  }
    report1=await response1.json();

    //by using current api 
    //displaying  current temp 
    displayTemp.innerHTML=Math.round(report1.main.temp)+"°C";
    let weather=report1.weather[0].main;
    let now=report1.dt;
    let sunrise=report1.sys.sunrise;
    let sunset=report1.sys.sunset;
    let checkTime;
   if(now>=sunrise&&now<=sunset){checkTime=true;console.log("day")}//day
   else{checkTime=false;console.log("night")}//night
    checkingCondition(weather,-1,checkTime);
     document.getElementById("search").style.display="none";
     document.getElementById("container2").style.display="block";
     console.log(report1);
     showCity.innerHTML=report1.name;
     showHumidity.innerHTML=report1.main.humidity+"%";
     showWindSpeed.innerHTML=report1.wind.speed+"km/h";
     document.getElementById("show-current-condition").innerHTML=weather;

     //now for weeklly forecast using weekly forecast  api
    let latt=report1.coord.lat;
   let lonn=report1.coord.lon;
   const url =`https://api.openweathermap.org/data/2.5/forecast?lat=${latt}&lon=${lonn}&units=metric&appid=${apiKey}`;
       const response=await fetch(url);
   let report=await response.json();
   console.log(report);
   weekly_report(report);}
 function weekly_report(report){
    for(let i=0;i<report.list.length;i++){ 
        if(i%8===0){
    document.getElementById("temp"+i).innerText=Math.round(report.list[i].main.temp)+"°C";
    document.querySelector(".display_text").innerHTML="Today";
    //img whixh is to be changed according to condition
    //report from which we get weather condition 
    weather_condition=report.list[i].weather[0].main;
    checkingCondition(weather_condition,i);
    let day=document.getElementById("week-day"+i);
    let date=report.list[i].dt_txt;
    console.log(report.list[i].weather[0].main);
    let date3=new Date(date.substring(0,10));
    switch(date3.getDay()){
        case 1:day.innerText="Monday";break;
        case 2:day.innerText="Tuesday";break;
        case 3:day.innerText="Wednesday";break;
        case 4:day.innerText="Thursday";break;
        case 5:day.innerText="Friday";break;
        case 6:day.innerText="Saturday";break;
        case 0:day.innerText="Sunday";break;
    }
  }    
    }
     
 }
function checkingCondition(weather_condition,i,checkTime){
    let weather_img;
    let main_body;
    if(i>=0){
   weather_img=document.getElementById("img-day"+i);
   found=false;
    }else {
     weather_img=document.getElementById("current-weather-img");
   main_body=document.getElementById('main-body');
     found=true;
    }

  switch(weather_condition){
    case 'Clear':
      if(found){
      if(checkTime==true) {
        weather_img.src="images/clear.png";
        main_body.style.backgroundImage = "url('images/clear-daylight.png')";
      }
      else if(checkTime==false){
        main_body.style.backgroundImage = "url('images/night2.avif')";
        weather_img.src="images/moon-clear.png";
      }
      }else{
        weather_img.src="images/clear.png"; 
      }
      break;

      case 'Drizzle':
      if(found){
      if(checkTime==true) {
        weather_img.src="images/drizzle.png";
        main_body.style.backgroundImage = "url('images/drizzle4.webp')";
      }
      else if(checkTime==false){
        main_body.style.backgroundImage = "url('images/night-rain.webp')";
        weather_img.src="images/moon-cloudy-rain.jpg";
      }
      }else{
        weather_img.src="images/drizzle.png"; 
      }
      break;

         case 'Clouds':
      if(found){
      if(checkTime==true) {
        weather_img.src="images/clouds.png";
        main_body.style.backgroundImage = "url('images/cloud2.jpg')";
      }
      else if(checkTime==false){
        main_body.style.backgroundImage = "url('images/clud-night.jpg')";
        weather_img.src="images/moon-cloudy.png";
      }
      }else{
        weather_img.src="images/clouds.png"; 
      }
      break;

      case 'Mist':
      if(found){
      if(checkTime==true) {
        weather_img.src="images/mist.png";
        main_body.style.backgroundImage = "url('images/mist2.webp')";;
      }
      else if(checkTime==false){
        main_body.style.backgroundImage = "url('images/fog-night.avif')";
        weather_img.src="images/fog-night-moon.png";
      }
      }else{
        weather_img.src="images/mist.png"; 
      }
      break;

      case "Haze":
      if(found){
      if(checkTime==true) {
        weather_img.src="images/mist.png";
        main_body.style.backgroundImage = "url('images/mist2.webp')";;
      }
      else if(checkTime==false){
        main_body.style.backgroundImage = "url('images/fog-night.avif')";
        weather_img.src="images/fog-night-moon.png";
      }
      }else{
        weather_img.src="images/mist.png"; 
      }
      break;

         case "Fog":
      if(found){
      if(checkTime==true) {
        weather_img.src="images/fog.png";
        main_body.style.backgroundImage = "url('images/mist2.webp')";;
      }
      else if(checkTime==false){
        main_body.style.backgroundImage = "url('images/fog-night.avif')";
        weather_img.src="images/fog-night-moon.png";
      }
      }else{
        weather_img.src="images/fog.png"; 
      }
      break;

      case "Smoke":
      if(found){
      if(checkTime==true) {
        weather_img.src="images/fog.png";
        main_body.style.backgroundImage = "url('images/mist2.webp')";;
      }
      else if(checkTime==false){
        main_body.style.backgroundImage = "url('images/fog-night.avif')";
        weather_img.src="images/fog-night-moon.png";
      }
      }else{
        weather_img.src="images/fog.png"; 
      }
      break;

      case 'Thunderstorm':
      if(found){
      if(checkTime==true) {
        weather_img.src="images/tunderstorm.png";
        main_body.style.backgroundImage = "url('images/thunderstorm2.webp')";;
      }
      else if(checkTime==false){
        main_body.style.backgroundImage ="url('images/thunderstorm-night.avif')";
        weather_img.src="images/moon-thunderstorm.png";
      }
      }else{
        weather_img.src="images/tunderstorm.png"; 
      }
      break; 
      

      case 'Snow':
      weather_img.src="images/snow.png";
      if(checkTime==true) {main_body.style.backgroundImage="url('images/snow2.jpg')";}
    else if(checkTime==false){main_body.style.backgroundImage = "url('images/night-snow.jpg')";}
      break;

      case 'Rain':
      if(found){
      if(checkTime==true) {
        weather_img.src="images/rain.png";
        main_body.style.backgroundImage ="url('images/rain2.jpg')";
      }
      else if(checkTime==false){
        main_body.style.backgroundImage ="url('images/night-rain.webp')";
        weather_img.src="images/moon-cloudy-rain.jpg";
      }
      }else{
        weather_img.src="images/rain.png"; 
      }
      break; 
      case 'Rain':
      weather_img.src="images/rain.png";
    if(checkTime==true) {main_body.style.backgroundImage="url('images/rain2.jpg')";}
   else if(checkTime==false){main_body.style.backgroundImage="url('images/night-rain.webp')";}
      break;

      default:
    weather_img.src="images/unknown-weather.png"; 
     if(found) main_body.style.backgroundImage="url('images/unknown2.png')";
    }
}

