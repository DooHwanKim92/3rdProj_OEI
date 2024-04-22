package proj3.oei.domain.member.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import proj3.oei.domain.lastlocation.entity.LastLocation;
import proj3.oei.domain.lastlocation.service.LastLocationService;
import proj3.oei.domain.member.dto.MemberDto;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.domain.member.service.MemberService;
import proj3.oei.global.resultData.RsData;
import proj3.oei.global.rq.Rq;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class ApiV1MemberController {
    private final MemberService memberService;
    private final LastLocationService lastLocationService;
    private final Rq rq;

    @Getter
    public static class LoginRequestBody {
        @NotBlank
        private String username;
        @NotBlank
        private String password;

        private String lat;

        private String lon;
    }

    @Getter
    @AllArgsConstructor
    public static class LoginResponseBody {
        private MemberDto memberDto;
    }

    @PostMapping("/login")
    public RsData<LoginResponseBody> login (@Valid @RequestBody LoginRequestBody loginRequestBody) {

        Optional<Member> member = this.memberService.findByUsername(loginRequestBody.getUsername());
        if(member.isEmpty()) {
            return RsData.of(
                    "F-1",
                    "존재하지 않는 유저입니다."
            );
        }

        RsData<MemberService.AuthAndMakeTokensResponseBody> authAndMakeTokensRs = memberService.authAndMakeTokens(loginRequestBody.getUsername(), loginRequestBody.getPassword());

        // 토큰 쿠키에 등록
        rq.setCrossDomainCookie("accessToken", authAndMakeTokensRs.getData().getAccessToken());
        rq.setCrossDomainCookie("refreshToken", authAndMakeTokensRs.getData().getRefreshToken());

        LastLocation lastLocation = member.get().getLastLocation();

        if(lastLocation == null) {
            lastLocation = this.lastLocationService.createLastLocation(member.get(),loginRequestBody.getLat(), loginRequestBody.getLon());
        }

        this.memberService.saveLastLocation(member.get(),lastLocation);

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

        if (member == null) {
            return RsData.of(
                    "F-2",
                    "유저 정보를 받아올 수 없습니다."
            );
        }

        return RsData.of(
                "S-2",
                "성공",
                new MeResponse(new MemberDto(member))
        );
    }

    @GetMapping("{id}")
    public RsData<MeResponse> getProfile(@PathVariable(value = "id") Long id) {
        Optional<Member> member = this.memberService.findById(id);
        return member.map(value -> RsData.of(
                "S-2",
                "성공",
                new MeResponse(new MemberDto(value))
        )).orElse(null);
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
        private String nickname;

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
    public RsData<SignUpResponseBody> signUp(@Valid @NotBlank @RequestParam(value = "username") String username,
                                             @NotBlank @RequestParam(value = "password1") String password1,
                                             @NotBlank @RequestParam(value = "password2") String password2,
                                             @NotBlank @RequestParam(value = "email") String email,
                                             @NotBlank @RequestParam(value = "address") String address,
                                             @NotBlank @RequestParam(value = "nickname") String nickname,
                                             @RequestParam(value = "profileImg") MultipartFile img) throws IOException {

        if(this.memberService.findByUsername(username).isPresent()) {
            return RsData.of(
                    "F-11",
                    "중복된 아이디입니다."
            );
        }
        if(this.memberService.findByNickname(nickname).isPresent()) {
            return RsData.of(
                    "F-11-0",
                    "중복된 닉네임입니다."
            );
        }
        if (!password1.equals(password2)) {
            return RsData.of(
                    "F-12",
                    "비밀번호와 비밀번호 확인이 일치하지 않습니다."
            );
        }
        if(this.memberService.findByEmail(email).isPresent()) {
            return RsData.of(
                    "F-13",
                    "중복된 이메일입니다."
            );
        }
        this.memberService.join(username, password1, email, address, nickname, img);
        Member member = this.memberService.findByUsername(username).get();
        return RsData.of(
                "S-11",
                "회원가입 성공",
                new SignUpResponseBody(member)
        );
    }


}
