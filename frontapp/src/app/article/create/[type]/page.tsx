'use client'
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

// 위,경도 위치 조회
interface locationType {
  loaded: boolean;
  coordinates?: { lat: number; lon: number };
  error?: { code: number; message: string };
}

const useGeolocation = () => {
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: { lat: 0, lon: 0, }
  })

  // 성공에 대한 로직
  const onSuccess = (location: { coords: { latitude: number; longitude: number; }; }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude, // 위도
        lon: location.coords.longitude, // 경도
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
export default function TypeArticeForm() {

  const [article, setArticle] = useState({ category: "", title: "", content: "", img: null ,located:"",lat:"" ,lon:""});
  const router = useRouter();
  // 위치 조회 함수 호출
  const location = useGeolocation();
  const params = useParams();

  let categories = [];

  if(params.type === 'trade') {
    categories = [
      {id : 1,name : '판매',},{id : 2,name : '구매',},{id : 3,name : '대여',},{id : 4,name : '무료나눔',}
    ]
  } else if (params.type === 'club') {
    categories = [
      {id : 1,name : '홍보',},{id : 2,name : '활동',},{id : 3,name : '문의',}
    ]
  } else if (params.type === 'alba') {
    categories = [
      {id : 1,name : '구인',},{id : 2,name : '구직',},{id : 3,name : '대타',}
    ]
  } else if (params.type === 'freetalk') {
    categories = [
      {id : 1,name : '정보공유',},{id : 2,name : '찾습니다',},{id : 3,name : '수다',}
    ]
  } else if (params.type === 'property') {
    categories = [
      {id : 1,name : '월세',},{id : 2,name : '전세/반전세',},{id : 3,name : '매매',}
    ]
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", article.category);
    formData.append("title", article.title);
    formData.append("content", article.content);
    formData.append("img", article.img);
    formData.append("located", article.located);
    formData.append("lat", article.lat);
    formData.append("lon", article.lon);

    try {
      const response = await fetch(`http://localhost:8090/api/v1/articles/${params.type}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok && params.type === 'trade') {
        alert("게시물이 성공적으로 등록되었습니다.");
        router.push("/article");
      } else if (response.ok && params.type === 'club') {
        alert("게시물이 성공적으로 등록되었습니다.");
        router.push("/mytown/club");
      } else if (response.ok && params.type === 'property') {
        alert("게시물이 성공적으로 등록되었습니다.");
        router.push("/mytown/property");
      } else if (response.ok && params.type === 'alba') {
        alert("게시물이 성공적으로 등록되었습니다.");
        router.push("/mytown/alba");
      } else if (response.ok && params.type === 'freetalk') {
        alert("게시물이 성공적으로 등록되었습니다.");
        router.push("/mytown/freetalk");
      }
      else {
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

  useEffect(() => {
    // 위치 정보가 업데이트될 때마다 fetchLocation 함수를 호출
    if (location.loaded) {
        fetchLocation(location.coordinates.lat, location.coordinates.lon);
        setArticle({...article, lat:location.coordinates.lat, lon:location.coordinates.lon})
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