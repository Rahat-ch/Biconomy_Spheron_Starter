import type { NextApiRequest, NextApiResponse } from 'next'
import { SpheronClient, ProtocolEnum } from "@spheron/storage";


interface TokenRes {
  uploadToken: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenRes>,
) {
  try {
    const bucketName = "web3-dropbox-workshop"; 
    const protocol = ProtocolEnum.IPFS;
    const token = process.env.SPHERON_TOKEN as string;
 
    const client = new SpheronClient({ token });
 
    const { uploadToken } = await client.createSingleUploadToken({
      name: bucketName,
      protocol,
    });
 
    res.status(200).json({
      uploadToken,
    });
  } catch (error) {
    console.error(error);
  }
}
