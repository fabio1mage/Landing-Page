import dotenv from 'dotenv';
dotenv.config({ path: 'process.env' });

async function getAccessTokenFromRefreshToken(refresh_token, client_id, client_secret) {
    const tokenEndpoint = "https://oauth2.googleapis.com/token";
    const params = new URLSearchParams();
    params.append('refresh_token', refresh_token);
    params.append('client_id', client_id);
    params.append('client_secret', client_secret);
    params.append('grant_type', 'refresh_token');

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
    };

    const response = await fetch(tokenEndpoint, config);
    const data = await response.json();
    return data.access_token;
}

async function uploadFile() {
    const refreshToken = 'YOUR_REFRESH_TOKEN';
    const clientId = 'YOUR_CLIENT_ID';
    const clientSecret = 'YOUR_CLIENT_SECRET';
    const accessToken = await getAccessTokenFromRefreshToken(refreshToken, clientId, clientSecret);
}

function patch(accessToken, fileId, newContent) {
    const boundary = 'foo_bar_baz';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";

    const contentType = 'text/csv';

    const metadata = {
        'mimeType': contentType,
    };

    const multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + contentType + '\r\n\r\n' +
        newContent +
        close_delim;

    const request = {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': `multipart/related; boundary=${boundary}`
        },
        body: multipartRequestBody,
    };

    const uploadUrl = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`;

    return fetch(uploadUrl, request);
}

function post(accessToken, csv, folderId) {
    const boundary = 'foo_bar_baz';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";

    const contentType = 'text/csv';

    const metadata = {
        'name': `data.csv`,
        'mimeType': contentType,
        'parents': [folderId],
    };

    const multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + contentType + '\r\n\r\n' +
        csv +
        close_delim;

    const request = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': `multipart/related; boundary=${boundary}`
        },
        body: multipartRequestBody,
    };

    const uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';

    return fetch(uploadUrl, request);
}

function checkIfFileExists(accessToken, folderId, fileName) {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+name='${fileName}'&fields=files(id,name)`;

    const headers = new Headers({
        'Authorization': `Bearer ${accessToken}`
    });

    const config = {
        method: 'GET',
        headers: headers
    };

    return fetch(url, config);
}

function getFileContentById(accessToken, fileId) {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;

    const headers = new Headers({
        'Authorization': `Bearer ${accessToken}`
    });

    const config = {
        method: 'GET',
        headers: headers
    };

    return fetch(url, config);
}

async function sendToDrive(req, res) {
    const { email, name, age } = req.body;

    const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, FOLDER_ID } = process.env;
    const accessToken = await getAccessTokenFromRefreshToken(REFRESH_TOKEN, CLIENT_ID, CLIENT_SECRET);

    checkIfFileExists(accessToken, FOLDER_ID, "data.csv")
        .then((response) => response.json())
        .then(async (response) => {
            const file = response.files[0];

            if (response.files && response.files.length > 0) {
                getFileContentById(accessToken, file.id)
                    .then((response) => response.text())
                    .then((result) => {
                        if (!result.toLocaleLowerCase().includes(email.toLocaleLowerCase())) {
                            let csv = result + `\n${name},${email},${age}`;
                            patch(accessToken, file.id, csv)
                                .then((response) => response.json())
                                .then((result) => {
                                    res.status(200).send({
                                        "text": "Você será notificado em breve!"
                                    });
                                })
                                .catch((err) => {
                                    res.status(400).send({
                                        "text": "patch - Erro inesperado: " + err.message
                                    });
                                });
                        }
                        else {
                            res.status(400).send({
                                "text": "O e-mail informado já foi cadastrado!"
                            });
                        }
                    })
                    .catch((err) => {
                        res.status(400).send({
                            "text": "getFileContentById - Erro inesperado: " + err.message
                        });
                    })
            }
            else {
                post(accessToken, `${name},${email},${age}`, FOLDER_ID)
                    .then((response) => response.json())
                    .then((result) => {
                        res.status(200).send({
                            "text": "Você será notificado em breve!"
                        });
                    })
                    .catch((err) => {
                        res.status(400).send({
                            "text": "post - Erro inesperado: " + err.message
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(400).send({
                "text": "checkIfFileExists - Erro inesperado: " + err.message
            });
        });
}

export default sendToDrive;