var $search = $('#search');
$search.keypress(function(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) {
		var searchTerm = $search.val();
		if(searchTerm)
			window.location = window.location.origin + "/" + searchTerm;
	}
});