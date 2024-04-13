package proj3.oei.domain.article.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.global.jpa.BaseEntity;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Article extends BaseEntity {


    @ManyToOne
    private Member author;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private String location;


}
