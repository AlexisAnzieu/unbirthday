import { VercelRequest, VercelResponse } from "@vercel/node";
import pool from "./db";
import { RowDataPacket } from "mysql2";

interface Guest extends RowDataPacket {
  id: number;
  firstName: string;
  lastName: string;
  registeredAt: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    try {
      const [rows] = await pool.query<Guest[]>(
        "SELECT * FROM guests ORDER BY registeredAt DESC"
      );
      res.status(200).json(rows);
    } catch (error: unknown) {
      console.error("Error fetching guests:", error);
      res.status(500).json({ error: "Failed to fetch guests" });
    }
  } else if (req.method === "POST") {
    try {
      const { firstName, lastName } = req.body;
      if (!firstName || !lastName) {
        return res
          .status(400)
          .json({ error: "First name and last name are required" });
      }

      const [result] = await pool.execute(
        "INSERT INTO guests (firstName, lastName) VALUES (?, ?)",
        [firstName, lastName]
      );
      res.status(201).json(result);
    } catch (error: unknown) {
      console.error("Error adding guest:", error);
      res.status(500).json({ error: "Failed to add guest" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
