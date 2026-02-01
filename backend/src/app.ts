import express from "express"
import authRoutes from "./modules/auth/auth.routes"
import { errorHandler } from "./middlewares/error.middleware"
import cors from "cors"

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use(express.json())

app.use("/auth", authRoutes)   

app.use(errorHandler)        

export default app
