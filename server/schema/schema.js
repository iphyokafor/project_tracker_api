import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLID
} from 'graphql';

const users = [
    { id: '1', username: 'John Doe', password: '23456ab' },
    { id: '2', username: 'Steve Smith', password: '0987bd' },
    { id: '3', username: 'Sara Williams', password: '12345ef' },
];

// User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    })
});

// Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        completed: { type: GraphQLBoolean }
    })
});

// Actions Type
const ActionType = new GraphQLObjectType({
    name: 'Action',
    fields: () => ({
        id: { type: GraphQLID },
        project_id: { type: GraphQLID },
        description: { type: GraphQLString },
        note: { type: GraphQLString }
    })
});


// Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].id == args.id) {
                        return users[i];
                    }
                }
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery
});