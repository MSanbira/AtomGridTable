#!/bin/bash

getUserConfirmation() {
  echo
  echo -e "\033[1;33m       WARNING: This script will remove all existing .tgz files in the AGT directory\033[0m"
  echo
  echo -e "\033[1;33m       This script should be run from the root of AGT, and it assumes that\033[0m"
  echo -e "\033[1;33m       AGT is in  the same directory as AGT-docs\033[0m"
  echo

  read -p "Are you sure you want to proceed? (y/n) " -n 1 -r
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 1
  fi
}

removeExistingTgzFiles() {
  echo
  echo -e "\033[33mRemoving existing .tgz files from AGT directory...\033[0m"
  rm -f *.tgz
}

buildPackage() {
  echo -e "\033[33mBuilding package, creating .tgz and logging results to pack.log...\033[0m"
  npm version --prerelease && npm run build && npm pack > pack.log

  if [ $? -eq 0 ]; then
    echo -e "\033[33mpackage-local\033[37m\033[0m Package built and packed successfully!"
  else
    echo "\033[33mpackage-local\033[37m\033[0m 'npm run build' script failed, exiting."
    exit 1
  fi
}

getPackageName() {
  echo -e "\033[33mGetting package name from pack.log...\033[0m"
  filename=$(cat pack.log)
  echo -e "\033[37mPackage name found, using: \033[33m$filename\033[37m\033[0m"
}

installPackageInCoolsetReactApp() {
  echo -e "\033[37mAttempting to install \033[33m@sanbira/atom-grid-table\033[37m in \033[32m../AGT-docs\033[37m\033[0m"
  cd ../AtomGridTableDocs || exit
  npm add file:../AtomGridTable/$filename || exit

}

cleanup() {
  cd ../AtomGridTable || exit
  rm pack.log
}

getUserConfirmation
removeExistingTgzFiles
buildPackage
getPackageName
installPackageInCoolsetReactApp
cleanup
