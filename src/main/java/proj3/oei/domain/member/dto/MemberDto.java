package proj3.oei.domain.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import proj3.oei.domain.member.entity.Member;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MemberDto {

    private long id;
    private String username;
    private LocalDateTime createDate;
    private LocalDateTime modifiedDate;
    private String email;
    private String address;
    private String nickname;
    private String profileImg;

    public MemberDto(Member member) {

        this.id = member.getId();
        this.username = member.getUsername();
        this.email = member.getEmail();
        this.address = member.getAddress();
        this.createDate = member.getCreateDate();
        this.modifiedDate = member.getModifiedDate();
        this.nickname = member.getNickname();
        this.profileImg = member.getProfileImg();

    }
}
