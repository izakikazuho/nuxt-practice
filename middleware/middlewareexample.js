export default function() {
  if (process.server) {
    console.log(`SSR in middleware`)
  } else {
    console.log(`CSR in middleware`)
  }
}
