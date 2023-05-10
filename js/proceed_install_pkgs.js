$('#proceed_install_pkgs').click(function(){

Host_IP=document.getElementById("Host_IP").value;
Host_Passwd=document.getElementById("Host_Passwd").value;
sfdc_core=document.getElementById("sfdc_core").value;

document.getElementById("proceed_install_pkgs").disabled="true";
$("#progress_with_pkgs_install").css('display', 'block');
   $.ajax({
   url: 'php/install_pkgs.php',
   data: { Host_Passwd: Host_Passwd, Host_IP: Host_IP, sfdc_core: sfdc_core },
   success: function(data) { 
   Notify_Message("reloading status of packages from test system..");
//   alert("call setup.py again..");
   call_gen_pkg_list();
   }
}).error(function(){
Notify_Message("error");
$("#progress_with_pkgs_install").css('display', 'none');
}).success(function(){
Notify_Message("success");
document.getElementById("proceed_install_debuginfo").style.visibility="visible";
$("#progress_with_pkgs_install").css('display', 'none');
});
});


