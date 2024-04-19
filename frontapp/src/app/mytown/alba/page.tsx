'use client'
import {useEffect, useState} from "react"

const posts = [
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    // More posts...
  ]
  
  export default function Alba() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const params = 'alba';

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

    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetchArticle()
    }, [])

    const fetchArticle = () => {
        fetch(`http://localhost:8090/api/v1/articles/list/${params}`)
            .then(row => row.json())
            .then(row => setArticles(row.data.articles))
    }

    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">아르바이트</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              아르바이트 구하시는 사장님, 일 하고 싶은 분들!
            </p>
            <a
          href={`/article/create/${'alba'}`}
          className = "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> 
          게시글 작성하기 </a>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={article.createDate} className="text-gray-500">
                    {article.createDate}
                  </time>
                  <a
                    href={`/article/${article.id}`}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {article.category}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={`/article/${article.id}`}>
                      <span className="absolute inset-0" />
                      {article.title}
                      <p className="text-blue-600">(댓글 : {article.reviews.length})</p>
                      <h3 className="mt-4 text-sm text-gray-700">동네 : {article.location}</h3>
                      <img
                                src={article.imgPath}
                                alt={article.imgPath}
                                className="h-full w-full object-cover object-center group-hover:opacity-75"/>
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{article.content}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={article.author.profileImg} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={`/profile/${article.author.id}`}>
                        <span className="absolute inset-0" />
                        {article.author.nickname}
                      </a>
                    </p>
                    <p className="text-gray-600">{article.author.email}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  }
  