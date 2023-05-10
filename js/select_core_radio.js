$("input:radio[name=output_core]").click(function() {
    var fs_path = $(this).val();
      if(fs_path.charAt(fs_path.length - 1)!=="/")
	{
	Notify_Message("core file selected");
        document.getElementById("core_file_selected").innerHTML = fs_path;
        document.getElementById("core_file_name").innerHTML = fs_path.split("/").pop();
	exit();
	}
  $("#progress_with_core").css('display', 'block');;

  $.ajax({
  url: 'filebrowser_core.php',
  data: 'fs_path='+fs_path,
  success: function(data) { 
  $("#fs_list_core").html(data);
  $("#progress_with_core").css('display', 'none');
  }
});
});

