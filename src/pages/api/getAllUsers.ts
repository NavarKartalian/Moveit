import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from 'faunadb';

import { fauna } from "../../services/fauna";

interface userProps {
  data: {
    id: number,
    name: string,
    image: string,
    level: number,
    curExp: number,
    completedChallenges: number,
  }
}

interface queryProps {
  data: userProps[];
}

export default async function getUser(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'GET') {
    const body = req.query;
    if(body.key === process.env.API_KEY) {
      const query: queryProps = await fauna.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection('users'))),
          q.Lambda((user) => q.Get(user))
        )
      );
      res.status(200).json(query.data);
    } else {
      res.status(401).json({ error: 'Unauthorized user' });
    }
  }
}