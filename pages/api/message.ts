// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { TCalcCostFormData } from '../../utils/types';

type Data = {
  status: 'error' | 'success';
  message?: string;
};

const botToken = process.env.NEXT_PUBLIC_BOT_TOKEN || '';
const chatId = process.env.NEXT_PUBLIC_CHAT_ID || '';

const request = async (data: TCalcCostFormData, token: string, id: string) => {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      chat_id: id,
      text: `Email: ${data.email}, Телефон: ${data.phone}, Детали заказа: ${data.requestMessage}`,
    }),
  });
  return res;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (!botToken || !chatId) res.status(500).json({ status: 'error', message: 'invalid tokens' });
  if (req.method === 'POST') {
    const message = req.body.data;
    request(message, botToken, chatId)
      .then((response) => {
        if (response.statusText === 'OK') {
          res.status(response.status).json({ status: 'success' });
        } else {
          res.status(response.status).json({ status: 'error' });
        }
      });
  }
}
