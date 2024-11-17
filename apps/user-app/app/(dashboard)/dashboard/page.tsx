"use client"
import { useRouter } from "next/navigation"

export default function() {

    const router = useRouter();
    return <div className=" ">
         <div className="text-4xl text-[#6a51a6] pt-8 font-bold">
            HOME
        </div>
        <div className="min-h-screen flex flex-col items-center justify-center pb-36">
        
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#6a51a6]">Welcome to ZapPay</h1>
        <p className="font-bold ${selected ? text-[#6a51a6]  text-slate-500 pt-4">
          Manage your payments, transactions, and finances seamlessly with ZapPay.
          ZapPay helps settling up feel more like catching up. 
          Send and receive money with ZapPay friends to split everyday necessities, bills, and shared activities like takeout or travel. 
        </p>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button onClick={()=>{
            router.push("/transfer")
        }} className="px-6 py-3 text-black  rounded-lg shadow hover:bg-[#6a51a6] transition">
          Transfer Into Wallet
        </button>
        <button onClick={()=>{
            router.push("/transactions")
        }} className="px-6 py-3  rounded-lg shadow hover:bg-[#6a51a6] text-black transition ">
        Transaction History
        </button>
        <button onClick={()=>{
            router.push("/p2p")
        }} className="px-6 py-3 text-black rounded-lg shadow hover:bg-[#6a51a6] transition">
          Transfer To A Friend
        </button>
      </div>
    </div>
    </div>
}