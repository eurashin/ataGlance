var tags;

function onload() {
    tags = []; 
}

//redirect and make api call
function search() {
    var obj = {"tags": tags}
    $.ajax({
        url:"https://ataglance.appspot.com/getnews",
        type: "POST", 
        dataType: "json", 
        data:JSON.stringify(obj),
        success: function(response) {
            data = JSON.parse(response);
            dates = data.dates; 
            descriptions = data.descriptions; 
            keys = keys;
        }
    });
}

function addTag(tag) {
    tags.push(tag)
}



