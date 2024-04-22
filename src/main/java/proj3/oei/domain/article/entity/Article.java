package proj3.oei.domain.article.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.domain.review.entity.Review;
import proj3.oei.global.jpa.BaseEntity;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Article extends BaseEntity {


    @ManyToOne
    private Member author;

    private String type;
    // 거래, 모임, 아르바이트, 부동산, 자유게시판
    // trade
    // club
    // alba
    // property
    // freetalk

    private String category;

    @Column
    private String title;

    @Column
    private String content;

    @Column
    private String location;

    // 게시글이 작성된 위치의 위도
    private double lat;

    // 게시글이 작성된 위치의 경도
    private double lon;

    private String imgPath;

    private Long hit;

    @OneToMany(mappedBy = "article",cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Review> reviews;

}
