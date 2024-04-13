package proj3.oei.domain.member.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import proj3.oei.domain.member.dto.MemberDto;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.domain.member.service.MemberService;
import proj3.oei.global.resultData.RsData;
import proj3.oei.global.rq.Rq;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class ApiV1MemberController {
    private final MemberService memberService;
    private final Rq rq;

    @Getter
    public static class LoginRequestBody {
        @NotBlank
        private String username;
        @NotBlank
        private String password;
    }

    @Getter
    @AllArgsConstructor
    public static class LoginResponseBody {
        private MemberDto memberDto;
    }

    @PostMapping("/login")
    public RsData<LoginResponseBody> login (@Valid @RequestBody LoginRequestBody loginRequestBody) {

        RsData<MemberService.AuthAndMakeTokensResponseBody> authAndMakeTokensRs = memberService.authAndMakeTokens(loginRequestBody.getUsername(), loginRequestBody.getPassword());

        // 토큰 쿠키에 등록
        rq.setCrossDomainCookie("accessToken", authAndMakeTokensRs.getData().getAccessToken());
        rq.setCrossDomainCookie("refreshToken", authAndMakeTokensRs.getData().getRefreshToken());

        return RsData.of(
                authAndMakeTokensRs.getResultCode(),
                authAndMakeTokensRs.getMsg(),
                new LoginResponseBody(new MemberDto(authAndMakeTokensRs.getData().getMember()))
        );
    }

    @PostMapping("/logout")
    public RsData<Void> logout () {
        rq.removeCrossDomainCookie("accessToken");
        rq.removeCrossDomainCookie("refreshToken");

        return RsData.of("200", "로그아웃 성공");
    }

    @AllArgsConstructor
    @Getter
    public static class MeResponse {
        private final MemberDto memberDto;
    }


    @GetMapping("/me")
    public RsData<MeResponse> getMe () {
        Member member = rq.getMember();

        return RsData.of(
                "S-2",
                "성공",
                new MeResponse(new MemberDto(member))
        );
    }

    @Getter
    public static class SignUpRequestBody {
        @NotBlank
        private String username;

        @NotBlank
        private String password1;

        @NotBlank
        private String password2;

        @NotBlank
        private String email;

        @NotBlank
        private String address;

    }

    @Getter
    @AllArgsConstructor
    public static class SignUpResponseBody {
        private final Member member;
    }

    @PostMapping("/signup")
    public RsData<SignUpResponseBody> signUp(@Valid @RequestBody SignUpRequestBody signUpRequestBody, BindingResult bindingResult) {
        if(bindingResult.hasErrors()) {
            return RsData.of(
                    "F-10",
                    "입력하지 않은 곳이 존재합니다."
            );
        }
        if(this.memberService.findByUsername(signUpRequestBody.getUsername()).isPresent()) {
            return RsData.of(
                    "F-11",
                    "중복된 아이디입니다."
            );
        }
        if (!signUpRequestBody.getPassword1().equals(signUpRequestBody.getPassword2())) {
            return RsData.of(
                    "F-12",
                    "비밀번호와 비밀번호 확인이 일치하지 않습니다."
            );
        }
        if(this.memberService.findByEmail(signUpRequestBody.getEmail()).isPresent()) {
            return RsData.of(
                    "F-13",
                    "중복된 이메일입니다."
            );
        }
        this.memberService.join(signUpRequestBody.getUsername(), signUpRequestBody.getPassword1(), signUpRequestBody.getEmail(), signUpRequestBody.getAddress());
        Member member = this.memberService.findByUsername(signUpRequestBody.getUsername()).get();
        return RsData.of(
                "S-11",
                "회원가입 성공",
                new SignUpResponseBody(member)
        );
    }


}
