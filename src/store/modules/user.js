import {
  login,
  logout,
  getInfo
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  Message,
  Notification
} from 'element-ui'
const user = {
  state: {
    token: getToken('Token'),
    name: '',
    avatar: '',
    roles: [],
    proxyId: getToken('proxyId'),
    account: getToken('account'),
    userType: getToken('userType'),
    userId: getToken('userId'),
    resourceIds: getToken('resourceIds')
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_proxyId: (state, proxyId) => {
      state.proxyId = proxyId
    },
    SET_userTyped: (state, userType) => {
      state.userType = userType
    },
    SET_userId: (state, userId) => {
      state.userId = userId
    },
    SET_resourceIds: (state, resourceIds) => {
      state.resourceIds = resourceIds
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          var data = response.data.data
          console.log(response);
          if (response.data.success == true) {
            Notification({
              title: "登录成功",
              message: '小鹿有哲欢迎您',
              type: 'success'
            });
            setToken('Token', data.accessToken)
            setToken('proxyId', data.proxyId)
            setToken('account', data.account)
            setToken('userType', data.userType)
            setToken('userId', data.userId)
            setToken('resourceIds', data.resourceIds)
            commit('SET_TOKEN', data.accessToken)
            commit('SET_proxyId', data.proxyId)
            commit('SET_userTyped', data.userType)
            commit('SET_userId', data.userId)
            commit('SET_resourceIds', data.resourceIds)

            resolve()
          } else {
            Notification({
              title: '错误',
              message: response.data.message.description,
              type: 'error'
            });
            resolve()
          }

        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          console.log("退出成功")
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken('Token')
          resolve()
        }).catch(error => {
          console.log("退出失败")
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken('Token')
          resolve()
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken('Token')
        resolve()
      })
    }
  }
}

export default user
