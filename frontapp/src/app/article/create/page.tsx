'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import GetCategories from "./category";


// 게시글 등록
export default function ArticleForm () {

    const [categories, setCategory] = useState([])
    
    useEffect(() => {
        fetchArticle()
    }, [])

    const fetchArticle = () => {
        fetch("http://localhost:8090/api/v1/categories")
            .then(row => row.json())
            .then(row => setCategory(row.data.categories))
    }

    const [article, setArticle] = useState({category: '', title: '', content: ''})

    const router = useRouter();

  const handleSubmit = async (e) => {
      e.preventDefault();
      // 기존 button의 submit 기능을 막고 아래 함수를 실행시킨다.

      const response = await fetch("http://localhost:8090/api/v1/articles", {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(article)
      });

      if (response.ok) {
          alert('게시물이 성공적으로 등록되었습니다.');
          router.push("/article")
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
        <div className="bg-white mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                게시글 작성하기
                </h2>
            </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">

            카테고리
            <select name="category" aria-label="Default select example" 
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            onChange={handleChange}>
                <option value="">카테고리 선택</option>
                {categories.map((category) => <option key={category.id} value={category.name}>{category.name} 
                                            </option>)}
            </select>
            <br></br>
            카테고리 ㅇㅇ
            <GetCategories/>
            <br></br>

            제목
            <input type="text" name="title" 
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={article.title} onChange={handleChange} />
            <br></br>
            내용
            <textarea name="content" 
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={article.content} onChange={handleChange}/>
            <br></br>
            사진
            <br></br>
            <button type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >등록</button>
        </form>
        <div>
            <a href="/article"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >목록</a>
        </div>
    </div>
    )
}


// const TestComponent = () => {
//   // 초기값은 프로필 사진 없을 때 넣을 기본 이미지
//   const [image, setImage] = useState('/blank.png')
  
//   const fileInput = useRef(null)
  
//   const handleImage = async (e: any) => {
//     // 내가 받을 파일은 하나기 때문에 index 0값의 이미지를 가짐
// 	const file = e.target.files[0]
//     if(!file) return
    
//     // 이미지 화면에 띄우기
//     const reader = new FileReader()
//     // 파일을 불러오는 메서드, 종료되는 시점에 readyState는 Done(2)이 되고 onLoad 시작
//     reader.readAsDataURL(file)
//     read.onLoad = (e: any) => {
//     	if(reader.readyState === 2) {
//         	// 파일 onLoad가 성공하면 2, 진행 중은 1, 실패는 0 반환
//           	setImage(e.target.result)
//         }
//     }
    
//     // 이미지 파일을 formData에 담아서 서버에 보내고, 서버는 받은 이미지 파일을 S3에 저장하고 받은 URL 값을 클라이언트로 반환해준다.
//     const formData = new FormData()
//     formData.append('image', file)
//     try {
//       // 
//     	const imageRes = await (/*api 부분은 생략*/).post('/image', formData, {
//           // 헤더에 보낼 파일의 타입이 multipart라 말해줘야 한다. 이미지 파일은 크기 때문에 부분으로 나눠서 보내기 때문
//         	headers: { "Content-Type": "multipart/form-data" }
//         })
//         // 반환받은 이미지 URL, 원하는 곳에 사용하면 된다. 나 같은 경우 회원가입 할 때, 회원정보와 같이 한 번에 서버로 보내줬다.
//         const image_URL = imageRes.data.imageURL
//     } catch (e) {
//     	console.error(e.response)
//     }
    
//   }
  
//   return (
//   	<>	
//     	// 이미지 클릭했을 때 이미지 업로드, 숨긴 input의 reference를 fileInput으로 설정해서 가능
//     	<a href="#" onClick={() => fileInput.current.click() } >
//     		<Image src={image} width={150} height={150} alt="프로필 이미지" />
//     	</a>

// 		// 이미지 업로드 버튼, htmlFor값을 숨긴 input의 id값으로 설정
// 		<label htmlFor="input-file" >이미지 선택</label>

// 		// 실제 이미지 받을 file 타입의 input
// 		<input type="file" name="image_URL" id="input-file" accept='image/*'
// 		style={{ display : "none" }} ref={fileInput} onChange={handleImage} />
//     </>
//   )
// }