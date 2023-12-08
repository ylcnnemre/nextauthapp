import { authOptions } from "@/lib/auth";
import nextAuth from "next-auth";

const handler = nextAuth(authOptions)