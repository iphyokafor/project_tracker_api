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
import User from '../models/usermodel';
import Project from '../models/projectmodel';
import Action from '../models/actionmodel';


// User Type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        userName: { type: GraphQLString },
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
        completed: { type: GraphQLBoolean },
        actions: {
            type: new GraphQLList(ActionType),
            resolve(parent, args) {
                return Action.find({ projectId: parent.id });
            }
        }
    })
});

// Actions Type
const ActionType = new GraphQLObjectType({
    name: 'Action',
    fields: () => ({
        id: { type: GraphQLID },
        description: { type: GraphQLString },
        note: { type: GraphQLString },
        project: {
            type: ProjectType,
            resolve(parent, args) {
                return Project.findById(parent.projectId);
            }
        }
    })
});


// Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        project: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Project.findById(args.id);
            }
        },
        action: {
            type: ActionType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Action.findById(args.id);
            }
        },
        actions: {
            type: new GraphQLList(ActionType),
            resolve(parent, args) {
                return Action.find({});
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find({});
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                userName: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let user = new User({
                    userName: args.userName,
                    password: args.password
                });
                return user.save();
            }
        },
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                completed: { type: GraphQLBoolean }
            },
            resolve(parent, args) {
                let project = new Project({
                    name: args.name,
                    description: args.description,
                    completed: args.completed
                });
                return project.save();
            }
        },
        addAction: {
            type: ActionType,
            args: {
                description: { type: new GraphQLNonNull(GraphQLString) },
                note: { type: new GraphQLNonNull(GraphQLString) },
                projectId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let action = new Action({
                    description: args.description,
                    note: args.note,
                    projectId: args.projectId
                });
                return action.save();
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});