package proj3.oei.domain.article.Dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import proj3.oei.domain.article.entity.Article;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class ArticleDto {

    private Article article;

    private double distance;

    public List<Article> articlesDto(List<Article> articles) {
        List<Article> articleList = new ArrayList<>();

        return articleList;
    }
}
