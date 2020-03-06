var patterns = [];

function Pattern(name){
	this.name = name;
	this.dict = [];
}

Pattern.prototype.translate = function(origin) {
	let i;
	let newText = "";
	for(i = 0; i < origin.length; i++) {
		if (this.dict[origin.charAt(i)] !== undefined) {
			newText += this.dict[origin.charAt(i)];
		} else {
			newText += origin.charAt(i);
		}
	}
	return newText;
}

function getJson(url) {
	const httpReq = new XMLHttpRequest();
	httpReq.open("GET", url, false);
	httpReq.send(null);
	const jsonObj = JSON.parse(httpReq.responseText);
	return jsonObj;
}

function run() {
	let originalText = document.getElementById("originalText").value;
	console.log(originalText);
	let i;
	let outputString = "";
	for (i = 0; i < patterns.length; i++) {
		let translatedText = patterns[i].translate(originalText);
		outputString += translatedText + "<br />";
	}
    const outputBox = document.getElementById("output")
    outputBox.innerHTML = outputString;
    console.log(outputString);
}

function load() {
    const url = "https://chenyuheng.github.io/Stylish-Text/styles.json";
    const jsonObj = getJson(url);
    let i;
    for (i = 0; i < jsonObj.length; i++) {
        let tempPattern = new Pattern(jsonObj[i]["name"]);
        tempPattern.dict = jsonObj[i];
        patterns.push(tempPattern);
    }
    run();
}

document.getElementById("originalText").addEventListener("keyup", run);
