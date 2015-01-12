var chatNeedRefresh = true;

if (window != top)  {
	top.location.href = "http://jogjastreamers.com";
}

$(document).ready(function() {

	$('#opini').corner();
	// $('#chatMenu').corner();
	loadRadioList('');
	loadRank();
	
	var id = $("#id_radio").text();
	$("#id_radio").empty();
	if (id<1) { id = 0; }
	var stereo = $("#stereo_radio").text();
	$("#stereo_radio").empty();
	
	var flashvars = {};
	flashvars.id = id;
	flashvars.stereo = stereo;
	var params = {};
	params.menu = "false";
	params.quality = "best";
	params.scale = "noscale";
	params.wmode = "transparent";
	params.allowfullscreen = "false";
	params.allowscriptaccess = "always";
	var attributes = {};
	attributes.id = "radioSWF";
	attributes.name = "radioSWF";
	attributes.align = "middle";
	swfobject.embedSWF("radio.swf", "altText", "212", "160", "10.0.12", false, flashvars, params, attributes);
	changeRadioContainer(id);
	if (id>0) {
		// loadChat(id);
	}
	
	var tmp100 = getWidth().split("----");
	var nbaru = tmp100[1] /2 ;
	//$(name).css("top",nbaru+"px")
	
	var menuYloc = null;
	menuYloc = parseInt($("#floatMenu").css("top").substring(0,$("#floatMenu").css("top").indexOf("px")));
	$("#floatMenu").center({
		vertical:false
	});
	$(window).scroll(function () { 
		offset = menuYloc+$(document).scrollTop() +"px";
		//alert(offset);
		$("#floatMenu").animate({top:offset},{duration:500,queue:false});
		
	});
	
	//$("#floatMenu").center({vertical: false});
	
	$("#bar").bind("click", function(){
		$("#floatMenu").css("display","none");
	});
	
	$("#close2").bind("click", function(){
		$("#footer").css("display","none");
	});
	
	setTimeout(function(){
        $("#floatMenu").css("display","none");
    },10000);
	
	// request form
	$("#requestMenu").center({
		vertical:false
	});
	$("#requestMenu>.header>.close").bind("click", function(){
		$("#requestMenu").css("display","none");
	});
	
	/* // submit chat request
	$("#ajaxChatForm").submit(function() {
		// loadvis();
		var inputs = new Array();
		$(":input", this).each(function(){
			inputs.push(this.name + "=" + escape(this.value));
		});
		$.ajax({
			url: this.action,
			type: "POST",
			data:inputs.join("&"),
			error: function() {
				// loadhid();
				alert("Error. Please try again later.");
			},
			success: function(message) {
				var arrMessage = message.split("|");
				if (arrMessage[0]=="1") {
					$("#ajaxChatForm>input[name=pesan]").attr("value","");
					$("#ajaxChatForm>input[name=lid]").attr("value",arrMessage[1]);
					$("#chatMenu>#chatIsi").append(arrMessage[2]);
					$("#chatMenu>#chatIsi").scrollTop($("#chatMenu>#chatIsi")[0].scrollHeight);
				} else if(arrMessage[0]=="-1") {
					alert(arrMessage[1]);
				} else {
					alert("Anda hanya dapat mengirimkan satu pesan dalam 5 menit.");
				}
			}
		});
		return false;
	}); */
	
});

function getFlashMovie(name) {
	var isIE = navigator.appName.indexOf("Microsoft") != -1;
	return (isIE) ? window[name] : document[name];
 }

function setWindowStatus(msg) {
	window.status = msg;
}

function changeRadioContainer(id) {
	if (id==24) {
		$("#xswf").css("height","160px");
		$('#request').show();
	}
	else {
		$("#xswf").css("height","130px");
		$('#request').hide();
	}
}

function changeRadio(id,stereo) {
	nilai = $("#halDtailRdio").text();
	if (nilai=="1") {
		loadRadioDetail(id);
	}
	// loadChat(id);
	changeRadioContainer(id);
	getFlashMovie("radioSWF").setRadio(id,stereo);
	//document.getElementById("radioSWF").setRadio(id);
	return false;
}

function loadBlankPage(){
	$.ajax({
	  url: "blank.php",
	  cache: false,
	  success: function(html){ }
	});
}

function loadBeritaDetail(id){
	scrollradio();
	loadvis();

	$.ajax({
	  url: "detailberita2.php?idku="+id,
	  cache: false,
	  success: function(html){
		loadhid();
		$("#hal").html(html);
	  }
	});
}

function loadWelcome(id){
	scrollradio();
	//hideBox();
	loadvis();

	$.ajax({
	  url: "welcome2.php?idku="+id,
	  cache: false,
	  success: function(html){
		loadhid();
		$("#hal").html(html);
	  }
	});
}

function loadContact() {
	scrollradio();
	loadvis();

	$.ajax({
	  url: "contact.php",
	  cache: false,
	  success: function(html){
		loadhid();
		$("#hal").html(html);
	  }
	});
}

function loadJoin() {
	scrollradio();
	loadvis();

	$.ajax({
	  url: "join_us.php",
	  cache: false,
	  success: function(html){
		loadhid();
		$("#hal").html(html);
	  }
	});
}

function loadAbout(){
	scrollradio();
	loadvis();

	$.ajax({
	  url: "about.php",
	  cache: false,
	  success: function(html){
		loadhid();
		$("#hal").html(html);
	  }
	});
}

function loadRadioDetail(id){
	scrollradio();
	
	loadvis();

	$.ajax({
	  url: "detailradio.php?id="+id,
	  cache: false,
	  success: function(html){
		loadhid();
		
		$("#hal").html(html);
	  }
	});
}

function loadTestimoni(page,kirim){
	scrollradio();
	loadvis();

	var temp="";
	if(page !='') {
		temp += temp + '?PageNo=' + page;
	}
	
	$.ajax({
	  url: "testimoni.php"+temp,
	  cache: false,
	  success: function(html){
		loadhid();
		$("#hal").html(html);
	  }
	});
}

function loadRadioList(id,kota) {
	
	$("#radiobox").hide("fast", function () {
        $.ajax({
		  url: "radiolist.php?id="+id,
		  cache: false,
		  success: function(html){
			$("#kt").text(kota);
			$("#radioboxall").html(html);
			$("#radioboxscroll").html(html);
			$("#radiobox").show("fast");
			
		  }
		});
    });
	
}

function loadBerita(page,kirim){
	scrollradio();
	loadvis();

	var temp="";
	if(page !='') {
		temp += temp + '?PageNo=' + page;
	}
	
	$.ajax({
	  url: "index_berita.php"+temp,
	  cache: false,
	  success: function(html){
		loadhid();
		$("#hal").html(html);
	  }
	});
}

function loadPage(jenis,page,kirim) {
	if(jenis == 'testimoni') {
		loadTestimoni(page,kirim);
	}else if(jenis == 'berita') {
		loadBerita(page,kirim);
	}
}

function loadHome(speed) {
	
	$("#hal").css("display","none");
	showBox(speed);
	
}

function stat(id) {
	
	$.ajax({
	  url: "stat.php",
	  type:'POST',
	  data:'id='+id,
	  success: function(html){
		
	  }
	});
	
}



function loadTerms(){
	scrollradio();
	loadvis();
	
	$.ajax({
	  url: "terms.php",
	  cache: false,
	  success: function(html){
		loadhid();
		$("#hal").html(html);
	  }
	});
}

var t = null;
/* function ajaxChatRefresh() {
	clearTimeout(t);
	var id = $("#ajaxChatForm>input[name=id]").val();
	$.ajax({
		url: "chat.php",
		type: "POST",
		data: "aksi=view&id="+id+"&lid="+$("#ajaxChatForm>input[name=lid]").attr("value"),
		error: function() {
			alert("Error. Please try again later.");
		},
		success: function(message) {
			var arrMessage = message.split("|");
			if (arrMessage[0]=="1") {
				$("#ajaxChatForm>input[name=dari]").attr("readonly",null);
				$("#ajaxChatForm>input[name=pesan]").attr("readonly",null);
				$("#ajaxChatForm>input[name=button]").attr("disabled",null);
				$("#chatMenu").show();
				t=setTimeout("ajaxChatRefresh()",60000);
			} else {
				$("#ajaxChatForm>input[name=dari]").attr("readonly","readonly");
				$("#ajaxChatForm>input[name=pesan]").attr("readonly","readonly");
				$("#ajaxChatForm>input[name=button]").attr("disabled","disabled");
				$("#chatMenu").hide();
			}
			$("#ajaxChatForm>input[name=lid]").attr("value",arrMessage[1]);
			if (arrMessage[1]!="0") {
				$("#chatMenu>#chatIsi").append(arrMessage[2]);
				$("#chatMenu>#chatIsi").scrollTop($("#chatMenu>#chatIsi")[0].scrollHeight);
			} else {
				$("#chatMenu>#chatIsi").html(arrMessage[2]);
			}
		}
	});
	return false;
} */

/* function loadChat(id){
	$.ajax({
		url: "chat.php",
		type: "GET",
		data: "cs=1&id="+id,
		success: function(message) {
			$("#chatDJ").text(message);
		}
	});	
	// $("#chatMenu").show();
	$("#ajaxChatForm>input[name=id]").attr("value",id);
	/*
	$("#chatMenu>#chatIsi").html("<b style='color:#FF0000;'>DJ</b> is offline.");
	if (chatNeedRefresh) { ajaxChatRefresh(); }
	chatNeedRefresh = false;
	*-/
	ajaxChatRefresh();
} */

function loadAdv(){
	scrollradio();
	loadvis();

	
	$.ajax({
	  url: "adv.php",
	  cache: false,
	  success: function(html){
		loadhid();
		$("#hal").html(html);
	  }
	});
}

function loadRequest(){
	$("#requestMenu").css("display","block");
	$("#requestMenu>.loading").css("display","block");
	$("#requestMenu>.isi").empty();
	$.ajax({
	  url: "request.php",
	  cache: false,
	  type: "POST",
	  data: "step=1",
	  success: function(html){
		$("#requestMenu>.loading").css("display","none");
		$("#requestMenu>.isi").html(html);
	  }
	});
	return false;
}

function loadvis() {
	$("#loading").css("display","block");
	$("#hal").css("display","none");
}

function loadhid() {
	$("#loading").css("display","none");
	$("#hal").css("display","block");
}

function scrollradio() {
	
	$("#radiobox").animate({ 
		height:'140px'
	}, 800 ,'',function(){
		$("#radioboxall").hide();
		$("#radioboxscroll").show();
	});
	
	
}

function hideBox() {
	$("#radiobox").hide("fast");
}

function showBox(speed) {
	$("#radiobox").show("fast");
	$("#radiobox").css("height","auto");
	$("#radioboxscroll").hide();
	$("#radioboxall").show("fast");
}

/*-------------------------- get Height width browser ----------------------------------------*/

function getWidth() {
	 var viewportwidth;
	 var viewportheight;
	 
	 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	 
	 if (typeof window.innerWidth != 'undefined')
	 {
	      viewportwidth = window.innerWidth,
	      viewportheight = window.innerHeight
	 }
	 
// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)

	 else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)
	 {
	       viewportwidth = document.documentElement.clientWidth,
	       viewportheight = document.documentElement.clientHeight
	 }
	 
	 // older versions of IE
	 
	 else
	 {
	       viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
	       viewportheight = document.getElementsByTagName('body')[0].clientHeight
	 }
	//document.write('<p>Your viewport width is '+viewportwidth+'x'+viewportheight+'</p>');
	
	var panj = Math.ceil(viewportwidth / 2);
	var ting = Math.ceil(viewportheight / 2);
	
	return panj+"----"+ting;

}

function ajaxRankRefresh() {
				clearTimeout(t);
				$.ajax({
						type: "post",
						url: "top_rank.php",
						data: "toprank=1",
						dataType: "json",
						success: function(result) {
							if (result.sukses == "1") {
								$('#top_rank').html('');
								var a = 0;
								var ui= "<ol class=\"ranking\">"
								for(a=0;a < result.data.length; a++)
									{			
									ui +='<li>'+result.data[a].nama+'</li>';
									}		
									ui +='</ol>';
									$('#top_rank').append(ui);
									t=setTimeout("ajaxRankRefresh()",1200000);														
								
							} else if (result.sukses == "0") {
								alert(result.alasan);
							}
						},
						error: function(result) {
							alert("ada error");
						}
					});			
	}

function loadRank(){
	if (chatNeedRefresh) { ajaxRankRefresh(); }
	chatNeedRefresh = false;
	ajaxRankRefresh();
} 
