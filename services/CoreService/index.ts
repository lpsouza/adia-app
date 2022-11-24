import { login, register, token, refresh } from './auth'
import { getUserByEmail, postUser, putUser, deleteUser, getUsers } from './users'
import { getAppById, postApp, putApp, deleteApp, getApps } from './apps'

const CoreService = {
  auth: { login, register, token, refresh },
  users: { get: getUsers, getByEmail: getUserByEmail, post: postUser, put: putUser, delete: deleteUser },
  apps: { get: getApps, getById: getAppById, post: postApp, put: putApp, delete: deleteApp }
}

export default CoreService;
