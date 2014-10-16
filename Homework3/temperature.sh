#!/bin/bash

test=$(i2cget -y 1 0x48 0)
test=$(($test))
#test=$((32+$test *9/5))

temp2=$(i2cget -y 1 0x4a 0)
temp2=$(($temp2))
#temp2=$((32+$temp2 *9/5))

templow_1=$(i2cset -y 1 0x48 2 0x14)
temphigh_1=$(i2cset -y 1 0x48 3 0x1a)

templow_1=$(i2cget -y 1 0x48 2)
templow_1=$(($templow_1))
temphigh_1=$(i2cget -y 1 0x48 3)
temphigh_1=$(($temphigh_1))

templow_2=$(i2cset -y 1 0x4a 2 0x14)
temphigh_2=$(i2cset -y 1 0x4a 3 0x1a)

templow_2=$(i2cget -y 1 0x4a 2)
templow_2=$(($templow_2))
temphigh_2=$(i2cget -y 1 0x4a 3)
temphigh_2=$(($temphigh_2))

echo "TempLow_1:" $templow_1
echo "TempHigh_1:" $temphigh_1
echo "TempLow_2:" $templow_2
echo "TempHigh_2:" $temphigh_2
echo "Temperature1: " $test
echo "Temperature2: " $temp2
