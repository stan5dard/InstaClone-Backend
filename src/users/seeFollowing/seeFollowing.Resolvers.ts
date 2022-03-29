import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, cursor }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      client.user.findUnique({where:{username}}).following({})
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: 5,
          //skip: cursor ? 1 : 0,
          //...(cursor && { cursor: { id: cursor } }),
        });
      return {
        ok: true,
        following,
      };
    },
  },
};