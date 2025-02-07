let generatedOtp;
let intervalId;
function handleOtpBoxes() {
    const otpBox = document.getElementById("otp-box");
    otpBox.addEventListener("input", function(event) {
      const target = event.target;
      const value = target.value;
      if (isNaN(value)) {
        target.value = "";
        return;
      }
      
      let nextSiblings = target.nextElementSibling;
      if (nextSiblings) {
        nextSiblings.focus();
      }
        otpValidation()
    });
    
}
function generateOtp() {
  generatedOtp = Math.floor(100000 + Math.random() * 900000);
  const otpMessage = `Your OTP is ${generatedOtp}`;
  document.getElementById("otp").innerText = otpMessage;
  expireOtp();
}

  const expireMessage = document.getElementById("expire-message");
  
function otpValidation() {
  let typedValue = "";
  const boxListElement = document.getElementById("otp-box");
  [...boxListElement.children].forEach((elem) => {
   typedValue = typedValue + elem.value;
  });
  console.log(typedValue, generatedOtp)
  const result = generatedOtp == typedValue;
  const resultMessage = document.getElementById("validation-message");
  if (result) {
    resultMessage.innerText = ` Validation successful`;
    resultMessage.classList.remove ("fail");
    resultMessage.classList.add("success");
    clearInterval(intervalId);
  expireMessage.innerText = ""
  } else {
    resultMessage.innerText = ` Invalid OTP.`;
    resultMessage.classList.remove("success");
    resultMessage.classList.add("fail");
  }
}
function expireOtp() {
  const interval = 1000;
  const totalTime = 20000; //ms
  let slice = totalTime / interval;
  
 intervalId = setInterval(() => {
    expireMessage.innerText = `Your OTP will expire in ${slice} seconds.`;
    slice--;
  }, interval);
  
  setTimeout(() => {
    expireMessage.innerText = `OTP expired!`
    clearInterval(intervalId)
  }, totalTime)
}

function init() {
    console.log("Javascript Enabled");
    handleOtpBoxes();
    setTimeout(generateOtp,2000);
    
}
init();