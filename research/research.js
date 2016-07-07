var more1 = document.getElementById("more1");
more1.addEventListener("click", function(e) {
	var content1 = document.getElementById("content1");

	var p = document.createElement("p");
	p.appendChild(document.createTextNode("Fusce fermentum accumsan est non sagittis. Proin vel fringilla tellus. Sed in nisl in leo elementum porttitor."));

	content1.appendChild(p);
});

var more2 = document.getElementById("more2");
more2.addEventListener("click", function(e) {
	var content2 = document.getElementById("content2");

	var p = document.createElement("p");
	p.appendChild(document.createTextNode("Fusce fermentum accumsan est non sagittis. Proin vel fringilla tellus. Sed in nisl in leo elementum porttitor."));

	content2.appendChild(p);
});

var more2w = document.getElementById("more2w");
more2w.addEventListener("click", function(e) {
	var content2 = document.getElementById("content2");

	var p = document.createElement("p");
	p.appendChild(document.createTextNode("Nunc ultrices turpis justo, et dignissim ligula aliquet a. Pellentesque dolor enim, auctor ac mi gravida, porttitor rhoncus nisi. Praesent suscipit, est ut varius ultrices, lorem dui consequat lectus, quis ultrices lectus leo ut magna. Pellentesque semper consectetur justo. Praesent nec vulputate lacus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris faucibus est fermentum orci iaculis ornare. Nulla congue risus nisl, non lacinia neque scelerisque id. Quisque quis augue fringilla, faucibus purus eget, commodo lectus. Nulla dictum lorem nec pellentesque feugiat. Praesent in feugiat ex. Vestibulum sed magna a lectus dictum laoreet eu ut massa. Morbi cursus ac velit vitae pharetra. Quisque dapibus accumsan scelerisque. Nulla vel sapien et metus convallis congue."));

	content2.appendChild(p);
});

var open1 = document.getElementById("open1");
open1.addEventListener("click", function(e) {
	var dialog1 = document.getElementById("dialog1");
	dialog1.showModal();
});

var open2 = document.getElementById("open2");
open2.addEventListener("click", function(e) {
	var dialog2 = document.getElementById("dialog2");
	if (dialog2.className.indexOf("visible") == -1) {
		dialog2.className += "visible";
	}
});