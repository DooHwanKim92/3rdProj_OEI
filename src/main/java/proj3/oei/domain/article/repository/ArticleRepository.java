package proj3.oei.domain.article.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import proj3.oei.domain.article.entity.Article;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Query("select a from Article a where a.type = 'trade' order by a.createDate desc")
    List<Article> getTradeArticles();
    @Query("select a from Article a where a.type = 'club' order by a.createDate desc")
    List<Article> getClubArticles();
    @Query("select a from Article a where a.type = 'alba' order by a.createDate desc")
    List<Article> getAlbaArticles();
    @Query("select a from Article a where a.type = 'freetalk' order by a.createDate desc")
    List<Article> getFreeTalkArticles();
    @Query("select a from Article a where a.type = 'property' order by a.createDate desc")
    List<Article> getPropertyArticles();
}

