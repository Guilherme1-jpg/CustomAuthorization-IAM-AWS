HOST=http://0.0.0.0:3000

TOKEN=$(curl -X POST \
    --silent \
    -H 'Content-type: application/json' \
    --data '{"username": "Admin", "password": "1234"}' \
    $HOST/dev/login \ 
    | jq '.token' \
    | sed 's/"//g' \ 
    | tee token.log
)

echo "Token: $TOKEN"
echo 

curl --silent $HOST/dev/public | xargs echo "Public API: $1"

curl --silent $HOST/dev/private | xargs echo "Public API: $2"