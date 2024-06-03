
let selected_amenities = {}

$(document).ready(function () {
	select_amenities();
	filter_places();
	$.ajax({
		url: 'http://0.0.0.0:5001/api/v1/status/',
		type: 'GET',
		dataType: 'json',
		success: function (resp) {
			if (resp.status == "OK"){
				$('div#api_status').addClass('available')
				fetch_places()
			} else {
				$('div#api_status').removeClass('available')
			}
		},
		error: function(xhr, textStatus, error) {
			console.log(xhr)
		}
	});
});

function select_amenities() {
	$('.popover ul li input[type="checkbox"]').click(function(){
		const data = $(this).data()
		if ($(this).is(":checked")) {
			$
			selected_amenities[data.id] = data.name
		} else {
			delete selected_amenities[data.id]
		}
		$('.amenities h4').text(Object.values(selected_amenities).join(', '));
		console.log(selected_amenities)
	});
}

function fetch_places() {
$.ajax({
	url: 'http://0.0.0.0:5001/api/v1/places_search/',
	type: 'post',
	contentType: 'application/json',
	data: JSON.stringify({}),
	success: function (resp) {
		places = resp;
		$.each(places, function (index, place) {
          	$('.places').append(
            		'<article>' +
              		'<div class="title_box">' +
              		'<h2>' + place.name + '</h2>' +
              		'<div class="price_by_night">' + place.price_by_night +
              		'</div>' +
              		'</div>' +
              		'<div class="information">' +
              		'<div class="max_guest">' +
              		'<br />' + place.max_guest + ' Guests' +
              		'</div>' +
              		'<div class="number_rooms">' +
              		'<br />' + place.number_rooms + ' Bedrooms' +
              		'</div>' +
              		'<div class="number_bathrooms">' +
              		'<br />' + place.number_bathrooms + ' Bathroom' +
              		'</div>' +
              		'</div>' +
              		'<div class="description">' + place.description +
              		'</div>' +
              	'</article>');
        });
	},
	error: function(xhr, textStatus, error) {
		console.log(xhr)
	}
});
}

function filter_places() {
$('button').click(function () {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://localhost:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: Object.keys(selected_amenities) }),
      dataType: 'json',
      success: function (places) {
        $('.places').empty();
        $.each(places, function (index, place) {
          $('.places').append(
            '<article>' +
            '<div class="title_box">' +
            '<h2>' + place.name + '</h2>' +
            '<div class="price_by_night">' + '$' + place.price_by_night +
            '</div>' +
            '</div>' +
            '<div class="information">' +
            '<div class="max_guest">' +
            '<br />' + place.max_guest + ' Guests' +
            '</div>' +
            '<div class="number_rooms">' +
            '<br />' + place.number_rooms + ' Bedrooms' +
            '</div>' +
            '<div class="number_bathrooms">' +
            '<br />' + place.number_bathrooms + ' Bathroom' +
            '</div>' +
            '</div>' +
            '<div class="description">' + place.description +
            '</div>' +
            '</article>');
        });
      }
    });
})
}
