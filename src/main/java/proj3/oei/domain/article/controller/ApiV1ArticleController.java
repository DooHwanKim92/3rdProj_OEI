package proj3.oei.domain.article.controller;


import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import proj3.oei.domain.article.Dto.ArticleDto;
import proj3.oei.domain.article.Dto.ArticlesDto;
import proj3.oei.domain.article.entity.Article;
import proj3.oei.domain.article.service.ArticleService;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.domain.member.service.MemberService;
import proj3.oei.global.distanceCalculator.DistanceCalculator;
import proj3.oei.global.resultData.RsData;
import proj3.oei.global.rq.Rq;

import java.io.IOException;
import java.util.ArrayList;
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

    private final DistanceCalculator distanceCalculator;

    @Getter
    @AllArgsConstructor
    public static class ArticlesResponse {
        private final List<ArticlesDto> articles;
    }
    @GetMapping("/list/{type}")
    // 게시글 목록
    public RsData<ArticlesResponse> getArticles(@PathVariable(value = "type") String type) {

        List<Article> articleList = new ArrayList<>();

        Member member = rq.getMember();

        if(type.equals("trade")) {
            articleList = this.articleService.getTradeArticles();
        } else if (type.equals("alba")) {
            articleList = this.articleService.getAlbaArticles();
        } else if (type.equals("club")) {
            articleList = this.articleService.getClubArticles();
        } else if (type.equals("freetalk")) {
            articleList = this.articleService.getFreeTalkArticles();
        } else if (type.equals("property")) {
            articleList = this.articleService.getPropertyArticles();
        }

        List<ArticlesDto> articles = new ArrayList<>();

        for(int i = 0; i < articleList.size(); i++) {
            double distance = 0.0;

            distance = distanceCalculator.calculateDistance(Double.parseDouble(member.getLastLocation().getLat()), Double.parseDouble(member.getLastLocation().getLon()), articleList.get(i).getLat(), articleList.get(i).getLon());

            ArticlesDto articlesDto = new ArticlesDto(articleList.get(i),distance);

            articles.add(articlesDto);
        }

        return RsData.of("S-1", "성공", new ArticlesResponse(articles));
    }

    @Data
    public static class SearchRequest {

        private String kw;

    }

    @GetMapping("/search/{type}/{kw}")
    // 검색한 게시글
    public RsData<ArticlesResponse>getSearchArticles(@PathVariable(value = "type") String type,
                                                     @PathVariable(value = "kw") String kw) {

        Member member = rq.getMember();

        List<Article> articleList = this.articleService.findByKeyword(type,kw);

        List<ArticlesDto> articles = new ArrayList<>();

        for(int i = 0; i < articleList.size(); i++) {
            double distance = 0.0;

            distance = distanceCalculator.calculateDistance(Double.parseDouble(member.getLastLocation().getLat()), Double.parseDouble(member.getLastLocation().getLon()), articleList.get(i).getLat(), articleList.get(i).getLon());

            ArticlesDto articlesDto = new ArticlesDto(articleList.get(i),distance);

            articles.add(articlesDto);
        }

        return RsData.of("S-2","성공",new ArticlesResponse(articles));

    }

//    @GetMapping("/search/{type}/")
//    // 검색어 입력 안했을 때
//    public RsData<ArticlesResponse> getNoneSearchArticles(@PathVariable(value = "type") String type) {
//        List<Article> articles = new ArrayList<>();
//        if(type.equals("trade")) {
//            articles = this.articleService.getTradeArticles();
//        } else if (type.equals("alba")) {
//            articles = this.articleService.getAlbaArticles();
//        } else if (type.equals("club")) {
//            articles = this.articleService.getClubArticles();
//        } else if (type.equals("freetalk")) {
//            articles = this.articleService.getFreeTalkArticles();
//        } else if (type.equals("property")) {
//            articles = this.articleService.getPropertyArticles();
//        }
//        return RsData.of("S-1", "성공", new ArticlesResponse(articles));
//    }

    @Getter
    @AllArgsConstructor
    public static class ArticleResponse {
        private final ArticleDto article;
    }


    @GetMapping("/{id}")
    public RsData<ArticleResponse> getArticle(@PathVariable(value = "id") Long id) {
        Optional<Article> article = this.articleService.findById(id);
        if(article.isEmpty()) {
            return RsData.of(
                    "F-1",
                    "존재하지 않는 게시글"
            );
        }
        this.articleService.addHit(article.get());
        return  RsData.of(
                        "S-1",
                        "성공",
                        new ArticleResponse(new ArticleDto(article.get()))
                );
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

    @PostMapping("/{type}")
    // RsData<CreateResponse>
    // @RequestBody CreateRequest createRequest
    public void createArticle(@Valid @NotBlank @RequestParam(value = "title") String title,
                                  @NotBlank @RequestParam(value = "content") String content,
                                  @NotBlank @RequestParam(value = "category") String category,
                                  @NotBlank @RequestParam(value = "located") String located,
                                  @NotBlank @RequestParam(value = "lat") String lat,
                                  @NotBlank @RequestParam(value = "lon") String lon,
                                  @PathVariable(value = "type") String type,
                                  @RequestParam(value = "img") MultipartFile img) throws IOException {

        Member member = rq.getMember();

        RsData<Article> createRs = this.articleService.createTradeArticle(type,category, member,title, content, img, located, lat, lon);

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
    public RsData<Object> modifyArticle(@PathVariable(value = "id") Long id,
                              @Valid @NotBlank @RequestParam(value = "title") String title,
                                  @NotBlank @RequestParam(value = "content") String content,
                                  @NotBlank @RequestParam(value = "located") String located,
                                  @RequestParam(value = "img") MultipartFile img) throws IOException {

        Optional<Article> article = this.articleService.findById(id);
        if (article.isEmpty()) {
            return RsData.of(
                    "F-1",
                    "%d번 게시글은 존재하지 않습니다.".formatted(id)
            );
        }
        Member member = rq.getMember();

        // 게시글 수정 권한 검증 로직 필요
        if(member != article.get().getAuthor()) {
            return RsData.of(
                    "F-5",
                    "수정 권한이 없습니다."
            );
        }

        this.articleService.modify(article.get(), title, content, img, located);

        return RsData.of(
                "S-1",
                "%d 번 게시글 수정 성공".formatted(article.get().getId()),
                new ModifyResponse(article.get())
        );
    }

    @DeleteMapping("/{id}")
    public RsData<Object> removeArticle(@PathVariable(value = "id") Long id) {

        Optional<Article> article = this.articleService.findById(id);
        if (article.isEmpty()) {
            return RsData.of(
                    "F-1",
                    "%d번 게시글은 존재하지 않습니다.".formatted(id)
            );
        }
        Member member = rq.getMember();

        // 게시글 삭제 권한 검증 로직 필요
        if(member != article.get().getAuthor()) {
            return RsData.of(
                    "F-5",
                    "삭제 권한이 없습니다."
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