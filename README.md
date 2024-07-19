# SkyWind Weather App

After completing a course on JavaScript I wanted to try and test my skills that I had learned.
I had started out by checking out a Youtbe video of using the openWeatherMapp API services in order to better understand connecting to the service.
Once that was completed I began to layout the ideas I wanted to have when the project was finished.

This app allows you to search for a location in the world and in retrun the API will provide the current weather for the searched loaction as well as
the forecast for the next few hours to come.
The API only responds with every three hours increments of time when it comes to the forecasting.

I wanted to have a button to toggle back and forth between units of degree, which turned out to be the most difficult part.
Trying to keep track of the current vlues that are being search as well as what values the user left the toggle at so that whenever they would 
search for a location that the units would be in the currently set value of the toggle. Also had to make sure the case of the user hitting the button to
change units even before a location had been searched for, so had to make sure the default values would change on the toggle as well without effecting the 
search value once searched. 

I wanted to have a dynamic background change wheather or not it was day or night in the location the user searched for but the openWeatherMap API does not
provide those details to get that value. So I connected to the google time zone API in order to accomplish this task. This was easy to use since one of the
search parameters was to use latitude and longitude coordinets which the weather API did provide. With using those coordinets I was able to get the current 
time of day the location the user searched for and then was able to change the background accordinly.

This was all built using HTML, CSS, and Vanilia JavaScript.

The site was built to get more familiar with Mobile styles. When viewing the site in order to view it with the styles, you will either need to be on a mobile device or open up the dev tools to view it on a smaller screen size.

Live site can be found here: https://skywind.netlify.app

Connected with two API services 
  - OpenWeatherMap
  - Google Time Zone
  
Found online the toggle switch for the units

Used the libary Sweetalert.js to customize when the user gives a invaild search result.
