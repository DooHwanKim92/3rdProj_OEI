package proj3.oei.global;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import proj3.oei.global.Dto.NowLocationDto;
import proj3.oei.global.rq.Rq;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class HomeController {

    private final Rq rq;

    @AllArgsConstructor
    @Getter
    public static class IsLoggedInResponse {
        private boolean trueOrFalse;
    }

    // 메인페이지에서 현재 위치 조회
    @PostMapping("")
    public NowLocationDto getNowLocation(@RequestBody NowLocationDto nowLocationDto) {

        return nowLocationDto;

    }


}
