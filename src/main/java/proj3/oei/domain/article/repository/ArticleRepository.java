package proj3.oei.domain.article.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proj3.oei.domain.article.entity.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
}

