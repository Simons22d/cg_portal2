#!/bin/bash
while (sleep 21600 && sudo php /home/dev/support/backup_deamon.php) &
do
  wait $!
done

