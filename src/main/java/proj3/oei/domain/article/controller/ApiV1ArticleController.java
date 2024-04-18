package proj3.oei.domain.article.controller;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import proj3.oei.domain.article.entity.Article;
import proj3.oei.domain.article.service.ArticleService;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.domain.member.service.MemberService;
import proj3.oei.global.resultData.RsData;
import proj3.oei.global.rq.Rq;
import proj3.oei.global.security.SecurityUser;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;


@RestController
// 콘트롤러 메서드에서 return하는 값을 기본적으로 문자열로 반환함
// like @ResponseBody
@RequiredArgsConstructor
@RequestMapping("/api/v1/articles")
public class ApiV1ArticleController {

    @Value("${custom.fileDirPath}")
    private String filePath;

    private final ArticleService articleService;

    private final Rq rq;

    private final MemberService memberService;

    @Getter
    @AllArgsConstructor
    public static class ArticlesResponse {
        private final List<Article> articles;
    }

    @Getter
    @AllArgsConstructor
    public static class ArticleResponse {
        private final Article article;
    }

    @GetMapping("")
    // 중고거래 게시글 목록
    public RsData<ArticlesResponse> getTradeArticles() {
        List<Article> articles = this.articleService.getTradeArticles();
        return RsData.of("S-1", "성공", new ArticlesResponse(articles));
    }

    @GetMapping("/{id}")
    public RsData<ArticleResponse> getArticle(@PathVariable(value = "id") Long id) {
        return articleService.findById(id)
                .map(article -> RsData.of(
                        "S-1",
                        "성공",
                        new ArticleResponse(article)
                )).orElseGet(() -> RsData.of(
                        "F-1",
                        "%d번 게시글은 존재하지 않습니다.".formatted(id)
                ));
    }

    @Data
    // @Data = getter, setter 등 자주 사용하는 어노테이션 패키징
    // 매핑된 메서드에서 @RequestBody로 받은 Json객체를 담는 객체
    public static class CreateRequest {

        private String category;
        @NotBlank
        private String title;
        @NotBlank
        private String content;

    }

    @Getter
    @AllArgsConstructor
    // 백엔드 로직 처리 후 결과를 담아서 보여준다.
    // db에 접근하지는 않음
    public static class CreateResponse {
        private final Article article;
    }

    @PostMapping("")
    // RsData<CreateResponse>
    // @RequestBody CreateRequest createRequest
    public void createArticle(@Valid @NotBlank @RequestParam(value = "title") String title,
                                  @NotBlank @RequestParam(value = "content") String content,
                                  @NotBlank @RequestParam(value = "category") String category,
                                  @NotBlank @RequestParam(value = "located") String located,
                                  @NotBlank @RequestParam(value = "lat") String lat,
                                  @NotBlank @RequestParam(value = "lon") String lon,
                                  @RequestParam(value = "img") MultipartFile img) throws IOException {

        Member member = rq.getMember();

        RsData<Article> createRs = this.articleService.createTradeArticle("trade",category, member,title, content, img, located, lat, lon);

//        if (createRs.isFail()) return (RsData) createRs;
//        // 왜 되는거지?? 왜 안됐던거여
//        return RsData.of(
//                createRs.getResultCode(),
//                createRs.getMsg(),
//                new CreateResponse(createRs.getData())
//        );
    }

    @Data
    public static class ModifyRequest {
        @NotBlank
        private String title;
        @NotBlank
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class ModifyResponse {
        private final Article article;
    }

    @PatchMapping("/{id}")
    public void modifyArticle(@PathVariable(value = "id") Long id, @Valid @NotBlank @RequestParam(value = "title") String title,
                                  @NotBlank @RequestParam(value = "content") String content,
                                  @NotBlank @RequestParam(value = "category") String category,
                                  @NotBlank @RequestParam(value = "located") String located,
                                  @RequestParam(value = "img") MultipartFile img) throws IOException {

        Member member = rq.getMember();

        // 게시글 수정 권한 검증 로직 필요

        Optional<Article> article = this.articleService.findById(id);

        if (article.isEmpty()) {
            article = null;
        }

        this.articleService.modify(article.get(), category, title, content, img, located);

//        return RsData.of(
//                "S-1",
//                "%d 번 게시글 수정 성공".formatted(article.get().getId()),
//                new ModifyResponse(article.get())
//        );
    }

    @DeleteMapping("/{id}")
    public RsData<Object> removeArticle(@PathVariable(value = "id") Long id) {

        // 게시글 삭제 권한 검증 로직 필요

        Optional<Article> article = this.articleService.findById(id);
        if (article.isEmpty()) {
            return RsData.of(
                    "F-1",
                    "%d번 게시글은 존재하지 않습니다.".formatted(id)
            );
        }

        this.articleService.remove(article.get());

        return RsData.of(
                "S-5",
                "게시글 삭제 성공",
                article
        );
    }

}