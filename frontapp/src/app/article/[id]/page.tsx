'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PaperClipIcon } from '@heroicons/react/20/solid'


export default function ArticleDetail() {
    
    const params = useParams();
    // @PathVariable 같은 놈임

    const router = useRouter();

    const [article, setArticle] = useState({})

    const [reviews, setReviews] = useState([])

    const [member, setMember] = useState({})

    const fetchMember = () => {
      fetch("http://localhost:8090/api/v1/members/me",{
          method: 'GET',
          credentials: 'include', // 핵심 변경점
            })
            .then(row => row.json())
            .then(row => {
              if (row.resultCode.startsWith('S')) {
                setMember(row.data.memberDto)
              }          
                          })
    }

    const fetchArticle = () => {
        fetch(`http://localhost:8090/api/v1/articles/${params.id}`)
                                .then(row => row.json())
                                .then(row => {
                                    setArticle(row.data.article)
                                    setReviews(row.data.article.reviews)
                                })
        // 해당 URL로 응답받은 data를 json객체에 담는다. (백엔드 통신)
        // json객체에 담은 data를 다시 article에 set 한다.
    }

    // 게시글 삭제
    const deleteArticle = async (e) => {
        e.preventDefault();
        // 기존 button의 submit 기능을 막고 아래 함수를 실행시킨다.

        const response = await fetch(`http://localhost:8090/api/v1/articles/${params.id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('게시물 삭제 완료.');
            router.push("/article")
        } else {
            alert('게시물 삭제 실패.');
        }

    }

    useEffect(() => {
        fetchArticle()
        fetchMember()
    }, [])


    // 댓글 등록 함수
    const [review, setReview] = useState({content: ''})

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8090/api/v1/reviews/${params.id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review)
        });

        if (response.ok) {
            alert('댓글 등록 성공.');
            fetchArticle()
            setReview(prevState => ({
                ...prevState,
                content: ''
              }))
            router.push(`/article/${params.id}`)
        } else {
            alert('댓글 등록 실패.');
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
        console.log({ ...review, [name]: value })
    }
    
    return (
        <>
        <div className = "bg-white mx-auto max-w-2xl py-32 sm:py-48 lg:py-56" > 
            <div>
              <h1>[{article.category}] / {article.title}</h1>
              <h5>[조회수] / {article.hit}</h5>
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={article.authorProfileImg} alt="" />
              <span>작성자 : <a className="text-blue-600" href={`/profile/${article.authorId}`}>{article.authorNickname}</a></span>
                {member.id === article.authorId ? 
                <div>
                <a href={`/article/modify/${article.id}`}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >수정</a>
                <button onClick={deleteArticle}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >삭제</button>
                    </div> : <div></div>}
            </div>
            <div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6">
            <dt className="text-sm font-medium leading-6 text-gray-900">
            <img
                                src={article.imgPath}
                                alt={article.imgPath}
                                className="h-full w-full object-cover object-center"/>
            </dt>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">가격? 뭐 추가정보 이런거</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">게시글 내용(content)</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {article.content}
            </dd>
          </div>
          <div className="col-span-full">
          <form onSubmit={handleSubmit}>
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                댓글 {reviews.length}개
              </label>
              <div className="mt-2">
              
                <textarea
                  // 댓글 작성 추가 예정
                  name="content" 
                  value={review.content} 
                  onChange={handleChange}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                등록
            </button>
            </form>
            </div>
        </dl>
        <ul role="list" className="divide-y divide-gray-100">
      {reviews.map((review) => (
        <li key={review.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={review.author.profileImg} alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{review.content}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500"><a className="text-blue-600" href={`/profile/${review.author.id}`}>{review.author.nickname}</a></p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{review.createDate}</p>
          </div>
        </li>
      ))}
    </ul>
      </div>
    </div>
    </div>
        </>
    );
}