package proj3.oei.domain.article.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import proj3.oei.domain.article.entity.Article;
import proj3.oei.domain.article.repository.ArticleRepository;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.global.resultData.RsData;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ArticleService {

    @Value("${custom.fileDirPath}")
    private String fileDirPath;

    private final ArticleRepository articleRepository;

    public List<Article> findAll() {
        return this.articleRepository.findAll();
    }

    public Optional<Article> findById(Long id) {
        return this.articleRepository.findById(id);
    }

    @Transactional
    // 예외 발생 시 rollback 해준다
    public RsData<Article> create(String category, Member member, String title, String content, MultipartFile img, String location) throws IOException {

        // 프로젝트 외부 저장
        // C://kingsman//file_upload//product
        String thumnailPath = "";
        String thunmail = "";

        if (img.isEmpty()) {
            thumnailPath = "/기본이미지.jpg";
        } else if (!img.isEmpty()) {
            thunmail = "article/" + UUID.randomUUID().toString() + ".jpg";
            File representImgFile = new File(fileDirPath + "/" + thunmail);
            img.transferTo(representImgFile);
            thumnailPath = "http://localhost:8090/file/" + thunmail;
        }   // 프론트(localhost:3000)랑 주소가 달라서 백엔드 주소를 경로에 함께 입력해줘야됨


        Article article = Article.builder()
                .category(category)
                .author(member)
                .title(title)
                .content(content)
                .imgPath(thumnailPath)
                .location(location)
                .build();

        this.articleRepository.save(article);

        return RsData.of(
                "S-3",
                "게시글 등록 성공",
                article
        );
    }

    @Transactional
    public void modify(Article article, String title, String content) {
        Article modifyArticle = article.toBuilder()
                .title(title)
                .content(content)
                .build();

        this.articleRepository.save(modifyArticle);
    }

    @Transactional
    public void remove(Article article) {
        this.articleRepository.delete(article);
        // JPA 메서드 articleRepository.deleteById(id); 도 있음
    }
}