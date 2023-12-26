import { useOrder } from '@/stores/orderStore'
import { BadgeCheck } from 'lucide-react'
import React from 'react'
import OrderItemsCard from '../common/OrderItemsCard';

const PaymentStatus = ({ onClose }: { onClose: () => void }) => {
    const { paymentStatus, total, activeMethod } = useOrder(state => state);
    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case "success":
                return "green"
            case "pending":
                return "orange"
            case "failed":
                return "red"
            default:
                return "red"
        }
    }
    return (
        <div className='p-4'>
            <figure className='flex justify-center pt-10'>
                <BadgeCheck size={100} color={getPaymentStatusColor(paymentStatus)} />
            </figure>
            {
                paymentStatus === "success" && <p className='text-center text-lg text-green-500 mt-2'>Order Payment Successful</p>
            }
            {
                paymentStatus === "failed" &&
                <>
                    <p className='text-center text-lg text-red-500 mt-2'> Payment Failed</p>
                </>
            }
            {
                paymentStatus === "pending" && <p className='text-center text-lg text-orange-500 mt-2'>Payment Pending</p>
            }
            {
                paymentStatus === "success" && <p className='text-center text-sm text-gray-400 mt-2'>We have received your order.Your order will be delivered soon</p>
            }
            {
                (paymentStatus === "failed" || paymentStatus === "pending") && <p className='text-center text-sm text-gray-400 mt-2'>We are unable to process your payment. Please try again later</p>

            }
            {
                paymentStatus === "success" && <div className='gap-y-2'>
                    <hr className='my-4' />
                    <div className='flex justify-between text-gray-400'>
                        <p>Total Amount Paid</p>
                        <p>₹{total}</p>
                    </div>
                    <div className='flex justify-between text-gray-400'>
                        <p>Paid By</p>
                        <p className='text-green-500'>{activeMethod}</p>
                    </div>
                </div>
            }
            <div className='flex justify-center mt-4'>
                <button className='bg-blue-500 text-white px-4 py-2 rounded items-center mt-4' onClick={onClose}>Home</button>
            </div>
        </div>
    )
}

export default PaymentStatus