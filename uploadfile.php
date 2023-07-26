<?php $ path = "files/"; $path = $path . basename( $_FILES['userfile']['name']);

if(move_uploaded_file($_FILES['userfile']['tmp_name'], $path)) { echo "Success uploading". basename($_FILES['userfile']['name']); } else{ echo "Error when uploading file."; } ?>