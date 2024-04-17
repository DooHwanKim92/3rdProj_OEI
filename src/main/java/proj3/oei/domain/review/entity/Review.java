package proj3.oei.domain.review.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import proj3.oei.domain.article.entity.Article;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.global.jpa.BaseEntity;

@Entity
@Getter
@Setter
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Review extends BaseEntity {

    private String content;

    @ManyToOne
    private Member author;

    @JsonIgnore
    @ManyToOne
    private Article article;

}
