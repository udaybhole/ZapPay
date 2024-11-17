"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function balance(provider: string, amount: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request not logged in"
        }
    }
    const balance = (Math.random() * 1000);
    await prisma.balance.create({
        data: {
            userId: Number(session?.user?.id),
            amount : balance,
            locked : 0

        }
    });

    return {
        message: "On Ramp Done"
    }
}
