import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { useOrder } from '@/stores/orderStore'
import { ChevronLeft, PhoneOutgoingIcon } from 'lucide-react';
import PaymentPage from '@/components/payment/paymentPage';
import PaymentStatus from '@/components/payment/PaymentStatus';
import Skeleton from '@/components/common/Skeleton';
import OrderItemsCard from '@/components/common/OrderItemsCard';
import { useBrand } from '@/stores/brandStore';
const inter = Inter({ subsets: ['latin'] })

export default function CheckoutPage({ closeModal }: { closeModal: () => void }) {
    const { orderDetails, deliveryFees, total, subTotal,
        discount, setActivePage, activePage,
        productLoading, appliedCoupon,
        setAppliedCoupon, couponError } = useOrder((state) => state)
    const [coupon, setCoupon] = useState(appliedCoupon || "");
    const getOrderDetails = useOrder((state) => state.getOrderDetails)
    const { primaryColor } = useBrand()

    useEffect(() => {
        getOrderDetails()
    }, [])
    const applyCoupon = () => {
        if (coupon) {
            setAppliedCoupon(coupon)
        }
    }
    return (
        <main
            className={` min-h-screen ${inter.className} max-w-sm bg-white rounded-sm mx-auto text-black`}
        >
            {
                activePage === "checkout" && <div className='p-4'>
                    <div className='flex justify-between w-full items-center mb-4'>
                        <ChevronLeft color={primaryColor} strokeWidth="3px" className='cursor-pointer' size={25} onClick={closeModal} />
                        <h1 className='text-xl text-black font-semibold mx-auto'>Checkout</h1>
                    </div>
                    <div>
                        <p className='font-semibold text-lg'>Order Details</p>
                        <div className='mt-2 flex justify-between items-start pb-2 border-b-2'>
                            <div>
                                <p>
                                    <span className='text-gray-700'>Arnab Sahoo</span>
                                    <span className='ml-2 text-gray-500 bg-gray-300 px-1 text-sm rounded font-semibold capitalize'>Home</span>
                                </p>
                                <p className='text-gray-700 text-sm'>Ai 73,Street no 25,Kolkata,700156</p>
                                <p className='text-gray-700 text-sm flex items-center mt-1'><PhoneOutgoingIcon size={15} className='mr-2' /> <span className='text-gray-500'>1234567890</span></p>
                            </div>
                            <button className='text-blue-500 p-1 rounded text-sm border'>
                                Change
                            </button>
                        </div>
                    </div>
                    <div>
                        <h2 className='font-semibold text-lg mt-4'>Order Items</h2>
                        {
                            productLoading ? <div className='flex flex-col gap-y-2'>
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                            </div> : (<div>
                                {
                                    orderDetails?.products?.map((product: any) => (
                                        <OrderItemsCard key={product.id} product={product} />
                                    ))}
                            </div>)
                        }

                        {
                            !productLoading && orderDetails?.products?.length === 0 && <p className='text-red-400 text-center'>No products found</p>
                        }

                    </div>
                    <div className='my-2'>
                        <p className='font-semibold text-md text-gray-400'>Have Coupon code?</p>
                        <div className='flex items-center border p-1 rounded-md mt-1'>
                            <input type="text" className='p-1 rounded-sm w-full ring-0' placeholder='Ex: APPLE' value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                            <button className='text-blue-500 p-1 rounded text-sm uppercase' onClick={applyCoupon}>Apply</button>
                        </div>
                        {
                            couponError && <p className='text-red-400 my-1'>{couponError}</p>
                        }
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>Order Summary</p>
                        <p className='flex justify-between items-center'>
                            <span className='text-gray-500'>Sub Total</span>
                            <span className='text-gray-400'>₹{subTotal}</span>
                        </p>
                        <p className='flex justify-between items-center'>
                            <span className='text-gray-500'>Delivery Fees</span>
                            <span className='text-gray-400'>₹{deliveryFees}</span>
                        </p>
                        <p className='flex justify-between items-center'>
                            <span className='text-gray-500'>Discount</span>
                            <span className='text-gray-400'>₹{discount}</span>
                        </p>
                        <p className='flex justify-between items-center'>
                            <span className='text-gray-500'>Total</span>
                            <span className='text-gray-400'>₹{total}</span>
                        </p>
                    </div>
                    {
                        orderDetails?.products?.length !== 0 && <section className='flex justify-between items-center mt-4'>
                            <div>
                                <h1>Pay</h1>
                                <p className='text-gray-400'>₹{total}</p>
                            </div>
                            <div>
                                <button className='bg-purple-500 text-white px-4 py-2 rounded' onClick={() => setActivePage("payment")}>Continue</button>
                            </div>
                        </section>
                    }

                </div>
            }
            {
                activePage === "payment" && <PaymentPage />
            }
            {
                activePage === "success" && <PaymentStatus onClose={closeModal} />
            }
        </main>
    )
}
