import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from 'faunadb';
import { getSession } from "next-auth/react";

import { fauna } from "../../services/fauna";

export default async function updateUser (req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const session = await getSession({ req });
    if(session) {
      const body = req.body;
      await fauna.query(
        q.Update(
          q.Select(
            ['ref'],
            q.Get(q.Match(q.Index('user_by_id'), body.id))
          ),
          {
            data: {
              level: body.level,
              curExp: body.curExp,
              completedChallenges: body.completedChallenges
            },
          }
        )
      );
      res.status(200).json({ success: 'User updated' });
    } else {
      res.status(401).json({ error: 'Unauthorized user' });
    }
  }
};