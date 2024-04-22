package proj3.oei.domain.article.Dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import proj3.oei.domain.article.entity.Article;
import proj3.oei.domain.review.entity.Review;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class ArticlesDto {

    private Long id;

    private String imgPath;

    private String category;

    private String title;

    private String content;

    private Long hit;

    private String reviewLength;

    private Long authorId;

    private String authorNickname;

    private String authorProfileImg;

    private String authorEmail;

    private String location;

    private double distance;

    private LocalDateTime createDate;
    private LocalDateTime modifiedDate;

    public ArticlesDto(Article article, double distance) {

        double zeroDistance = Math.round(distance * 10) / 10.0;

        this.id = article.getId();
        this.imgPath = article.getImgPath();
        this.category = article.getCategory();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.hit = article.getHit();
        this.reviewLength = String.valueOf(article.getReviews().size());
        this.authorId = article.getAuthor().getId();
        this.authorNickname = article.getAuthor().getNickname();
        this.authorProfileImg = article.getAuthor().getProfileImg();
        this.authorEmail = article.getAuthor().getEmail();
        this.location = article.getLocation();
        this.distance = zeroDistance;

        this.createDate = article.getCreateDate();
        this.modifiedDate = article.getModifiedDate();
    }
}
