'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function QuestionForm() {

  const [question, setQuestion] = useState({ title: "", content: ""});
  const router = useRouter();
  // 위치 조회 함수 호출

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8090/api/v1/questions", {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(question)
    })

    if (response.ok) {
        alert("문의 등록 성공.")
        router.push("/question")
    } else {
        alert("문의 등록 실패.")
    }
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };
  
  return (
    <div className="bg-white mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          문의 작성하기
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        제목
        <input
          type="text"
          name="title"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={question.title}
          onChange={handleChange}
        />
        <br></br>
        내용
        <textarea
          name="content"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={question.content}
          onChange={handleChange}
        />
        <br></br>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          등록
        </button>
      </form>
      <div>
        <a
          href="/question"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          돌아가기
        </a>
      </div>
    </div>
  );
}