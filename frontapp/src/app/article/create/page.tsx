'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 게시글 등록
export default function ImgUploadTest() {
  const [categories, setCategory] = useState([]);
  const [article, setArticle] = useState({ category: "", title: "", content: "", img: null });
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:8090/api/v1/categories")
      .then((response) => response.json())
      .then((data) => setCategory(data.data.categories))
      .catch((error) => console.error("카테고리 로드 에러:", error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", article.category);
    formData.append("title", article.title);
    formData.append("content", article.content);
    formData.append("img", article.img);

    try {
      const response = await fetch("http://localhost:8090/api/v1/articles", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        alert("게시물이 성공적으로 등록되었습니다.");
        router.push("/article");
      } else {
        alert("게시물 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시물 등록 에러:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setArticle({ ...article, img: imageFile });
  };

  return (
    <div className="bg-white mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          게시글 작성하기
        </h2>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        카테고리
        <select
          name="category"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          onChange={handleChange}
        >
          <option value="">카테고리 선택</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <br></br>
        제목
        <input
          type="text"
          name="title"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={article.title}
          onChange={handleChange}
        />
        <br></br>
        내용
        <textarea
          name="content"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={article.content}
          onChange={handleChange}
        />
        <br></br>
        사진
        <input
          type="file"
          name="img"
          accept="image/*"
          onChange={handleImageChange}
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
          href="/article"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          목록
        </a>
      </div>
    </div>
  );
}
