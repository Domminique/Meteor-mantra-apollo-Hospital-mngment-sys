import { Patients } from '../collections.js';

// the typedefs
export const typeDefs = [`
  type Email {
    address: String
    verified: Boolean
  }
  type Profile {
    firstName: String
    lastName: String
  }

  type User {
    emails: [Email]
    username: String
    profile: Profile
    _id: String

  }

  type Query {
    user(id: String!): User
  }

  type Mutation {
    createuser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
  }

  schema {
    query: Query
    mutation: Mutation

  }

  `];

  // resolvers
  export const resolvers = {
    Query: {
      // current user
      async user(root, args, context) {
        // Only return the current user, for security
        if (context.userId === args.id) {
          return await Meteor.users.findOne(context.userId);
        }
      },
      // another query
    },
    Mutation: {
      // create new user
      async createuser(root, { firstName, lastName, email, password }) {

          const newUserId = Accounts.createUser({
            email,
            password,
            profile: {
              firstName,
              lastName,
            }
          });

          if (newUserId) {
            Accounts.sendVerificationEmail(newUserId);
            return true;
          }

          return false;
      },
    },
    User: {
      emails: ({emails}) => emails,
    }

  }
