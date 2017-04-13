import './home.html';

import '../../components/menu/menu.js';
import '../../components/mvid/mvid.js';
import '../../components/portfolio/portfolio.js';
import '../../components/form/form.js';


Template.main_page.onRendered(function() {
	$('#menu a').click(function(event) {
		event.preventDefault();
		let re = this.href.match(/#.+/);
		scrollTo(re[0]);
	});
});


function scrollTo(id) {
	$('html, body').animate({
		scrollTop: $(id).offset().top
	}, 1200);
}