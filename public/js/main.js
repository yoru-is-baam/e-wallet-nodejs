function checkLogin() {
	let usernameBox = document.getElementById("username");
	let pwdBox = document.getElementById("password");

	let username = usernameBox.value.trim();
	let pass = pwdBox.value.trim();

	if (username.length < 10) {
		showError("Your username must be at least 10 characters");
		usernameBox.focus();

		return false;
	} else if (pass.length < 6) {
		showError("Your password must be at least 6 characters");
		pwdBox.focus();

		return false;
	} else {
		showError();

		return true;
	}
}

function checkRegister() {
	let nameBox = document.getElementById("name");
	let emailBox = document.getElementById("email");
	let phoneBox = document.getElementById("phone");
	let addressBox = document.getElementById("address");
	let birthDayBox = document.getElementById("birthday");
	let idFrontBox = document.getElementById("id-front");
	let idBackBox = document.getElementById("id-back");

	let name = nameBox.value.trim();
	let email = emailBox.value.trim();
	let phone = phoneBox.value.trim();
	let address = addressBox.value.trim();
	let birthDay = birthDayBox.value.trim();
	let idFront = idFrontBox.value.trim();
	let idBack = idBackBox.value.trim();

	let nameFormat = /^[A-Za-z\s]+$/;
	let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	let phoneFormat =
		/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	let imgFormat = /\.(jpe?g|png|gif|bmp)$/i;

	if (!nameFormat.test(name)) {
		showError("Please enter your name again");
		nameBox.focus();

		return false;
	} else if (name.length < 5) {
		showError("Name must be at least 5 characters.");
		nameBox.focus();

		return false;
	} else if (!mailFormat.test(email)) {
		showError("You have entered an invalid email address!");
		emailBox.focus();

		return false;
	} else if (!phoneFormat.test(phone)) {
		showError("You have entered an invalid phone number!");
		phoneBox.focus();

		return false;
	} else if (address === "") {
		showError("Please enter your address");
		addressBox.focus();

		return false;
	} else if (!checkBirthDay(birthDay)) {
		showError("Your have entered an invalid birthday!");
		birthDayBox.focus();

		return false;
	} else if (!imgFormat.test(idFront) || idFront === "") {
		showError("Your id card was not invalid");
		idFrontBox.focus();

		return false;
	} else if (!imgFormat.test(idBack) || idBack === "") {
		showError("Your id card was not invalid");
		idBackBox.focus();

		return false;
	} else {
		showError();

		return true;
	}
}

function checkChangeOtp() {
	let pwdBox = document.getElementById("pwd");
	let pwdConfirmBox = document.getElementById("pwd-confirm");

	let pwd = pwdBox.value.trim();
	let pwdConfirm = pwdConfirmBox.value.trim();

	if (pwd.length < 6) {
		showError("Your password must be at least 6 characters");
		pwdBox.focus();

		return false;
	} else if (pwd.search(/[a-z]/i) < 0) {
		showError("Your password must contain at least one letter");
		pwdBox.focus();

		return false;
	} else if (pwd.search(/\d/) < 0) {
		showError("Your password must contain at least one digit");
		pwdBox.focus();

		return false;
	} else if (pwd !== pwdConfirm) {
		showError("Password wasn't match");
		pwdBox.focus();

		return false;
	} else {
		showError();

		return true;
	}
}

function showError(errorMessage) {
	let errorMessageBox = document.getElementById("error-message");

	if (errorMessage === null || errorMessage === undefined) {
		errorMessageBox.classList.add("d-none");
	} else {
		errorMessageBox.classList.remove("d-none");
		errorMessageBox.innerHTML = errorMessage;
	}
}

function checkBirthDay(birthDay) {
	let yourDate = new Date(birthDay);
	let today = new Date();

	return yourDate <= today;
}

function showIdFrontName(img) {
	if (img.files && img.files[0]) {
		let labelFront = document.getElementsByClassName("id")[0];

		labelFront.innerHTML = img.files[0].name;
	}
}

function showIdBackName(img) {
	if (img.files && img.files[0]) {
		let labelBack = document.getElementsByClassName("id")[1];

		labelBack.innerHTML = img.files[0].name;
	}
}

function alertNotification() {
	alert("This feature is only available for verified accounts");
}

function confirmAccount(userId, status) {
	let url = "/admin/waiting_display/" + userId + "/" + status;

	$.ajax({
		url: url,
		type: "POST",
		dataType: "json",
		success: function (data) {
			if (data.code) {
				window.location.href = "/admin/admin_system";
			}
		},
		error: function (error) {
			let data = error.responseJSON;

			if (!data.code) {
				window.location.href = "/400";
			}
		},
	});
}

function unlockAccount(userId, status) {
	let url = "/admin/blocked_display/" + userId + "/" + status;

	$.ajax({
		url: url,
		type: "POST",
		dataType: "json",
		success: function (data) {
			if (data.code) {
				window.location.href = "/admin/admin_system";
			}
		},
		error: function (error) {
			let data = error.responseJSON;

			if (!data.code) {
				window.location.href = "/400";
			}
		},
	});
}

function idValidation() {
	let idFrontBox = document.getElementById("id-front");
	let idBackBox = document.getElementById("id-back");

	let idFront = idFrontBox.value.trim();
	let idBack = idBackBox.value.trim();

	let imgFormat = /\.(jpe?g|png|gif|bmp)$/i;

	if (!imgFormat.test(idFront) || idFront === "") {
		showError("Your id card was not invalid");
		idFrontBox.focus();

		return false;
	} else if (!imgFormat.test(idBack) || idBack === "") {
		showError("Your id card was not invalid");
		idBackBox.focus();

		return false;
	} else {
		showError();

		return true;
	}
}

function checkOldAndNew() {
	let oldPassBox = document.getElementById("old-pass");
	let newPassBox = document.getElementById("new-pass");
	let passConfirmBox = document.getElementById("pass-confirm");

	let oldPass = oldPassBox.value.trim();
	let newPass = newPassBox.value.trim();
	let passConfirm = passConfirmBox.value.trim();

	if (oldPass.length < 6) {
		showError("Your password must be at least 6 characters");
		oldPassBox.focus();

		return false;
	} else if (newPass.length < 6) {
		showError("Your password must be at least 6 characters");
		newPassBox.focus();

		return false;
	} else if (newPass.search(/[a-z]/i) < 0) {
		showError("Your password must contain at least one letter");
		newPassBox.focus();

		return false;
	} else if (newPass.search(/\d/) < 0) {
		showError("Your password must contain at least one digit");
		newPassBox.focus();

		return false;
	} else if (newPass !== passConfirm) {
		showError("Password wasn't match");
		passConfirmBox.focus();

		return false;
	} else {
		showError();

		return true;
	}
}

function checkMailAndPhone() {
	let emailBox = document.getElementById("email");
	let phoneBox = document.getElementById("phone");

	let email = emailBox.value.trim();
	let phone = phoneBox.value.trim();

	let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	let phoneFormat =
		/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

	if (!mailFormat.test(email)) {
		showError("You have entered an invalid email address!");
		emailBox.focus();

		return false;
	} else if (!phoneFormat.test(phone)) {
		showError("You have entered an invalid phone number!");
		phoneBox.focus();

		return false;
	} else {
		showError();

		return true;
	}
}

function checkOtp() {
	let otpBox = document.getElementById("otp");

	let otp = otpBox.value.trim();

	if (otp.length < 6) {
		showError("OTP must be at least 6 characters");

		return false;
	} else if (otp.length > 6) {
		showError("OTP can not be greater than 6 characters");

		return false;
	} else {
		showError();

		return true;
	}
}

function rechargeMoney() {
	let cardNumberBox = document.getElementById("card-num");
	let dateExpireBox = document.getElementById("date-expire");
	let cvvBox = document.getElementById("cvv");
	let depositMoneyBox = document.getElementById("deposit-money");

	let cardNumber = cardNumberBox.value.trim();
	let dateExpire = dateExpireBox.value.trim();
	let cvv = cvvBox.value.trim();
	let depositMoney = depositMoneyBox.value.trim();

	let moneyFormat = /^[0-9]*$/;

	if (!/^[0-9]{6}$/.test(cardNumber)) {
		showError("Card number must be at least 6 digits");
		cardNumberBox.focus();

		return;
	} else if (dateExpire === "") {
		showError("Invalid date expiration");
		dateExpireBox.focus();

		return;
	} else if (!/^[0-9]{3}$/.test(cvv)) {
		showError("CVV must be at least 3 digits");
		cvvBox.focus();

		return;
	} else if (depositMoney == "" || depositMoney <= 0) {
		showError("Money can not be empty");
		depositMoneyBox.focus();

		return;
	} else if (!moneyFormat.test(depositMoney)) {
		showError("Invalid money");
		depositMoneyBox.focus();

		return;
	} else {
		showError();

		$.ajax({
			url: "/recharge",
			type: "POST",
			data: {
				cardNumber: cardNumber,
				expirationDate: dateExpire,
				cvv: cvv,
				rechargeMoney: depositMoney,
			},
			success: function (data) {
				if (data.code) {
					window.location.reload();
				}
			},
			error: function (xhr, status, error) {
				let data = xhr.responseJSON;

				console.log(data);

				if (data.code === -1) {
					window.location.href = "/400";
				} else {
					showError(data.msg);
				}
			},
		});
	}
}

function checkTransfer() {
	let phoneBox = document.getElementById("phone");
	let moneyBox = document.getElementById("money-transfer");
	let noteBox = document.getElementById("note");

	let phone = phoneBox.value.trim();
	let money = moneyBox.value.trim();
	let note = noteBox.value.trim();

	let phoneFormat =
		/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	let moneyFormat = /^[0-9]*$/;

	if (!phoneFormat.test(phone)) {
		showError("You have entered an invalid phone number!");
		phoneBox.focus();

		return false;
	} else if (money === "") {
		showError("Money can not be empty");
		moneyBox.focus();

		return false;
	} else if (!moneyFormat.test(money)) {
		showError("Invalid money");
		moneyBox.focus();

		return false;
	} else if (note === "") {
		showError("Note can not be empty");
		noteBox.focus();

		return false;
	} else {
		showError();

		return true;
	}
}

function checkWithdrawal() {
	let cardNumberBox = document.getElementById("card-num");
	let dateExpireBox = document.getElementById("expiration");
	let cvvBox = document.getElementById("cvv");
	let withdrawalMoneyBox = document.getElementById("money");
	let noteBox = document.getElementById("note");

	let cardNumber = cardNumberBox.value.trim();
	let dateExpire = dateExpireBox.value.trim();
	let cvv = cvvBox.value.trim();
	let withdrawalMoney = withdrawalMoneyBox.value.trim();
	let note = noteBox.value.trim();

	const MULTIPLE_OF_50000 = parseInt(withdrawalMoney) % 50000 === 0;

	let moneyFormat = /^[0-9]*$/;

	if (!/^[0-9]{6}$/.test(cardNumber)) {
		showError("Card number must be at least 6 digits");
		cardNumberBox.focus();

		return false;
	} else if (dateExpire === "") {
		showError("Invalid date expiration");
		dateExpireBox.focus();

		return false;
	} else if (!/^[0-9]{3}$/.test(cvv)) {
		showError("CVV must be at least 3 digits");
		cvvBox.focus();

		return false;
	} else if (withdrawalMoney == "" || withdrawalMoney <= 0) {
		showError("Money can not be empty");
		withdrawalMoneyBox.focus();

		return false;
	} else if (!moneyFormat.test(withdrawalMoney)) {
		showError("Invalid money");
		withdrawalMoneyBox.focus();

		return false;
	} else if (!MULTIPLE_OF_50000) {
		showError("Money must be multiple of 50000");
		withdrawalMoneyBox.focus();

		return false;
	} else if (note === "") {
		showError("Note can not be empty");
		noteBox.focus();

		return false;
	} else {
		showError();

		return true;
	}
}

function confirmWithdrawal(withdrawalId, accountId, status) {
	$.ajax({
		url: "/admin/confirm_withdrawal",
		type: "POST",
		data: {
			withdrawalId: withdrawalId,
			accountId: accountId,
			status: status,
		},
		success: function (data) {
			if (data.code) {
				window.location.href = "/admin/admin_system";
			}
		},
		error: function (xhr, status, error) {
			let data = xhr.responseJSON;

			console.log(data);

			if (!data.code) {
				window.location.href = "/400";
			}
		},
	});
}
