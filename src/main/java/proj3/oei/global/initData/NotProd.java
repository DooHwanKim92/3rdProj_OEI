package proj3.oei.global.initData;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import proj3.oei.domain.article.service.ArticleService;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.domain.member.service.MemberService;

@Configuration
@Profile({"dev", "test"})
public class NotProd {
    @Bean
    CommandLineRunner initData(ArticleService articleService, MemberService memberService, PasswordEncoder passwordEncoder) {

        return args -> {
            Member user1 = memberService.join("user1", "1234", "test1@test.com","address1");
            Member user2 = memberService.join("user2", "1234", "test2@test.com","address2");
            Member admin  = memberService.join("admin", "1234", "admin@test.com","address3");


            // 작성자 회원 추가
            articleService.create(user1,"제목 1", "내용 1");
            articleService.create(user1,"제목 2", "내용 2");
            articleService.create(user2,"제목 3", "내용 3");
            articleService.create(user2,"제목 4", "내용 4");
            articleService.create(admin,"제목 5", "내용 5");
        };
    }
}