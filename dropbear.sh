#!/bin/bash
wget http://download.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
sudo rpm -ivh epel-release-6-8.noarch.rpm
sudo yum update && sudo yum install dropbear
sudo chkconfig dropbear on
clear
sudo service dropbear start
echo "www.pakteguh.com"
