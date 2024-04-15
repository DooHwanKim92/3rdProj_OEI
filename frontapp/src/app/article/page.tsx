'use client'
import Link from "next/link"
import {useEffect, useState} from "react"

const products = [
    {
        id: 1,
        name: '와인병 팝니다.',
        href: '#',
        price: '5,000원',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper' +
                '.'
    }, {
        id: 2,
        name: '텀블러 팔아용',
        href: '#',
        price: '3,000원',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.'
    }, {
        id: 3,
        name: '메모장',
        href: '#',
        price: '500원',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.'
    }, {
        id: 4,
        name: '개쩌는 연필 팔아유',
        href: '#',
        price: '1,500원',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.'
    }, {
        id: 5,
        name: '개쩌는 연필 팔아유',
        href: '#',
        price: '1,500원',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.'
    }, {
        id: 6,
        name: '개쩌는 연필 팔아유',
        href: '#',
        price: '1,500원',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.'
    },
    // More products...
]

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
        {/* <ul> 게시물 리스트 {
            articles.map(
                (article) => <li key={article.id}>
                    <Link href={`/article/${article.id}`}>{article.id}</Link>
                    / {article.category}
                    / {article.title}
                    / {article.author.username}
                    <img src={article.imgPath}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"/>

                </li>
            )
        } </ul> */}
            <a
          href="/article/create "
          className = "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> 
          게시글 작성하기 </a>
            <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2 > 
        <div
            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {
                articles.map((article) => (
                    <a key={article.id} href={`/article/${article.id}`} className="group">
                        <div
                            className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img
                                src={article.imgPath}
                                alt={article.imgPath}
                                className="h-full w-full object-cover object-center group-hover:opacity-75"/>
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">{article.author.username}</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">{article.title}</p>
                    </a>
                ))
            }
        </div>
    </div>
</div>
    </>
    )
}