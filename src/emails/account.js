const mailgun = require('mailgun-js')
const domain = 'sandbox2540e4fa207240c0ae670e152b6c7384.mailgun.org'
const apiKey='pubkey-d22a62df6685344e55da6b29a7c8206d'
const mg = mailgun({apiKey, domain})
const data = {
	from: 'Excited User <me@samples.mailgun.org>',
	to: 'ibrahim.eman83@gmail.com',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
}
mg.messages().send(data, function (error, body) {
	console.log(body);
})