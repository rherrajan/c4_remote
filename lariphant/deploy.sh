gcloud config set project lariphantevade
mvn appengine:deploy
gcloud app logs read -s default
