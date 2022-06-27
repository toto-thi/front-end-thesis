import createPersistedState from 'vuex-persistedstate'
import SecureLs from 'secure-ls'

var ls = new SecureLs({ isCompression: false})

export default ({ store, req, isDev }) => {
  createPersistedState({
    key: 'vuex',
    storage: {
      getItem: (key) =>
        process.client
          ? ls.get(key)
          : ls.parse(req.headers.cookie || '')[key],
      setItem: (key, value) =>
        ls.set(key, value, { expires: 100, secure: !isDev }),
      removeItem: (key) => ls.remove(key),
    },
  })(store)
}
