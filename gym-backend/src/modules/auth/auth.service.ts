import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users } from "../../db/schema"
import { comparePassword, hashPassword } from "../../utils/hash"
import { signToken } from "../../utils/jwt"

// registerUser
// Take user info
// Hash password
// Store in DB
// Create token
// Return user + token
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const hashed = await hashPassword(password)

  const [user] = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashed,
    })
    .returning()

  const token = signToken({ id: user.id, role: user.role })

  return { user, token }
}

// loginUser
// Find user by email
// If not found → error
// Compare password
// If wrong → error
// Create token
// Return user + token

export const loginUser = async (email : string , password : string) => {

    const user = await db.query.users.findFirst({
        where:eq(users.email, email)
    })

    if(!user){
        throw new Error("Invalid email or password")
    }

    const isValid = await comparePassword(password, user.password)

    if(!isValid){
         throw new Error("Invalid email or password")
    }

    const token = signToken({id:user.id, role:user.role})

    return {user , token}

}