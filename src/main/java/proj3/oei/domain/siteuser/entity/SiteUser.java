package proj3.oei.domain.siteuser.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import proj3.oei.global.jpa.BaseEntity;


@Entity
@Getter
@Setter
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class SiteUser extends BaseEntity{

    @Column
    // 서비스 계정 ID
    private String username;

    @Column
    private String password;

    @Column
    // 관리자 관리권한 부여
    private String role;

    @Column
    private Integer age;

    @Column
    private String nickname;

    @Column
    private String email;

    @Column
    private String phoneNumber;

    @Column
    private String address;

    @Column
    private float manner;
}
