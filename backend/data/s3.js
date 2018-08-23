const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

let s3 = new AWS.S3();

const putBucketTagging = (Bucket, tags) => new Promise((resolve, reject) => {

    let TagSet = Object.keys(tags).map(tagKey => ({ Key: tagKey, Value: tags[tagKey]}));

    // TagSet = [
    //     {
    //         Key: "Key1",
    //         Value: "Value1"
    //     },
    //     {
    //         Key: "Key2",
    //         Value: "Value2"
    //     }
    // ]
    let params = {
        Bucket, Tagging: {  TagSet }
    }

    return s3.putBucketTagging(
        params,
        (err, data) =>  {
            if (err)
                reject(err)
            else
                console.log('data;', data)
        }
    );


});

const getBucketTagging = (Bucket) => new Promise((resolve, reject) => {

    return s3.getBucketTagging(
        { Bucket },

        (err, data) => {
            if(err){
                if(err.message.includes("The TagSet does not exist"))
                    resolve([{"Key":"Release","Value":"unknown"}])
                else
                    reject (err)
            }
            else
                resolve(data)
        }
    );
});


module.exports = { putBucketTagging, getBucketTagging };
