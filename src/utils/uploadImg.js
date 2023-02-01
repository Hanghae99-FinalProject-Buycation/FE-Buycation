import { v1 } from "uuid";
import AWS from "aws-sdk";
import { BUCKET, REGION, ASSESSKEY_ID, SECRET_ACCESSKEY } from "../core/env";

AWS.config.update({
  region: REGION,
  accessKeyId: ASSESSKEY_ID,
  secretAccessKey: SECRET_ACCESSKEY,
});

export const uploadImg = (file) => {
  const uploadObject = new AWS.S3.ManagedUpload({
    params: {
      Bucket: BUCKET,
      Body: file,
      Key: `image/${v1().toString().replace("-", "")}.${
        file.type.split("/")[1]
      }`,
    },
  });

  return uploadObject.promise();
};
