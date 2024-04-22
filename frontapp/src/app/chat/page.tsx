'use client'

import { useEffect, useState, Fragment } from "react"
import { Dialog, Transition } from '@headlessui/react'
import { useRouter, useParams } from "next/navigation";
  
export default function ChatList() {

    const router = useRouter();

    const [messages, setMessages] = useState([])

    const [replyMessage, setReplyMessage] = useState({ title: "", content: "", senderName:""});

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

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      console.log({ ...replyMessage, [name]: value });
      setReplyMessage({ ...replyMessage, [name]: value });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const response = await fetch("http://localhost:8090/api/v1/messages/reply", {
          method: 'POST',
          credentials: "include",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(replyMessage)
      })
  
      if (response.ok) {
          alert("쪽지 발송 성공.")
          setIsOpen(false)
          setReplyMessage(prevState => ({
              ...prevState,
              content: '',
              title:''
            }))
          router.push("/chat");
      } else {
          alert("쪽지 발송 실패.")
          setIsOpen(false)
          setReplyMessage(prevState => ({
              ...prevState,
              content: '',
              title:''
            }))
          router.push("/chat");
      }
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
                  {message.type === 'send' ? <div>[발신]받는사람 : {message.receiverName}
                  

           
          </div>
                 :
                 <div>[수신]보낸사람 : {message.senderName}
                 
                 <div className="inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={openModal}
              className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              답장하기
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
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        답장하기
                      </Dialog.Title>
                      <form onSubmit={handleSubmit}>
                      <div className="mt-2">
                        <input 
                        type="text" 
                        name="senderName" 
                        value={message.senderName}
                        // style={{ display: 'none' }}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <p className="text-sm text-gray-500">
                        제목
                        <input
                            type="text"
                            name="title"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={replyMessage.title}
                            onChange={handleChange}
                        />
                        내용
                        <textarea
                            name="content"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={replyMessage.content}
                            onChange={handleChange}
                        />
                        </p>
                      </div>
    
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          닫기
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          보내기
                        </button>
                      </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
                 
                 </div>}
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
  