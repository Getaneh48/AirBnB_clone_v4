$(document).ready(function () {
	$.ajax({
		url: 'http://0.0.0.0:5001/api/v1/status/',
		type: 'GET',
		dataType: 'json',
		success: function (resp) {
			if (resp.status == "OK"){
				$('div#api_status').addClass('available')
			} else {
				$('div#api_status').removeClass('available')
			}
		},
		error: function(xhr, textStatus, error) {
			console.log(xhr)
		}
	});
});
