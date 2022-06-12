export function currencyFormat(num) {
	if (num != undefined) {
		return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	} else {
		return;
	}
}

export function stripCurrencyString(str) {
	var newStr = str;
	newStr = newStr.replaceAll('$', '');
	newStr = newStr.replaceAll(',', '');

	return newStr;
}

export function formatTotalField(val) {
	if (val === null) {
		return '$';
	} else {
		const str = val.toString();
		const firstChar = str.charAt(0);
		const indexOfDecimal = str.indexOf('.');
		var res = '';

		if (firstChar == '$') {
			res = `$${(str.substring(1).replaceAll(/\B(?=(\d{3})+(?!\d))/g), ',')}`;
		} else {
			res =
				'$' +
				parseFloat(str)
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}

		if (indexOfDecimal < 0) {
			res = `${res}.00`;
		} else if (indexOfDecimal === str.length - 2) {
			res = `${res}0`;
		}
		return res;
	}
}

export function validateTotalFieldInput(e) {
	const val = e.target.value.replace(/\,/g, '');
	const firstChar = val.charAt(0);
	if (val == '') {
		return false;
	} else {
		if (firstChar == '$') {
			if (val.substring(1) == '' || !isNaN(val.substring(1))) {
				return false;
			} else if (isNaN(val.substring(1))) {
				return true;
			}
		} else {
			if (isNaN(val)) {
				return true;
			} else {
				return false;
			}
		}
	}
}
