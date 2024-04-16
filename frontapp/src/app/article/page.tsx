'use client'
import Link from "next/link"
import {useEffect, useState} from "react"

export default function Article() {

    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetchArticle()
    }, [])

    const fetchArticle = () => {
        fetch("http://localhost:8090/api/v1/articles")
            .then(row => row.json())
            .then(row => setArticles(row.data.articles))
    }

    return (
        <> 
            <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2 >
        <a
          href="/article/create "
          className = "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> 
          게시글 작성하기 </a>
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
                        <h3 className="mt-4 text-sm text-gray-700">작성자 : {article.author.username}</h3>
                        <h3 className="mt-4 text-sm text-gray-700">{article.location}</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">[{article.category}] / {article.title}</p>
                        </div>
                ))
            }
        </div>
    </div>
</div>
    </>
    )
}