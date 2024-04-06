package proj3.oei.global.initData;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import proj3.oei.domain.article.service.ArticleService;

@Configuration
@Profile({"dev", "test"})
public class NotProd {
    @Bean
    CommandLineRunner initData(ArticleService articleService) {
        return args -> {
            articleService.create("title1","content1");
            articleService.create("title2","content2");
            articleService.create("title3","content3");
            articleService.create("title4","content4");
            articleService.create("title5","content5");
        };
    }
}