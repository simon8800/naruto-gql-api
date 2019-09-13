const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('./config');
const { Character } = require('../models/Character');

const typeDefs = gql`
    type Query {
      hello: String
      getCharacters: [Character!]!
      getCharacter(id: String!): Character!
      getCharactersStartWith(letter: String!): [Character!]!
    }

    type Mutation {
      addCharacter(name: String!, summary: String!): Character
    }

    type Character {
      id: ID!
      name: String!
      summary: String!
      manga: String,
      anime: String,
      novel: String,
      movie: String,
      ova: String,
      appearsIn: String,
      japanese: [String],
      english: [String],
      birthdate: String,
      sex: String,
      status: String,
      height: [String],
      weight: [String],
      bloodType: String,
      kekkeiGenkai: [String],
      tailedBeast: String,
      affiliation: [String],
      team: [String],
      clan: String,
      ninjaRank: [String]
    }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    getCharacters: async () => await Character.find().exec(),
    getCharacter: async (parent, {id}, ctx, info) => await Character.findById(id),
    getCharactersStartWith: async (parent, args, ctx, info) => {
      let characters = await Character.find().exec();
      let letter = args.letter.toLowerCase();
      characters = characters.filter(character => {
        return character.name.toLowerCase().startsWith(letter)
      })

      return characters;
    }
  },
  Mutation: {
    addCharacter: async (_, args) => {
      try {
        let response = await Character.create(args);
        return response;
      } catch (e) {
        return e.message;
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);