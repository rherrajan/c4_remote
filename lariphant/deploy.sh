#gcloud config set project lariphantevade
mvn appengine:deploy -Dversion=0.1-SNAPSHOT # -Dapp.deploy.bucket=gs://lol
#echo "curl https://lariphantevade.appspot.com/c4/move/2/2"
#curl "https://lariphantevade.appspot.com/c4/move/2/2"
echo "\n"
#gcloud app logs read -s default
