import * as Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {FlowRouter} from 'meteor/kadira:flow-router-ssr';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Roles} from 'meteor/alanning:roles';
import {Tracker} from 'meteor/tracker';
import {show} from 'js-snackbar';
import moment from 'moment';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import {meteorClientConfig} from 'meteor/apollo';

const apolloClient = new ApolloClient(meteorClientConfig());

export default function () {
  return {
    Meteor,
    Accounts,
    FlowRouter,
    Collections,
    LocalState: new ReactiveDict(),
    Tracker,
    Roles,
    show,
    moment,
    apolloClient,
    gql,
    meteorClientConfig
  };
}
