<?php
    require_once("./partials/header.php");
?>
<!DOCTYPE html>
<html>
        <head>
                <meta charset="utf-8">
                <title>CKEditor</title>
               
        </head>
        <body>
                <textarea name="content" id="editor">This is some sample content.</textarea>
                <script>
                        let newEditor;
                        ClassicEditor
                                .create( document.querySelector( '#editor' ) )
                                .then( newEditor => {
                                        editor = newEditor
                                } )
                                .catch( error => {
                                        console.error( error );
                                } );
                </script>
        </body>
</html>