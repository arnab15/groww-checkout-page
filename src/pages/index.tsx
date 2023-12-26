import { Inter } from 'next/font/google'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import CheckoutPage from '@/components/payment/CheckoutPage'
import { useOrder } from '@/stores/orderStore'
import { useBrand } from '@/stores/brandStore'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { getBrandDetails } = useBrand()
  const [isOpen, setIsOpen] = useState(false)
  const { resetData } = useOrder()

  function closeModal() {
    setIsOpen(false)
    resetData()
  }

  function openModal() {
    setIsOpen(true)
  }
  useEffect(() => { getBrandDetails() }, [])
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md  px-4 py-2 text-sm font-medium text-white bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Complete Checkout
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md md:w-max transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <CheckoutPage closeModal={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
