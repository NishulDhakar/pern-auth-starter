import { Router } from "express";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";

const router = Router();

router.get("/", async (_req, res) => {
  const data = await db.select().from(users);
  res.json(data);
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  const [user] = await db
    .insert(users)
    .values({ name, email, password})
    .returning();

  res.json(user);
});

export default router;