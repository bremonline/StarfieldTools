// This script uses the resources_by_planet.json, which is in the form of:
// <system>.<planet-or-moon>.<the word Planet or Moon>:[ array of resources]

var system_list = {};

$(document).ready(function(){
  $("#list_systems").html("Planets:<br/>");


  $.get("/../../data/resources_by_planet.json", function(data, status){
    create_list_of_systems(data);

    $("#list_systems").append(JSON.stringify(system_list));
    create_save_link();
  });
});

function create_list_of_systems(data) {
  $.each(data, function(planet_name, resources) {
    information = planet_name.split(".");
    console.log(information[0]+":"+information[1]);
    if (!system_list[information[0]]) system_list[information[0]] = [];
    system_list[information[0]].push(information[1]);
  });
}

function create_save_link() {

  var link = $("#download_link");

  link.attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(system_list)));
  link.attr('download', `system_planets.json`);
  alert("Setting donwload");
}