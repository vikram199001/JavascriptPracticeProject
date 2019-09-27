// console.log(data.results[0].members);
// const members = data.results[0].members;


let members = [];
let allMemberVotes = [];

if (location.pathname == "/html%20starter%20pages/senate-starter-page.html") {

    url = "https://api.propublica.org/congress/v1/113/senate/members.json";
    getData(url);
}
if (location.pathname == "/html%20starter%20pages/house-starter-page.html") {
    url = "https://api.propublica.org/congress/v1/113/house/members.json";
    getData(url);
}
async function getData(url) {
    members = await fetch(url, {
            method: "GET",
            headers: new Headers({
                "X-API-Key": "4qE983HfMkHxgodAK1ZmKVrOkYUQwDxrsanUNCf0"
            })
        })
        .then(response => response.json())
        .then(data => data.results[0].members)
        .catch(err => console.error(err))

    generateTable(members)
    filterS()

}


function generateTable(members) {


    var tabl = document.getElementById('myTable')
    tabl.innerHTML = "";


    tabl.setAttribute('class', "table table-borderless table-hover table-white")
    var head = document.createElement('thead');
    var rowq = document.createElement("tr");
    var celld = document.createElement("td");
    var text0 = document.createTextNode("Name");
    celld.appendChild(text0);
    rowq.appendChild(celld);

    var cell2 = document.createElement("td");
    var text1 = document.createTextNode("Party");
    cell2.appendChild(text1);
    rowq.appendChild(cell2);

    var cell3 = document.createElement("td");
    var text2 = document.createTextNode("States");
    cell3.appendChild(text2);
    rowq.appendChild(cell3);

    var cell4 = document.createElement("td");
    var text4 = document.createTextNode("Years in Office");
    cell4.appendChild(text4);
    rowq.appendChild(cell4);

    var cell5 = document.createElement("td");
    var text5 = document.createTextNode("%Votes w/Party");
    cell5.appendChild(text5);
    rowq.appendChild(cell5);
    head.appendChild(rowq);
    tabl.appendChild(head);

    var tablBody = document.createElement('tbody');

    for (i = 0; i < members.length; i++) {
        var row = document.createElement("tr");
        if (members[i].middle_name == null) {
            members[i].middle_name = ""
        }


        row.insertCell().innerHTML = (members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name).link(members[i].url);

        row.insertCell().innerHTML = members[i].party;
        row.insertCell().innerHTML = members[i].state;
        row.insertCell().innerHTML = members[i].seniority;
        row.insertCell().innerHTML = members[i].votes_with_party_pct;
        var link = document.createElement('a');
        link.setAttribute('href', members[i].url);


        tablBody.appendChild(row);



    }
    tabl.appendChild(tablBody);


}








function filterMembers() {

    // selectedValues = [...document.querySelectorAll('input:checked')].map(checkbox => checkbox.value);
    // console.log(selectedValues)

    let selected = [];

    var boxes = document.getElementsByTagName("INPUT");
    var select = document.getElementById("dropdownMenuLink");

    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        if (box.checked) {
            selected.push(box.value)

        }
    }

    //  let filteredMembers = members.filer(member => selected.includes(member.party))


    let filtered = [];
    for (let i = 0; i < members.length; i++) {
        if (selected.includes(members[i].party) && (members[i].state == select.value || select.value == "all")) {
            filtered.push(members[i])
        }

    }
    if (filtered.length > 0) {
        generateTable(filtered)
    } else {
        alert("select something")
    }


}

function filterS() {

    let allStates = []
    let select = document.getElementById("dropdownMenuLink");
    for (let i = 0; i < members.length; i++) {
        let eachState = members[i].state;
        allStates.push(eachState)
    }
    var allUnique = allStates.filter((item, index) => allStates.indexOf(item) === index).sort()
    for (i = 0; i < allUnique.length; i++) {
        let unique = allUnique[i]
        let options = document.createElement("option");
        options.innerHTML = unique;
        select.appendChild(options)
    }
    document.getElementById("myBtn1").addEventListener("click", filterMembers);
    document.getElementById("myBtn2").addEventListener("click", filterMembers);
    document.getElementById("myBtn3").addEventListener("click", filterMembers);
    document.getElementById("dropdownMenuLink").addEventListener("change", filterMembers);
}
document.onreadystatechange = function() {
    var state = document.readyState
    if (state == 'interactive') {
        document.getElementById('contents').style.visibility = "hidden";
    } else if (state == 'complete') {
        setTimeout(function() {
            document.getElementById('interactive');
            document.getElementById('load').style.visibility = "hidden";
            document.getElementById('contents').style.visibility = "visible";
        }, 1000);
    }
}


// function filterStates() {

// let select = [];
// var box = document.getElementsByTagName("a");
// for (var i = 0; i < box.length; i++) {
//     var boxes = box[i];
//     if (boxes.click) {
//         select.push(boxes.value)

//     }
// }