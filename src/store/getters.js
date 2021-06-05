const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  proxyId: state => state.user.proxyId,
  userType: state => state.user.userType,
  userId: state => state.user.userId
}
export default getters
