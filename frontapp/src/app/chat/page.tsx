'use client'

import { useEffect, useState } from "react"
  
export default function ChatList() {

    const [messages, setMessages] = useState([])

    useEffect(() => {
        fetchArticle()
    }, [])

    const fetchArticle = () => {
        fetch('http://localhost:8090/api/v1/messages',{
          method: 'GET',
          credentials: 'include',
        })
            .then(row => row.json())
            .then(row => setMessages(row.data.messages))
    }

    return (

      <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">메세지목록</h2>
                    <a
          href="#"
          className = "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> 
          예비용 버튼 </a>
                </div>
            </div>
        </div>
        <ul role="list" class="divide-y divide-gray-100">
      
        {messages.map((message) => (
          <li key={message.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
            {message.type === 'send' ?  <img className="h-12 w-12 flex-none rounded-full bg-gray-50" 
              src={message.receiverProfileImg}
              alt="" />: <img className="h-12 w-12 flex-none rounded-full bg-gray-50" 
              src={message.senderProfileImg}
              alt="" />}
              
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {message.type === 'send' ? <div>[발신]받는사람 : {message.receiverName}</div> : <div>[수신]보낸사람 : {message.senderName}</div>}
                  </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">쪽지제목 : {message.title}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">쪽지내용 : {message.content}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900"></p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {message.createDate}
                </p>
            </div>
          </li>
        ))}
      </ul>

        </div>
        </div>


        


      
    )
}
  