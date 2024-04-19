'use client'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';

export default function Question() {

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
  }, [isLoggedIn]);
  

  return (
    <div className="bg-white py-24 sm:py-32">
            
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                
                <div className="mx-auto max-w-2xl lg:mx-0">
                    
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">1:1문의하기</h2>
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        {isLoggedIn ? <div><a
          href="/question/create"
          className = "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> 
          문의작성 </a>
          <a
          href="/question/list"
          className = "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> 
          문의내역 </a></div> : null}
      
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>자주 묻는 질문 1</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                자주 묻는 질문 1에 대한 간략한 답변입니다. 질문이 뭔지는 저도 잘 몰라요 아직
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>자주 묻는 질문 2</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                자주 묻는 질문 2에 대한 답변이에용 여기도 질문에 뭘 넣을지 아직 몰라요
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>자주 묻는 질문 3</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                자주 묻는 질문 2에 대한 답변이에용 여기도 질문에 뭘 넣을지 아직 몰라요
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>자주 묻는 질문 4</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                자주 묻는 질문 2에 대한 답변이에용 여기도 질문에 뭘 넣을지 아직 몰라요
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
    </div>
    </div>
  )
}
