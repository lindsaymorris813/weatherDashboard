const request = require("request");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");

function generateToken() {
    const oauth = OAuth({
        consumer: {
            key: "yOeIGjxq--cg-NlBomFemA",
            secret: "o5w3Ur1_xzl7j6EViXuplNzZyJohWiBvh-GADlBvBxJzikXzEgx1gfFXzjTS-uWsbwCpHQthp72WcDj6qHys4w",
        },
        signature_method: "HMAC-SHA256",
        hash_function(base_string, key) {
            return crypto 
                .createHmac("sha256", key)
                .update(base_string)
                .digest("base64");
        },
    });
    const request_data = {
        url: "https://account.api.here.com/oauth2/token",
        method: "POST",
        data: {grant_type: "client_credentials"},
    };
    request(
        {
            url: request_data.url,
            method: request_data.method,
            form: request_data.data,
            headers: oauth.toHeader(oauth.authorize(request_data)),
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                result = JSON.parse(response.body);
                console.log("Token", result);
            } else {
                console.log(2);
            }
        }
    );
}

generateToken();