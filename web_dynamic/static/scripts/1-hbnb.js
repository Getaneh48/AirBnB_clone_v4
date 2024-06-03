$(document).ready(function() {
	let selected_amenities = {}
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
})
