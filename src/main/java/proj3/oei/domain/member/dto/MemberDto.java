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
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String email;
    private String address;

    public MemberDto(Member member) {

            this.id = member.getId();
            this.username = member.getUsername();
            this.email = member.getEmail();
            this.address = member.getAddress();
            this.createdDate = member.getCreateDate();
            this.modifiedDate = member.getModifiedDate();

    }
}
