var nodemailer = require('nodemailer');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use('/sayHello', router);
router.post('/', handleSayHello);

function handleSayHello(req, res, next) {
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'username of sender account',
			pass: 'password for sender account'
		}
	});
	var text = 'Hello World from \n\n' + req.body.name;
	var mailOptions = {
		from: 'email of sender',
		to: 'email of reciever',
		subject: 'Email Example',
		text: text
	};
	transporter.sendMail(mailOptions, function(err, info) {
		if (err) {
			throw err;
		} else {
			console.log('Message Sent: ' + info.response);
			res.json({
				yo: info.response
			});
		}
	});
};

app.listen(3000, function(err) {
	if (err)
		throw err;
	else {
		console.log('app listening on port 3000');
	}
});