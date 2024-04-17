package proj3.oei.global.initData;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import proj3.oei.domain.article.service.ArticleService;
import proj3.oei.domain.category.service.CategoryService;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.domain.member.service.MemberService;

import java.io.IOException;
import java.nio.file.*;

@Configuration
@Profile({"dev", "test"})
public class NotProd {
    @Bean
    CommandLineRunner initData(ArticleService articleService, MemberService memberService, CategoryService categoryService, PasswordEncoder passwordEncoder) {

        return args -> {
            Member user1 = memberService.join("user1", "1234", "test1@test.com","address1","닉네임1");
            Member user2 = memberService.join("user2", "1234", "test2@test.com","address2","닉네임2");
            Member admin  = memberService.join("admin", "1234", "admin@test.com","address3","닉네임3");

            categoryService.create("판매");
            categoryService.create("구매");
            categoryService.create("대여");
            categoryService.create("무료나눔");


            Path directoryArticle = Paths.get("C:\\oei\\file_upload\\article");
            Path directoryReview = Paths.get("C:\\oei\\file_upload\\review");
            Path directoryQuestion = Paths.get("C:\\oei\\file_upload\\question");
            Path directoryMember = Paths.get("C:\\oei\\file_upload\\member");

            try {
                Files.createDirectories(directoryArticle);
                Files.createDirectories(directoryReview);
                Files.createDirectories(directoryQuestion);
                Files.createDirectories(directoryMember);
            } catch (FileAlreadyExistsException e) {
                System.out.println("디렉토리가 이미 존재합니다");
            } catch (NoSuchFileException e) {
                System.out.println("디렉토리 경로가 존재하지 않습니다");
            } catch (IOException e) {
                e.printStackTrace();
            }
        };
    }
}