import { Patients } from '../collections.js';
import { Roles } from 'meteor/alanning:roles';

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
    makedoctor(userId: String!): Boolean
    makereceptionist(userId: String!): Boolean
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

      async makedoctor(root, {userId}) {
        // if you are a receptionist
        if(Roles.userIsInRole( userId, 'receptionist' )) {
          Roles.removeUsersFromRoles( userId, 'receptionist' );
          Roles.addUsersToRoles( userId, 'doctor');
        }
        // if you are not a receptionist
        else {
          Roles.addUsersToRoles( userId, 'doctor');
        }

      },

      // makereceptionist
      // making the user a receptionist
      async makereceptionist(root, {userId}) {
        // if you are a doctor
        if(Roles.userIsInRole( userId, 'doctor' )) {
          Roles.removeUsersFromRoles( userId, 'doctor' );
          Roles.addUsersToRoles( userId, 'receptionist');
        }
        // if you are not a receptionist
        else {
          Roles.addUsersToRoles( userId, 'receptionist');
        }

      },

    },
    User: {
      emails: ({emails}) => emails,
    }

  }
