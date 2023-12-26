import Image from 'next/image'
import React, { FC } from 'react'
interface OrderItemsCardProps {
    product: any
}
const OrderItemsCard: FC<OrderItemsCardProps> = ({ product }) => {
    return (
        <div key={product.id} className='flex items-center my-2 shadow-md p-2 rounded-md'>
            <div className='mr-3'>
                <Image alt="product-image" src={product.image} width={60} height={60} />
            </div>
            <div>
                <p className='text-sm text-gray-500'>{product.title}</p>
                <p className='text-sm font-semibold text-gray-400'>{`${product.quantity} x ${product.price}`}</p>
            </div>
        </div>
    )



}

export default OrderItemsCard