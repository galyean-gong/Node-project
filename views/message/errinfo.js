function showError(message,res){
	var result = `<script>alert('${message}');history.back()</script>`
	res.send(result);
}

function showSuccess(urlPath,message,res){
	res.render("message/errinfo",{
				urlPath,
				message
	})
}

module.exports = {
	showError,
	showSuccess
}