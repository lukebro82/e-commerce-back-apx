import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { client } from "lib/algolia";
import { getOffsetAndLimitFromReq } from "lib/request";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const { limit, offset } = getOffsetAndLimitFromReq(req);
    const query = req.query.search as string;

    const index = client.initIndex("products");

    const response = await index.search(query, {
      hitsPerPage: limit,
      page: offset > 1 ? Math.floor(offset / limit) : 0,
    });

    res.send({
      results: response.hits,
      pagination: {
        offset,
        limit,
        page: response.page,
        total: response.nbHits,
      },
    });
  },
});
