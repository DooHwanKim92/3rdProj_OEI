'use client'

import { useState } from 'react'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              당신 근처의 <br/>지역 생활 커뮤니티
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            동네라서 가능한 모든 것 오이에서 가까운 이웃과 함께해요.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/login"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                시작하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
