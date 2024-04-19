package proj3.oei.domain.message.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.global.jpa.BaseEntity;

@Entity
@Getter
@Setter
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Message extends BaseEntity {

    private String title;

    private String content;

    //send or receive
    private String type;

    // add two member at once
    // sender, receiver
    @ManyToOne
    private Member member;
}
