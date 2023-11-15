import createError from 'http-errors';

import CONFIG from '../config';

export async function syncPrivateShardAccount({
    accountId,
    publicKey,
    signature,
    shardInfo,
    encodedSig,
}) {
    const postData = {
        accountId,
        //publicKey,
        //signature,
        shardId: shardInfo.shardId,
    };
    console.log(postData);
    const response = await fetch(`${CONFIG.CALIMERO_URL}/api/public/sync`, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            'x-signature': encodedSig,
        },
    });
    console.log(response);
    if (!response.ok) {
        const body = await response.text();
        let parsedBody;

        try {
            parsedBody = JSON.parse(body);
        } catch (e) {
            throw createError(response.status, body);
        }

        throw createError(response.status, parsedBody);
    }
    return await response.json();
}
