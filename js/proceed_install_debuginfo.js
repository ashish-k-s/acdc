$('#proceed_install_debuginfo').click(function(){
document.getElementById("proceed_install_debuginfo").disabled="true";
document.getElementById("proceed_install_pkgs").disabled="true";

$("#progress_with_pkgs_install").css('display', 'block');
   $.ajax({
   url: 'php/install_debug.php',
   data: { Host_IP: Host_IP, Host_Passwd: Host_Passwd, sfdc_core: sfdc_core },
   success: function(data) { 
   Notify_Message("Installing debuginfo pacakges, please wait..");
//   alert("call setup.py again..");
   }
}).error(function(){
Notify_Message("Error while installing debuginfo pacakges");
$("#progress_with_pkgs_install").css('display', 'none');
}).success(function(){
Notify_Message("Installation of debuginfo pacakges finished successfully");
$("#progress_with_pkgs_install").css('display', 'none');
});

});

