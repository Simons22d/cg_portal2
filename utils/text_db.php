<?php 
$filename=mt_rand().date('Ga_m_d_y').'.sql';

$result=exec("mysqldump wambuine_cargen --password='' --user=root --single-transaction >".$filename,$output);