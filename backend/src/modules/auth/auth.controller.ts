import { Request, Response } from "express"
import { registerUser , loginUser} from "./auth.service"


export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Missing fields" })
    }

    const result = await registerUser(name, email, password)

    res.status(201).json(result)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}
export const login = async (req : Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" })
    }

    const result = await loginUser(email, password)

    res.status(200).json(result)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}