import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
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
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
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