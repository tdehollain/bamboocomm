var nodeMailer = require("nodemailer");
var io = require("socket.io").listen(8004);

io.sockets.on('connection', function(socket) {
	console.log('received connection from client ' + socket);
	socket.emit('connection');

	socket.on("newMessage", function(data) {
		console.log("New message");
		sendEmail(data.name, data.email, data.phone, data.message)
	})


	function sendEmail(name, email, phone, message) {
		var smtpTransport = nodeMailer.createTransport("SMTP", {
			service: "Gmail",
			auth: {
				user: "bamboocomm82@gmail.com",
				pass: "iebusiness"
			}
		});

		if (!phone) phone = "<i>(none)</i>";

		var emailContent = "<p>You have received a new message! </p> \
				<p><strong>Name: </strong>" + name + "</p> \
				<p><strong>Email: </strong>" + email + "</p> \
				<p><strong>Phone number: </strong>" + phone + "</p> \
				<p><strong>Message: </strong>" + message + "</p>";

		smtpTransport.sendMail({
			from: "BambooComm <bamboocomm82@gmail.com",
			to: "Thibaut de Hollain <thibaut.dehollain@gmail.com",
			subject: "New message from BambooComm",
			html: emailContent
		}, function(error, response) {
			if (error) {
				console.log(error);
			} else {
				console.log("message sent: " + response.message);
				socket.emit('emailSuccess', true);
			}

			smtpTransport.close();
		});
	}

});