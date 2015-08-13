/**
 *
 * GraphQL Schema file.
 * It connects application logic with GraphQL Server.
 *
 */

var _  = require('lodash');

var graphql = require('graphql/type');

// GraphQL types, used for object definitions
var GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLSchema     = graphql.GraphQLSchema,
    GraphQLInt        = graphql.GraphQLInt,
    GraphQLString     = graphql.GraphQLString,
    GraphQLList       = graphql.GraphQLList,
    GraphQLNonNull    = graphql.GraphQLNonNull;

// Application data
var data = require('./data.js');

// Application specific object definitions
var SpeakerType = new GraphQLObjectType({
  name: 'Speaker',
  description: 'A speaker object',
  fields: function() {
    return {
      id: {
        type: GraphQLInt,
        description: 'The id of the speaker'
      },
      name: {
        type: GraphQLString,
        description: 'The name of the speaker'
      },
      picture: {
        type: GraphQLInt,
        description: 'The photo of speaker',
        resolve: function(speaker) {
          return 'file.varnaconf.com/' + speaker.picture_uuid;
        }
      },
      sessions: {
        type: new GraphQLList(SessionType),
        description: 'All sessions of speaker',
        resolve: function(speaker) {
          return data.sessions.where({speaker_id: speaker.id});
        }
      },
    };
  }
});

var SessionType = new GraphQLObjectType({
  name: 'Session',
  description: 'A session object',
  fields: function() {
    return {
      id: {
        type: GraphQLInt,
        description: 'The id of the session'
      },
      name: {
        type: GraphQLString,
        description: 'The name of the session'
      },
      start_at: {
        type: GraphQLString,
        description: 'The starting time of the session'
      },
      track_id: {
        type: GraphQLInt,
        description: 'The track number of the session'
      },
      event: {
        type: EventType,
        description: 'Event of the session',
        resolve: function(session) {
          return data.events.find(session.event_id);
        }
      },
      speaker: {
        type: SpeakerType,
        description: 'Speaker of the session',
        resolve: function(session) {
          return data.speakers.find(session.speaker_id);
        }
      },
    };
  }
});

var EventType = new GraphQLObjectType({
  name: 'Event',
  description: 'A event object',
  fields: function() {
    return {
      id: {
        type: GraphQLInt,
        description: 'The id of the event'
      },
      name: {
        type: GraphQLString,
        description: 'The name of the event'
      },
      year: {
        type: GraphQLString,
        description: 'The year of the event'
      },
      date: {
        type: GraphQLString,
        description: 'The exact date of the event'
      },
      sessions: {
        type: new GraphQLList(SessionType),
        description: 'All sessions of event',
        resolve: function(event) {
          return data.sessions.where({event_id: event.id});
        }
      },
    };
  }
});

// export the connected GraphQL schema
// it has two modes:
//   - "query" for fetching data
//   - "mutation" for updating data

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: _.extend({
      // Events (plain)
      events: {
        type: new GraphQLList(EventType),
        resolve: function() {
          return data.events.all();
        }
      },
      event: {
        type: EventType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: function(_, params) {
          return data.events.find(params.id);
        }
      },

    // Speakers (with helper)
    }, queryFor(SessionType),
    //
    // Sessions (with helper)
    queryFor(SpeakerType))
  }),

  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: _.extend({
      // Events (plain)
      createEvent: {
        type: EventType,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          year: {
            type: new GraphQLNonNull(GraphQLString)
          },
          date: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        resolve: function(_, params) {
          return data.events.create(params);
        },
      },
      updateEvent: {
        type: EventType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          year: {
            type: new GraphQLNonNull(GraphQLString)
          },
          date: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        resolve: function(_, params) {
          return data.events.update(params);
        },
      },
      destroyEvent: {
        type: EventType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          },
        },
        resolve: function(_, params) {
          return data.events.destroy(params);
        },
      },

    // Sessions (with helper)
    }, mutationsFor(SessionType, {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      start_at: {
        type: new GraphQLNonNull(GraphQLString)
      },
      track: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      speaker_id: {
        type: new GraphQLNonNull(GraphQLInt)
      },
      event_id: {
        type: new GraphQLNonNull(GraphQLInt)
      },
    }),

    // Speaker (with helper)
    mutationsFor(SpeakerType, {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      picture_uuid: {
        type: new GraphQLNonNull(GraphQLString)
      },
    }))
  })
});

// Example of generator functions for faster Resource access
// Just as prove of concept

function queryFor(type) {
  var dataName = type.name.toLowerCase();
  var source = data[dataName + 's'];

  var fields = {};

  fields[dataName + 's'] = {
    type: new GraphQLList(type),
    resolve: function() {
      return source.all();
    }
  };

  fields[dataName] = {
    type: type,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: function(_, params) {
      return source.find(params.id);
    }
  };

  return fields;
}

function mutationsFor(type, dataFields) {
  var dataName = type.name.toLowerCase();
  var source = data[dataName + 's'];

  var idField = {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
  };

  var fields = {};

  fields["create" + type.name] = {
    type: type,
    args: dataFields,
    resolve: function(_, params) {
      return source.create(params);
    },
  };

  fields["update" + type.name] = {
    type: type,
    args: _.extend({}, idField, dataFields),
    resolve: function(_, params) {
      return source.destroy(params);
    },
  };

  fields["destroy" + type.name] = {
    type: type,
    args: idField,
    resolve: function(_, params) {
      return source.destroy(params);
    },
  };

  return fields;
}
