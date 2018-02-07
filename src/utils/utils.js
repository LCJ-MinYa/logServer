//邮箱地址正则表达式判断
function matchEmail(string) {
	var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	return reg.test(string);
}

export {
	matchEmail
}