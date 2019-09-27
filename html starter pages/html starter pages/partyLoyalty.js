let members = [];
let statistics = [{
        Party: "Republicans",
        "Number": 0,
        "PartyVotesPercentage": 0,

    },
    {
        Party: "Democrats",
        "Number": 0,
        "PartyVotesPercentage": 0,

    },
    {
        Party: "Independent",
        "Number": 0,
        "PartyVotesPercentage": 0,

    },
    {
        Total: "Total",
        "TotalNumber": 0,
        "TotalPercentageVotes": 0,



    }
]
let table = document.getElementById("myTable");
let allMemberVotes = [];

if (location.pathname == "/html%20starter%20pages/senate-party-loyalty-starter-page.html") {

    url = "https://api.propublica.org/congress/v1/113/senate/members.json";
    getData(url);
}
if (location.pathname == "/html%20starter%20pages/house-party-loyalty.html") {
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



    fillStatistics();
    let kit = Object.keys(statistics[0]);
    generateTable(table, statistics);
    generateTableHead(table, kit);

    leastMissedVotes();
    mostMissedVotes();
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

function fillStatistics() {
    let numberVotes = []
    pureVootes = []
    for (j = 0; j < members.length; j++) {
        let allNumberVotes = members[j].total_votes
        numberVotes.push(allNumberVotes)
        numberVotesSum = numberVotes.reduce((a, b) => a + b, 0)
        if (allNumberVotes !== null && allNumberVotes !== 0) {
            let pureVotes = Math.round(members[j].total_votes * (members[j].votes_with_party_pct / 100))
            pureVootes.push(pureVotes)
            sumPureVotes = pureVootes.reduce((a, b) => a + b, 0)
        }
    }

    for (let i = 0; i < members.length; i++) {
        let republicansAllVotesSum = 0
        let republicanPureVotesSum = 0
        let democratsAllVotesSum = 0
        let democratsPureVotesSum = 0
        let independentsAllVotesSum = 0
        let independentsPureVotesSum = 0
        if (members[i].party == "D") {
            statistics[0].Number++;
            allMemberVotes.push(members[i])
            democratsAllVotesSum += members[i].total_votes
            if (members[i].total_votes !== 0) {
                democratsPureVotesSum += democratsAllVotesSum * (members[i].votes_with_party_pct / 100)
            }
            statistics[0].PartyVotesPercentage = Math.round((democratsPureVotesSum / democratsAllVotesSum) * 100)
        }
        if (members[i].party == "R") {
            statistics[1].Number++;
            allMemberVotes.push(members[i])
            republicansAllVotesSum += members[i].total_votes
            if (members[i].missed_votes !== null) {
                republicanPureVotesSum += republicansAllVotesSum * (members[i].votes_with_party_pct / 100)
                statistics[1].PartyVotesPercentage = Math.round((republicanPureVotesSum / republicansAllVotesSum) * 100);
            }
        } else if (members[i].party == "I") {
            statistics[2].Number++;
            allMemberVotes.push(members[i])
            independentsAllVotesSum += members[i].total_votes
            independentsPureVotesSum = independentsAllVotesSum * (members[i].votes_with_party_pct / 100)
            statistics[2].PartyVotesPercentage = Math.round((independentsPureVotesSum / independentsAllVotesSum) * 100);
        }
        statistics[3].TotalNumber = statistics[0].Number + statistics[1].Number + statistics[2].Number
        statistics[3].TotalPercentageVotes = Math.round((sumPureVotes / numberVotesSum) * 100)
    }
    console.log(allMemberVotes);

}

function generateTableHead(table, kit) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of kit) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, kit) {
    for (let element of kit) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

function leastMissedVotes() {
    let abc = [...allMemberVotes.sort((a, b) => parseFloat(a.total_votes) - parseFloat(b.total_votes))];
    console.log(abc);

    let leastmissedV = abc[Math.round(abc.length * 0.1)].total_votes;
    console.log(leastmissedV);
    // results.push(leastmissedV)
    let results = []

    for (k = 0; k < abc.length; k++) {
        if (abc[k].total_votes <= leastmissedV) {
            results.push(abc[k]);
        } else {
            break;
        }
    }

    console.log(results)
    generateTbl("Mytbl", results)
}

function mostMissedVotes() {
    let cba = [...allMemberVotes.sort((a, b) => parseFloat(b.total_votes) - parseFloat(a.total_votes))];
    console.log(cba);

    let mostmissedV = cba[Math.round(cba.length * 0.1)].total_votes;
    console.log(mostmissedV);
    let resultSS = []

    for (k = 0; k < cba.length; k++) {
        if (cba[k].total_votes >= mostmissedV) {
            resultSS.push(cba[k]);
        } else {
            break;
        }
    }

    console.log(resultSS);

    generateTbl("test", resultSS)
}



function generateTbl(id, perc) {
    console.log(perc)
    var tabl = document.getElementById(id)
    var head = document.createElement('thead');
    var rowq = document.createElement("tr");
    var cell = document.createElement("td");
    var text = document.createTextNode("Name");
    cell.appendChild(text);
    rowq.appendChild(cell);
    var cell2 = document.createElement("td");
    var text1 = document.createTextNode("No. of Party Votes");
    cell2.appendChild(text1);
    rowq.appendChild(cell2);
    var cell3 = document.createElement("td");
    var text2 = document.createTextNode("% of Votes");
    cell3.appendChild(text2);
    rowq.appendChild(cell3);
    head.appendChild(rowq);
    tabl.appendChild(head);

    var tablBody = document.createElement('tbody');

    for (i = 0; i < perc.length; i++) {
        var row = document.createElement("tr");




        row.insertCell().innerHTML = (perc[i].first_name + " " + perc[i].last_name).link(perc[i].url);
        row.insertCell().innerHTML = perc[i].total_votes;
        row.insertCell().innerHTML = perc[i].votes_with_party_pct;

        tablBody.appendChild(row);

    }
    tabl.appendChild(tablBody);
}