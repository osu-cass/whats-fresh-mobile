#!/bin/bash
RES_FOLDERS="res/*"
ANDROID_RES="platforms/android"
echo "hook: res copy from $RES_FOLDERS"
for d in $RES_FOLDERS ; do
    echo "overwriting $d"
    rm -rf "$ANDROID_RES/$d/"
    cp -R $d "$ANDROID_RES/$d/"
done
