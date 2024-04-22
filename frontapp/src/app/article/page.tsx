'use client'
import Link from "next/link"
import {useEffect, useState} from "react"

export default function Article() {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [kw, setKw] = useState({keyword:''});

    const params = 'trade';

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
        fetch(`http://localhost:8090/api/v1/articles/list/${params}`, {
            credentials: 'include',
        })
            .then(row => row.json())
            .then(row => setArticles(row.data.articles))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch(`http://localhost:8090/api/v1/articles/search/${params}/${kw.keyword}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(row => row.json())
            .then(row => setArticles(row.data.articles))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setKw({ ...kw, [name]: value });
    };

    return (
        <> 
        <div className="bg-white py-24 sm:py-32">
            
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                
                <div className="mx-auto max-w-2xl lg:mx-0">
                    
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">중고거래</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        사고, 팔고, 빌릴 수도 있어요
                    </p>
                    {isLoggedIn ? <a
          href={`/article/create/${'trade'}`}
          className = "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> 
          게시글 작성하기 </a> : null}
          <div className="relative flex">

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
  
</div>
                </div>
            </div>
        </div>

        
        
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"></div>
            <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2 >
        
        <div
            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {
                articles.map((article) => (
                    <div key={article.id} className="group">
                        <div
                            className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                              <a href={`/article/${article.id}`} >
                            <img
                                src={article.imgPath}
                                alt={article.imgPath}
                                className="h-full w-full object-cover object-center group-hover:opacity-75"/>
                                </a>
                        </div>
                        <p className="mt-1 text-lg font-medium text-gray-900">[{article.category}] {article.title}</p>
                        조회수 : {article.hit}
                        <p className="text-blue-600">(댓글 : {article.reviewLength}개)</p>
                        <h3 className="mt-4 text-sm text-gray-700">작성자 : <a className="text-blue-600" href={`/profile/${article.authorId}`}>{article.authorNickname}</a></h3>
                        <h3 className="mt-4 text-sm text-gray-700">동네 : {article.location}</h3>
                        <h3 className="mt-4 text-sm text-gray-700">거리 : {article.distance}km</h3>
                        </div>
                ))
            }
        </div>
    </div>
</div>
    </>
    )
}