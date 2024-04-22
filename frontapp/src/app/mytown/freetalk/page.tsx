'use client'
import {useEffect, useState} from "react"
  
  export default function FreeTalk() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [kw, setKw] = useState({keyword:''});

    const params = 'freetalk';

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
        fetch(`http://localhost:8090/api/v1/articles/list/${params}`,{
          credentials: 'include',
        })
            .then(row => row.json())
            .then(row => setArticles(row.data.articles))
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const response = await fetch(`http://localhost:8090/api/v1/articles/search/${params}/${kw.keyword}`, {
          method: 'GET',
      })
          .then(row => row.json())
          .then(row => setArticles(row.data.articles))
  }

  const handleChange = (e) => {
      const { name, value } = e.target;
      setKw({ ...kw, [name]: value });
  };

    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">자유게시판</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              우리 동네 최근 소식이 모두 여기에!
            </p>
            <a
          href={`/article/create/${'freetalk'}`}
          className = "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> 
          게시글 작성하기 </a>
          </div>
          <form onSubmit={handleSubmit}>
  <input
    type="search"
    className="relative m-0 block flex-auto rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary"
    placeholder="게시글 검색"
    aria-label="Search"
    name="keyword"
    id="exampleFormControlInput2"
    aria-describedby="button-addon2" 
    onChange={handleChange}
    />
    <button type="submit">
    <span
    className="flex items-center whitespace-nowrap px-3 py-[0.25rem] text-surface dark:border-neutral-400 dark:text-white [&>svg]:h-5 [&>svg]:w-5"
    id="button-addon2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  </span>
    </button>
    </form>
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
                      <p className="text-blue-600">(댓글 : {article.reviewLength}개)</p>
                      <h3 className="mt-4 text-sm text-gray-700">동네 : {article.location}</h3>
                      <h3 className="mt-4 text-sm text-gray-700">거리 : {article.distance}km</h3>
                      <img
                                src={article.imgPath}
                                alt={article.imgPath}
                                className="h-full w-full object-cover object-center group-hover:opacity-75"/>
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{article.content}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={article.authorProfileImg} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={`/profile/${article.authorId}`}>
                        <span className="absolute inset-0" />
                        {article.authorNickname}
                      </a>
                    </p>
                    <p className="text-gray-600">{article.authorEmail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  }
  