
$(document).ready(function() {

	window.addEventListener('scrololol', function(event) {
		var currentPos = window.pageYOffset;
		// console.log(currentPos);
		if (currentPos > 100) {
			reduceTopBar(true);
		} else {
			reduceTopBar(false);
		}

		if (currentPos < 870) {
			$('.nav-pills li').removeClass('active');
			$('.nav-pills li:nth-child(1)').addClass('active');

		} else if (currentPos > 870 && currentPos < 1495) {
			$('.nav-pills li').removeClass('active');
			$('.nav-pills li:nth-child(2)').addClass('active');
		} else if (currentPos > 1495 && currentPos < 2595) {
			$('.nav-pills li').removeClass('active');
			$('.nav-pills li:nth-child(3)').addClass('active');
		} else {
			$('.nav-pills li').removeClass('active');
			$('.nav-pills li:nth-child(4)').addClass('active');
		}

	}, false);

	function reduceTopBar(reduce) {
		if (reduce) {
			$('#topBar').addClass("small");
			$('#mainLogo').addClass("small");
			$('nav ul').addClass("small");
			$('.nav-pills a').addClass("small");
		} else {
			$('#topBar').removeClass("small");
			$('#mainLogo').removeClass("small");
			$('nav ul').removeClass("small");
			$('.nav-pills a').removeClass("small");
		}
	}

	// Handle contact form
	$('#contactForm').submit(function(e) {
		e.preventDefault();

		// Do nothing if message has already been sent (user needs to reload page to send another message)
		if($('#submitText').text() == "Success!") return;

		$('#contactForm button').removeClass('btn-primary').addClass('btn-info');
		$('#contactForm button span:first-child').removeClass("icon-envelop").addClass('icon-loop');
		$('#submitText').text("Processing...");

		var dataArr = $('#contactForm').serializeArray();
		var userName = dataArr[0].value;
		var userEmail = dataArr[1].value;
		var userPhone = dataArr[2].value;
		var userMessage = dataArr[3].value;

		var socket = io.connect('http://52.17.2.153:8004/');
		socket.on('connection', function() {
			socket.emit('newMessage', {
				name: userName,
				email: userEmail,
				phone: userPhone,
				message: userMessage
			});
		});

		socket.on('emailSuccess', function(emailSent) {
			if(emailSent) {
				$('#contactForm button').removeClass('btn-info').addClass('btn-success');
				$('#contactForm button span:first-child').removeClass('icon-loop').addClass('icon-checkmark');
				$('#submitText').text("Success!");
			}
			socket.close();
		});
	})
});