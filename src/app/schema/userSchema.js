const { gql } = require('apollo-server');

module.exports = gql`
    input UserInput {
        fullname: String
        username: String
        password: String
        role: UserRole
        phone: String
        village: String
        district: String
        province: String
        gender: Gender
        note: String
    }

    type User {
        id: ID
        customerCode: String
        fullname: String
        username: String
        password: String
        role: UserRole
        phone: String
        village: String
        district: String
        province: String
        gender: Gender
        createdAt: DateTime
        updatedAt: DateTime
        createdBy: User
        updatedBy: User
        note: String
    }

    enum Gender {
        MALE
        FEMALE
        NOT_SPECIFIED
    }

    enum UserRole {
        ADMIN
        STAFF
        CUSTOMER
    }

    input UserWhereInputOne {
        id: ID!
    }

    input UserWhereInput {
        customerCode: String
        fullname: String
        username: String
        password: String
        role: UserRole
        phone: String
        village: String
        district: String
        province: String
        gender: Gender
        createdAt_lt: DateTime
        createdAt_gte: DateTime
        createdBy: String
        updatedBy: String
    }

    type ResponeUserData {
        total: Int!
        data: [User]!
    }

    extend type Query {
        user(where: UserWhereInputOne!): User!
        users(where: UserWhereInput, orderBy: OrderByInput, skip: Int, limit: Int): ResponeUserData!
        
    }

    extend type Mutation {
        createUser(data: UserInput!): User!
        updateUser(data: UserInput!, where: UserWhereInputOne!): User!
        deleteUser(where: UserWhereInputOne!): User!
    }
`;