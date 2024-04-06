'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

const products = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '#',
      price: '$48',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: '#',
      price: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: '#',
      price: '$89',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'Machined Mechanical Pencil',
      href: '#',
      price: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    // More products...
  ]

export default function Article () {

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
            <ArticleForm fetchArticle={fetchArticle} />
            <ul>
                게시물 리스트
                {articles.map((article) => <li> <Link href={`/article/${article.id}`}>{article.id}</Link> / {article.title}
                                                
                                                
                                            </li>)}
            </ul>
            <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
        </>
    )
}

// 게시글 등록
function ArticleForm ({fetchArticle}) {

    const [article, setArticle] = useState({title: '', content: ''})

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 기존 button의 submit 기능을 막고 아래 함수를 실행시킨다.

        const response = await fetch("http://localhost:8090/api/v1/articles", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article)
        });

        if (response.ok) {
            alert('게시물이 성공적으로 등록되었습니다.');
            fetchArticle()
            // 변경된 articleList 재정렬, Article()에서 매개변수로 받아온 함수
        } else {
            alert('게시물 등록에 실패했습니다.');
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
        console.log({ ...article, [name]: value })
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={article.title} onChange={handleChange} />
                <input type="text" name="content" value={article.content} onChange={handleChange}/>
                <button type="submit">등록</button>
            </form>
        </>
    )
}