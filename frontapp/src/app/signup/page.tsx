'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import DaumPostcode from 'react-daum-postcode';
import { Modal, Button } from "antd";

export default function SignUp() {

  const router = useRouter();

  const [member, setMember] = useState({username: '', password1: '', password2 :'', email:'',address:''})

  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8090/api/v1/members/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(member)
    }).then(row => row.json())
      .then(row => {setError(row.resultCode)

        if (row.resultCode.startsWith('S')) {
          alert('회원가입 성공');
          router.push("/")
        } else {
          alert(row.msg);
        }
    });

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  }


  return (
    <div className="bg-white mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          회원가입
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-full">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                아이디
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={member.username} onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                중복확인</button>
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={member.email} onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                중복확인</button>
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                비밀번호
              </label>
              <div className="mt-2">
                <input
                  id="password1"
                  name="password1"
                  type="password"
                  autoComplete="password"
                  value={member.password1} onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                비밀번호 확인
              </label>
              <div className="mt-2">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  autoComplete="password"
                  value={member.password2} onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                주소
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  value={member.address} onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <a href="/" className="text-sm font-semibold leading-6 text-gray-900">
          돌아가기
        </a>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          가입하기
        </button>
      </div>
    </form>
    </div>
  )
}