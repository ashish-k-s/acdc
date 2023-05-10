$('#proceed').click(function()
{
   var rhel = document.getElementById("rhel").innerHTML;
   //  var arch = document.getElementById("arch").innerHTML
   var core_file_selected = document.getElementById("core_file_selected").innerHTML;
   var rpms_file_selected = document.getElementById("rpms_file_selected").innerHTML;

   if(rhel.indexOf("prob") > -1) { Notify_Message("Submit system details"); }
   //  Notify_Message(arch);
   else if(core_file_selected.indexOf("none") > -1) { Notify_Message("Select the core file"); } 
   else if(rpms_file_selected.indexOf("none") > -1) { Notify_Message("Select the rpms file"); }
   else
   {
      //   Notify_Message("Thanks for providing all the details!"); 
      document.getElementById("proceed").disabled=true;
      AllDivsStatusChange("Form1_div","Disable");
      AllDivsStatusChange("Form2_div","Disable");
      $("#progress_with_proceed").css('display', 'block');
      
      $.ajax({
      url: 'php/proceed_1_match_details.php',
      //   data: 'core_file_selected='+core_file_selected,
      data: { core_file_selected: core_file_selected, rpms_file_selected: rpms_file_selected },
      success: function(data) { 
      //   $("#core_file_bin").html(data[1]);
      var none = "none";
      var data_array = data.split('|');
      if ((data_array.length == 5)&&(data_array[0] == 0))
      {
         //     Notify_Message(data);
	 document.getElementById("core_file_bin").innerHTML = data_array[1];

	 //core file displays 64-bit arch as x86-64 instead of x86_64
	 
	 if((data_array[2].indexOf("x86") > -1)&&(data_array[2].indexOf("64") > -1)) 
	 {
	    document.getElementById("core_file_arch").innerHTML = "x86_64";
	 }
	 else 
	 document.getElementById("core_file_arch").innerHTML = data_array[2];

	 document.getElementById("rpms_file_ver").innerHTML = data_array[3];
	 document.getElementById("rpms_file_arch").innerHTML = data_array[4];
	 $("#progress_with_proceed").css('display', 'none');
	 //     check_status_selected_details();
      }
     else
     {
        document.getElementById("core_file_bin").innerHTML = none;
	document.getElementById("core_file_arch").innerHTML = none;
	if(data_array[0] == 1) 
	{ 
	   Notify_Message("please select valid core file");
	   document.getElementById("proceed").disabled=false;
	   AllDivsStatusChange("Form1_div","Enable");
	   AllDivsStatusChange("Form2_div","Enable");
	   $("#progress_with_proceed").css('display', 'none');
	}
	if(data_array[0] == 2) 
	{
	   Notify_Message("please select valid installed-rpms file");
	   document.getElementById("proceed").disabled=false;
	   AllDivsStatusChange("Form1_div","Enable");
	   AllDivsStatusChange("Form2_div","Enable");
	   $("#progress_with_proceed").css('display', 'none');
	}
        $("#progress_with_proceed").css('display', 'none');
	document.getElementById("proceed_pkgs_install").style.visibility="hidden";
	document.Form2.proceed_anyway.disabled = true;
     }

}
}).error(function(){
Notify_Message("error");
document.getElementById("proceed").disabled=false;
AllDivsStatusChange("Form1_div","Enable");
AllDivsStatusChange("Form2_div","Enable");
$("#progress_with_proceed").css('display', 'none');
}).success(function(){

//Notify_Message("success");
check_status_selected_details();
call_gen_pkg_list();
});
 
  }

});


$("#progress_with_proceed").css('display', 'none');



  function check_status_selected_details ()
  {
  var core_file_arch = document.getElementById("core_file_arch").innerHTML;
  var rpms_file_arch = document.getElementById("rpms_file_arch").innerHTML;
  var rpms_file_ver = document.getElementById("rpms_file_ver").innerHTML;
  var test_system_ver = document.getElementById("rhel").innerHTML;
  var test_system_arch = document.getElementById("arch").innerHTML;
   $("#progress_with_proceed").css('display', 'block');
  document.getElementById("table_selected_files").style.visibility="visible";
  if(rpms_file_ver !== test_system_ver)
	{
	Notify_Message("RHEL version mismatch! please review selected data");
	document.Form2.proceed_anyway.disabled = true;
	document.getElementById("proceed_pkgs_install").style.visibility="hidden";
	document.getElementById("proceed").disabled=false;
	AllDivsStatusChange("Form1_div","Enable");
	AllDivsStatusChange("Form2_div","Enable");
	$("#progress_with_proceed").css('display', 'none');
	return;
	}

  if(rpms_file_arch !== test_system_arch)
	{
	Notify_Message("RHEL architecture mismatch! please review selected data");
	document.Form2.proceed_anyway.disabled = true;
	document.getElementById("proceed_pkgs_install").style.visibility="hidden";
	document.getElementById("proceed").disabled=false;
	AllDivsStatusChange("Form1_div","Enable");
	AllDivsStatusChange("Form2_div","Enable");
	$("#progress_with_proceed").css('display', 'none');
	return;
	}

  if(rpms_file_arch !== core_file_arch)
	{
	Notify_Message("Architecture  mismatch! please review selected data");
	document.Form2.proceed_anyway.disabled = true;
	document.getElementById("proceed_pkgs_install").style.visibility="hidden";
	document.getElementById("proceed").disabled=false;
	AllDivsStatusChange("Form1_div","Enable");
	AllDivsStatusChange("Form2_div","Enable");
	$("#progress_with_proceed").css('display', 'none');
	return;
	}

/*
// There could be 32 bit application core from 64 bit system
// Should be allowed to proceed in that case
//
  if((rpms_file_arch !== core_file_arch)&&(rpms_file_arch == "x86_64"))
	{
	Notify_Message("Core file architecture mismatch! Make sure selected data is appropriate");
	document.getElementById("proceed_pkgs_install").style.visibility="visible";
	document.Form2.proceed_pkgs_install.disabled = true;
	document.Form2.proceed_anyway.disabled = false;
	return;
	}
*/
}

function call_gen_pkg_list()
{

   $("#progress_with_proceed").css('display', 'block');
   Host_IP=document.getElementById("Host_IP").value;
   Host_Passwd=document.getElementById("Host_Passwd").value;
   core_file_selected=document.getElementById("core_file_selected").innerHTML;
   core_file_name=document.getElementById("core_file_name").innerHTML;
   core_file_bin=document.getElementById("core_file_bin").innerHTML;
   rpms_file_selected=document.getElementById("rpms_file_selected").innerHTML;
   rpms_file_name=document.getElementById("rpms_file_name").innerHTML;
   sfdc_core=document.getElementById("sfdc_core").value;

   var core_file_arch = document.getElementById("core_file_arch").innerHTML;
   var rpms_file_arch = document.getElementById("rpms_file_arch").innerHTML;
   var rpms_file_ver = document.getElementById("rpms_file_ver").innerHTML;
   var test_system_ver = document.getElementById("rhel").innerHTML;
   var test_system_arch = document.getElementById("arch").innerHTML;
   //http://127.0.0.1/php/proceed_2_gen_pkg_list.php?Host_IP=10.65.211.115&Host_Passwd=redhat&core_file_selected=core.22620&core_file_bin=xterm&core_file_arch=x86_64&rpms_file_selected=installed-rpms.el6&rpms_file_name=installed-rpms.el6&sfdc_core=123

   Notify_Message("Generating packages status list.."); 
   url = "php/proceed_2_gen_pkg_list.php?Host_IP=" + Host_IP + "&Host_Passwd=" + Host_Passwd + "&core_file_selected=" + core_file_selected + "&core_file_name=" + core_file_name + "&core_file_bin=" + core_file_bin + "&core_file_arch=" + core_file_arch + "&rpms_file_selected=" + rpms_file_selected + "&rpms_file_name=" + rpms_file_name + "&sfdc_core=" + sfdc_core;
   //alert(url);

   //Notify_Message(url);
   //  $("#dep_list_cust").load(url,function(){
   $("#proceed_message").load(url,function(){
   Notify_Message("Done with generation of dependency list, displaying packages status now.."); 
   $("#progress_with_proceed").css('display', 'none');
   $(function() {
   //Notify_Message("ready");
   display_pkgs_list();
   });
   //enable this after testing //  
   document.getElementById("proceed").disabled=true;
   AllDivsStatusChange("Form1_div","Disable");
   AllDivsStatusChange("Form2_div","Disable");
   document.getElementById("proceed_install_pkgs").style.visibility="visible";
   });
   //return;
}

function display_pkgs_list()
{
   // Notify_Message("Displaying file contents..");
   document.getElementById("table_pkgs_status").style.visibility="visible";
   ////  show_table_pkgs_status();
   ////  $("#dep_list_cust").load(url,function(){
   $("#progress_with_proceed").css('display', 'block');
   
   url1 = "php/proceed_3_cat_pkgs_list.php?Host_IP=" + Host_IP + "&Host_Passwd=" + Host_Passwd + "&sfdc_core=" + sfdc_core + "&name_to_cat=dependency-req.txt";
   //Notify_Message(url1);
   $("#dep_list_cust").load(url1,function(){
   Notify_Message("Loaded dependency list from customer's system..");
   //$("#progress_with_proceed").css('display', 'none');
   });

   url2 = "php/proceed_3_cat_pkgs_list.php?Host_IP=" + Host_IP + "&Host_Passwd=" + Host_Passwd + "&sfdc_core=" + sfdc_core + "&name_to_cat=dependency-installed.txt";
   //Notify_Message(url2);
   $("#dep_list_testsys").load(url2,function(){
   Notify_Message("Loaded dependency list from test system..");
   //$("#progress_with_proceed").css('display', 'none');
   });

   url3 = "php/proceed_3_cat_pkgs_list.php?Host_IP=" + Host_IP + "&Host_Passwd=" + Host_Passwd + "&sfdc_core=" + sfdc_core + "&name_to_cat=dependency-mismatch.txt";
   //Notify_Message(url2);
   $("#dep_list_to_install").load(url3,function(){
   Notify_Message("Loaded list of packages to be installed..");
   var pkgs_to_be_installed=document.getElementById("dep_list_to_install").innerHTML;
   if(pkgs_to_be_installed == 0) 
   { 
      Notify_Message("All packages looks matching! Proceed further.."); 
      document.getElementById("proceed_install_debuginfo").style.visibility="visible";
      document.getElementById("proceed_install_pkgs").disabled="true";
   }

//$("#progress_with_proceed").css('display', 'none');
});

$("#progress_with_proceed").css('display', 'none');
//return;
}

function AllDivsStatusChange(DivName,Stat)
{
   if(Stat=="Disable")
   {
      var allChildNodes = document.getElementById(DivName).getElementsByTagName('*');
      for(var i = 0; i < allChildNodes.length; i++)
      {
         allChildNodes[i].disabled = true;
      }
   }

   if(Stat=="Enable")
   {
      var allChildNodes = document.getElementById(DivName).getElementsByTagName('*');
      for(var i = 0; i < allChildNodes.length; i++)
      {
         allChildNodes[i].disabled = false;
      }
   }
   return;
}

