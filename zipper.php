<?php 
$path = '/home/'
$filename='database_backup_'.date('Ga_m_d_y').'.sql';
$folder_name='Folder_backup_'.date('Ga_m_d_y').'.zip';

$result=exec("mysqldump wambuine_cargen --password='Devs2019c!?__' --user=root --single-transaction > /home/dev/".$filename,$output);
print_r($output);
if(!$output){
    /* no output is good */
    // Get real path for our folder
    $rootPath = realpath('/Users/denis/Documents/Coding/support');

    // Initialize archive object
    $zip = new ZipArchive();
    $zip->open($folder_name, ZipArchive::CREATE | ZipArchive::OVERWRITE);

    // Create recursive directory iterator
    /** @var SplFileInfo[] $files */
    $files = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($rootPath),
        RecursiveIteratorIterator::LEAVES_ONLY
    );

    foreach ($files as $name => $file)
    {
        // Skip directories (they would be added automatically)
        if (!$file->isDir())
        {
            // Get real and relative path for current file
            $filePath = $file->getRealPath();
            $relativePath = substr($filePath, strlen($rootPath) + 1);

            // Add current file to archive
            $zip->addFile($filePath, $relativePath);
        }
    }
    // Zip archive will be created only after closing object
    $zip->close();
}else {
/* we have something to log the output here*/
    print_r("not Working");
}


function setSession(key){
    $_SESSION["backup_key"] = key;
}



?>