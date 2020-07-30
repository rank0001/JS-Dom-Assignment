//pin Generate button
const pinGenButton = document.querySelector(".generate-btn");
const pinGenText = document.querySelector(".pinGenerate");

//pin buttons
const buttons = document.querySelector(".numbers");
const pinInput = document.querySelector(".pinInput");

//showing result
const success = document.querySelector(".success");
const failure = document.querySelector(".failure");
const pinGenNotify = document.querySelector(".empty");

//try section
const tryLeftSection = document.querySelector(".tryLeft");
const remainingChance = document.querySelector(".remainingChance");

//submit Button
const submitButton = document.querySelector(".submit-btn");

//pin matching function for comparing values
const matchPin = () => {
	//for validating empty text
	if (pinGenText.value === "" || pinInput.value === "")
		pinGenNotify.style.display = "block";
	else {
		let pinValue = parseFloat(pinInput.value.trim());
		let pinGenValue = parseFloat(pinGenText.value);
		if (pinValue === pinGenValue) {
			pinGenNotify.style.display = "none";
			failure.style.display = "none";
			success.style.display = "block";
		} else {
			remainingChance.innerText -= 1;
			if (parseInt(remainingChance.innerText) === 0) {
				submitButton.disabled = true;
				submitButton.style.opacity = "0.5";
				tryLeftSection.innerText = "you cant try anymore";
				pinGenNotify.style.display = "none";
				success.style.display = "none";
				failure.style.display = "none";
			} else {
				pinGenNotify.style.display = "none";
				success.style.display = "none";
				failure.style.display = "block";
			}
		}
	}
};

//generating a pin
pinGenButton.addEventListener("click", (e) => {
	e.stopPropagation();
	let randNumber = Math.floor(1000 + Math.random() * 9000);
	pinGenText.value = randNumber;
	pinGenNotify.style.display = "none";
	success.style.display = "none";
	failure.style.display = "none";
});

//pinInput buttons
buttons.addEventListener("click", (e) => {
	//for preventing unncessary bubbling up
	e.stopPropagation();
	if (e.target.textContent === "Submit") {
		//for empty space validations
		pinInput.value = pinInput.value.replace(/ /g, "");
		matchPin();
	} else if (e.target.textContent === "<") {
		pinInput.value = pinInput.value.substr(0, pinInput.value.length - 1);
	} else if (e.target.textContent === "C") {
		pinInput.value = "";
	} else {
		pinInput.value += e.target.innerText;
	}
});
