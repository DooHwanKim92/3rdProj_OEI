package proj3.oei.domain.article.Dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import proj3.oei.domain.article.entity.Article;
import proj3.oei.domain.review.entity.Review;

import java.util.List;

@Getter
@NoArgsConstructor
public class ArticleDto {

    private Long id;
    private String category;
    private String title;
    private Long hit;
    private String authorProfileImg;
    private Long authorId;
    private String authorNickname;
    private String imgPath;
    private String content;
    private List<Review> reviews;

    public ArticleDto(Article article) {

        this.id = article.getId();
        this.category = article.getCategory();
        this.title = article.getTitle();
        this.hit = article.getHit();
        this.authorProfileImg = article.getAuthor().getProfileImg();
        this.authorId = article.getAuthor().getId();
        this.authorNickname = article.getAuthor().getNickname();
        this.imgPath = article.getImgPath();
        this.content = article.getContent();
        this.reviews = article.getReviews();

    }
}
