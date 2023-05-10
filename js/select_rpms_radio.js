$("input:radio[name=output_rpms]").click(function() {
    var fs_path = $(this).val();
      if(fs_path.charAt(fs_path.length - 1)!=="/")
	{
	Notify_Message("rpms file selected");
        document.getElementById("rpms_file_selected").innerHTML = fs_path;
        document.getElementById("rpms_file_name").innerHTML = fs_path.split("/").pop();

	exit();
	}
  $("#progress_with_rpms").css('display', 'block');;

  $.ajax({
  url: 'filebrowser_rpms.php',
  data: 'fs_path='+fs_path,
  success: function(data) { 
  $("#fs_list_rpms").html(data);
  $("#progress_with_rpms").css('display', 'none');
  }
});
});

