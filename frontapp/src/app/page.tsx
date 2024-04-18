'use client'
import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";

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

export default function Home() {

  const location = useGeolocation();

  const [nowLocation, setNowLocation] = useState({lat:'', lon:""});

  useEffect(() => {
    // 위치 정보가 업데이트될 때마다 fetchLocation 함수를 호출
    if (location.loaded) {
      setNowLocation({...nowLocation, lat:location.coordinates.lat, lon:location.coordinates.lon})
    }
      fetch('http://localhost:8090/api/v1/', {
                method: 'POST',
            })
  }, [location]);

  const router = useRouter();

  // 로그인했으면 /article 페이지로 바로 이동
  const onClick = () => {
    fetch('http://localhost:8090/api/v1/members/me', {
      method: 'GET',
      credentials: 'include',
    })
      .then(result => result.json())
      .then(result => {
        if (result.resultCode.startsWith('S')) {
          router.push("/article");
        }
        if (result.resultCode.startsWith('F')) {
          router.push("/login");
        }
      });
  };

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              당신 근처의 <br/>지역 생활 커뮤니티
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            동네라서 가능한 모든 것 오이에서 가까운 이웃과 함께해요.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={onClick}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
