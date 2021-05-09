document.addEventListener('DOMContentLoaded', function () {

	[].forEach.call(document.querySelectorAll('form'), function (form) {
		switch (form.getAttribute('name')) {
			case 'demo-form-1':
				new Validator(form, function (err, res) {

				});
				break;
			case 'demo-form-2':
				new Validator(form, function (err, res) {

				});
				break;
			case 'demo-form-3':
				new Validator(form, function (err, res) {

				});
				break;
			case 'demo-form-4':
				new Validator(form, function (err, res) {

				});
				break;

		}
	});
});