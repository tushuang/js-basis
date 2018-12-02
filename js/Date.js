function isLeapYear(year){
	return  year%4 == 0 && year%100 != 0 || year%400 == 0;
}
function dateString(date,sep){
	var sep = sep || "-";
	var m = date.getMonth()+1;
	var d = date.getDate();
	return date.getFullYear() + sep + (m<10?"0"+m:m) + sep + (d<10?"0"+d:d);
}
