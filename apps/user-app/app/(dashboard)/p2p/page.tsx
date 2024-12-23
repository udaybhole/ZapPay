import prisma from "@repo/db/client";
import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { P2pTransactions } from "../../../components/P2pTransaction";

const getp2ptransaction = async () => {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: Number(session?.user?.id) },
        { toUserId: Number(session?.user?.id) },
      ],
    },
    orderBy: {
      timestamp: "desc",
    },
  });
  return transactions;
};

export default async function () {
  const transactions = await getp2ptransaction();
  return (
    <div>
        <div className="text-4xl text-[#6a51a6] pt-8 font-bold">
            P2P TRANSFER
        </div>
    <div className="flex justify-center items-center w-[80vw] gap-20  ">
      <div className="w-[30%]">
        <SendCard />
      </div>
      <div className="w-[60%]">
        <P2pTransactions transactions={transactions} />
      </div>
    </div>
    
    </div>
  );
}