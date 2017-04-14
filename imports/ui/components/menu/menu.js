import './menu.html';


Template.menu.onRendered(function() {
	if ($(window).width() < 977) {
		// Open the mobile menu
		$('#menu p').click(function() {
			$('#menu ul').toggle();
		});
		// Close the mobile menu
		$('#menu a').click(function() {
			$('#menu ul').hide();
		});
	}
});