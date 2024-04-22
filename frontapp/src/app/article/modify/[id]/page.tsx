'use client'
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// 위,경도 위치 조회
interface locationType {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
  error?: { code: number; message: string };
}

const useGeolocation = () => {
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0, }
  })

  // 성공에 대한 로직
  const onSuccess = (location: { coords: { latitude: number; longitude: number; }; }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude, // 위도
        lng: location.coords.longitude, // 경도
      }
    })
  }

  // 에러에 대한 로직
  const onError = (error: { code: number; message: string; }) => {
    setLocation({
      loaded: true,
      error,
    })
  }

  useEffect(() => {
    // navigator 객체 안에 geolocation이 없다면
    // 위치 정보가 없는 것.
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [])

  return location;
}
// 위,경도 위치 조회 끝



// 게시글 등록
export default function CreateArticleForm() {
  const params = useParams();
  const [article, setArticle] = useState({ title: "", content: ""});
  const router = useRouter();
  // 위치 조회 함수 호출
  const location = useGeolocation();

  useEffect(() => {
    fetchArticle()
  }, []);

  const fetchArticle = () => {
    fetch(`http://localhost:8090/api/v1/articles/${params.id}`)
                            .then(row => row.json())
                            .then(row => {
                                setArticle(row.data.article)
                            })
    // 해당 URL로 응답받은 data를 json객체에 담는다. (백엔드 통신)
    // json객체에 담은 data를 다시 article에 set 한다.
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("content", article.content);
    formData.append("img", article.img);
    formData.append("located", article.located);

    try {
      const response = await fetch(`http://localhost:8090/api/v1/articles/${params.id}`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        alert("게시물 수정 성공.");
        router.push("/article");
      } else {
        alert("게시물 수정 실패.");
      }
    } catch (error) {
      console.error("게시물 수정 에러:", error);
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

  useEffect(() => {
    // 위치 정보가 업데이트될 때마다 fetchLocation 함수를 호출
    if (location.loaded) {
        fetchLocation(location.coordinates.lat, location.coordinates.lng);
    }
}, [location]);

  function fetchLocation(lat, lon) {
  
    // 조회한 위,경도로 카카오 API 요청 보내서 주소 찾기
    const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
  
    fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`, {
      method: 'GET',
      headers: {
        'Authorization': `KakaoAK ${KAKAO_API_KEY}`
      }
    })
      .then(row => row.json())
      .then(row => setArticle(prevState => ({
        ...prevState,
        located: row.documents[0].address.region_3depth_name
      })));
      // row.road_address.region_3depth_name
  }
  
  return (
    <div className="bg-white mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          게시글 수정하기
        </h2>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          수정
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