export const routeGuardsLogs = {
  beforeRouteEnter(to, from, next) {
    console.log(`beforeRouteEnter | to: ${to.name} | from: ${from.name}`)
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log(`beforeRouteLeave | to: ${to.name} | ${from.name}`)
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log(`beforeRouteUpdate | to: ${to.name} | ${from.name}`)
    next()
  }
}
