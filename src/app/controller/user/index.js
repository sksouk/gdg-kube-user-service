const bcrypt = require("bcrypt");
const moment = require('moment');
const { queryWithWhere, queryWithOrderBy } = require("./helper");
const { randomNumber } = require("../../../util/manageToken");
const config = require("../../../config");

module.exports = {
  Query: {
    user: async (_, { where }, { models }) => {
      try {
        // TODO: Check invalid data
        if (!where.id) throw config.statusMessage.BAD_REQUEST;

        // TODO: Get user data
        const user = await models.userModel.findById(where.id)
          .populate("createdBy")
          .populate("updatedBy")
          .exec();

        // TODO: Check user data
        if (!user) throw config.statusMessage.USER_NOT_FOUND;

        // TODO: Response user data
        return user;
      } catch (err) {
        console.log("err: ", err);
        throw new Error(err);
      }
    },

    users: async (_, { where, orderBy, skip, limit }, { models }) => {
      try {
        // TODO: Convert where data and orderBy data
        const _where = queryWithWhere(where);
        const _orderBy = queryWithOrderBy(orderBy);

        // TODO: Get total users with where data
        const allUser = await models.userModel.count(_where).exec();

        // TODO: Get users with where data
        const users = await models.userModel.find(_where)
          .limit(limit || 50)
          .skip(skip || 0)
          .sort(_orderBy)
          .exec();

        // TODO: Response users with total
        const responseUserData = { total: allUser, data: users };
        return responseUserData;
      } catch (error) {
        console.log("error: ", error);
        throw new Error(error);
      }
    },
  },

  Mutation: {
    createUser: async (_, { data }, { models }) => {
      try {
        // TODO: Check invalid data
        if (!data.password || !data.username) throw config.statusMessage.BAD_REQUEST;

        // TODO: Random user code
        const code = randomNumber(7);

        // TODO: Check user data from User
        const checkUserAuthWithUsername = await models.userModel.findOne({ username: data.username }).exec();
        if (checkUserAuthWithUsername) throw config.statusMessage.USER_ALREADY_EXIST;

        // TODO: hash UserAuth password
        const hashPassword = await bcrypt.hash(data.password, 10);

        // TODO: Create User data
        const createUser = await models.userModel.create({ ...data, customerCode: code, password: hashPassword });

        // TODO: Response user data
        return createUser;
      } catch (err) {
        console.log("err: ", err);
        throw new Error(err);
      }
    },

    updateUser: async (_, { data, where }, { models }) => {
      try {
        // TODO: Check Existing User
        const userData = await models.userModel.findById(where.id).exec();
        if (!userData) throw config.statusMessage.USER_NOT_FOUND;

        let newData = { ...data, updatedAt: moment() }
        if (data.password) {
          // TODO: hash UserAuth password
          const hashPassword = await bcrypt.hash(data.password, 10);
          newData = { ...data, password: hashPassword }
        }

        // TODO: Update User
        await models.userModel.findByIdAndUpdate(where.id, newData)

        // TODO: GEt new user data
        const resUserData = await models.userModel.findById(where.id).exec();

        // TODO: Response user data
        return resUserData;
      } catch (err) {
        console.log("err: ", err);
        throw new Error(err);
      }
    },

    deleteUser: async (_, { where }, { models }) => {
      try {
        // TODO: delete user by id
        const deleteUser = await models.userModel.findByIdAndDelete(where.id);

        // TODO: Response
        return deleteUser;
      } catch (err) {
        console.log("err: ", err);
        throw new Error(err);
      }
    },
  },
};
