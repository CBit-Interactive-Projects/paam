const host = "https://vorbi.pockethost.io/"
import Pocketbase from "pocketbase"

const client = new Pocketbase(host)
console.log("Connecting to: " + host)

