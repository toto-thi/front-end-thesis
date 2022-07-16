export default function ({ app, error, route }) {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (!hasToken) {
    error({ errorCode: 403, message: "You're not allowed to see this" })
  }
}

// export default (ctx) => {
//   const hasToken = !!ctx.app.$apolloHelpers.getToken()

//   if(!hasToken) {
//     ctx.redirect('/Login')
//     ctx.error({ errorCode: 403, message: "You're not allowed to see this" })
//   }
// }