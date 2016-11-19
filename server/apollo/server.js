import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import { typeDefs, resolvers } from '/lib/apollo/apollo.js';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

createApolloServer({
    schema,
});
