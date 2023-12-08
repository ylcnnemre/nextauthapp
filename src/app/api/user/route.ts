import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import zod from "zod"
const userSchema = zod.object({
    username: zod.string().min(1, "username is required").max(1000),
    email: zod.string().email("invalid email"),
    password: zod.string().min(1, "password is required").max(8)
})


export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, username, password } = userSchema.parse(body)
        const existingByUser = await db.user.findFirst({
            where: {
                email: email ?? ""
            }
        })
        console.log("exist ==>", existingByUser)
        if (existingByUser) {
            return NextResponse.json({ msg: "bu kullanıcı zaten var" }, { status: 422 })
        }
        const hashedPassword = await hash(password, 10)
        const user = await db.user.create({
            data: {
                email: email,
                password: hashedPassword,
                username: username
            }
        })
        const { password: psw, ...rest } = user
        return NextResponse.json({ user: rest, msg: "user created successfully" })
    }
    catch (err: any) {
        return NextResponse.json({ msg: err.message })
    }

}