
var allparents = $.ajax({
    url: "/displayallparents",
    dataType: "json",
    async: false
}).responseText;

allparents = JSON.parse(allparents);
console.log(allUser);


var allchild = $.ajax({
    url: "http://sunshine-acres.herokuapp.com/displayallchildren",
    dataType: "json",
    async: false
}).responseText;

allchildren = JSON.parse(allchildren);
console.log(allchildren);

var allhouses = $.ajax({
    url: "/displayallhouse",
    dataType: "json",
    async: false
}).responseText;

allhouses = JSON.parse(allhouses);
console.log(allchildren);


ul = $("<ul>");                    // create a new ul element
// iterate over the array and build the list
for (var i = 0, l = allchildren.length; i < l; ++i) {
    //ul.append("<li><a href='" + obj[i].link.href + "'>" + obj[i].title.content + "</a></li>");
    console.log(allchildren[i]);
}
$("#results").append(ul);