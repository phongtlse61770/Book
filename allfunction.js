// JavaScript Document
function buttonVisible(id)	{
	document.getElementById(id).style.visibility="visible";
}
function buttonHidden(id)	{
	document.getElementById(id).style.visibility="hidden";
}
function registerPage()	{
	document.getElementById("page-all").style.opacity=0.5;
	document.getElementById("page-all").style.zIndex=100;
	document.getElementById("register-all").style.visibility='visible';
	document.getElementById("register-all").style.zIndex=300;
	document.getElementById("login-all").style.visibility='hidden';
	document.getElementById("login-all").style.zIndex=0;
	document.getElementById("reg-success").style.visibility='hidden';
	document.getElementById("reg-success").style.zIndex=0;
	document.getElementById("black-screen").style.visibility='visible';
	document.getElementById("black-screen").style.zIndex=200;
}
function loginPage()	{
	document.getElementById("page-all").style.opacity=0.5;
	document.getElementById("page-all").style.zIndex=100;
	document.getElementById("login-all").style.visibility='visible';
	document.getElementById("login-all").style.zIndex=300;
	document.getElementById("register-all").style.visibility='hidden';
	document.getElementById("register-all").style.zIndex=0;
	document.getElementById("reg-success").style.visibility='hidden';
	document.getElementById("reg-success").style.zIndex=0;
	document.getElementById("black-screen").style.visibility='visible';
	document.getElementById("black-screen").style.zIndex=200;
	document.getElementById("login-error").style.visibility='hidden';
}
function backToHome()	{
	document.getElementById("page-all").style.opacity=1;
	document.getElementById("page-all").style.zIndex=2;
	document.getElementById("register-all").style.visibility='hidden';
	document.getElementById("register-all").style.zIndex=0;
	document.getElementById("login-all").style.visibility='hidden';
	document.getElementById("login-all").style.zIndex=0;
	document.getElementById("reg-success").style.visibility='hidden';
	document.getElementById("reg-success").style.zIndex=0;
	document.getElementById("black-screen").style.visibility='hidden';
	document.getElementById("black-screen").style.zIndex=1;
	document.getElementById("login-error").style.visibility='hidden';
}
function saveCusInfo() {
	var cusEmail = document.getElementById("cus-email");
	var cusPassword = document.getElementById("cus-password");
	var cusName = document.getElementById("cus-name");	
	var cusTel = document.getElementById("cus-tel");
	
	var chkCusEmail = /^[a-zA-Z0-9]+[@][a-zA-Z]+[.][a-zA-Z]+([.][a-zA-Z]+)?$/;
	var chkCusPassword = /^[a-zA-Z0-9]{6,12}$/;
	var chkCusName = /^[a-zA-Z ]+$/;
	var chkCusTel = /^[0-9]{9,11}$/;
	
	var error = false;
	
	if(chkCusEmail.test(cusEmail.value) == false)	{
		document.getElementById("email-error").innerHTML = "Email không hợp lệ!";
		cusEmail.focus();
		error = true;
	}
	else	{
		document.getElementById("email-error").innerHTML = "";
	}
	if(chkCusPassword.test(cusPassword.value) == false)	{
		document.getElementById("password-error").innerHTML = "Mật khẩu không hợp lệ!";
		cusPassword.focus();
		error = true;
	}
	else	{
		document.getElementById("password-error").innerHTML = "";
	}
	if(chkCusName.test(cusName.value) == false)	{
		document.getElementById("name-error").innerHTML = "Họ tên không hợp lệ!";
		cusName.focus();
		error = true;
	}
	else	{
		document.getElementById("name-error").innerHTML = "";
	}
	if(chkCusTel.test(cusTel.value) == false)	{
		document.getElementById("tel-error").innerHTML = "Số điện thoại không hợp lệ!";
		cusTel.focus();
		error = true;
	}
	else	{
		document.getElementById("tel-error").innerHTML = "";
	}
	if(error == false)	{
		localStorage.setItem("cusEmail", cusEmail.value);
		localStorage.setItem("cusPassword", cusPassword.value);
		localStorage.setItem("cusName", cusName.value);
		localStorage.setItem("cusTel", cusTel.value);
		regSuccess();	
	}
}
function regSuccess()	{
	document.getElementById("page-all").style.opacity=0.5;
	document.getElementById("page-all").style.zIndex=100;
	document.getElementById("register-all").style.visibility='hidden';
	document.getElementById("register-all").style.zIndex=0;
	document.getElementById("login-all").style.visibility='hidden';
	document.getElementById("login-all").style.zIndex=0;
	document.getElementById("reg-success").style.visibility='visible';
	document.getElementById("reg-success").style.zIndex=300;
	document.getElementById("black-screen").style.visibility='visible';
	document.getElementById("black-screen").style.zIndex=200;
}
function login()	{
	if(document.getElementById("cus-email1").value == localStorage.getItem("cusEmail") && document.getElementById("cus-password1").value == localStorage.getItem("cusPassword"))	{
		var s = "<span>Chào, " +localStorage.getItem("cusName")+ "</span><br /><a style='font-size:14px; font-weight:normal; color:#000' onclick='loginLogout()'>(Đăng xuất)</a>";
		document.getElementById("login-logout").innerHTML = s;
		backToHome();
	}
	else	{
		document.getElementById("login-error").style.visibility='visible';
	}
}
function loginLogout()	{
	var s = "<a onclick='loginPage();'>Đăng nhập</a> | <a onclick='registerPage();'>Đăng ký</a>";
	document.getElementById("login-logout").innerHTML = s;
}
var quantity = 0;
function cartCreate()	{
	//Edit by Phong
	// sessionStorage.setItem("totalBook","0");
	var totalBook = sessionStorage.getItem("totalBook")
	if(totalBook == null){
		sessionStorage.setItem("totalBook",0);
	}
}
function getQuantity(id)	{
	quantity=document.getElementById(id).value;
}

//ham nay tim vi tri cua sp trong kho khi biet ma
function findBookPosition(id)	{
	var totalBook=sessionStorage.getItem("totalBook");
	for(var i=0; i<totalBook; i++)	{
		var product=sessionStorage.getItem("product"+i);
		if(product==null) continue;
		var arr=product.split("-");
		if(id==arr[0])
			return i;	
	}
	return -1;
}
function addBook1(bookId, bookName, bookImg, bookPrice)	{
	var quantity = 1;
	var pos=findBookPosition(bookId);
	//chua co ma sp nay trong kho
	if(pos==-1)	{
		//lay tong mat hang trong kho
		var n=parseInt(sessionStorage.getItem("totalBook"));
		//them sp moi vao kho
		sessionStorage.setItem("product"+n,bookId+"-"+bookName+"-"+bookImg+"-"+quantity+"-"+bookPrice);
		n++;
		sessionStorage.setItem("totalBook",n);
	}
	else
		sessionStorage.setItem("product"+pos,bookId+"-"+bookName+"-"+bookImg+"-"+quantity+"-"+bookPrice);
	
}
function addBook(bookId, bookName, bookImg, bookPrice)	{
	var pos=findBookPosition(bookId);
	//chua co ma sp nay trong kho
	if(pos==-1)	{
		//lay tong mat hang trong kho
		var n=parseInt(sessionStorage.getItem("totalBook"));
		//them sp moi vao kho
		sessionStorage.setItem("product"+n,bookId+"-"+bookName+"-"+bookImg+"-"+quantity+"-"+bookPrice);
		n++;
		sessionStorage.setItem("totalBook",n);
	}
	else
		sessionStorage.setItem("product"+pos,bookId+"-"+bookName+"-"+bookImg+"-"+quantity+"-"+bookPrice);
	
}
function cart()	{
	var allPrice = 0;
	var n = parseInt(sessionStorage.getItem("totalBook"));
	
	s="<table border='1px' cellpadding='5px' cellspacing='0'>";
	s+="<tr class='tr1'>";
	s+="<td></td>";
	s+="<td></td>";
	s+="<td>Giá mua</td>";
	s+="<td>Số lượng</td>";
	s+="<td>Thành tiền</td>";
	s+="<td></td>";
	s+="</tr>";
	
	for(var i=0; i<n; i++)	{
		var product = sessionStorage.getItem("product"+i);
		if(product == null) continue;
		var arr=product.split("-");
		s+="<tr>";
		s+="<td><img src='"+arr[2]+"'></td>";
		s+="<td>" +arr[1]+"</td>";
		s+="<td>" +arr[4]+"</td>";		
		s+="<td><input type='number' min='1' max='100' value=" +arr[3]+" onchange='changeQuantity(this, "+arr[0]+")'></td>";
		s+="<td>" +arr[3]*arr[4]+"</td>";		
		s+="<td><input type='button' value='XÓA' onclick='deleteBook("+arr[0]+")'></td>";
		s+="</tr>";
		allPrice += arr[3]*arr[4];
	}
	
	s+="<tr>";
	s+="<td></td>";
	s+="<td></td>";
	s+="<td></td>";
	s+="<td>Tổng tiền:</td>";
	s+="<td>"+allPrice+"</td>";
	s+="<td></td>";
	s+="</tr>";
	s+="</table>";
	//gan s vao the div
	var tag=document.getElementById("d");
	tag.innerHTML=s;

	//Phong's edit start
	if (n > 0) {
		// n is totalBook
		s = "<form action='PhongWorkSpace/OrderPage.html'>" +
			"<input type='submit' value='Thanh toán' id='OrderBtn' class='pure-button pure-button-primary'>" +
			"</form>"
		document.getElementById("OrderButtonContainer").innerHTML = s;
	}else{
		document.getElementById("OrderButtonContainer").innerHTML = "";
	}
	//Phong's edit end
}
function deleteBook(id)	{
	var pos = findBookPosition(id);
	if(pos!=-1)	{
		sessionStorage.removeItem("product"+pos);
		//Phong edit start
		var totalBook = sessionStorage.getItem("totalBook");
		totalBook -= 1;
		sessionStorage.setItem("totalBook",totalBook);
		//Phong edit end
		cart();
	}


}
function changeQuantity(obj, id)	{
	var newQuantity = obj.value;
	var pos = findBookPosition(id);
	if(pos!=-1)	{
		var product = sessionStorage.getItem("product"+pos);
		if(product!=null)	{
			var arr=product.split("-");
			arr[3]=newQuantity;
			sessionStorage.setItem("product"+pos, arr[0]+"-"+arr[1]+"-"+arr[2]+"-"+arr[3]+"-"+arr[4]);
			cart();
		}
	}
}
