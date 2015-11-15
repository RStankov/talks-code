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
var UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user object',
  fields: function() {
    return {
      id: {
        type: GraphQLInt,
        description: 'The id of the user'
      },
      name: {
        type: GraphQLString,
        description: 'The name of the user'
      },
      handle: {
        type: GraphQLString,
        description: 'The handle of the user'
      },
      picture: {
        type: GraphQLString,
        description: 'The picture of user',
        args: {
          size: { type: GraphQLInt },
        },
        resolve: function(user, params) {
          var size = params.size || 400;
          return 'file.example.com/' + user.picture_uuid + "?size=" + size;
        }
      },
      posts: {
        type: new GraphQLList(PostType),
        description: 'All posts of user',
        resolve: function(user) {
          return data.posts.where({user_id: user.id});
        }
      },
    };
  }
});

var PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'A post object',
  fields: function() {
    return {
      id: {
        type: GraphQLInt,
        description: 'The id of the post'
      },
      name: {
        // Deprecation example
        type: GraphQLString,
        description: 'The title of the post (deprated in favor of title)',
        deprecated: true,
        resolve: function(post) {
          return post.title;
        }
      },
      title: {
        type: GraphQLString,
        description: 'The title of the post'
      },
      tagline: {
        type: GraphQLString,
        description: 'The tagline of the post'
      },
      user: {
        type: UserType,
        description: 'User of the post',
        resolve: function(post) {
          return data.users.find(post.user_id);
        }
      },
    };
  }
});

// export the connected GraphQL schema
// it has two modes:
//   - "query" for fetching data
//   - "mutation" for updating data

var RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      resolve: function() { return data.posts.all(); }
    },

    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: function(_, params) { return data.posts.find(params.id); }
    },

    users: {
      type: new GraphQLList(UserType),
      resolve: function() { return data.users.all(); }
    },

    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: function(_, params) { return data.users.find(params.id); }
    },
  },
});

var RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createPost: {
      type: PostType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        tagline: { type: new GraphQLNonNull(GraphQLString) },
        user_id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: function(_, params) {
        var attributes = {
          title: params.title,
          tagline: params.tagline,
          user_id: params.user_id,
          votes_count: 0,
          comments_count: 0,
        };

        if (!data.users.find(attributes.user_id)) {
          throw "Invalid user id - " + attributes.user_id;
        }

        return data.posts.create(attributes);
      },
    },
    updatePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        tagline: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: function(_, params) {
        return data.posts.update(params);
      },
    },
    destroyPost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: function(_, params) {
        return data.posts.destroy(params);
      },
    },
    createUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        handle: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: function(_, params) {
        var attributes = {
          name: params.title,
          handle: params.handle,
          picture_uuid: "" + Math.round(Math.random() * 1000000),
        };

        if (data.users.where({handle: attributes.handle}).length > 0) {
          throw "Duplicated handle - " + attributes.handle;
        }

        return data.users.create(attributes);
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: function(_, params) {
        return data.users.update(params);
      },
    },
    destroyUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: function(_, params) {
        return data.users.destroy(params);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
