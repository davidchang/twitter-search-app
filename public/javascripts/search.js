var $search = $('#search');
$search.keypress(function(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) {
		var searchTerm = $search.val();
		window.location = 'http://localhost:3000/' + searchTerm;
	}
});