#!/bin/bash
while (sleep 1800 && php /home/dev/support/mail-capture/cron_notify_overdue.php) &
do
  wait $!
done






