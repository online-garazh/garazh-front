import { type NextApiRequest, type NextApiResponse } from 'next';

const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).end();
};

export default handler;
