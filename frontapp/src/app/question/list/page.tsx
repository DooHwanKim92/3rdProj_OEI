'use client'

import { useEffect, useState } from "react"

export default function QuestionList() {

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        fetchQuestions()
    }, [])

    const fetchQuestions = () => {
        fetch('http://localhost:8090/api/v1/questions', {
            method: 'GET',
            credentials: 'include', // ← 이걸 해줘야 서버에서 유저 조회가 됨
        })
            .then(row => row.json())
            .then(row => setQuestions(row.data.questions))
    }



    return (
        <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table
          class="min-w-full text-left text-sm font-light text-surface dark:text-white">
          <thead
            class="border-b border-neutral-200 font-medium dark:border-white/10">
            <tr>
              <th scope="col" class="px-6 py-4">번호</th>
              <th scope="col" class="px-6 py-4">제목</th>
              <th scope="col" class="px-6 py-4">작성일자</th>
              <th scope="col" class="px-6 py-4">답변유무</th>
            </tr>
          </thead>
          {questions.map((question) => (
          <tbody>
            <tr class="border-b border-neutral-200 dark:border-white/10">
              <td class="whitespace-nowrap px-6 py-4 font-medium">{question.id}</td>
              <td class="whitespace-nowrap px-6 py-4 font-medium">{question.title}</td>
              <td class="whitespace-nowrap px-6 py-4 font-medium">{question.createDate}</td>
              <td class="whitespace-nowrap px-6 py-4 font-medium">N</td>
            </tr>
                </tbody>
                ))}
        </table>
      </div>
    </div>
  </div>
</div>
    )
}