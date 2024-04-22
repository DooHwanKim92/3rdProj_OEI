package proj3.oei.domain.member.service;


import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import proj3.oei.domain.lastlocation.entity.LastLocation;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.domain.member.repository.MemberRepository;
import proj3.oei.global.exception.GlobalException;
import proj3.oei.global.jwt.JwtProvider;
import proj3.oei.global.resultData.RsData;
import proj3.oei.global.security.SecurityUser;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MemberService {

    @Value("${custom.fileDirPath}")
    private String fileDirPath;

    private final MemberRepository memberRepository;

    private final JwtProvider jwtProvider;

    private final PasswordEncoder passwordEncoder;

    public Member join(String username, String password, String email, String address, String nickname, MultipartFile img) throws IOException {
        String thumnailPath = "";
        String thunmail = "";

        if (img.isEmpty()) {
            thumnailPath = "/기본이미지.jpg";
        } else if (!img.isEmpty()) {
            thunmail = "member/" + UUID.randomUUID().toString() + ".jpg";
            File representImgFile = new File(fileDirPath + "/" + thunmail);
            img.transferTo(representImgFile);
            thumnailPath = "http://localhost:8090/file/" + thunmail;
        }   // 프론트(localhost:3000)랑 주소가 달라서 백엔드 주소를 경로에 함께 입력해줘야됨


        Member member = Member.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .email(email)
                .address(address)
                .nickname(nickname)
                .profileImg(thumnailPath)
                .build();

        String refreshToken = jwtProvider.genRefreshToken(member);
        member.setRefreshToken(refreshToken);

        memberRepository.save(member);

        return member;
    }

    public Optional<Member> findById (Long id) {
        return this.memberRepository.findById(id);
    }

    public Optional<Member> findByEmail(String email) {
        return this.memberRepository.findByEmail(email);
    }

    public Optional<Member> findByUsername(String username) {
        return this.memberRepository.findByUsername(username);
    }

    public Optional<Member> findByNickname(String nickname) {
        return this.memberRepository.findByNickname(nickname);
    }

    public void saveLastLocation(Member member, LastLocation lastLocation) {
        Member memberLocation = member.toBuilder()
                .lastLocation(lastLocation)
                .build();

        this.memberRepository.save(memberLocation);
    }

    @AllArgsConstructor
    @Getter
    public static class AuthAndMakeTokensResponseBody {
        private Member member;
        private String accessToken;
        private String refreshToken;
    }

    @Transactional
    public RsData<AuthAndMakeTokensResponseBody> authAndMakeTokens(String username, String password) {
        // 회원 존재유무,
        Member member = this.memberRepository.findByUsername(username).orElseThrow(() -> new GlobalException("400-1", "해당 유저가 존재하지 않습니다."));

        // 비밀번호 일치 여부
        if (!passwordEncoder.matches(password, member.getPassword())) {
            throw  new GlobalException("400-2", "비밀번호가 일치 하지 않습니다.");
        }

        //리프레시토큰 가지고오기
        String refreshToken = member.getRefreshToken();

        // 회원데이터, 시간 설정 및 토큰 생성
        String accessToken = jwtProvider.genToken(member, 60 * 60 * 5);

        // 토큰 출력
        // System.out.println("accessToken :" + accessToken);
        return RsData.of("200-1", "로그인 성공", new AuthAndMakeTokensResponseBody(member, accessToken, refreshToken));
    }

    public SecurityUser getUserFromAccessToken(String accessToken) {
        Map<String, Object> payloadBody = jwtProvider.getClaims(accessToken);

        long id = (int) payloadBody.get("id");
        String username = (String) payloadBody.get("username");
        List<GrantedAuthority> authorities = new ArrayList<>();

        return new SecurityUser(
                id,
                username,
                "",
                authorities
        );
    }

    public boolean validateToken(String token) {
        return jwtProvider.verify(token);
    }

    public RsData<String> refreshAccessToken(String refreshToken) {
        Member member = memberRepository.findByRefreshToken(refreshToken).orElseThrow(() -> new GlobalException("400-1", "존재하지 않는 리프레시 토큰입니다."));

        String accessToken = jwtProvider.genAccessToken(member);

        return RsData.of("200-1", "토큰 갱신 성공", accessToken);
    }
}
