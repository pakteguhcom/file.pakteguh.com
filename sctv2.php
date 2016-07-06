<meta name="robots" content="noindex" />
<body topmargin=0 bottommargin=0 leftmargin=0 rightmargin=0>
 
<div id="livestreaming"></div>
<script type="text/javascript" src="http://cdn-media.viva.id/appaux/portal/js/v2014/jquery-1.11.1.min.js"></script>
<script src="http://player-cdn.mivo.tv/partner/jwplayer.js"></script>
<script type="text/javascript" src="http://cdn-media.viva.id/appaux/js/rijndael.js"></script>
<script type="text/javascript" src="http://cdn-media.viva.id/appaux/js/mcrypt.js"></script>
<script type="text/javascript">var wmsAuth = "8+hKAhT+fMc6tADNf+Hr37ntpogcq4vrst8FkZoBoZ62ChEGCK0FgSz9iFei6e/Uc9NIbhEQFFmtR6nPWESEPGPciG0FCWbdvDZ/gRBSYzBJQo8OcGx9Ug/EIdPMWJuW6lcSZUWi+3/whoEkd2T881J7gUdtpJZPl5xDzDEGqv8WX2iRB9M54qFpLO72SDD9oa+0odJuSbTuSAEs0iOgUgUK8UeTn+Ibwxm+6C67FVSmGSe4omIu+qLo2AHBLR/0YSmLTuLG8RziJtRLQuEqq9QF8pnWmgePbDGdTltBdqI=";
var decrypted = mcrypt.Decrypt(atob(wmsAuth), '02f30dffbb0d084755f438f7d8be4a7d', 'd4b494e4502a62edd695a903a94c2701', 'rijndael-256', 'cbc');
jwplayer("livestreaming").setup({
				file: "http://edge.nim.mivo.tv/tvone8fn11ezn3ra7/sctv2_all/playlist.m3u8"+decrypted,
				autostart: true,
				width: '100%',
				height: '100%',
				androidhls: true,
				stretching: "exactfit"
			});
			$(function(){
				$(".flip").click(function() {
					$(".panel").slideToggle("fast");
				}
				);
				$(".cencel").click(function() {
					$(".panel").slideToggle("fast");
				}
				);

				var clipboard = new Clipboard(".btn");

			    clipboard.on("success", function(e) {
			        console.log(e);
			    });

			    clipboard.on("error", function(e) {
			        console.log(e);
			    });
			});
</script>
</BODY>
