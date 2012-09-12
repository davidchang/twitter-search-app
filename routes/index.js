exports.index = function(req, res){
  res.render('index', { title: 'Search Twitter' });
};

exports.stream = function(req, res) {
  res.render('stream', { title: 'Search Twitter | ' + req.params.stream });
};