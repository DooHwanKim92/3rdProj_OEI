package proj3.oei.global;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import proj3.oei.domain.member.controller.ApiV1MemberController;
import proj3.oei.domain.member.dto.MemberDto;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.global.resultData.RsData;
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


}
