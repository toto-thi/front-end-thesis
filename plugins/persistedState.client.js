import createPersistedState from 'vuex-persistedstate'
import cookie from 'cookie'
import Cookies from 'js-cookie'

export default ({ store, req, isDev }) => {
  createPersistedState({
    key: 'tempData',
    storage: {
      getItem: (key) =>
        process.client
          ? Cookies.get(key)
          : cookie.parse(req.headers.cookie || '')[key],
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 100, secure: !isDev }),
      removeItem: (key) => Cookies.remove(key),
    },
  })(store)
}
