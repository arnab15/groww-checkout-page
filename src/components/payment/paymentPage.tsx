import { useOrder } from '@/stores/orderStore'
import React, { FC } from 'react'
import { Banknote, ChevronLeft, CreditCard, Landmark, PhoneOutgoingIcon, PiggyBank, Wallet } from 'lucide-react';
import { useBrand } from '@/stores/brandStore';

type PaymentMethods = "CARDS" | "UPI" | "WALLET" | "COD"
interface PaymentCardProps {
    title: string,
    cardType: PaymentMethods
    handelCardClick: (cardType: PaymentMethods) => void
    isSelected: boolean
}

const getHelperText = (cardType: PaymentMethods) => {
    switch (cardType) {
        case "CARDS":
            return "Pay with cards"
        case "UPI":
            return "Pay with UPI"
        case "WALLET":
            return "Pay with Wallet"
        case "COD":
            return "Cash on delivery"
        default:
            return "Pay with COD"
    }
}

const getIcons = (cardType: PaymentMethods) => {
    switch (cardType) {
        case "CARDS":
            return <CreditCard size={30} />
        case "UPI":
            return <Landmark size={30} />
        case "WALLET":
            return <Wallet size={30} />
        case "COD":
            return <Banknote size={30} />
        default:
            return <PiggyBank size={30} />
    }
}
const PaymentCard: FC<PaymentCardProps> = ({ cardType, title, handelCardClick, isSelected }) => {
    return <div className={`p-4 rounded-md shadow-md my-4 flex items-center ${isSelected ? "bg-gray-200 border border-blue-500" : "bg-white"} cursor-pointer`} onClick={() => handelCardClick(cardType)}>
        <input type="radio" checked={isSelected} className='mr-4' />
        <div className='mr-4'>{getIcons(cardType)}</div>
        <div>
            <p className=' text-gray-600'>{title}</p>
            <p className='text-gray-400 text-xs'>{getHelperText(cardType)}</p>
        </div>
    </div>
}
export default function PaymentPage() {
    const { orderDetails, deliveryFees, total, subTotal, discount, paymentMethods, activeMethod, setActiveMethod, setActivePage, setPaymentStatus } = useOrder((state) => state)
    const { primaryColor } = useBrand()

    return (
        <div className='p-4 flex flex-col'>
            <div className='flex justify-between w-full items-center mb-4'>
                <ChevronLeft color={primaryColor} strokeWidth="3px" className='cursor-pointer' size={25} onClick={() => setActivePage("checkout")} />
                <h1 className='text-xl text-black font-semibold mx-auto'>Payment</h1>
            </div>
            <div>
                {
                    paymentMethods.map((paymentMethod: any) => {
                        return <PaymentCard key={paymentMethod} cardType={paymentMethod} handelCardClick={() => { setActiveMethod(paymentMethod) }} title={paymentMethod} isSelected={activeMethod === paymentMethod} />
                    })
                }
                <PaymentCard cardType={"COD"} handelCardClick={() => { setActiveMethod("COD") }} title={"Cash On Delivery"} isSelected={activeMethod === "COD"} />
                <PaymentCard cardType={"WALLET"} handelCardClick={() => { setActiveMethod("WALLET") }} title={"Wallet"} isSelected={activeMethod === "WALLET"} />
            </div>

            <div className='shadow-md p-4 rounded-sm mt-auto'>
                <p className='text-base text-gray-500 uppercase'>Price Details</p>
                <hr />
                <div className='flex justify-between my-1'>
                    <p className='text-sm text-gray-500'>Price ({orderDetails?.products?.length} items)</p>
                    <p className='text-sm text-gray-500'>{subTotal}</p>
                </div>
                <div className='flex justify-between my-1'>
                    <p className='text-sm text-gray-500'>Delivery Charges</p>
                    <p className='text-sm text-gray-500'>{deliveryFees}</p>
                </div>
                <div className='flex justify-between my-1'>
                    <p className='text-sm text-gray-500'>Discount</p>
                    <p className='text-sm text-gray-500'>{discount}</p>
                </div>
                <hr className='my-2' />
                <div className='flex justify-between my-1'>
                    <p className='text-sm text-gray-500'>Amount Payable</p>
                    <p className='text-sm text-gray-500'>{total}</p>
                </div>
            </div>
            <p className='text-sm text-gray-500 mt-4'>By placing the order you agree to our <span className='text-blue-500'>Terms & Conditions</span></p>
            {
                activeMethod && <div className='flex justify-between items-center'>
                    <button className='bg-purple-500 text-white p-2 rounded-md mt-4 w-full flex items-center justify-center' onClick={() => { setActivePage("success"); setPaymentStatus() }}>
                        PAY NOW</button>
                </div>
            }

        </div>
    )
}
