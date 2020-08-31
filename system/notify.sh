#!/bin/bash
while (sleep 10 && php /home/dev/support/mail-capture/cron_notify.php) &
do
  wait $!
done
