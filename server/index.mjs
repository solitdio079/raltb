import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import authRouter from './routes/auth.mjs'
import postRouter from './routes/posts.mjs'
import userRouter from './routes/users.mjs'
import categoryRouter from './routes/categories.mjs' 
import { createServer } from 'node:http'
import { Server } from 'socket.io'
//import path from 'node:path'


const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://malibusinessmachinetech.com',
    'https://www.malibusinessmachinetech.com',
  ],

  credentials: true,
  optionsSuccessStatus: 200,
}

try {
  const connection = await mongoose.connect(process.env.MONGO_URI)
  console.log('Database connected')
} catch(error) {
  console.log(error.message)
}
const app = express()
//const server = createServer(app)
//const io = new Server(server, { cors: { origin: '*' } })
app.use(cors(corsOptions))
// app.use((req, res, next) => {
//   req.io = io
//   next()
// })
// const connections = []
// io.on("connection", (socket) => {
//   connections.push(socket)
//   socket.on("disconnect", () => {
//      connections.splice(connections.indexOf(socket), 1)
//   })
// })
app.use(cookieParser('yes'))
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
   
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      dbName: 'raltb',
    }),
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use('/', express.static('./public'))

app.use("/posts", postRouter)
app.use("/users", userRouter)
app.use(express.json())
app.use('/auth', authRouter)
app.use("/categories", categoryRouter)


const port = process.env.PORT || 5500

app.get('/', (req, res) => {
  res.send('Hello, homepage here!')
})

app.listen(port, () => {
  console.log('Listening to port 5500!')
})