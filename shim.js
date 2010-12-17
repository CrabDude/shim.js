// In <head> before any shimmed calls
var NS = {}; // Your namespace
NS.shim = {
	calls: {},
	fn: ['$','jQuery','someOutdatedInlineFunction','etc']
};

var c = NS.shim.calls,
	f = NS.shim.fn;
for (var i=-1; ++i < f.length;) {
	c[f[i]] = [];
	window[f[i]] = (function(j) {
		return function() {
			c[f[j]].push(arguments);
		};
	})(i);
}



// After jQuery has been loaded
$(function() {
	var c = NS.shim.calls,
		f = NS.shim.fn;
	for (var i=0; i < f.length; ++i) {
		for (var j=0; j < c[f[i]].length; ++j) {
			window[f[i]].apply(window,c[f[i]][j]);
		}
		delete c[f[i]];
	}
	delete NS.shim;
});