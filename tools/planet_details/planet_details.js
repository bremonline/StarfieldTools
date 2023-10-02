// This script uses the resources_by_planet.json, which is in the form of:
// <system>.<planet-or-moon>.<the word Planet or Moon>:[ array of resources]

var system_list = {};

// Enums
const static_lists = {
  "type": ["ROCK", "BARREN", "ICE", "GAS GIANT", "ICE GIANT"],
  "temperature": ["INFERNO", "TEMPERATE", "COLD", "FROZEN", "DEEP FREEZE"],
  "atmosphere": ["NONE", "STD O2", "HIGH O2", "STD CO2", "EXTR CO2", "STD N", "STD H"],
  "extreme": ["", "(COR)", "(GRAV)", "(PRESSURE)"],
  "magnetosphere": ["WEAK", "STRONG", "POWERFUL"],
  "flora": ["NONE", "PRIMORDIAL", "ABUNDANT"],
  "flora_count": ["(0/1)", "(0/2)", "(0/3)", "(0/4)", "(0/5)", "(0/6)", "(0/7)", "(0/8)", "(0/9)", "(0/10)", "(0/11)", "(0/12)"],
  "fauna": ["NONE", "PRIMORDIAL", "ABUNDANT"],
  "fauna_count": ["(0/1)", "(0/2)", "(0/3)", "(0/4)", "(0/5)", "(0/6)", "(0/7)", "(0/8)", "(0/9)", "(0/10)", "(0/11)", "(0/12)"],
  "water": ["NONE", "HEAVY METAL", "CHEMICAL", "SAFE", "BIOLOGICAL"]
}

$(document).ready(function(){
  $("#list_systems").html("Planets:<br/>");

  $.get("./../../data/system_planets.json", function(data, status){
    load_planets(data);
   });

  $( "#system_selector" ).on( "change", function() {
    set_planet_chooser();
  });
  $( "#planet_selector" ).on( "change", function() {
    show_planet_details();
  });

});

function load_planets(data) {
  // Set the options in the selct to list all systems
  system_list = data;
  const selector = $("#system_selector");
  $.each(data, function(system_name, planet_list) {
    var opt = $("<OPTION>").text(system_name).val(system_name);
    selector.append(opt);
  });
}

function set_planet_chooser() {
  const system_chosen = $("#system_selector").val();
  const planet_list = system_list[system_chosen];
  console.log(planet_list);

  const selector = $("#planet_selector").empty();
  $.each(planet_list, function(index, planet_name) {
    var opt = $("<OPTION>").text(planet_name).val(planet_name);
    selector.append(opt);
  });
  $(".picture_panel").fadeOut("slow");
  $(".details_panel").fadeOut("slow");
  $(".resources_panel").fadeOut("slow");
  $("#planet_select_row").fadeIn("slow");

}

function show_planet_details() {
  const system_chosen = $("#system_selector").val();
  const planet_chosen = $("#planet_selector").val();

  $("#planet_name").text(planet_chosen);
  $("#system_name").text(system_chosen);
  set_location_enum( $("#X") );
  set_location_enum( $("#Y") );
  set_location_enum( $("#Z") );
  set_enum( $("#type_enum"), "type");
  set_gravity_enum( $("#gravity_enum"));
  set_enum( $("#temperature_enum"), "temperature");
  set_enum( $("#atmosphere_enum"), "atmosphere");
  set_enum( $("#extreme_enum"), "extreme");
  set_enum( $("#magnetosphere_enum"), "magnetosphere");
  set_enum( $("#flora_enum"), "flora");
  set_enum( $("#flora_count_enum"), "flora_count");
  set_enum( $("#fauna_enum"), "fauna");
  set_enum( $("#fauna_count_enum"), "fauna_count");
  set_enum( $("#water_enum"), "water");


  $(".picture_panel").fadeIn("slow");
  $(".details_panel").fadeIn("slow");
  $(".resources_panel").fadeIn("slow");
}

function set_enum(selector, enumerator) {
  selector.empty().append($("<OPTION>").val("").text(""));

  $.each(static_lists[enumerator], function(index, type_value) {
    selector.append($("<OPTION>").val(type_value).text(type_value));
  });
}
function set_location_enum(selector) {
  for (var i= -20; i < 100; i++) {
    selector.append($("<OPTION>").val(i).text(i));
    selector.val(0);
  }
}
function set_gravity_enum(selector) {
  for (var i= 0.01; i < 2.2; i+=0.01) {
    const val = i.toFixed(2);
    selector.append($("<OPTION>").val(val).text(val));
    selector.val("1.00");
  }
}


/*
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
*/
