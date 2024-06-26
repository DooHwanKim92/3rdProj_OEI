'use client'

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { useParams, useRouter } from "next/navigation";

const products = [
  { name: '모임', description: '가까운 동네 이웃과 친해져보세요 😊', href: '/mytown/club', icon: ChartPieIcon },
  { name: '아르바이트', description: '구인/구직은 여기서 한 번에 🏃‍♂️', href: '/mytown/alba', icon: CursorArrowRaysIcon },
  { name: '부동산', description: '내가 살고 싶은 집이 모두 여기에 🏠', href: '/mytown/property', icon: FingerPrintIcon },
  { name: '프리토크', description: '자유롭게 이야기 해보세요 👂', href: '/mytown/freetalk', icon: SquaresPlusIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function HeaderSection() {

const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  fetch('http://localhost:8090/api/v1/members/me', {
            method: 'GET',
            credentials: 'include', // ← 이걸 해줘야 서버에서 유저 조회가 됨
        })
      .then(result => result.json())
      .then(result => {
          if (result.resultCode.startsWith('S')) {
            setIsLoggedIn(true);
          }
          if (result.resultCode.startsWith('F')) {
            setIsLoggedIn(false);
          }
      })
}, [isLoggedIn]); // 이펙트의 의존성 배열은 빈 배열로 설정하여 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 합니다.

  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    const response = await fetch("http://localhost:8090/api/v1/members/logout", {
        method: 'POST',
        credentials: 'include', // 핵심 변경점
        headers: {
            'Content-Type': 'application/json' 
        }
    })

    if (response.ok) {
        alert("로그아웃 성공")
        setIsLoggedIn(false);
        router.push("/")
    } else {
        alert("로그아웃 실패")
    }
  }
 

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
          OEI  
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              동네생활
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <a href="/article" className="text-sm font-semibold leading-6 text-gray-900">
            중고거래
          </a>
          <a href="/question" className="text-sm font-semibold leading-6 text-gray-900">
            문의하기
          </a>
          <a href="/chat" className="text-sm font-semibold leading-6 text-gray-900">
            메세지
          </a>
          <a href="/profile" className="text-sm font-semibold leading-6 text-gray-900">
            나의정보
          </a>

        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900">
            로그아웃 <span aria-hidden="true">&rarr;</span>
          </button> : <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
            로그인 <span aria-hidden="true">&rarr;</span>
          </a>}
          
          
          {/* <div>
            비상용버튼
            <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900">
              로그아웃 <span aria-hidden="true">&rarr;</span>
            </button>
          </div> */}
          
          
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        동네생활
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="/article"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  중고거래
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  메뉴1
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  메뉴2
                </a>
              </div>
              <div className="py-6">
                <a
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  로그인
                </a>
                <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900">
                  로그아웃 <span aria-hidden="true">&rarr;</span>
                </button>
                
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}